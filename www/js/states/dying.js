var state_dying = function(game) {
    return {
        create: function() {
            this.graphics = game.add.graphics(0, 0);
            loseGame(this);
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
            if (this.gameIsLost) {
                if (this.colorStep <= 50) {
                    objects.runner.color = Phaser.Color.interpolateColor(this.runnerOriginalColor, colorPalette.background, 50, this.colorStep++);
                }
                if (game.time.time > this.timeToLeave) {
                    var highScore = localStorage.getItem('squareSquared-highScore');
                    localStorage.setItem('squareSquared-highScore', Math.max(gameState.score, highScore ? highScore : 0));
                    objects.runner.color = colorPalette.runner;
                    game.stateTransition.to('waiting');
                    this.gameIsLost = false;
                }
            }
        }
    };
};

var loseGame = function(context) {
    context.gameIsLost = true;
    context.timeToLeave = game.time.time + constants.timeOnDyingScreen;
    context.colorStep = 0;
    context.runnerOriginalColor = objects.runner.color;
    var loseSound = game.sound.play('lose', 0.1);
    loseSound._sound.playbackRate.value = 0.5;
};
