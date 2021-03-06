var objects;
describe("Obstacle Generation", function() {
    function stubRandom(x) {
        return {
            random: function() {
                return x;
            }
        };
    }


    beforeEach(function() {
        objects = {
            obstacles: ["anything"]
        };
    });


    it("should put new ones at least their minimum distance behind", function() {
        var expected = 12333;
        var lastInList = {
            minimumSpaceBehind: expected
        };

        var actual = obstacleGenerator.findBack(lastInList, 0, 0, stubRandom(0));

        expect(actual).toEqual(expected);
    });

    it("should should add a random distance between", function() {
        var random = 0.1;
        var expected = random * constants.runnerSize;
        var lastInList = {
            minimumSpaceBehind: 0
        };

        var actual = obstacleGenerator.findBack(lastInList, 0, 0, stubRandom(random));

        expect(actual).toEqual(expected);
    });

    it("should put a bigger space some of the time", function() {
        var random = 0.71;
        var expected = (constants.runnerSize * 2) + (random * constants.runnerSize);
        var lastInList = {
            minimumSpaceBehind: 0
        };

        var actual = obstacleGenerator.findBack(lastInList, 0, 0, stubRandom(random));

        expect(actual).toEqual(expected);
    });

    it("should add an offset if one exists", function() {
        var random = 0;
        var offset = 555;
        var expected = offset;
        var lastInList = {
            minimumSpaceBehind: 0
        };

        var actual = obstacleGenerator.findBack(lastInList, 0, offset, stubRandom(random));

        expect(actual).toEqual(expected);
    });

    it("should start at the edge of the screen", function() {
        var random = 0;
        var edgeOfScreen = 555;
        var expected = edgeOfScreen;
        var lastInList = {
            minimumSpaceBehind: 0
        };

        var actual = obstacleGenerator.findBack(lastInList, edgeOfScreen, 0, stubRandom(random));

        expect(actual).toEqual(expected);
    });

    it("should not explode with no last obstacle", function() {
        var random = 0;
        var edgeOfScreen = 555;
        var expected = edgeOfScreen;
        var lastInList;

        var actual = obstacleGenerator.findBack(lastInList, edgeOfScreen, 0, stubRandom(random));

        expect(actual).toEqual(expected);
    });

    it("should not explode when generated obstacle has no minSpaceBefore", function() {
        var random = 0;
        var edgeOfScreen = 555;
        var expected = edgeOfScreen;
        var lastInList = {
            minimumSpaceBehind: 0
        };

        var actual = obstacleGenerator.findBack(lastInList, edgeOfScreen, 0, stubRandom(random));

        expect(actual).toEqual(expected);
    });

    it("should add space before if it exists", function() {
        var random = 0;
        var minSpaceBefore = 44123;
        var edgeOfScreen = 555;
        var expected = edgeOfScreen + minSpaceBefore;
        var lastInList = {
            minimumSpaceBehind: 0
        };

        var actual = obstacleGenerator.findBack(lastInList, edgeOfScreen, 0, stubRandom(random), minSpaceBefore);

        expect(actual).toEqual(expected);
    });

    it("should add difficultyModifier", function() {
        var random = 0;
        var minSpaceBefore = 0;
        var edgeOfScreen = 555;
        var difficultyModifier = 3211;
        var expected = edgeOfScreen + difficultyModifier;
        var lastInList = {
            minimumSpaceBehind: 0
        };

        var actual = obstacleGenerator.findBack(lastInList, edgeOfScreen, difficultyModifier, stubRandom(random), minSpaceBefore);

        expect(actual).toEqual(expected);
    });

    it("should NOT be randomzied on the first obstacle", function() {
        var random = 1;
        var minSpaceBefore = 111;
        var edgeOfScreen = 555;
        var difficultyModifier = 222;
        var expected = edgeOfScreen + minSpaceBefore + difficultyModifier;
        var lastInList = {
            minimumSpaceBehind: 0
        };
        objects.obstacles = [];

        var actual = obstacleGenerator.findBack(lastInList, edgeOfScreen, difficultyModifier, stubRandom(random), minSpaceBefore);

        expect(actual).toEqual(expected);
    });

});
