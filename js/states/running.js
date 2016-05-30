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
  var minX = findFurthestLeftPoint(polygon);

  // Scale X's to get their relative sizes to preserve shape when moving
  for (index = 0; index < points.length; ++index) {
      if (index % 2 == 0) {
          points[index] += destinationX - minX;
      }
  }

  polygon.setTo(points);
};

var findFurthestLeftPoint = function(polygon) {
  var points = polygon.toNumberArray();
  // Find smallest X
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

            this.resetObstaclePosition(objects.obstacleMedium);
            this.graphics = game.add.graphics(0, 0);
        },

        update: function(game) {
            this.applyGravity(objects.runner);

            // Move obstacle left
            var obstacle = objects.obstacleMedium;
            movePolygonBy(obstacle, constants.hspeed);

            if (findFurthestLeftPoint(obstacle) < -constants.tileSize) {
                this.resetObstaclePosition(obstacle);
            }

            // TODO doesn't work with polygons, rethink
            // if (obstacle.intersects(objects.runner)) {
            // Game over
            // game.state.start('waiting');
            // }

            // TODO needs work with polygons
            if (this.runnerHasPassedObstacle(obstacle)) {
                this.scorePoint(obstacle);
            }
        },

        resetObstaclePosition: function(obstacle) {
            // obstacle.x = game.world.width + 20;
            movePolygonTo(obstacle, game.world.width + 20);
            obstacle.hasScored = false;
        },

        runnerHasPassedObstacle: function(obstacle) {
            return !obstacle.hasScored && Math.round(obstacle.x + obstacle.width) < objects.runner.x - 1
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
            this.graphics.beginFill(colorPalette.obstacleMedium);
            this.graphics.drawShape(objects.obstacleMedium);
            this.graphics.endFill();
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
