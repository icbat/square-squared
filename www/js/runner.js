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
        return this.findLowerLeftPoint().y === constants.groundHeight;
    };

    runner.jump = function(dragY) {
        dragY = dragY || 0;
        var chargeLevel = 1;
        updateDebugTextForJump(chargeLevel, dragY);
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
