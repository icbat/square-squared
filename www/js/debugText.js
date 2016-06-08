var debugText = [];

var enableDebugging = function(debugIsVisible) {
    // Remove potentially stale references
    var i;
    var text;
    for (i = 0; i < debugText.length; ++i) {
      text = debugText[i];
      text.destroy();
    }
    debugText = [];

    // Make them all
    var debugStyle = {
        fill: colorPalette.dark,
        fontSize: 16,
        boundsAlignH: "left",
        boundsAlignV: "top"
    };

    debugText.push(game.add.text(0, 0, "world " + game.world.height + "h x " + game.world.width + "w", debugStyle));

    // Set visibility
    for (i = 0; i < debugText.length; ++i) {
        text = debugText[i];
        text.visible = debugIsVisible;
    }
};
