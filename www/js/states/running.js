var state_running = function(game) {
    return {
        create: function(game) {
            gameState.score = 0;
            this.graphics = game.add.graphics(0, 0);
            this.firstTouchY = -1;
            this.dragY = -1;

            game.input.onDown.add(this.onDown, this);
            game.input.onUp.add(this.onUp, this);

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

            var leftTween = game.add.tween(objects.leftJumpLine);
            leftTween.to({
                xPos:  game.world.width / -2
            }, 1000, Phaser.Easing.Bounce.Out);
            leftTween.start();

            var rightTween = game.add.tween(objects.rightJumpLine);
            rightTween.to({
                xPos: game.world.width
            }, 1000, Phaser.Easing.Bounce.Out);
            rightTween.start();
        },

        update: function(game) {
            objects.runner.applyGravity();

            var obstacleIndex;
            for (obstacleIndex = 0; obstacleIndex < objects.obstacles.length; ++obstacleIndex) {
                var obstacle = objects.obstacles[obstacleIndex];
                obstacle.applyGravity();
                obstacle.movePolygonBy(constants.hspeed);

                if (objects.runner.intersects(obstacle)) {
                    // Game over
                    game.stateTransition.to('dying', false);
                    return;
                }

                if (this.runnerHasPassedObstacle(obstacle, objects.runner)) {
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
            var percent = percentOf(this.dragY, game.world.height);
            var charge = chargeLevel(percent);
            objects.runner.updateBeforeDraw(charge);
            objects.leftJumpLine.moveToX(objects.leftJumpLine.xPos);
            objects.rightJumpLine.moveToX(objects.rightJumpLine.xPos);
        },

        runnerHasPassedObstacle: function(obstacle, runner) {
            return !obstacle.hasScored && Math.round(obstacle.findRightmostPoint()) < runner.findLeftmostPoint() - 1;
        },

        scorePoint: function(obstacle) {
            ++gameState.score;
            objects.scoreDisplay.visible = true;
            objects.scoreDisplay.text = (gameState.score);
            obstacle.hasScored = true;
        },

        render: function() {
            this.graphics.clear();
            objects.leftJumpLine.draw(this.graphics);
            objects.rightJumpLine.draw(this.graphics);
            var obstacleIndex;
            for (obstacleIndex = 0; obstacleIndex < objects.obstacles.length; ++obstacleIndex) {
                var obstacle = objects.obstacles[obstacleIndex];
                obstacle.draw(this.graphics);
            }
            objects.runner.draw(this.graphics);
            objects.ground.draw(this.graphics);
            drawDebugText(constants.debugMode);
            objects.dragLine.draw(this.graphics);
        },

        onDown: function(pointer, mouseEvent) {
            if (mouseEvent.identifier === 0) {
                if (this.firstTouchY === -1) {
                    this.firstTouchY = pointer.worldY;
                }
            }
        },

        onUp: function(pointer, mouseEvent) {
            // pointer.identifier === 0 Prevents 'mouse leaving the game world' from firing this, too
            if (mouseEvent.identifier === 0) {
                var charge = chargeLevel(percentOf(this.dragY, game.world.height));
                objects.runner.jump(charge);
                this.firstTouchY = -1;
                this.dragY = -1;
            }
        }
    };
};
