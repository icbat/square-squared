var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update,
  render: render
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

  game.input.onDown.add(onDown, this);
  game.input.onUp.add(onUp, this);
}

function update() {
}

function render() {
  game.debug.geom(runner,'#2ecc71');
}

function onDown(pointer, mouseEvent) {
  if(mouseEvent.identifier === 0) {
    console.log('down');
    runner.y -= 100;
    console.log(runner.y);
  }
}

function onUp(pointer, mouseEvent) {
  // Prevents 'mouse leaving the game world' from firing this, too
  if(mouseEvent.identifier === 0 && pointer.identifier === 0) {
    console.log('up', pointer);
    runner.y += 100;
    console.log(runner.y);
  }
}
