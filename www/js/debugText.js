var lastJump = {
    chargeLevel: 0,
    jumpCoefficient: 0,
    initalSpeed: 0,
};

var lastGeneratedObstacle = {
    generatedAt: null,
    lastMinimum: null,
    lastName: null
};

var onJumpDebug = function(chargeLevel, jumpCoefficient, initalSpeed) {
    lastJump = {
        chargeLevel: chargeLevel,
        jumpCoefficient: jumpCoefficient,
        initalSpeed: initalSpeed
    };
};

var setupDebugging = function() {
    objects.runner.onJump.add(onJumpDebug);
};

var drawDebugText = function(shouldDraw) {
    if (shouldDraw) {
        var row = 1;
        var rowHeight = 16;
        game.debug.text("world " + game.world.height + "h x " + game.world.width + "w", 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("player height: " + (constants.groundHeight - objects.runner.findLowestPoint()), 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("player vspeed: " + objects.runner.vspeed, 0, row++ * rowHeight, colorPalette.debugColor);
        row++;
        game.debug.text("last distance between: " + (lastGeneratedObstacle.generatedAt - game.world.width), 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("minimum distance behind: " + lastGeneratedObstacle.lastMinimum + "(" + lastGeneratedObstacle.lastName + ")", 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("distance from score: " + calculateDifficultyModifier(game.score), 0, row++ * rowHeight, colorPalette.debugColor);
        var obstacles = objects.obstacles ? objects.obstacles.length : 0;
        game.debug.text("obstacles in memory: " + obstacles, 0, row++ * rowHeight, colorPalette.debugColor);
        row++;
        game.debug.text("Last Jump ", 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("Charge Level " + lastJump.chargeLevel, 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("Charge Coefficient " + lastJump.jumpCoefficient, 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("JumpStrength " + lastJump.initalSpeed, 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.pointer(game.input.activePointer, false, 'rgba(0,255,0,0.5)', 'rgba(255,0,0,0.5)', colorPalette.debugColor);
    }
};
