var state_running = function(game) {
    return {
        create: function(game) {
            game.input.onDown.add(this.onDown, this);
            game.input.onUp.add(this.onUp, this);
            this.score = 0;

            var textStyle = {
                fill: colorPalette.text,
                boundsAlignH: "center",
                boundsAlignV: "middle"
            };
            objects.scoreDisplay = game.add.text(game.world.centerX - constants.runnerSize, objects.runner.findHighestPoint() + (constants.runnerSize / 2), "0", textStyle);
            objects.scoreDisplay.anchor.set(0.5);
            objects.scoreDisplay.setShadow(1, 1, colorPalette.textShadow);
            objects.obstacles = [];
            this.addObstacleToBack(100);
            this.graphics = game.add.graphics(0, 0);
            this.firstTouchY = -1;
            this.dragY = -1;
        },

        update: function(game) {
            objects.runner.applyGravity();

            var obstacleIndex;
            for (obstacleIndex = 0; obstacleIndex < objects.obstacles.length; ++obstacleIndex) {
                var obstacle = objects.obstacles[obstacleIndex];
                obstacle.movePolygonBy(constants.hspeed);

                if (objects.runner.intersects(obstacle)) {
                    // Game over
                    game.state.start('waiting');
                }

                if (this.runnerHasPassedObstacle(obstacle, objects.runner)) {
                    this.scorePoint(obstacle);
                }

            }
            if (objects.obstacles[0].findRightmostPoint() < 0) {
                objects.obstacles.shift();
            }
            if (objects.obstacles[objects.obstacles.length - 1].findRightmostPoint() < game.world.width) {
                this.addObstacleToBack();
            }
            if (this.firstTouchY !== -1) {
                this.dragY = this.firstTouchY - game.input.activePointer.worldY;
                objects.chargeBar.update(percentOf(this.dragY, game.world.height));
            } else {
                objects.chargeBar.update(0);
            }

        },

        addObstacleToBack: function(offset) {
            offset = offset || 0;
            var obstacle = objects.makeRandomObstacle();
            objects.obstacles.push(obstacle);
            var newX = Math.max(game.world.width + obstacle.minimumSpaceBehind);
            newX += offset;
            newX += Math.random() * constants.runnerSize;
            if (Math.random() < 0.3) {
                // Randomly add a big-ish gap
                newX += constants.runnerSize * 2;
            }

            obstacle.moveToX(newX);
            obstacle.hasScored = false;
        },

        runnerHasPassedObstacle: function(obstacle, runner) {
            return !obstacle.hasScored && Math.round(obstacle.findRightmostPoint()) < runner.findLeftmostPoint() - 1;
        },

        scorePoint: function(obstacle) {
            ++this.score;
            objects.scoreDisplay.text = (this.score);
            obstacle.hasScored = true;
        },

        render: function() {
            this.graphics.clear();

            var obstacleIndex;
            for (obstacleIndex = 0; obstacleIndex < objects.obstacles.length; ++obstacleIndex) {
                var obstacle = objects.obstacles[obstacleIndex];
                obstacle.draw(this.graphics);
            }
            objects.runner.draw(this.graphics);
            objects.ground.draw(this.graphics);
            objects.chargeBar.draw(this.graphics);
            drawDebugText(constants.debugMode);
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
            if (mouseEvent.identifier === 0 && pointer.identifier === 0) {
                if (objects.runner.canJump()) {
                    objects.runner.jump(this.dragY);
                }
                this.firstTouchY = -1;
                this.dragY = -1;
            }
        }
    };
};
