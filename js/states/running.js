var intersects = function(polygon, rectangle) {
    var linesA = polygon.decompose();
    var linesB = decomposeRectangle(rectangle);
    var indexA;
    var indexB;
    for (indexA = 0; indexA < linesA.length; ++indexA) {
        for (indexB = 0; indexB < linesB.length; ++indexB) {
            if (linesA[indexA].intersects(linesB[indexB])) {
                return true;
            }
        }
    }
    return false;
};

var decomposeRectangle = function(rectangle) {
    var lines = [];
    var topRight = {
        x: rectangle.x + rectangle.width,
        y: rectangle.y
    };
    var bottomRight = {
        x: rectangle.x + rectangle.width,
        y: rectangle.y + rectangle.height
    };
    var bottomLeft = {
        x: rectangle.x,
        y: rectangle.y + rectangle.height
    };

    lines.push(new Phaser.Line(bottomRight.x, bottomRight.y, topRight.x, topRight.y));
    lines.push(new Phaser.Line(bottomRight.x, bottomRight.y, bottomLeft.x, bottomLeft.y));
    return lines;
};

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
            objects.scoreDisplay = game.add.text(game.world.centerX - constants.tileSize, constants.runnerOnGround + (constants.tileSize / 2), "0", textStyle);
            objects.scoreDisplay.anchor.set(0.5);
            objects.scoreDisplay.setShadow(1, 1, colorPalette.textShadow);
            var offset = 0;
            for (obstacleIndex = 0; obstacleIndex < objects.obstacles.length; ++obstacleIndex) {
                var obstacle = objects.obstacles[obstacleIndex];
                obstacle.movePolygonTo(-100);
                obstacle.hasScored = true;
            }
            this.graphics = game.add.graphics(0, 0);
        },

        update: function(game) {
            objects.runner.applyGravity();

            var obstacleIndex;
            for (obstacleIndex = 0; obstacleIndex < objects.obstacles.length; ++obstacleIndex) {
                var obstacle = objects.obstacles[obstacleIndex];
                obstacle.movePolygonBy(constants.hspeed);

                if (intersects(obstacle, objects.runner)) {
                    // Game over
                    game.state.start('waiting');
                }

                if (this.runnerHasPassedObstacle(obstacle)) {
                    this.scorePoint(obstacle);
                }

                if (obstacle.findRightmostPoint() < 0) {
                    this.moveObstacleToBack(obstacle);
                }
            }
        },

        moveObstacleToBack: function(obstacle) {
            var obstacleIndex;
            var rightMostX = 0;
            for (obstacleIndex = 0; obstacleIndex < objects.obstacles.length; ++obstacleIndex) {
                rightMostX = Math.max(objects.obstacles[obstacleIndex].findRightmostPoint(), rightMostX);
            }
            obstacle.movePolygonTo(Math.max(rightMostX + constants.minimumSpaceBetweenObstacles, game.world.width + (constants.minimumSpaceBetweenObstacles / 2)));
            obstacle.hasScored = false;
        },

        runnerHasPassedObstacle: function(obstacle) {
            return !obstacle.hasScored && Math.round(obstacle.findRightmostPoint()) < objects.runner.x - 1;
        },

        scorePoint: function(obstacle) {
            ++game.score;
            objects.scoreDisplay.text = (game.score);
            obstacle.hasScored = true;
        },

        render: function() {
            game.debug.geom(objects.runner, objects.runner.color);
            game.debug.geom(objects.ground, objects.ground.color);

            this.graphics.clear();
            var obstacleIndex;
            for (obstacleIndex = 0; obstacleIndex < objects.obstacles.length; ++obstacleIndex) {
                var obstacle = objects.obstacles[obstacleIndex];
                obstacle.draw(this.graphics);
            }
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
