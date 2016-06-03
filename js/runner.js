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

    runner.moveToY = function(destinationY) {
        var points = this.toNumberArray();
        var index;
        var minY = this.findHighestPoint();

        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 1) {
                // minY is necessary to adjust for the size of the this
                points[index] += destinationY - minY;
            }
        }

        this.setTo(points);
    };

    runner.moveByY = function(amountY) {
        var points = this.toNumberArray();
        var index;
        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 1) {
                points[index] += amountY;
            }
        }
        this.setTo(points);
    };

    runner.findHighestPoint = function() {
        var points = this.toNumberArray();
        var minY = 99999;
        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 1) {
                minY = Math.min(points[index], minY);
            }
        }
        if (minY == 99999) {
            throw "Polygon was too far off the screen, unsure how you got here, but congratulations; file a bug.";
        }
        return minY;
    };

    runner.findLowestPoint = function() {
        var points = this.toNumberArray();
        var maxY = -99999;
        var index;
        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 1) {
                maxY = Math.max(points[index], maxY);
            }
        }
        if (maxY == -99999) {
            throw "Polygon was too far off the screen, unsure how you got here, but congratulations; file a bug.";
        }
        return maxY;
    };


    return runner;
};
