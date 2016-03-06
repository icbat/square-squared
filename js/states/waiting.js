state_waiting = function(game) {
  return {
    create: function () {
      objects.obstacle.setTo(game.world.width + 20, constants.groundHeight - constants.tileSize, constants.tileSize, constants.tileSize);
      game.input.onTap.add(this.startRunning, this);
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
