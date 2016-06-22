var lastGeneratedObstacle = {
    generatedAt: null,
    lastMinimum: null,
    lastName: null
};

var onObstacleAddedDebug = function(newX, lastObstacle) {
    lastGeneratedObstacle = {
        generatedAt: newX,
        lastMinimum: lastObstacle ? lastObstacle.minimumSpaceBehind : 0,
        lastName: lastObstacle ? lastObstacle.name : null
    };
};

var setupDebugging = function() {
    objects.runner.onJump.add(onJumpDebug);
    obstacleGenerator.onObstacleAdded.add(onObstacleAddedDebug);
};

var drawDebugText = function(shouldDraw) {
    if (shouldDraw) {
        game.time.advancedTiming = true;
        var row = 1;
        var rowHeight = 16;
        game.debug.text("FPS " + game.time.fps + " (" + game.time.fpsMax + ")", 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("world " + game.world.height + "h x " + game.world.width + "w", 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("player off ground: " + (constants.groundHeight - objects.runner.findLowestPoint()), 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("player height: " + objects.runner.findHeight(), 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("player vspeed: " + objects.runner.vspeed, 0, row++ * rowHeight, colorPalette.debugColor);
        row++;
        game.debug.text("last distance between: " + (lastGeneratedObstacle.generatedAt - game.world.width), 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("minimum distance behind: " + lastGeneratedObstacle.lastMinimum + "(" + lastGeneratedObstacle.lastName + ")", 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("distance from score: " + calculateDifficultyModifier(gameState.score), 0, row++ * rowHeight, colorPalette.debugColor);
        var obstacles = objects.obstacles ? objects.obstacles.length : 0;
        game.debug.text("obstacles in memory: " + obstacles, 0, row++ * rowHeight, colorPalette.debugColor);
        row++;
        game.debug.text("Last Jump ", 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("Charge Level " + gameState.lastJump.chargeLevel, 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("Charge Coefficient " + gameState.lastJump.jumpCoefficient, 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("JumpStrength " + gameState.lastJump.initalSpeed, 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.pointer(game.input.activePointer, false, 'rgba(0,255,0,0.5)', 'rgba(255,0,0,0.5)', colorPalette.debugColor);
    } else {
      game.time.advancedTiming = false;
    }
};
