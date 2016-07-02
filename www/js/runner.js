var runner = function(polygon, color) {
    var runner = new ExtendedPolygon(polygon, color);

    runner.onJump = new Phaser.Signal();
    runner.onLand.add(function() {
        objects.runner.color = Phaser.Color.hexToRGB(colorPalette.runner);
        game.camera.shake(0.01 * (gameState.lastJump.charge + 1), 100, true, Phaser.Camera.SHAKE_VERTICAL);

        objects.runner.landSquishTween = game.add.tween(objects.runner);
        objects.runner.landSquishTween.to({
            height: constants.runnerSize * 5/6
        }, 80, Phaser.Easing.Linear.Out);
        objects.runner.landSquishTween.yoyo(true);
        objects.runner.landSquishTween.start();
    });

    runner.updateBeforeDraw = function(charge, touchIsDown) {
        var targetHeight = constants.runnerSize;
        if (touchIsDown) {
            this.color = constants.chargeColors[charge];
            targetHeight = constants.chargeHeights[charge];
        }
        if (targetHeight !== this.height) {
            var newHeight = this.height + (targetHeight - this.height) * constants.motionTweenCoefficient;
            this.setHeight(newHeight);
        }

    };

    runner.jump = function(charge) {
        if (this.onGround() && gameState.state !== states.dying) {
            var chargeEffect = constants.chargeEffects[charge];
            this.vspeed = constants.jumpStrength * chargeEffect;
            this.onJump.dispatch(charge, chargeEffect, this.vspeed);
            var jumpSound = game.sound.play('jump', 0.3);
            jumpSound._sound.playbackRate.value = 2 - chargeEffect;
        }
    };

    runner.determineGravity = function() {
        return Math.abs(this.vspeed) < constants.gravityHoverThreshold ? constants.gravityHover : constants.gravity;
    };

    return runner;
};
