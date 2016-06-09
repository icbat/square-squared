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
            enableDebugging(constants.debugMode);
            updateDebugTextForRunner(objects.runner, constants.debugMode);
            objects.runner.draw(this.graphics);
            objects.ground.draw(this.graphics);
        },

        startRunning: function(pointer, isDoubleTap) {
            if (pointer.worldX < constants.tileSize && pointer.worldY < constants.tileSize) {
                constants.debugMode = !constants.debugMode;
                console.log("Debug mode", constants.debugMode);
                enableDebugging(constants.debugMode);
            } else {
                game.state.start('running');
            }
        }
    };
};
