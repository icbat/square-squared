var objects = {};
var colorPalette = {
    debugColor: 'rgb(0,0,0)',
    runner: 0x22cc77,
    light: '#ddd',
    middle: '#888',
    ground: 0x333333,
    textShadow: '#333',
    text: '#39d',
    obstacleBig: 0xcc3322,
    obstacleMedium: 0xee7722,
    obstacleLow: 0x8844aa
};

var constants = {
    debugMode: false,
    runnerSize: 64,
    gravityStepUp: -0.5,
    gravityStepDown: -0.08,
    hspeed: -2.5,
    jumpStrength: -15,
    chargeLevels: [0, 1, 10, 25],
    chargeEffects: [0, 0.5, 0.75, 1],
    chargeColors: [colorPalette.ground, colorPalette.obstacleLow, colorPalette.obstacleMedium, colorPalette.obstacleBig]
};

var percentOf = function(amount, total) {
    return Math.floor(amount / total * 100);
};

var fromPercent = function(percent, total) {
    return Math.floor(percent / 100 * total);
};

var chargeLevel = function(percent) {
    var chargeLevel;
    var i;
    for (i = constants.chargeLevels.length; i >= 0; --i) {
        if (percent >= constants.chargeLevels[i]) {
            return i;
        }
    }
    return 0;
};
