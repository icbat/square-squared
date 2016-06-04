var state_running = function(game) {
    return {
        create: function(game) {
            game.input.onDown.add(this.onDown, this);
            game.input.onUp.add(this.onUp, this);
            game.score = 0;

            var textStyle = {
                fill: colorPalette.text,
                boundsAlignH: "center",
                boundsAlignV: "middle"
            };
            objects.scoreDisplay = game.add.text(game.world.centerX - constants.tileSize, objects.runner.findHighestPoint() + (constants.tileSize / 2), "0", textStyle);
            objects.scoreDisplay.anchor.set(0.5);
            objects.scoreDisplay.setShadow(1, 1, colorPalette.textShadow);
            var offset = 0;
            objects.obstacles.forEach(function(obstacle) {
                obstacle.moveToX(-100);
                obstacle.hasScored = true;
            });
            this.graphics = game.add.graphics(0, 0);
        },

        update: function(game) {
            objects.runner.applyGravity();

            var obstacleIndex;
            objects.obstacles.forEach(function(obstacle) {
                obstacle.movePolygonBy(constants.hspeed);

                if (objects.runner.intersects(obstacle)) {
                    // Game over
                    game.state.start('waiting');
                }

                if (this.runnerHasPassedObstacle(obstacle, objects.runner)) {
                    this.scorePoint(obstacle);
                }

                if (obstacle.findRightmostPoint() < 0) {
                    this.moveObstacleToBack(obstacle);
                }
            });
        },

        moveObstacleToBack: function(obstacle) {
            var obstacleIndex;
            var rightMostX = 0;
            objects.obstacles.forEach(function(obstacle) {
                rightMostX = Math.max(obstacle.findRightmostPoint(), rightMostX);
            });

            obstacle.moveToX(Math.max(rightMostX + constants.minimumSpaceBetweenObstacles, game.world.width + (constants.minimumSpaceBetweenObstacles / 2)));
            obstacle.hasScored = false;
        },

        runnerHasPassedObstacle: function(obstacle, runner) {
            return !obstacle.hasScored && Math.round(obstacle.findRightmostPoint()) < runner.findLeftmostPoint() - 1;
        },

        scorePoint: function(obstacle) {
            ++game.score;
            objects.scoreDisplay.text = (game.score);
            obstacle.hasScored = true;
        },

        render: function() {
            this.graphics.clear();

            var obstacleIndex;
            objects.obstacles.forEach(function(obstacle) {
                obstacle.draw(this.graphics);
            });
            objects.runner.draw(this.graphics);
            objects.ground.draw(this.graphics);
        },

        onDown: function(pointer, mouseEvent) {
            if (mouseEvent.identifier === 0) {
                if (objects.runner.canJump()) {
                    objects.runner.jump();
                }
            }
        },

        onUp: function(pointer, mouseEvent) {
            // Prevents 'mouse leaving the game world' from firing this, too
            if (mouseEvent.identifier === 0 && pointer.identifier === 0) {}
        }
    };
};
