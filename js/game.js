var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});

var TILE_SIZE = 64;
var runner;

function preload() {
  console.log('preload');
  game.load.spritesheet('runner', 'assets/graphics/runner.png', TILE_SIZE, TILE_SIZE * 2);
}
function create() {
  console.log('create');
  game.stage.backgroundColor = "#eeeeee";

  runner = game.add.sprite(game.world.centerX, game.world.centerY, 'runner');
  runner.anchor.setTo(0.5, 0.5);
  var animation = runner.animations.add('run');
  runner.animations.play('run', 10, true);
}

function update() {
}
