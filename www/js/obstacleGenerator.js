var obstacleGenerator = {
    addObstacleToBack: function() {
        var obstacle = this.makeRandomObstacle();
        var lastObstacle = objects.obstacles[objects.obstacles.length - 1];
        objects.obstacles.push(obstacle);
        var newX = this.findBack(lastObstacle, game.world.width, calculateDifficultyModifier(gameState.score), Math);
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

    onObstacleAdded: new Phaser.Signal(),

    makeRandomObstacle: function() {
        var index = Math.floor(Math.random() * (objects.polygonPrototypes.length));
        var prototype = objects.polygonPrototypes[index];
        return new Obstacle(new ExtendedPolygon(prototype.polygon(), prototype.color), prototype.minimumSpaceBehind, prototype.name);
    }
};

var calculateDifficultyModifier = function(currentScore) {
    return Math.pow(7/10, currentScore) * 200;
};

function Obstacle(thingToExtend, minimumSpaceBehind, name) {
    thingToExtend.minimumSpaceBehind = minimumSpaceBehind;
    thingToExtend.name = name;
    thingToExtend.runnerLandCallback = function() {
        thingToExtend.vspeed = -4 * constants.chargeEffects[gameState.lastJump.chargeLevel];
    };
    objects.runner.onLand.add(thingToExtend.runnerLandCallback);
    return thingToExtend;
}
