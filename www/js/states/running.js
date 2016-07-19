var state_running = function(game) {
    return {
        create: function(game) {
            this.graphics = game.add.graphics(0, 0);
            this.firstTouchY = null;
            this.dragY = null;

            // This bit is here because the image needs to be loaded first
            // The physics engine is a requirement for gravity to take effect on the particles =(
            game.physics.startSystem(Phaser.Physics.ARCADE);
            var emitter = game.add.emitter(objects.runner.findCenterX(), constants.groundHeight + 10, 20);
            emitter.makeParticles('dirtParticle');
            emitter.gravity = 1000;
            emitter.setYSpeed(-150, -200);
            emitter.setXSpeed(-200, 200);
            emitter.minParticleScale = 2;
            emitter.maxParticleScale = 5;
            emitter.alpha = 0.5;

            objects.runner.onLand.add(function() {
                emitter.start(true, 1000, null, 5);
            });

            var textStyle = {
                fill: colorPalette.text,
                boundsAlignH: "center",
                boundsAlignV: "middle"
            };
            objects.scoreDisplay = game.add.text(20, constants.groundHeight + (constants.runnerSize / 2), gameState.score, textStyle);
            objects.scoreDisplay.anchor.y = 0.5;
            objects.scoreDisplay.anchor.x = 0;
            objects.scoreDisplay.setShadow(1, 1, colorPalette.textShadow);
            objects.highScoreDisplay = game.add.text(game.world.width - 20, constants.groundHeight + (constants.runnerSize / 2), "", textStyle);
            objects.highScoreDisplay.anchor.y = 0.5;
            objects.highScoreDisplay.anchor.x = 1;
            objects.highScoreDisplay.setShadow(1, 1, colorPalette.black);

            var bottomText = game.add.bitmapText(Math.max(game.world.centerX - 150, 0), 75, 'titleOrange', 'Square', 64);
            var topText = game.add.bitmapText(Math.min(bottomText.right + 100, game.world.width), 25, 'titlePurple', 'Squared', 64);
            topText.anchor.x = 1;

            setupGame(this);
        },

        update: function(game) {
            if (gameState.state == states.dying) {
                if (this.colorStep <= 50) {
                    objects.runner.color = Phaser.Color.interpolateColor(this.runnerOriginalColor, Phaser.Color.hexToRGB(colorPalette.background), 50, this.colorStep++);
                }
                if (game.time.time > this.timeToLeave) {
                    var highScore = localStorage.getItem('squareSquared-highScore');
                    localStorage.setItem('squareSquared-highScore', Math.max(gameState.score, highScore ? highScore : 0));
                    objects.runner.color = Phaser.Color.hexToRGB(colorPalette.runner);
                    setupGame(this);
                    this.gameIsLost = false;
                }
            } else {
                objects.runner.applyGravity();

                var obstacleIndex;
                for (obstacleIndex = 0; obstacleIndex < objects.obstacles.length; ++obstacleIndex) {
                    var obstacle = objects.obstacles[obstacleIndex];
                    obstacle.applyGravity();
                    obstacle.movePolygonBy(constants.hspeed);

                    if (objects.runner.intersects(obstacle)) {
                        // Game over
                        loseGame(this);
                        return;
                    }

                    if (runnerHasPassedObstacle(obstacle, objects.runner)) {
                        this.scorePoint(obstacle);
                    }

                }
                if (objects.obstacles[0] && objects.obstacles[0].findRightmostPoint() < 0) {
                    var removed = objects.obstacles.shift();
                    objects.runner.onLand.remove(removed.runnerLandCallback);
                }
                if (objects.obstacles[objects.obstacles.length - 1] && objects.obstacles[objects.obstacles.length - 1].findRightmostPoint() < game.world.width) {
                    obstacleGenerator.addObstacleToBack();
                }
                this.dragY = this.firstTouchY - game.input.activePointer.worldY;
                var touchIsDown = this.firstTouchY !== null;
                var charge = chargeLevel(this.dragY, game.world.height, touchIsDown);
                objects.runner.updateBeforeDraw(charge, touchIsDown);
                objects.leftJumpLine.moveToX(objects.leftJumpLine.xPos);
                objects.rightJumpLine.moveToX(objects.rightJumpLine.xPos);
            }
        },

        scorePoint: function(obstacle) {
            ++gameState.score;
            objects.scoreDisplay.visible = true;
            objects.scoreDisplay.text = (gameState.score);
            obstacle.hasScored = true;
            var loseSound = game.sound.play('score', 0.1);
            loseSound._sound.playbackRate.value = 0.8 + Math.max(0.05 * gameState.score, 2);
        },

        render: function() {
            this.graphics.clear();
            var row = 1;
            var spacing = 16;
            objects.leftJumpLine.draw(this.graphics);
            objects.rightJumpLine.draw(this.graphics);
            objects.runner.draw(this.graphics);
            var obstacleIndex;
            for (obstacleIndex = 0; obstacleIndex < objects.obstacles.length; ++obstacleIndex) {
                var obstacle = objects.obstacles[obstacleIndex];
                obstacle.draw(this.graphics);
            }
            objects.ground.draw(this.graphics);
        },

        onDown: function(pointer, mouseEvent) {
            if (mouseEvent.identifier === 0) {
                if (this.firstTouchY === null) {
                    this.firstTouchY = pointer.worldY;
                }
            }
        },

        onUp: function(pointer, mouseEvent) {
            // pointer.identifier === 0 Prevents 'mouse leaving the game world' from firing this, too
            if (mouseEvent.identifier === 0) {
                var charge = chargeLevel(this.dragY, game.world.height, false);
                objects.runner.jump(charge);
                this.firstTouchY = null;
                this.dragY = null;
                if (gameState.state == states.waiting && charge === constants.chargeLevels.length - 1 && objects.runner.onGround()) {
                    startGame();
                }
            }
        }
    };
};

var runnerHasPassedObstacle = function(obstacle, runner) {
    return !obstacle.hasScored && Math.round(obstacle.findRightmostPoint()) < runner.findLeftmostPoint() - 1;
};
var loseGame = function(context) {
    gameState.state = states.dying;
    context.timeToLeave = game.time.time + constants.timeOnDyingScreen;
    context.colorStep = 0;
    context.runnerOriginalColor = objects.runner.color;
    var loseSound = game.sound.play('lose', 0.1);
    loseSound._sound.playbackRate.value = 0.5;
    game.input.onDown.removeAll();
    game.input.onUp.removeAll();
    api.report.score(gameState.score);
};

var startGame = function() {
    gameState.state = states.running;
    obstacleGenerator.addObstacleToBack();
    var leftTween = game.add.tween(objects.leftJumpLine);
    leftTween.to({
        xPos: game.world.width / -2
    }, 1000, Phaser.Easing.Bounce.Out);
    leftTween.start();

    var rightTween = game.add.tween(objects.rightJumpLine);
    rightTween.to({
        xPos: game.world.width
    }, 1000, Phaser.Easing.Bounce.Out);
    rightTween.start();
    api.report.gameStart();
};

var setupGame = function(context) {
    gameState.state = states.waiting;
    objects.obstacles = [];
    gameState.score = 0;
    var highScore = localStorage.getItem('squareSquared-highScore');
    if (highScore && highScore > 0) {
        objects.highScoreDisplay.text = "High Score: " + highScore;
        objects.highScoreDisplay.visible = true;
    } else {
        objects.highScoreDisplay.visible = false;
    }
    objects.scoreDisplay.visible = false;

    var leftTween = game.add.tween(objects.leftJumpLine);
    leftTween.to({
        xPos: 0
    }, 1000, Phaser.Easing.Bounce.Out);
    leftTween.start();

    var rightTween = game.add.tween(objects.rightJumpLine);
    rightTween.to({
        xPos: game.world.width / 2
    }, 1000, Phaser.Easing.Bounce.Out);
    rightTween.start();

    game.input.onDown.add(context.onDown, context);
    game.input.onUp.add(context.onUp, context);
    game.input.onUp.add(function() {
        if (objects.runner.onGround() && objects.runner.vspeed === 0) {
            objects.runner.color = Phaser.Color.hexToRGB(colorPalette.runner);
        }
    });
};
