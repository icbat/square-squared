var game = new Phaser.Game("100", "100", Phaser.AUTO);

var constants = {
    tileSize: 64,
    gravityStepUp: -0.5,
    gravityStepDown: -0.08,
    hspeed: -2.5,
    jumpStrength: -12
};
var objects = {};
var colorPalette = {
    runner: '#2C7',
    light: '#ddd',
    middle: '#888',
    dark: '#333',
    text: '#39d',
    obstacleHard: 0xcc3322,
    obstacleMedium: 0xee7722,
    obstacleEasy: 0xffcc00
};
