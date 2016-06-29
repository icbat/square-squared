var objects;
var game;

describe("Setup Game", function() {
    beforeEach(function() {
        objects = {
            highScoreDisplay: {},
            scoreDisplay: {}
        };
        game = {
            add: {
                tween: function() {
                    return {
                        to: function() {},
                        start: function() {}
                    };
                }
            },
            world: {}
        };
    });

    it("should reset the score to 0", function() {
        gameState.score = 1;
        expect(gameState.score).toBe(1);

        setupGame();

        expect(gameState.score).toBe(0);
    });

    it("should remove all obstacles", function() {
        objects.obstacles = [1, 2, 3];
        expect(objects.obstacles.length).toBe(3);

        setupGame();

        expect(objects.obstacles.length).toBe(0);
    });

});
