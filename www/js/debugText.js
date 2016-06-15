var lastJump = {
    dragY: 0,
    percentOfScreenDragged: 0,
    chargeLevel: 0,
    chargeCoefficient: 0,
    jumpStrength: 0,
};

var drawDebugText = function(shouldDraw) {
    if (shouldDraw) {
        var row = 1;
        var rowHeight = 16;
        game.debug.text("world " + game.world.height + "h x " + game.world.width + "w", 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("player height: " + (constants.groundHeight - objects.runner.findLowestPoint()), 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("player vspeed: " + objects.runner.vspeed, 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("extra spacing based on score: " + calculateDifficultyModifier(game.score), 0, row++ * rowHeight, colorPalette.debugColor);
        row++;
        game.debug.text("Last Jump ", 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("Drag on Y " + lastJump.dragY, 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("% of screen dragged " + lastJump.percentOfScreenDragged, 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("Charge Level " + lastJump.chargeLevel, 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("Charge Coefficient " + lastJump.chargeCoefficient, 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.text("JumpStrength " + lastJump.jumpStrength, 0, row++ * rowHeight, colorPalette.debugColor);
        game.debug.pointer(game.input.activePointer, false, 'rgba(0,255,0,0.5)', 'rgba(255,0,0,0.5)', colorPalette.debugColor);
    }
};
