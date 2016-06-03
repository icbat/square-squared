var runner = function(polygon, groundHeight) {
    var runner = extendPolygon(polygon, colorPalette.runner);

    runner.onGroundY = groundHeight;
    runner.vspeed = 0;

    runner.canJump = function() {
        return this.findLowerLeftPoint().y === this.onGroundY;
    };

    runner.applyGravity = function() {
        this.moveByY(this.vspeed);
        var gravityStep = this.vspeed > 0 ? constants.gravityStepDown : constants.gravityStepUp;
        this.vspeed -= gravityStep;

        // On hitting ground
        if (this.findLowerLeftPoint().y >= this.onGroundY) {
            this.vspeed = 0;
            this.moveToY(this.onGroundY - constants.tileSize);
        }
    };

    runner.jump = function() {
        this.vspeed = constants.jumpStrength;
    };

    runner.findUpperLeftPoint = function() {
        return {
            x: this.findLeftmostPoint(),
            y: this.findHighestPoint()
        };
    };

    runner.findLowerLeftPoint = function() {
        return {
            x: this.findLeftmostPoint(),
            y: this.findLowestPoint()
        };
    };

    return runner;
};
