var objects;
var game;
var context = {
    onDown: {}
};

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
            world: {},
            input: {
                onDown: {
                    add: function() {}
                },
                onUp: {
                    add: function() {}
                }
            }
        };
    });

    it("should reset the score to 0", function() {
        gameState.score = 1;
        expect(gameState.score).toBe(1);

        setupGame(context);

        expect(gameState.score).toBe(0);
    });

    it("should remove all obstacles", function() {
        objects.obstacles = [1, 2, 3];
        expect(objects.obstacles.length).toBe(3);

        setupGame(context);

        expect(objects.obstacles.length).toBe(0);
    });

});
