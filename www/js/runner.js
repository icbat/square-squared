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
        var chargeLevel;
        if (dragY < 10) {
            chargeLevel = 0;
            updateDebugTextForJump(chargeLevel, dragY, this.vspeed);
        } else {
            chargeLevel = Math.floor(dragY / game.world.height * 100  / 33) + 1;
            console.log(chargeLevel);
            updateDebugTextForJump(0, dragY, this.vspeed);
        }
        this.vspeed = constants.jumpStrength * chargeLevel;
    };

    runner.findLowerLeftPoint = function() {
        return {
            x: this.findLeftmostPoint(),
            y: this.findLowestPoint()
        };
    };

    return runner;
};
