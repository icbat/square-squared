var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});

var TILE_SIZE = 64;

function preload() {
  console.log('preload');
  game.load.spritesheet('runner', 'assets/graphics/runner.png', TILE_SIZE, TILE_SIZE * 2);
}
function create() {
  console.log('create');
  game.add.sprite(0, 0, 'runner');
  game.stage.backgroundColor = "#eeeeee";
}
function update() {
}
