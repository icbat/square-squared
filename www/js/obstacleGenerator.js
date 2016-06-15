var obstacleGenerator = {
    addObstacleToBack: function() {
        var obstacle = objects.makeRandomObstacle();
        var lastObstacle = objects.obstacles[objects.obstacles.length - 1];
        objects.obstacles.push(obstacle);
        var newX = this.findBack(lastObstacle, game.world.width, calculateDifficultyModifier(game.score), Math);
        obstacle.moveToX(newX);
        obstacle.hasScored = false;
        this.onObstacleAdded.dispatch(newX, lastObstacle);
    },

    findBack: function(lastInList, screenEdge, difficultyModifier, math) {
        var minBuffer = lastInList ? lastInList.minimumSpaceBehind : 0;
        var newX = screenEdge + minBuffer;
        newX += difficultyModifier;
        newX += math.random() * constants.runnerSize;
        if (math.random() > 0.7) {
            // Randomly add a big-ish gap
            newX += constants.runnerSize * 2;
        }

        return newX;
    },

    onObstacleAdded: new Phaser.Signal()
};
