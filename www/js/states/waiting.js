var state_waiting = function(game) {
    return {
        create: function(game) {
            this.firstTouchY = null;
            this.dragY = null;
            this.graphics = game.add.graphics(0, 0);

            game.input.onDown.add(this.onDown, this);
            game.input.onUp.add(this.onUp, this);
            game.input.onUp.add(function() {
                if (objects.runner.onGround() && objects.runner.vspeed === 0) {
                    objects.runner.color = colorPalette.runner;
                }
            });

            onJumpDebug(0, 0, 0);
            var highScore = localStorage.getItem('squareSquared-highScore');
            if (highScore && highScore > 0) {
                var textStyle = {
                    fill: colorPalette.text,
                    boundsAlignH: "center",
                    boundsAlignV: "middle"
                };
                objects.highScoreDisplay = game.add.text(constants.runnerSize / 2, constants.groundHeight + (constants.runnerSize / 2), "High Score: " + highScore, textStyle);
                objects.highScoreDisplay.anchor.y = 0.5;
                objects.highScoreDisplay.setShadow(1, 1, colorPalette.black);
            }

            game.add.bitmapText(Math.max(game.world.centerX - 150, 0), 75, 'titleGreen', 'Square', 64);
            game.add.bitmapText(game.world.centerX - 75, 25, 'titlePurple', 'Squared', 64);

            var leftTween = game.add.tween(objects.leftJumpLine);
            leftTween.to({
                xPos: 0
            }, 1000, Phaser.Easing.Bounce.Out);
            leftTween.start();

            var rightTween = game.add.tween(objects.rightJumpLine);
            rightTween.to({
                xPos: game.world.width / 2
            }, 1000, Phaser.Easing.Bounce.Out);
            rightTween.start();
        },

        update: function() {
            objects.runner.applyGravity();
            this.dragY = this.firstTouchY - game.input.activePointer.worldY;
            var touchIsDown = this.firstTouchY !== null;
            var charge = chargeLevel(this.dragY, game.world.height, touchIsDown);
            objects.runner.updateBeforeDraw(charge, touchIsDown);
            objects.leftJumpLine.moveToX(objects.leftJumpLine.xPos);
            objects.rightJumpLine.moveToX(objects.rightJumpLine.xPos);
            if (this.dragY > 0) {
                objects.dragLine.setHeight(this.dragY);
            }
            objects.dragLine.color = constants.chargeColors[charge];
        },

        render: function() {
            this.graphics.clear();
            objects.leftJumpLine.draw(this.graphics);
            objects.rightJumpLine.draw(this.graphics);
            objects.runner.draw(this.graphics);
            objects.ground.draw(this.graphics);
            drawDebugText(constants.debugMode);
            objects.dragLine.draw(this.graphics);
        },

        onDown: function(pointer, mouseEvent) {
            if (mouseEvent.identifier === 0) {
                if (this.firstTouchY === null) {
                    this.firstTouchY = pointer.worldY;
                    objects.dragLine.setLowerLeftTo(pointer.worldX + constants.runnerSize / 2, pointer.worldY);
                    objects.dragLine.visible = true;
                    objects.dragLine.setHeight(1);
                }
            }
        },

        onUp: function(pointer, mouseEvent) {
            // pointer.identifier === 0 Prevents 'mouse leaving the game world' from firing this, too
            if (mouseEvent.identifier === 0) {
                var charge = chargeLevel(this.dragY, game.world.height, false);
                objects.runner.jump(charge);
                this.firstTouchY = null;
                this.dragY = null;
                objects.dragLine.visible = false;
                if (charge === constants.chargeLevels.length - 1) {
                    game.stateTransition.to('running');
                }
            }
        }
    };
};
