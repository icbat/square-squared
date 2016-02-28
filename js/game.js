var game = new Phaser.Game(800, 600, Phaser.AUTO);

game.constants = {
  tileSize: 64,
  maxJumpHeight: 200
};
game.objects = {};
game.colorPalette = {
  accent: '#22CC77',
  light: '#ddd',
  middle: '#888',
  dark: '#333'
};

states = {};

states.running = function(game) {};
states.running.prototype = {
  preload: function () {},

  create: function () {
    var groundHeight = game.world.height - game.constants.tileSize;
    game.stage.backgroundColor = game.colorPalette.light;

    game.objects.runner = new Phaser.Rectangle(game.world.centerX - game.constants.tileSize / 2, groundHeight - game.constants.tileSize, game.constants.tileSize, game.constants.tileSize);
    game.objects.ground = new Phaser.Rectangle(0, groundHeight, game.world.width, game.constants.tileSize);
    game.objects.obstacle = new Phaser.Rectangle(game.world.width - game.constants.tileSize - 20, groundHeight - game.constants.tileSize, game.constants.tileSize, game.constants.tileSize);

    game.input.onDown.add(this.onDown, this);
    game.input.onUp.add(this.onUp, this);
  },

  update: function () {
    game.objects.obstacle.x -= 2;
    if (game.objects.obstacle.x < -20) {
      game.objects.obstacle.x = game.world.width + 20;
    }
  },

  render: function () {
    game.debug.geom(game.objects.runner, game.colorPalette.accent);
    game.debug.geom(game.objects.ground, game.colorPalette.dark);

    game.debug.geom(game.objects.obstacle, game.colorPalette.middle);
  },

  onDown: function (pointer, mouseEvent) {
    if(mouseEvent.identifier === 0) {
      game.objects.runner.y -= game.constants.maxJumpHeight;
    }
  },

  onUp: function (pointer, mouseEvent) {
    // Prevents 'mouse leaving the game world' from firing this, too
    if(mouseEvent.identifier === 0 && pointer.identifier === 0) {
      game.objects.runner.y += game.constants.maxJumpHeight;
    }
  }
};

game.state.add('running', states.running);
game.state.start('running');
