var movePolygonBy = function(polygon, amountX) {
    var points = polygon.toNumberArray();
    var index;
    for (index = 0; index < points.length; ++index) {
        if (index % 2 == 0) {
            points[index] += amountX;
        }
    }
    polygon.setTo(points);
};

var movePolygonTo = function(polygon, destinationX) {
    var points = polygon.toNumberArray();
    var index;
    var minX = findLeftmostPoint(polygon);

    for (index = 0; index < points.length; ++index) {
        if (index % 2 == 0) {
            // minX is necessary to adjust for the size of the polygon
            points[index] += destinationX - minX;
        }
    }

    polygon.setTo(points);
};

var findLeftmostPoint = function(polygon) {
    var points = polygon.toNumberArray();
    var minX = 99999;
    for (index = 0; index < points.length; ++index) {
        if (index % 2 == 0) {
            minX = Math.min(points[index], minX);
        }
    }
    if (minX == 99999) {
        throw "Polygon was too far off the screen, unsure how you got here, but congratulations; file a bug.";
    }
    return minX;
};

var findRightmostPoint = function(polygon) {
    var points = polygon.toNumberArray();
    var maxX = -99999;
    var index;
    for (index = 0; index < points.length; ++index) {
        if (index % 2 == 0) {
            maxX = Math.max(points[index], maxX);
        }
    }
    if (maxX == -99999) {
        throw "Polygon was too far off the screen, unsure how you got here, but congratulations; file a bug.";
    }
    return maxX;
};

var intersects = function(polygon, rectangle) {
    var linesA = decompose(polygon);
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
}

var decompose = function(polygon) {
    var rawPoints = polygon.toNumberArray();
    var index;
    var lines = [];
    var points = [];
    for (index = 0; index < rawPoints.length; ++index) {
        points.push({
            x: rawPoints[index++],
            y: rawPoints[index]
        });
    }
    var innerIndex;
    for (index = 0; index < points.length - 1; ++index) {
        for (innerIndex = index + 1; innerIndex < points.length; ++innerIndex) {
            var start = points[index];
            var end = points[innerIndex];

            lines.push(new Phaser.Line(start.x, start.y, end.x, end.y));
        }
    }

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
            objects.scoreDisplay.setShadow(1, 1, colorPalette.dark);
            var offset = 0;
            for (obstacleIndex = 0; obstacleIndex < objects.obstacles.length; ++obstacleIndex) {
                var obstacle = objects.obstacles[obstacleIndex];
                this.moveObstacleToBack(obstacle, offset);
                offset += constants.minimumSpaceBetweenObstacles;
            }
            this.graphics = game.add.graphics(0, 0);
        },

        update: function(game) {
            this.applyGravity(objects.runner);

            var obstacleIndex;
            for (obstacleIndex = 0; obstacleIndex < objects.obstacles.length; ++obstacleIndex) {
                var obstacle = objects.obstacles[obstacleIndex];
                movePolygonBy(obstacle, constants.hspeed);

                if (intersects(obstacle, objects.runner)) {
                    // Game over
                    game.state.start('waiting');
                }

                if (this.runnerHasPassedObstacle(obstacle)) {
                    this.scorePoint(obstacle);
                }

                if (findRightmostPoint(obstacle) < 0) {
                  this.moveObstacleToBack(obstacle);
                }
            }
        },

        moveObstacleToBack: function(obstacle, offset) {
            var offsetX = offset || 0;
            // obstacle.x = game.world.width + 20;
            movePolygonTo(obstacle, game.world.width + 20 + offsetX);
            obstacle.hasScored = false;
        },

        runnerHasPassedObstacle: function(obstacle) {
            return !obstacle.hasScored && Math.round(findRightmostPoint(obstacle)) < objects.runner.x - 1
        },

        scorePoint(obstacle) {
            ++game.score;
            objects.scoreDisplay.text = (game.score);
            obstacle.hasScored = true;
        },

        applyGravity: function(object) {
            object.y += object.vspeed;
            var gravityStep = object.vspeed > 0 ? constants.gravityStepDown : constants.gravityStepUp;
            object.vspeed -= gravityStep;

            // On hitting ground
            if (object.y >= constants.runnerOnGround) {
                object.vspeed = 0;
                object.y = constants.runnerOnGround;
            }
        },

        render: function() {
            game.debug.geom(objects.runner, colorPalette.runner);
            game.debug.geom(objects.ground, colorPalette.dark);
            game.debug.geom(objects.obstacleMedium, colorPalette.runner);
            // game.debug.geom(objects.obstacleHard, colorPalette.obstacleHard);

            this.graphics.clear();
            var obstacleIndex;
            for (obstacleIndex = 0; obstacleIndex < objects.obstacles.length; ++obstacleIndex) {
                var obstacle = objects.obstacles[obstacleIndex];
                this.graphics.beginFill(obstacle.color);
                this.graphics.drawShape(obstacle);
                this.graphics.endFill();
            }
        },

        canJump: function(runner) {
            return runner.y === constants.runnerOnGround;
        },

        onDown: function(pointer, mouseEvent) {
            if (mouseEvent.identifier === 0) {
                if (this.canJump(objects.runner)) {
                    objects.runner.vspeed = constants.jumpStrength;
                }
            }
        },

        onUp: function(pointer, mouseEvent) {
            // Prevents 'mouse leaving the game world' from firing this, too
            if (mouseEvent.identifier === 0 && pointer.identifier === 0) {}
        }
    };
};
