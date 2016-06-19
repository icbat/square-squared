var state_waiting = function(game) {
    return {
        create: function(game) {
            this.firstTouchY = -1;
            this.dragY = -1;
            this.graphics = game.add.graphics(0, 0);

            game.input.onDown.add(this.onDown, this);
            game.input.onUp.add(this.onUp, this);

            this.lowArrow = new ExtendedPolygon(this.makeArrow(), colorPalette.obstacleLow);
            this.lowArrow.setLowerLeftTo(constants.runnerSize, constants.groundHeight - constants.runnerSize * 2);

            this.medArrow = new ExtendedPolygon(this.makeArrow(), colorPalette.obstacleMedium);
            this.medArrow.setLowerLeftTo(constants.runnerSize, constants.groundHeight - constants.runnerSize * 3.5);

            this.highArrow = new ExtendedPolygon(this.makeArrow(), colorPalette.obstacleBig);
            this.highArrow.setLowerLeftTo(constants.runnerSize, constants.groundHeight - constants.runnerSize * 5);

            var targetCenterX = constants.runnerSize + constants.runnerSize / 4;
            var targetCenterY = constants.groundHeight - constants.runnerSize;
            this.targetBack = new Phaser.Circle(targetCenterX, targetCenterY, constants.runnerSize);
            this.targetOuterBlank = new Phaser.Circle(targetCenterX, targetCenterY, constants.runnerSize - 10);
            this.targetMiddleRed = new Phaser.Circle(targetCenterX, targetCenterY, constants.runnerSize - 20);
            this.targetMiddleBlank = new Phaser.Circle(targetCenterX, targetCenterY, constants.runnerSize - 30);
            this.targetInnerRed = new Phaser.Circle(targetCenterX, targetCenterY, constants.runnerSize - 40);
            this.targetInnerBlank = new Phaser.Circle(targetCenterX, targetCenterY, constants.runnerSize - 50);

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
        },

        makeArrow: function() {
            return new Phaser.Polygon(
                new Phaser.Point(0, constants.groundHeight),
                new Phaser.Point(constants.runnerSize / 2, constants.groundHeight),
                new Phaser.Point(constants.runnerSize / 4, constants.groundHeight - constants.runnerSize / 2)
            );
        },

        render: function() {
            this.graphics.clear();

            if (this.firstTouchY < 0) {
                var x = 2000;
                if (game.time.time % x > x * 2 / 3) {
                    this.graphics.beginFill(colorPalette.obstacleBig);
                    this.graphics.drawShape(this.targetBack);
                    this.graphics.endFill();

                    this.graphics.beginFill(colorPalette.background);
                    this.graphics.drawShape(this.targetOuterBlank);
                    this.graphics.endFill();
                }

                if (game.time.time % x > x / 3) {
                    this.graphics.beginFill(colorPalette.obstacleBig);
                    this.graphics.drawShape(this.targetMiddleRed);
                    this.graphics.endFill();

                    this.graphics.beginFill(colorPalette.background);
                    this.graphics.drawShape(this.targetMiddleBlank);
                    this.graphics.endFill();
                }

                this.graphics.beginFill(colorPalette.obstacleBig);
                this.graphics.drawShape(this.targetInnerRed);
                this.graphics.endFill();

                this.graphics.beginFill(colorPalette.background);
                this.graphics.drawShape(this.targetInnerBlank);
                this.graphics.endFill();
            } else {
                var charge = chargeLevel(percentOf(this.dragY, game.world.height));
                if (charge === 3) {
                    this.highArrow.draw(this.graphics);
                } else if (charge === 2) {
                    this.medArrow.draw(this.graphics);
                } else {
                    this.lowArrow.draw(this.graphics);
                }
            }

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
                if (charge === 3) {
                    game.stateTransition.to('running');
                }
                this.firstTouchY = -1;
                this.dragY = -1;


            }
        }
    };
};
