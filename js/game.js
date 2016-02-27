var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});

var TILE_SIZE = 64;
var runner;

function preload() {
  console.log('preload');
}
function create() {
  console.log('create');
  game.stage.backgroundColor = "#666";

  runner = new Phaser.Rectangle(game.world.centerX - TILE_SIZE /2, game.world.centerY - TILE_SIZE/2, TILE_SIZE, TILE_SIZE);
  game.debug.geom(runner,'#2ecc71');
}

function update() {
}
