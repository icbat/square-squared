var runner = function(polygon, color) {
    var runner = new ExtendedPolygon(polygon, color);


    runner.onJump = new Phaser.Signal();

    runner.updateBeforeDraw = function(chargeLevel) {
        if (chargeLevel > 0) {
            this.color = constants.chargeColors[chargeLevel];
        } else {
            this.color = colorPalette.runner;
        }
        this.setHeight(constants.chargeHeights[chargeLevel]);
    };

    runner.onGround = function() {
        return this.findLowerLeftPoint().y > constants.groundHeight - 1;
    };

    runner.jump = function(chargeLevel) {
        if (this.onGround()) {
            var chargeEffect = constants.chargeEffects[chargeLevel];
            this.vspeed = constants.jumpStrength * chargeEffect;
            this.onJump.dispatch(chargeLevel, chargeEffect, this.vspeed);
        }
    };

    return runner;
};
