var runner = function(polygon, color) {
    var runner = new ExtendedPolygon(polygon, color);

    runner.onJump = new Phaser.Signal();

    runner.updateBeforeDraw = function(chargeLevel) {
        if (chargeLevel > 0) {
            this.color = constants.chargeColors[chargeLevel];
        } else if (this.onGround() && this.vspeed === 0) {
            this.color = colorPalette.runner;
        }
        var targetHeight = constants.chargeHeights[chargeLevel];
        if (targetHeight !== this.height) {
            var newHeight = this.height + (targetHeight - this.height) * constants.motionTweenCoefficient;
            this.setHeight(newHeight);
        }
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
