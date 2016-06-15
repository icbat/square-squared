var state_waiting = function(game) {
    return {
        create: function(game) {
            this.firstTouchY = -1;
            this.dragY = -1;
            this.graphics = game.add.graphics(0, 0);

            game.input.onDown.add(this.onDown, this);
            game.input.onUp.add(this.onUp, this);

            var startArrowPoly = new Phaser.Polygon(
                new Phaser.Point(0, constants.groundHeight),
                new Phaser.Point(constants.runnerSize / 2, constants.groundHeight),
                new Phaser.Point(constants.runnerSize / 4, constants.groundHeight - constants.runnerSize / 2)
            );

            this.startArrow = new ExtendedPolygon(startArrowPoly, colorPalette.obstacleLow);
            this.startArrow.setLowerLeftTo(constants.runnerSize, constants.groundHeight - constants.runnerSize);
        },

        render: function() {
            this.graphics.clear();

            this.startArrow.draw(this.graphics);

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
