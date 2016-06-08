var debugText = [];

var enableDebugging = function(debugIsVisible) {
    // Remove potentially stale references
    debugText = [];

    // Make them all
    var debugStyle = {
        fill: colorPalette.dark,
        fontSize: 16,
        boundsAlignH: "left",
        boundsAlignV: "top"
    };
    
    debugText.push(game.add.text(0, 0, "Height " + game.world.height, debugStyle));

    // Set visibility
    var i;
    for (i = 0; i < debugText.length; ++i) {
        var text = debugText[i];
        text.visible = debugIsVisible;
    }
};
