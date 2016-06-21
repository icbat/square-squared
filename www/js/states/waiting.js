var state_waiting = function(game) {
    return {
        create: function(game) {
            this.firstTouchY = -1;
            this.dragY = -1;
            this.graphics = game.add.graphics(0, 0);

            game.input.onDown.add(this.onDown, this);
            game.input.onUp.add(this.onUp, this);

            onJumpDebug(0, 0, 0);

            if (gameState.highScore && gameState.highScore > 0) {
                var textStyle = {
                    fill: colorPalette.text,
                    boundsAlignH: "center",
                    boundsAlignV: "middle"
                };
                objects.highScoreDisplay = game.add.text(constants.runnerSize / 2, constants.groundHeight + (constants.runnerSize / 2), "High Score: " + gameState.highScore, textStyle);
                objects.highScoreDisplay.anchor.y = 0.5;
                objects.highScoreDisplay.setShadow(1, 1, colorPalette.black);
            }
            // Put the jump line off screen
            objects.leftJumpLine.xPos = game.world.width / -2;
            objects.leftJumpLine.moveToX(game.world.width / -2);
            objects.rightJumpLine.xPos = game.world.width;
            objects.rightJumpLine.moveToX(game.world.width);

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
            var percent = percentOf(this.dragY, game.world.height);
            var charge = chargeLevel(percent);
            objects.runner.updateBeforeDraw(charge);
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
                if (this.firstTouchY === -1) {
                    if (pointer.worldX < constants.runnerSize && pointer.worldY < constants.runnerSize) {
                        constants.debugMode = !constants.debugMode;
                        game.debug.reset();
                    } else {
                        this.firstTouchY = pointer.worldY;
                    }
                    objects.dragLine.setLowerLeftTo(pointer.worldX, pointer.worldY);
                    objects.dragLine.visible = true;
                    objects.dragLine.setHeight(1);
                }
            }
        },

        onUp: function(pointer, mouseEvent) {
            // pointer.identifier === 0 Prevents 'mouse leaving the game world' from firing this, too
            if (mouseEvent.identifier === 0) {
                var charge = chargeLevel(percentOf(this.dragY, game.world.height));
                objects.runner.jump(charge);
                objects.dragLine.visible = false;
                this.firstTouchY = -1;
                this.dragY = -1;
                if (charge === 3) {
                    game.stateTransition.to('running');
                }
            }
        }
    };
};
