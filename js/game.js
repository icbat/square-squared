var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update,
  render: render
});

var TILE_SIZE = 64;
var maxJumpHeight = 200;
var groundHeight;
var runner, ground, obstacle;
var colors = {
  green: '#22CC77',
  lightGrey: '#ddd',
  middleGrey: '#888',
  darkGrey: '#333'
};

function preload() {
  groundHeight = game.world.height - TILE_SIZE;
}

function create() {
  game.stage.backgroundColor = colors.lightGrey;

  runner = new Phaser.Rectangle(game.world.centerX - TILE_SIZE / 2, groundHeight - TILE_SIZE, TILE_SIZE, TILE_SIZE);
  ground = new Phaser.Rectangle(0, groundHeight, game.world.width, TILE_SIZE);
  obstacle = new Phaser.Rectangle(game.world.width, groundHeight - TILE_SIZE, TILE_SIZE, TILE_SIZE);

  game.input.onDown.add(onDown, this);
  game.input.onUp.add(onUp, this);
}

function update() {
}

function render() {
  game.debug.geom(runner, colors.green);
  game.debug.geom(ground, colors.darkGrey);

  game.debug.geom(obstacle, colors.middleGrey);
}

function onDown(pointer, mouseEvent) {
  if(mouseEvent.identifier === 0) {
    runner.y -= maxJumpHeight;
  }
}

function onUp(pointer, mouseEvent) {
  // Prevents 'mouse leaving the game world' from firing this, too
  if(mouseEvent.identifier === 0 && pointer.identifier === 0) {
    runner.y += maxJumpHeight;
  }
}
