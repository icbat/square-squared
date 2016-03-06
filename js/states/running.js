state_running = function(game) {
  return {
    create: function () {
      game.input.onDown.add(this.onDown, this);
      game.input.onUp.add(this.onUp, this);
    },

    update: function () {
      objects.obstacle.x -= 2;
      if (objects.obstacle.x < -20) {
        objects.obstacle.x = game.world.width + 20;
      }
      if(objects.obstacle.intersects(objects.runner)) {
        game.state.start('waiting');
      }
    },

    render: function () {
      game.debug.geom(objects.runner, colorPalette.accent);
      game.debug.geom(objects.ground, colorPalette.dark);
      game.debug.geom(objects.obstacle, colorPalette.middle);
    },

    onDown: function (pointer, mouseEvent) {
      if(mouseEvent.identifier === 0) {
        objects.runner.y -= constants.maxJumpHeight;
      }
    },

    onUp: function (pointer, mouseEvent) {
      // Prevents 'mouse leaving the game world' from firing this, too
      if(mouseEvent.identifier === 0 && pointer.identifier === 0) {
        objects.runner.y += constants.maxJumpHeight;
      }
    }
  };
};
