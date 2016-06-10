var state_waiting = function(game) {
    return {
        create: function(game) {
            game.input.onTap.add(this.startRunning, this);
            var textStyle = {
                fill: colorPalette.text,
                boundsAlignH: "center",
                boundsAlignV: "middle"
            };
            var text = game.add.text(game.world.centerX, game.world.centerY, "(Placeholder instructions for Beta)\nSwipe up to jump\nLonger swipe = higher jumps", textStyle);
            text.anchor.set(0.5);
            text.setShadow(1, 1, colorPalette.textShadow);
            this.graphics = game.add.graphics(0, 0);
            objects.runner.draw(this.graphics);
            objects.ground.draw(this.graphics);
        },

        render: function() {
            drawDebugText(constants.debugMode);
        },

        startRunning: function(pointer) {
            if (pointer.worldX < constants.runnerSize && pointer.worldY < constants.runnerSize) {
                constants.debugMode = !constants.debugMode;
                game.debug.reset();
            } else {
                game.state.start('running');
            }
        }
    };
};
