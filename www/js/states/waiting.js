var state_waiting = function(game) {
    return {
        create: function(game) {
            this.firstTouchY = -1;
            this.dragY = -1;
            this.graphics = game.add.graphics(0, 0);

            game.input.onDown.add(this.onDown, this);
            game.input.onUp.add(this.onUp, this);

            var arrowPoly = new Phaser.Polygon(
                new Phaser.Point(0, constants.groundHeight),
                new Phaser.Point(constants.runnerSize / 2, constants.groundHeight),
                new Phaser.Point(constants.runnerSize / 4, constants.groundHeight - constants.runnerSize / 2)
            );

            this.startArrow = new ExtendedPolygon(arrowPoly, colorPalette.obstacleLow);
            this.startArrow.setLowerLeftTo(constants.runnerSize, constants.groundHeight - constants.runnerSize * 2);

            var targetCenterX = constants.runnerSize + constants.runnerSize / 4;
            var targetCenterY = constants.groundHeight - constants.runnerSize;
            this.targetBack = new Phaser.Circle(targetCenterX, targetCenterY, constants.runnerSize);
            this.targetOuterBlank = new Phaser.Circle(targetCenterX, targetCenterY, constants.runnerSize - 10);
            this.targetMiddleRed = new Phaser.Circle(targetCenterX, targetCenterY, constants.runnerSize - 20);
            this.targetMiddleBlank = new Phaser.Circle(targetCenterX, targetCenterY, constants.runnerSize - 30);
            this.targetInnerRed = new Phaser.Circle(targetCenterX, targetCenterY, constants.runnerSize - 40);
            this.targetInnerBlank = new Phaser.Circle(targetCenterX, targetCenterY, constants.runnerSize - 50);

        },

        render: function() {
            this.graphics.clear();

            if (this.firstTouchY < 0) {
                this.graphics.beginFill(colorPalette.obstacleBig);
                this.graphics.drawShape(this.targetBack);
                this.graphics.endFill();

                this.graphics.beginFill(colorPalette.background);
                this.graphics.drawShape(this.targetOuterBlank);
                this.graphics.endFill();

                this.graphics.beginFill(colorPalette.obstacleBig);
                this.graphics.drawShape(this.targetMiddleRed);
                this.graphics.endFill();

                this.graphics.beginFill(colorPalette.background);
                this.graphics.drawShape(this.targetMiddleBlank);
                this.graphics.endFill();

                this.graphics.beginFill(colorPalette.obstacleBig);
                this.graphics.drawShape(this.targetInnerRed);
                this.graphics.endFill();

                this.graphics.beginFill(colorPalette.background);
                this.graphics.drawShape(this.targetInnerBlank);
                this.graphics.endFill();
            } else {
                this.startArrow.draw(this.graphics);
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
                    game.state.start('running');
                }
                this.firstTouchY = -1;
                this.dragY = -1;


            }
        }
    };
};
