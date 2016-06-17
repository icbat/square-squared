var state_dying = function(game) {
    return {
        create: function() {
            this.timeToLeave = game.time.time + 1250;
            this.graphics = game.add.graphics(0, 0);
            this.colorStep = 0;
            this.runnerOriginalColor = objects.runner.color;
        },
        render: function() {
            this.graphics.clear();

            objects.runner.draw(this.graphics);
            var obstacleIndex;
            for (obstacleIndex = 0; obstacleIndex < objects.obstacles.length; ++obstacleIndex) {
                var obstacle = objects.obstacles[obstacleIndex];
                obstacle.draw(this.graphics);
            }
            objects.ground.draw(this.graphics);
            drawDebugText(constants.debugMode);
        },
        update: function() {
            if (this.colorStep <= 50) {
                objects.runner.color = Phaser.Color.interpolateColor(this.runnerOriginalColor, colorPalette.background, 50, this.colorStep++);
                console.log(this.runnerOriginalColor, colorPalette.background, objects.runner.color);
            }
            if (game.time.time > this.timeToLeave) {
                if (game.score && game.score > game.highScore) {
                    game.highScore = game.score;
                }
                game.stateTransition.to('waiting');
            }
        }
    };
};
