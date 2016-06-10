var lastJump = {
    dragY: 0,
    percentOfScreenDragged: 0,
    chargeLevel: 0,
    chargeCoefficient: 0,
    jumpStrength: 0,
};

var drawDebugText = function(shouldDraw) {
    if (shouldDraw) {
        var y = 0;
        var debugRowConstant = 16;
        game.debug.text("world " + game.world.height + "h x " + game.world.width + "w", 0, y += debugRowConstant, colorPalette.debugColor);
        game.debug.text("player height: " + (constants.groundHeight - objects.runner.findLowestPoint()), 0, y += debugRowConstant, colorPalette.debugColor);
        game.debug.text("player vspeed: " + objects.runner.vspeed, 0, y += debugRowConstant, colorPalette.debugColor);
        y += debugRowConstant;
        game.debug.text("Last Jump ", 0, y += debugRowConstant, colorPalette.debugColor);
        game.debug.text("Drag on Y " + lastJump.dragY, 0, y += debugRowConstant, colorPalette.debugColor);
        game.debug.text("% of screen dragged " + lastJump.percentOfScreenDragged, 0, y += debugRowConstant, colorPalette.debugColor);
        game.debug.text("Charge Level " + lastJump.chargeLevel, 0, y += debugRowConstant, colorPalette.debugColor);
        game.debug.text("Charge Coefficient " + lastJump.chargeCoefficient, 0, y += debugRowConstant, colorPalette.debugColor);
        game.debug.text("JumpStrength " + lastJump.jumpStrength, 0, y += debugRowConstant, colorPalette.debugColor);
        game.debug.pointer(game.input.activePointer, false, 'rgba(0,255,0,0.5)', 'rgba(255,0,0,0.5)', colorPalette.debugColor);
    }
};
