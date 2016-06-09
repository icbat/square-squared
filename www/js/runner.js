var runner = function(polygon, color) {
    var runner = new ExtendedPolygon(polygon, color);

    runner.vspeed = 0;

    runner.applyGravity = function() {
        this.moveByY(this.vspeed);
        var gravityStep = this.vspeed > 0 ? constants.gravityStepDown : constants.gravityStepUp;
        this.vspeed -= gravityStep;

        // On hitting ground
        if (this.findLowerLeftPoint().y >= constants.groundHeight) {
            this.vspeed = 0;
            this.moveToY(constants.groundHeight - constants.tileSize);
        }
    };

    runner.canJump = function() {
        return this.findLowerLeftPoint().y > constants.groundHeight - 1;
    };

    runner.jump = function(dragY) {
        dragY = dragY || 0;
        if (dragY > 10) {
          var percentOfScreenDragged = Math.floor(dragY / game.world.height * 100);
          var chargeLevel;
          var chargeEffect;
          if (percentOfScreenDragged < 20) {
              chargeLevel = 1;
              chargeEffect = 0.5;
          } else if (percentOfScreenDragged < 50) {
              chargeLevel = 2;
              chargeEffect = 0.75;
          } else {
              chargeLevel = 3;
              chargeEffect = 1;
          }
            this.vspeed = constants.jumpStrength * chargeEffect;
            updateDebugTextForJump(chargeLevel, chargeEffect, dragY, percentOfScreenDragged, this.vspeed);
        } else {
          // Do nothing, swipe was not strong enough to count
            updateDebugTextForJump(0, dragY, this.vspeed);
        }

    };

    runner.findLowerLeftPoint = function() {
        return {
            x: this.findLeftmostPoint(),
            y: this.findLowestPoint()
        };
    };

    return runner;
};
