var state_waiting = function(game) {
    return {
        create: function(game) {
            game.input.onTap.add(this.startRunning, this);
            var textStyle = {
                fill: colorPalette.text,
                boundsAlignH: "center",
                boundsAlignV: "middle"
            };
            var text = game.add.text(game.world.centerX, game.world.centerY, "Touch anywhere to jump", textStyle);
            text.anchor.set(0.5);
            text.setShadow(1, 1, colorPalette.textShadow);
            this.graphics = game.add.graphics(0, 0);
        },

        render: function() {
            objects.runner.draw(this.graphics);
            objects.ground.draw(this.graphics);
        },

        startRunning: function() {
            game.state.start('running');
        }
    };
};
