var state_init = function(game) {
    return {
        preload: function() {
            this.assetsLoaded = false;
            game.load.onLoadComplete.add(function() {
                this.assetsLoaded = true;
            }, this);
            game.load.audio('land', 'assets/sounds/land.ogg');
            game.load.audio('jump', 'assets/sounds/jump.ogg');
            game.load.audio('lose', 'assets/sounds/lose.ogg');
            game.load.audio('score', 'assets/sounds/score.ogg');

            game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);
            this.game.stateTransition.configure({
                // Actually putting 0 makes this plugin think you don't want to set anything
                duration: 0.000001
            });

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
            objects.obstacles = [];

            var initY = constants.groundHeight - 200;
            var lineThickness = 2;
            var tinyLine = new Phaser.Polygon(
                new Phaser.Point(0, initY),
                new Phaser.Point(game.world.width / 2, initY),
                new Phaser.Point(game.world.width / 2, initY + lineThickness),
                new Phaser.Point(0, initY + lineThickness)
            );
            objects.leftJumpLine = new ExtendedPolygon(tinyLine, colorPalette.ground);
            objects.rightJumpLine = new ExtendedPolygon(tinyLine, colorPalette.ground);

            var tallLine = new Phaser.Polygon(
                new Phaser.Point(0, 0),
                new Phaser.Point(4, 0),
                new Phaser.Point(4, 1),
                new Phaser.Point(0, 1)
            );

            objects.dragLine = new ExtendedPolygon(tallLine, colorPalette.runner);
            setupDebugging();
            gameState.highScore = 0;
        },

        update: function() {
            if (this.assetsLoaded) {
                game.stateTransition.to('waiting');
            }
        }
    };
};
