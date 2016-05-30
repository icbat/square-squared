state_running = function(game) {
  return {
    create: function () {
      game.input.onDown.add(this.onDown, this);
      game.input.onUp.add(this.onUp, this);
      game.score = 0;
    },

    update: function (game) {
      this.applyGravity(objects.runner);

      objects.obstacle.x += constants.hspeed;
      if (objects.obstacle.x < -constants.tileSize) {
        objects.obstacle.x = game.world.width + 20;
      }

      if(objects.obstacle.intersects(objects.runner)) {
        // Game over
        game.state.start('waiting');
      }

      if (Math.round(objects.obstacle.x + objects.obstacle.width) == objects.runner.x - 1) {
        ++game.score;
        objects.scoreDisplay.text = (game.score);
      }
    },

    applyGravity: function(object) {
      object.y += object.vspeed;
      var gravityStep = object.vspeed > 0 ? constants.gravityStepDown : constants.gravityStepUp;
      object.vspeed -= gravityStep;

      // On hitting ground
      if (object.y >= constants.runnerOnGround) {
        object.vspeed = 0;
        object.y = constants.runnerOnGround;
      }
    },

    render: function () {
      game.debug.geom(objects.runner, colorPalette.accent);
      game.debug.geom(objects.ground, colorPalette.dark);
      game.debug.geom(objects.obstacle, colorPalette.middle);
    },

    canJump: function(runner) {
      return runner.y === constants.runnerOnGround;
    },

    onDown: function (pointer, mouseEvent) {
      if(mouseEvent.identifier === 0) {
        if (this.canJump(objects.runner)) {
          objects.runner.vspeed = constants.jumpStrength;
        }
      }
    },

    onUp: function (pointer, mouseEvent) {
      // Prevents 'mouse leaving the game world' from firing this, too
      if(mouseEvent.identifier === 0 && pointer.identifier === 0) {
      }
    }
  };
};
