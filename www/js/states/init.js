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

            var mediumAcuteTriangle = {
                polygon: function() {
                    return new Phaser.Polygon(
                        new Phaser.Point(0, constants.groundHeight),
                        new Phaser.Point(constants.tileSize, constants.groundHeight),
                        new Phaser.Point(constants.tileSize, constants.groundHeight - constants.tileSize * (2 / 3))
                    );
                },
                minimumSpaceBehind: 150,
                color: colorPalette.obstacleEasy
            };

            var mediumIsoscelesTriangle = {
                polygon: function() {
                    return new Phaser.Polygon(
                        new Phaser.Point(0, constants.groundHeight),
                        new Phaser.Point(constants.tileSize, constants.groundHeight),
                        new Phaser.Point(constants.tileSize / 2, constants.groundHeight - constants.tileSize)
                    );
                },
                minimumSpaceBehind: 150,
                color: colorPalette.obstacleMedium
            };

            var hardSquareLikeRunner = {
                polygon: function() {
                    return new Phaser.Polygon(
                        new Phaser.Point(0, constants.groundHeight),
                        new Phaser.Point(0, constants.groundHeight - constants.tileSize),
                        new Phaser.Point(constants.tileSize, constants.groundHeight - constants.tileSize),
                        new Phaser.Point(constants.tileSize, constants.groundHeight)
                    );
                },
                minimumSpaceBehind: 200,
                color: colorPalette.obstacleHard
            };

            objects.polygonPrototypes = [mediumAcuteTriangle, mediumIsoscelesTriangle, hardSquareLikeRunner];
            objects.getRandomObstacle = function() {
                var index = Math.floor(Math.random() * (this.polygonPrototypes.length));
                var prototype = this.polygonPrototypes[index];
                return new Obstacle(new ExtendedPolygon(prototype.polygon(), prototype.color), prototype.minimumSpaceBehind);
            };

        },

        create: function() {
            game.state.start('waiting');
        }
    };
};
