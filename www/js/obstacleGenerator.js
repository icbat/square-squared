var obstacleGenerator = {
    addObstacleToBack: function() {
        var obstacle = this.makeRandomObstacle();
        var lastObstacle = objects.obstacles[objects.obstacles.length - 1];
        var newX = this.findBack(lastObstacle, game.world.width, calculateDifficultyModifier(gameState.score), Math, obstacle.minimumSpaceBefore);
        objects.obstacles.push(obstacle);
        obstacle.moveToX(newX);
        obstacle.hasScored = false;
        this.onObstacleAdded.dispatch(newX, lastObstacle);
    },

    findBack: function(lastInList, screenEdge, difficultyModifier, math, minimumSpaceBefore) {
        var minBuffer = lastInList ? lastInList.minimumSpaceBehind : 0;
        var newX = screenEdge + minBuffer;
        newX += minimumSpaceBefore ? minimumSpaceBefore : 0;
        newX += difficultyModifier;

        if (objects.obstacles.length !== 0) {
            newX += math.random() * constants.runnerSize;
            if (math.random() > 0.7) {
                // Randomly add a big-ish gap
                newX += constants.runnerSize * 2;
            }
        }

        return newX;
    },

    onObstacleAdded: new Phaser.Signal(),

    makeRandomObstacle: function() {
        var prototype;
        if (objects.obstacles.length === 0) {
            prototype = game.rnd.pick(objects.polygonPrototypes.slice(0, 2));
        } else {
            prototype = game.rnd.pick(objects.polygonPrototypes);
        }
        return new Obstacle(new ExtendedPolygon(prototype.polygon(), prototype.color), prototype.minimumSpaceBehind, prototype.minimumSpaceBefore, prototype.name);
    }
};

var calculateDifficultyModifier = function(currentScore) {
    // Smaller number -> slower build up of difficulty
    var difficultyOverTime = 1 / 2;
    // Smaller number -> less help
    var amountOfExtraHelp = 7 / 10;
    return Math.pow(amountOfExtraHelp, currentScore * difficultyOverTime) * 200;
};

function Obstacle(thingToExtend, minimumSpaceBehind, minimumSpaceBefore, name) {
    thingToExtend.minimumSpaceBehind = minimumSpaceBehind;
    thingToExtend.minimumSpaceBefore = minimumSpaceBefore;
    thingToExtend.name = name;
    thingToExtend.runnerLandCallback = function() {
        thingToExtend.vspeed = -4 + Math.random() * constants.chargeEffects[gameState.lastJump.charge];
    };
    objects.runner.onLand.add(thingToExtend.runnerLandCallback);
    return thingToExtend;
}
