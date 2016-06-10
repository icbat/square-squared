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
            this.moveToY(constants.groundHeight - constants.runnerSize);
        }
    };

    runner.canJump = function() {
        return this.findLowerLeftPoint().y > constants.groundHeight - 1;
    };

    runner.jump = function(dragY) {
        dragY = dragY || 0;
        // Small threshold to prevent Tap from doing anything. Should this be here?
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
            lastJump = {
                dragY: dragY,
                percentOfScreenDragged: percentOfScreenDragged,
                chargeLevel: chargeLevel,
                chargeCoefficient: chargeEffect,
                jumpStrength: this.vspeed,
            };
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
