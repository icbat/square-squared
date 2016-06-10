var game = new Phaser.Game("100", "100", Phaser.AUTO);

var constants = {
    debugMode: false,
    runnerSize: 64,
    gravityStepUp: -0.5,
    gravityStepDown: -0.08,
    hspeed: -2.5,
    jumpStrength: -15
};
var objects = {};
var colorPalette = {
    debugColor: 'rgb(0,0,0)',
    runner: 0x22cc77,
    outline: 0x000000,
    light: '#ddd',
    middle: '#888',
    ground: 0x333333,
    textShadow: '#333',
    text: '#39d',
    obstacleBig: 0xcc3322,
    obstacleMedium: 0xee7722,
    obstacleLow: 0x8844aa
};

var percentOfScreenHeight = function(amount) {
  return Math.floor(amount / game.world.height * 100);
};
