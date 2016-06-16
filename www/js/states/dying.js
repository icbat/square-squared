var state_dying = function(game) {
    return {
        create: function() {
            this.timeToLeave = game.time.time + 750;
            this.graphics = game.add.graphics(0, 0);
        },
        render: function() {
            this.graphics.clear();

            var obstacleIndex;
            for (obstacleIndex = 0; obstacleIndex < objects.obstacles.length; ++obstacleIndex) {
                var obstacle = objects.obstacles[obstacleIndex];
                obstacle.draw(this.graphics);
            }
            objects.runner.draw(this.graphics);
            objects.ground.draw(this.graphics);
            drawDebugText(constants.debugMode);
        },
        update: function() {
            if (game.time.time > this.timeToLeave) {
                game.stateTransition.to('waiting');
            }
        }
    };
};
