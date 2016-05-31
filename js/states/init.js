var state_init = function(game) {
    return {
        preload: function() {
            game.stage.backgroundColor = colorPalette.light;

            constants.groundHeight = game.world.height - constants.tileSize;
            constants.runnerOnGround = constants.groundHeight - constants.tileSize;
            constants.centerX = game.world.centerX - constants.tileSize / 2;

            objects.runner = new Phaser.Rectangle(constants.centerX, constants.groundHeight - constants.tileSize, constants.tileSize, constants.tileSize);
            objects.runner.vspeed = 0;
            objects.ground = new Phaser.Rectangle(0, constants.groundHeight, game.world.width, constants.tileSize);

            // Acute triangle
            var obstacleEasy = new Phaser.Polygon(
                new Phaser.Point(0, constants.groundHeight),
                new Phaser.Point(constants.tileSize, constants.groundHeight),
                new Phaser.Point(constants.tileSize, constants.groundHeight - constants.tileSize * (2 / 3)));
            obstacleEasy.color = colorPalette.obstacleEasy;

            // Isosceles triangle
            var obstacleMedium = new Phaser.Polygon(
                new Phaser.Point(0, constants.groundHeight),
                new Phaser.Point(constants.tileSize, constants.groundHeight),
                new Phaser.Point(constants.tileSize / 2, constants.groundHeight - constants.tileSize));
            obstacleMedium.color = colorPalette.obstacleMedium;

            // Square the size of the runner
            var obstacleHard = new Phaser.Polygon(
                new Phaser.Point(0, constants.groundHeight),
                new Phaser.Point(0, constants.groundHeight - constants.tileSize),
                new Phaser.Point(constants.tileSize, constants.groundHeight - constants.tileSize),
                new Phaser.Point(constants.tileSize, constants.groundHeight));
            obstacleHard.color = colorPalette.obstacleHard;

            objects.obstacles = [obstacleEasy, obstacleMedium, obstacleHard];
        },

        create: function() {
            game.state.start('waiting');
        }
    };
};
