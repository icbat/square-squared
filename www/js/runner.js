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
            this.setLowerLeftTo(this.findLeftmostPoint(), constants.groundHeight);
        }
    };

    runner.updateForDraw = function(chargeLevel) {
        if (chargeLevel > 0) {
            this.color = constants.chargeColors[chargeLevel];
        } else {
            this.color = colorPalette.runner;
        }
    };

    runner.canJump = function() {
        return this.findLowerLeftPoint().y > constants.groundHeight - 1;
    };

    runner.jump = function(dragY) {
        dragY = dragY || 0;
        var percentOfScreenDragged = percentOf(dragY, game.world.height);
        var level = chargeLevel(percentOfScreenDragged);
        var chargeEffect = constants.chargeEffects[level];
        this.vspeed = constants.jumpStrength * chargeEffect;
        lastJump = {
            dragY: dragY,
            percentOfScreenDragged: percentOfScreenDragged,
            chargeLevel: chargeLevel,
            chargeCoefficient: chargeEffect,
            jumpStrength: this.vspeed,
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
