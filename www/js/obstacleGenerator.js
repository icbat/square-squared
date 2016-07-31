var obstacleGenerator = {
    obstacleCount: 0,
    addObstacleToBack: function() {
        var obstacle = this.makeRandomObstacle();
        var lastObstacle = objects.obstacles[objects.obstacles.length - 1];
        var newX = this.findBack(lastObstacle, game.world.width, calculateDifficultyModifier(gameState.score), Math, obstacle.minimumSpaceBefore);
        objects.obstacles.push(obstacle);
        this.obstacleCount++;
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

        }

        if (this.obstacleCount % 5 === 0 && this.obstacleCount > 0) {
            // Add a big-ish gap every 5
            newX += constants.runnerSize * 5;
        }

        return newX;
    },

    onObstacleAdded: new Phaser.Signal(),

    makeRandomObstacle: function() {
        var prototype;
        var i;
        // Find smallest set that can generate
        // Assumes polygonPrototypes hhas been sorted with higher earliestSpawn later in the list
        for (i = objects.polygonPrototypes.length; i > 0; --i) {
            var ithProto = objects.polygonPrototypes[i - 1];
            console.log(i, ithProto.earliestSpawn);
            if (ithProto.earliestSpawn <= this.obstacleCount || !ithProto.earliestSpawn) {
                break;
            }
        }
        console.log(i, objects.polygonPrototypes.slice(0, i));
        prototype = game.rnd.pick(objects.polygonPrototypes.slice(0, i));
        return new Obstacle(new ExtendedPolygon(prototype.polygon, prototype.color), prototype.minimumSpaceBehind, prototype.minimumSpaceBefore, prototype.name);
    }
};

var scoringZone = function(currentScore) {
    return Math.floor(currentScore / 5);
};

var calculateDifficultyModifier = function(currentScore) {
    // Smaller number -> slower build up of difficulty
    var difficultyOverTime = 1 / 2;
    // Smaller number -> less help
    var amountOfExtraHelp = 7 / 10;

    var difficultyModifier = Math.pow(amountOfExtraHelp, scoringZone(currentScore) * difficultyOverTime) * 200;
    return difficultyModifier;
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
