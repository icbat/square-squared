describe("Obstacle Generation", function() {
    function stubRandom(x) {
        return {
            random: function() {
                return x;
            }
        };
    }

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



});
