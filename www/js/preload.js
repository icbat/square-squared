var game = new Phaser.Game("100", "100", Phaser.AUTO);

var constants = {
    debugMode: false,
    tileSize: 64,
    minimumSpaceBetweenObstacles: 64 * 4,
    gravityStepUp: -0.5,
    gravityStepDown: -0.08,
    hspeed: -2.5,
    jumpStrength: -12
};
var objects = {};
var colorPalette = {
    runner: 0x22cc77,
    light: '#ddd',
    middle: '#888',
    ground: 0x333333,
    textShadow: '#333',
    text: '#39d',
    obstacleHard: 0xcc3322,
    obstacleMedium: 0xee7722,
    obstacleEasy: 0x8844aa
};
