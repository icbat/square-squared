var state_waiting = function(game) {
    return {
        create: function(game) {
            this.firstTouchY = -1;
            this.dragY = -1;
            this.graphics = game.add.graphics(0, 0);

            game.input.onDown.add(this.onDown, this);
            game.input.onUp.add(this.onUp, this);

            onJumpDebug(0,0,0);

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
            var initY = constants.groundHeight - 200;
            var lineThickness = 2;
            var tinyLine = new Phaser.Polygon(
                new Phaser.Point(0, initY),
                new Phaser.Point(game.world.width, initY),
                new Phaser.Point(game.world.width, initY + lineThickness),
                new Phaser.Point(0, initY + lineThickness)
            );
            this.atLeastThisTallLine = new ExtendedPolygon(tinyLine, colorPalette.ground);
        },

        render: function() {
            this.graphics.clear();
            this.atLeastThisTallLine.draw(this.graphics);
            objects.runner.draw(this.graphics);
            objects.ground.draw(this.graphics);
            drawDebugText(constants.debugMode);
        },

        update: function() {
            objects.runner.applyGravity();
            this.dragY = this.firstTouchY - game.input.activePointer.worldY;
            var percent = percentOf(this.dragY, game.world.height);
            var charge = chargeLevel(percent);
            objects.runner.updateBeforeDraw(charge);
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
                }
            }
        },

        onUp: function(pointer, mouseEvent) {
            // pointer.identifier === 0 Prevents 'mouse leaving the game world' from firing this, too
            if (mouseEvent.identifier === 0) {
                var charge = chargeLevel(percentOf(this.dragY, game.world.height));
                objects.runner.jump(charge);
                this.firstTouchY = -1;
                this.dragY = -1;
                if (charge === 3) {
                  game.stateTransition.to('running');
                }
            }
        }
    };
};
