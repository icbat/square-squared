var game = new Phaser.Game(800, 600, Phaser.AUTO);

constants = {
  tileSize: 64,
  maxJumpHeight: 200
};
objects = {};
colorPalette = {
  accent: '#22CC77',
  light: '#ddd',
  middle: '#888',
  dark: '#333'
};

states = {};

states.running = {
  preload: function () {},

  create: function () {
    var groundHeight = game.world.height - constants.tileSize;
    game.stage.backgroundColor = colorPalette.light;

    objects.runner = new Phaser.Rectangle(game.world.centerX - constants.tileSize / 2, groundHeight - constants.tileSize, constants.tileSize, constants.tileSize);
    objects.ground = new Phaser.Rectangle(0, groundHeight, game.world.width, constants.tileSize);
    objects.obstacle = new Phaser.Rectangle(game.world.width + 20, groundHeight - constants.tileSize, constants.tileSize, constants.tileSize);

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

states.waiting = {
  preload: function () {},

  create: function () {
    var groundHeight = game.world.height - constants.tileSize;
    game.stage.backgroundColor = colorPalette.light;

    objects.runner = new Phaser.Rectangle(game.world.centerX - constants.tileSize / 2, groundHeight - constants.tileSize, constants.tileSize, constants.tileSize);
    objects.ground = new Phaser.Rectangle(0, groundHeight, game.world.width, constants.tileSize);

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

game.state.add('running', states.running);
game.state.add('waiting', states.waiting);
game.state.start('waiting');
