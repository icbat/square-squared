state_running = function(game) {
  return {
    create: function () {
      game.input.onDown.add(this.onDown, this);
      game.input.onUp.add(this.onUp, this);
    },

    update: function () {
      this.applyGravity(objects.runner);

      objects.obstacle.x -= 2;
      if (objects.obstacle.x < -20) {
        objects.obstacle.x = game.world.width + 20;
      }
      if(objects.obstacle.intersects(objects.runner)) {
        game.state.start('waiting');
      }
    },

    applyGravity: function(object) {
      if (object.y < constants.runnerOnGround) {
        object.vspeed = Math.min(object.vspeed - 1, constants.maxGravityAcceleration);
      } else {
        object.vspeed = 0;
      }

      object.y = Math.min(object.y - object.vspeed, constants.runnerOnGround);
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
          objects.runner.y -= constants.maxJumpHeight;
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
