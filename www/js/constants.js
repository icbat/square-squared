var objects = {};
var colorPalette = {
    runner: "#2c7",
    background: '#ddd',
    middle: '#888',
    ground: '#333',
    text: '#39d',
    obstacleBig: "#c32",
    obstacleMedium: "#e72",
    obstacleLow: "#84a"
};

var gameState = {
    lastJump: {
        chargeLevel: 0,
        jumpCoefficient: 0,
        initalSpeed: 0,
    },
    score: 0
};

var states = {
    waiting: "WAITING",
    running: "RUNNING",
    dying: "DYING"
};

var constants = {
    desiredFPS: 60,
    debugMode: false,
    runnerSize: 64,
    gravity: -0.4,
    gravityHover: -0.015,
    gravityHoverThreshold: 0.2,
    jumpStrength: -13,
    hspeed: -2.5,
    motionTweenCoefficient: 0.3,
    timeOnDyingScreen: 1250,
    chargeLevels: [-1, 0, 10, 20],
    chargeEffects: [0, 0.5, 0.75, 1],
    chargeHeights: [64, 54, 49, 47],
    chargeColors: [Phaser.Color.hexToRGB(colorPalette.runner), Phaser.Color.hexToRGB(colorPalette.obstacleLow), Phaser.Color.hexToRGB(colorPalette.obstacleMedium), Phaser.Color.hexToRGB(colorPalette.obstacleBig)]
};

var chargeLevel = function(amount, screenTotal) {
    var percent = Math.max(Math.floor(amount / screenTotal * 100), 0);
    var chargeLevel;
    var i;
    for (i = constants.chargeLevels.length; i >= 0; --i) {
        if (percent >= constants.chargeLevels[i]) {
            return i;
        }
    }
    return 0;
};
