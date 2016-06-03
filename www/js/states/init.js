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
            extendPolygon(ground, colorPalette.ground);
            objects.ground = ground;

            // Acute triangle
            var obstacleEasy = new Phaser.Polygon(
                new Phaser.Point(0, constants.groundHeight),
                new Phaser.Point(constants.tileSize, constants.groundHeight),
                new Phaser.Point(constants.tileSize, constants.groundHeight - constants.tileSize * (2 / 3))
            );
            extendPolygon(obstacleEasy, colorPalette.obstacleEasy);

            // Isosceles triangle
            var obstacleMedium = new Phaser.Polygon(
                new Phaser.Point(0, constants.groundHeight),
                new Phaser.Point(constants.tileSize, constants.groundHeight),
                new Phaser.Point(constants.tileSize / 2, constants.groundHeight - constants.tileSize)
            );
            extendPolygon(obstacleMedium, colorPalette.obstacleMedium);

            // Square the size of the runner
            var obstacleHard = new Phaser.Polygon(
                new Phaser.Point(0, constants.groundHeight),
                new Phaser.Point(0, constants.groundHeight - constants.tileSize),
                new Phaser.Point(constants.tileSize, constants.groundHeight - constants.tileSize),
                new Phaser.Point(constants.tileSize, constants.groundHeight)
            );
            extendPolygon(obstacleHard, colorPalette.obstacleHard);

            objects.obstacles = [obstacleEasy, obstacleMedium, obstacleHard];
        },

        create: function() {
            game.state.start('waiting');
        }
    };
};
