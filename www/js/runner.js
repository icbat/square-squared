var runner = function(polygon, color) {
    var runner = new ExtendedPolygon(polygon, color);

    runner.onJump = new Phaser.Signal();
    runner.onLand.add(function() {
        objects.runner.color = Phaser.Color.hexToRGB(colorPalette.runner);
        game.camera.shake(0.01, 100, true, Phaser.Camera.SHAKE_VERTICAL);
    });

    runner.updateBeforeDraw = function(chargeLevel, touchIsDown) {
        var targetHeight = constants.runnerSize;
        if (touchIsDown) {
            this.color = constants.chargeColors[chargeLevel];
            targetHeight = constants.chargeHeights[chargeLevel];
        }
        if (targetHeight !== this.height) {
            var newHeight = this.height + (targetHeight - this.height) * constants.motionTweenCoefficient;
            this.setHeight(newHeight);
        }

    };

    runner.jump = function(chargeLevel) {
        if (this.onGround() && gameState.state !== states.dying) {
            var chargeEffect = constants.chargeEffects[chargeLevel];
            this.vspeed = constants.jumpStrength * chargeEffect;
            this.onJump.dispatch(chargeLevel, chargeEffect, this.vspeed);
            var jumpSound = game.sound.play('jump', 0.3);
            jumpSound._sound.playbackRate.value = 2 - chargeEffect;
        }
    };

    runner.determineGravity = function() {
        return Math.abs(this.vspeed) < constants.gravityHoverThreshold ? constants.gravityHover : constants.gravity;
    };

    return runner;
};
