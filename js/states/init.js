state_init = function(game) {
  return {
    preload: function() {
      game.stage.backgroundColor = colorPalette.light;

      constants.groundHeight = game.world.height - constants.tileSize;
      constants.runnerOnGround = constants.groundHeight - constants.tileSize;
      constants.centerX = game.world.centerX - constants.tileSize / 2;

      objects.runner = new Phaser.Rectangle(constants.centerX, constants.groundHeight - constants.tileSize, constants.tileSize, constants.tileSize);
      objects.runner.vspeed = 0;
      objects.ground = new Phaser.Rectangle(0, constants.groundHeight, game.world.width, constants.tileSize);
      objects.obstacle = new Phaser.Rectangle(game.world.width + 20, constants.groundHeight - constants.tileSize, constants.tileSize, constants.tileSize);
      objects.mediumObstacle = new Phaser.Polygon(new Phaser.Point(0, constants.groundHeight), new Phaser.Point(constants.tileSize, constants.groundHeight), new Phaser.Point(constants.tileSize / 2, constants.groundHeight - constants.tileSize));
    },

    create: function() {
      game.state.start('waiting');
    }
  };
};
