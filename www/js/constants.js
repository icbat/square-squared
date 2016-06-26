var objects = {};
var colorPalette = {
    debugColor: 'rgb(0,0,0)',
    black: "#000",
    runner: 0x22cc77,
    light: '#ddd',
    background: 0xdddddd,
    middle: '#888',
    ground: 0x333333,
    textShadow: '#333',
    text: '#39d',
    obstacleBig: 0xcc3322,
    obstacleMedium: 0xee7722,
    obstacleLow: 0x8844aa
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
    running: "RUNNING"
};

var onJumpDebug = function(chargeLevel, jumpCoefficient, initalSpeed) {
    gameState.lastJump = {
        chargeLevel: chargeLevel,
        jumpCoefficient: jumpCoefficient,
        initalSpeed: initalSpeed
    };
};

var constants = {
    debugMode: false,
    runnerSize: 64,
    gravityStepUp: -0.5,
    gravityStepDown: -0.08,
    hspeed: -2.5,
    jumpStrength: -15,
    motionTweenCoefficient: 0.3,
    timeOnDyingScreen: 1250,
    chargeLevels: [0, 10, 20],
    chargeEffects: [0.5, 0.75, 1],
    chargeHeights: [54, 49, 47],
    chargeColors: [colorPalette.obstacleLow, colorPalette.obstacleMedium, colorPalette.obstacleBig]
};

var chargeLevel = function(amount, screenTotal) {
    var percent = Math.floor(amount / screenTotal * 100);
    var chargeLevel;
    var i;
    for (i = constants.chargeLevels.length; i >= 0; --i) {
        if (percent >= constants.chargeLevels[i]) {
            return i;
        }
    }
    return 0;
};
