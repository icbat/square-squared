state_waiting = function(game) {
  return {
    create: function (game) {
      objects.obstacle.setTo(game.world.width + 20, constants.groundHeight - constants.tileSize, constants.tileSize, constants.tileSize);
      game.input.onTap.add(this.startRunning, this);
      var textStyle = {fill: colorPalette.accent, boundsAlignH: "center", boundsAlignV: "middle"};
      var text = game.add.text(game.world.centerX - 150, game.world.centerY, "Touch anywhere to jump", textStyle);
      text.setShadow(2, 2, colorPalette.dark);
    },

    render: function () {
      game.debug.geom(objects.runner, colorPalette.accent);
      game.debug.geom(objects.ground, colorPalette.dark);
    },

    startRunning: function() {
      game.state.start('running');
    }
  };
};
