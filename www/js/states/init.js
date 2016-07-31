var state_init = function(game) {
    return {
        preload: function() {
            this.assetsLoaded = false;
            game.load.onLoadComplete.add(function() {
                this.assetsLoaded = true;
            }, this);
            game.load.image('dirtParticle', 'assets/graphics/square-particle.png');
            game.load.audio('land', 'assets/sounds/land.ogg');
            game.load.audio('jump', 'assets/sounds/jump.ogg');
            game.load.audio('lose', 'assets/sounds/lose.ogg');
            game.load.audio('score', 'assets/sounds/score.ogg');
            game.load.audio('milestone', 'assets/sounds/upmid.ogg');
            game.load.bitmapFont('titleOrange', 'assets/fonts/upheavalPro-orange.png', 'assets/fonts/upheavalPro.xml');
            game.load.bitmapFont('titlePurple', 'assets/fonts/upheavalPro-purple.png', 'assets/fonts/upheavalPro.xml');

            game.stage.backgroundColor = colorPalette.background;

            constants.groundHeight = game.world.height - constants.runnerSize;

            var runnerPolygon = [{
                "x": 0,
                "y": 0
            }, {
                "x": 0,
                "y": constants.runnerSize
            }, {
                "x": constants.runnerSize,
                "y": constants.runnerSize
            }, {
                "x": constants.runnerSize,
                "y": 0
            }];
            objects.runner = runner(runnerPolygon, colorPalette.runner, constants.groundHeight);
            objects.runner.moveToX(game.world.width / 5);
            objects.runner.moveToY(constants.groundHeight - constants.runnerSize);

            var ground = [{
                "x": 0,
                "y": 100
            }, {
                "x": 0,
                "y": -constants.runnerSize
            }, {
                "x": game.world.width,
                "y": -constants.runnerSize
            }, {
                "x": game.world.width,
                "y": 100
            }];
            objects.ground = new ExtendedPolygon(ground, colorPalette.ground);
            objects.ground.moveToY(constants.groundHeight);

            var lowIsoscelesTriangle = {
                polygon: [{
                    "x": 0,
                    "y": constants.groundHeight
                }, {
                    "x": constants.runnerSize / 4,
                    "y": constants.groundHeight
                }, {
                    "x": constants.runnerSize / 8,
                    "y": constants.groundHeight - constants.runnerSize / 4
                }],
                minimumSpaceBehind: 125,
                name: "low triangle",
                color: colorPalette.obstacleLow
            };

            var lowRectangle = {
                polygon: [{
                    "x": 0,
                    "y": constants.groundHeight
                }, {
                    "x": 0,
                    "y": constants.groundHeight - constants.runnerSize / 4
                }, {
                    "x": constants.runnerSize / 5,
                    "y": constants.groundHeight - constants.runnerSize / 4
                }, {
                    "x": constants.runnerSize / 5,
                    "y": constants.groundHeight
                }],

                minimumSpaceBehind: 130,
                name: "low rect",
                color: colorPalette.obstacleLow
            };


            var mediumAcuteTriangle = {
                polygon: [{
                    "x": 0,
                    "y": constants.groundHeight
                }, {
                    "x": constants.runnerSize,
                    "y": constants.groundHeight
                }, {
                    "x": constants.runnerSize,
                    "y": constants.groundHeight - constants.runnerSize * (2 / 3)
                }],
                minimumSpaceBehind: 150,
                name: "med acute right",
                color: colorPalette.obstacleMedium
            };

            var mediumIsoscelesTriangle = {
                polygon: [{
                    "x": 0,
                    "y": constants.groundHeight
                }, {
                    "x": constants.runnerSize,
                    "y": constants.groundHeight
                }, {
                    "x": constants.runnerSize / 2,
                    "y": constants.groundHeight - constants.runnerSize
                }],
                minimumSpaceBehind: 150,
                name: "med isosceles",
                color: colorPalette.obstacleMedium
            };

            var bigSquareLikeRunner = {
                polygon: [{
                    "x": 0,
                    "y": constants.groundHeight
                }, {
                    "x": 0,
                    "y": constants.groundHeight - constants.runnerSize
                }, {
                    "x": constants.runnerSize,
                    "y": constants.groundHeight - constants.runnerSize
                }, {
                    "x": constants.runnerSize,
                    "y": constants.groundHeight
                }],
                minimumSpaceBehind: 220,
                name: "big square",
                color: colorPalette.obstacleBig
            };

            var bigWallRectangle = {
                polygon: [{
                    "x": 0,
                    "y": constants.groundHeight
                }, {
                    "x": 0,
                    "y": constants.groundHeight - constants.runnerSize * 2.5
                }, {
                    "x": constants.runnerSize / 3,
                    "y": constants.groundHeight - constants.runnerSize * 2.5
                }, {
                    "x": constants.runnerSize / 3,
                    "y": constants.groundHeight
                }],
                minimumSpaceBehind: 215,
                minimumSpaceBefore: 75,
                name: "big wall",
                color: colorPalette.obstacleBig
            };

            objects.polygonPrototypes = [lowRectangle, lowIsoscelesTriangle, mediumAcuteTriangle, mediumIsoscelesTriangle, bigSquareLikeRunner, bigWallRectangle];
            objects.obstacles = [];

            var initY = constants.groundHeight - 200;
            var lineThickness = 2;
            var tinyLine = [{
                "x": 0,
                "y": initY
            }, {
                "x": game.world.width / 2,
                "y": initY
            }, {
                "x": game.world.width / 2,
                "y": initY + lineThickness
            }, {
                "x": 0,
                "y": initY + lineThickness
            }];
            objects.leftJumpLine = new ExtendedPolygon(tinyLine, colorPalette.ground);
            objects.rightJumpLine = new ExtendedPolygon(tinyLine, colorPalette.ground);
            // Put the jump line off screen
            objects.leftJumpLine.xPos = game.world.width / -2;
            objects.leftJumpLine.moveToX(game.world.width / -2);
            objects.rightJumpLine.xPos = game.world.width;
            objects.rightJumpLine.moveToX(game.world.width);

            gameState.highScore = 0;

            api.report.launch();
        },

        update: function() {
            if (this.assetsLoaded) {
                game.state.start('running');
            }
        }
    };
};
