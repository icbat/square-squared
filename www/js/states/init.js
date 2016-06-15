var state_init = function(game) {
    return {
        preload: function() {
            game.stage.backgroundColor = colorPalette.light;

            constants.groundHeight = game.world.height - constants.runnerSize;

            var runnerPolygon = new Phaser.Polygon(
                new Phaser.Point(0, constants.groundHeight),
                new Phaser.Point(0, constants.groundHeight - constants.runnerSize),
                new Phaser.Point(constants.runnerSize, constants.groundHeight - constants.runnerSize),
                new Phaser.Point(constants.runnerSize, constants.groundHeight)
            );
            objects.runner = runner(runnerPolygon, colorPalette.runner, constants.groundHeight);
            objects.runner.moveToX(game.world.centerX - constants.runnerSize / 2);

            var ground = new Phaser.Polygon(
                new Phaser.Point(0, game.world.height),
                new Phaser.Point(0, game.world.height - constants.runnerSize),
                new Phaser.Point(game.world.width, game.world.height - constants.runnerSize),
                new Phaser.Point(game.world.width, game.world.height)
            );
            objects.ground = new ExtendedPolygon(ground, colorPalette.ground);

            var lowIsoscelesTriangle = {
                polygon: function() {
                    return new Phaser.Polygon(
                        new Phaser.Point(0, constants.groundHeight),
                        new Phaser.Point(constants.runnerSize / 4, constants.groundHeight),
                        new Phaser.Point(constants.runnerSize / 8, constants.groundHeight - constants.runnerSize / 4)
                    );
                },
                minimumSpaceBehind: 125,
                name: "low triangle",
                color: colorPalette.obstacleLow
            };

            var lowRectangle = {
                polygon: function() {
                    return new Phaser.Polygon(
                        new Phaser.Point(0, constants.groundHeight),
                        new Phaser.Point(0, constants.groundHeight - constants.runnerSize / 4),
                        new Phaser.Point(constants.runnerSize / 5, constants.groundHeight - constants.runnerSize / 4),
                        new Phaser.Point(constants.runnerSize / 5, constants.groundHeight)
                    );
                },
                minimumSpaceBehind: 130,
                name: "low rect",
                color: colorPalette.obstacleLow
            };


            var mediumAcuteTriangle = {
                polygon: function() {
                    return new Phaser.Polygon(
                        new Phaser.Point(0, constants.groundHeight),
                        new Phaser.Point(constants.runnerSize, constants.groundHeight),
                        new Phaser.Point(constants.runnerSize, constants.groundHeight - constants.runnerSize * (2 / 3))
                    );
                },
                minimumSpaceBehind: 150,
                name: "med acute right",
                color: colorPalette.obstacleMedium
            };

            var mediumIsoscelesTriangle = {
                polygon: function() {
                    return new Phaser.Polygon(
                        new Phaser.Point(0, constants.groundHeight),
                        new Phaser.Point(constants.runnerSize, constants.groundHeight),
                        new Phaser.Point(constants.runnerSize / 2, constants.groundHeight - constants.runnerSize)
                    );
                },
                minimumSpaceBehind: 150,
                name: "med isosceles",
                color: colorPalette.obstacleMedium
            };

            var bigSquareLikeRunner = {
                polygon: function() {
                    return new Phaser.Polygon(
                        new Phaser.Point(0, constants.groundHeight),
                        new Phaser.Point(0, constants.groundHeight - constants.runnerSize),
                        new Phaser.Point(constants.runnerSize, constants.groundHeight - constants.runnerSize),
                        new Phaser.Point(constants.runnerSize, constants.groundHeight)
                    );
                },
                minimumSpaceBehind: 220,
                name: "big square",
                color: colorPalette.obstacleBig
            };

            var bigWallRectangle = {
                polygon: function() {
                    return new Phaser.Polygon(
                        new Phaser.Point(0, constants.groundHeight),
                        new Phaser.Point(0, constants.groundHeight - constants.runnerSize * 2.5),
                        new Phaser.Point(constants.runnerSize / 2, constants.groundHeight - constants.runnerSize * 2.5),
                        new Phaser.Point(constants.runnerSize / 2, constants.groundHeight)
                    );
                },
                minimumSpaceBehind: 300,
                name: "big wall",
                color: colorPalette.obstacleBig
            };

            objects.polygonPrototypes = [lowRectangle, lowIsoscelesTriangle, mediumAcuteTriangle, mediumIsoscelesTriangle, bigSquareLikeRunner, bigWallRectangle];
            objects.makeRandomObstacle = function() {
                var index = Math.floor(Math.random() * (this.polygonPrototypes.length));
                var prototype = this.polygonPrototypes[index];
                return new Obstacle(new ExtendedPolygon(prototype.polygon(), prototype.color), prototype.minimumSpaceBehind, prototype.name);
            };

        },

        create: function() {
            game.state.start('waiting');
        }
    };
};
