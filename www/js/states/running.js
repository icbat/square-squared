var state_running = function(game) {
    return {
        create: function(game) {
            this.graphics = game.add.graphics(0, 0);
            this.firstTouchY = null;
            this.dragY = null;

            game.input.onDown.add(this.onDown, this);
            game.input.onUp.add(this.onUp, this);
            game.input.onUp.add(function() {
                if (objects.runner.onGround() && objects.runner.vspeed === 0) {
                    objects.runner.color = colorPalette.runner;
                }
            });

            var textStyle = {
                fill: colorPalette.text,
                boundsAlignH: "center",
                boundsAlignV: "middle"
            };
            objects.scoreDisplay = game.add.text(game.world.centerX - constants.runnerSize, constants.groundHeight - (constants.runnerSize / 2), gameState.score, textStyle);
            objects.scoreDisplay.anchor.set(0.5);
            objects.scoreDisplay.setShadow(1, 1, colorPalette.textShadow);
            objects.scoreDisplay.visible = false;
            objects.obstacles = [];
            obstacleGenerator.addObstacleToBack();

            startGame();
        },

        update: function(game) {
            if (this.gameIsLost) {
                if (this.colorStep <= 50) {
                    objects.runner.color = Phaser.Color.interpolateColor(this.runnerOriginalColor, colorPalette.background, 50, this.colorStep++);
                }
                if (game.time.time > this.timeToLeave) {
                    var highScore = localStorage.getItem('squareSquared-highScore');
                    localStorage.setItem('squareSquared-highScore', Math.max(gameState.score, highScore ? highScore : 0));
                    objects.runner.color = colorPalette.runner;
                    game.stateTransition.to('waiting');
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
                if (objects.obstacles[0].findRightmostPoint() < 0) {
                    var removed = objects.obstacles.shift();
                    objects.runner.onLand.remove(removed.runnerLandCallback);
                }
                if (objects.obstacles[objects.obstacles.length - 1].findRightmostPoint() < game.world.width) {
                    obstacleGenerator.addObstacleToBack();
                }
                this.dragY = this.firstTouchY - game.input.activePointer.worldY;
                var touchIsDown = this.firstTouchY !== null;
                var charge = chargeLevel(this.dragY, game.world.height, touchIsDown);
                objects.runner.updateBeforeDraw(charge, touchIsDown);
                objects.leftJumpLine.moveToX(objects.leftJumpLine.xPos);
                objects.rightJumpLine.moveToX(objects.rightJumpLine.xPos);

                if (this.dragY > 0) {
                    objects.dragLine.setHeight(this.dragY);
                }
                objects.dragLine.color = constants.chargeColors[charge];
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
            objects.leftJumpLine.draw(this.graphics);
            objects.rightJumpLine.draw(this.graphics);
            objects.runner.draw(this.graphics);
            var obstacleIndex;
            for (obstacleIndex = 0; obstacleIndex < objects.obstacles.length; ++obstacleIndex) {
                var obstacle = objects.obstacles[obstacleIndex];
                obstacle.draw(this.graphics);
            }
            objects.ground.draw(this.graphics);
            objects.dragLine.draw(this.graphics);
        },

        onDown: function(pointer, mouseEvent) {
            if (mouseEvent.identifier === 0) {
                if (this.firstTouchY === null) {
                    this.firstTouchY = pointer.worldY;
                    objects.dragLine.setLowerLeftTo(pointer.worldX + constants.runnerSize / 2, pointer.worldY);
                    objects.dragLine.visible = true;
                    objects.dragLine.setHeight(1);
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
                objects.dragLine.visible = false;
            }
        }
    };
};

var runnerHasPassedObstacle = function(obstacle, runner) {
    return !obstacle.hasScored && Math.round(obstacle.findRightmostPoint()) < runner.findLeftmostPoint() - 1;
};
var loseGame = function(context) {
    context.gameIsLost = true;
    context.timeToLeave = game.time.time + constants.timeOnDyingScreen;
    context.colorStep = 0;
    context.runnerOriginalColor = objects.runner.color;
    var loseSound = game.sound.play('lose', 0.1);
    loseSound._sound.playbackRate.value = 0.5;
};

var startGame = function() {
    gameState.score = 0;
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
};
