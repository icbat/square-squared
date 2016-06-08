var debugText = [];
var debugging = function(debugIsVisible) {
  console.log("Should show", debugText.length, debugIsVisible);
    var i;
    for (i = 0; i < debugText.length; ++i) {
        var text = debugText[i];
        text.visible = debugIsVisible;
    }
};

var state_init = function(game) {
    return {
        preload: function() {
            game.stage.backgroundColor = colorPalette.light;

            constants.groundHeight = game.world.height - constants.tileSize;

            var runnerPolygon = new Phaser.Polygon(
                new Phaser.Point(0, constants.groundHeight),
                new Phaser.Point(0, constants.groundHeight - constants.tileSize),
                new Phaser.Point(constants.tileSize, constants.groundHeight - constants.tileSize),
                new Phaser.Point(constants.tileSize, constants.groundHeight)
            );
            objects.runner = runner(runnerPolygon, colorPalette.runner, constants.groundHeight);
            objects.runner.moveToX(game.world.centerX - constants.tileSize / 2);

            var ground = new Phaser.Polygon(
                new Phaser.Point(0, game.world.height),
                new Phaser.Point(0, game.world.height - constants.tileSize),
                new Phaser.Point(game.world.width, game.world.height - constants.tileSize),
                new Phaser.Point(game.world.width, game.world.height)
            );
            objects.ground = new ExtendedPolygon(ground, colorPalette.ground);

            // Acute triangle
            var obstacleEasy = {
                polygon: function() {
                    return new Phaser.Polygon(
                        new Phaser.Point(0, constants.groundHeight),
                        new Phaser.Point(constants.tileSize, constants.groundHeight),
                        new Phaser.Point(constants.tileSize, constants.groundHeight - constants.tileSize * (2 / 3))
                    );
                },
                color: colorPalette.obstacleEasy
            };

            // Isosceles triangle
            var obstacleMedium = {
                polygon: function() {
                    return new Phaser.Polygon(
                        new Phaser.Point(0, constants.groundHeight),
                        new Phaser.Point(constants.tileSize, constants.groundHeight),
                        new Phaser.Point(constants.tileSize / 2, constants.groundHeight - constants.tileSize)
                    );
                },
                color: colorPalette.obstacleMedium
            };

            // Square the size of the runner
            var obstacleHard = {
                polygon: function() {
                    return new Phaser.Polygon(
                        new Phaser.Point(0, constants.groundHeight),
                        new Phaser.Point(0, constants.groundHeight - constants.tileSize),
                        new Phaser.Point(constants.tileSize, constants.groundHeight - constants.tileSize),
                        new Phaser.Point(constants.tileSize, constants.groundHeight)
                    );
                },
                color: colorPalette.obstacleHard
            };

            objects.polygonPrototypes = [obstacleEasy, obstacleMedium, obstacleHard];
            objects.getRandomObstacle = function() {
                var index = Math.floor(Math.random() * (this.polygonPrototypes.length));
                var prototype = this.polygonPrototypes[index];
                return new ExtendedPolygon(prototype.polygon(), prototype.color);
            };


            var debugStyle = {
                fill: colorPalette.text,
                backgroundColor: colorPalette.dark,
                boundsAlignH: "left",
                boundsAlignV: "top"
            };

            debugText.push(game.add.text(0, 0, "Height " + game.world.height, debugStyle));


            debugging(constants.debugMode);
        },

        create: function() {
            game.state.start('waiting');
        }
    };
};
