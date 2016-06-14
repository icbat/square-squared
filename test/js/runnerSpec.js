var game;
describe("The runner", function() {
    var testObject;
    var badHeight = 413;

    beforeEach(function() {
        // Usually defined in the init state (Because it needs the World to exist first)
        constants.groundHeight = badHeight - constants.runnerSize;

        var runnerPolygon = new Phaser.Polygon(
            new Phaser.Point(0, constants.groundHeight),
            new Phaser.Point(0, constants.groundHeight - constants.runnerSize),
            new Phaser.Point(constants.runnerSize, constants.groundHeight - constants.runnerSize),
            new Phaser.Point(constants.runnerSize, constants.groundHeight)
        );
        testObject = runner(runnerPolygon, colorPalette.runner, constants.groundHeight);
    });

    describe("applyGravity", function() {
        it("should set them to be on the ground if they would go through it", function() {
            testObject.moveToY(constants.groundHeight - constants.runnerSize - 0.1);
            expect(testObject.findLowestPoint()).not.toEqual(constants.groundHeight);
            testObject.vspeed = 0.5;

            testObject.applyGravity();

            expect(testObject.findLowestPoint()).toEqual(constants.groundHeight);
        });

        it("should stop moving when they go a bit through the ground", function() {
            testObject.moveToY(constants.groundHeight - constants.runnerSize - 0.1);
            expect(testObject.findLowestPoint()).not.toEqual(constants.groundHeight);
            testObject.vspeed = 0.5;

            testObject.applyGravity();

            expect(testObject.vspeed).toEqual(0);
        });

        it("should they stop moving when they hit the ground exactly", function() {
            testObject.moveToY(constants.groundHeight - constants.runnerSize - 0.5);
            expect(testObject.findLowestPoint()).not.toEqual(constants.groundHeight);
            testObject.vspeed = 0.5;

            testObject.applyGravity();

            expect(testObject.vspeed).toEqual(0);
        });

        it("should accelerate with gravityUp when climbing", function() {
            testObject.moveToY(constants.groundHeight - constants.runnerSize - 1000);
            var initialSpeed = -0.1;
            testObject.vspeed = initialSpeed;

            testObject.applyGravity();

            expect(testObject.vspeed).toEqual(initialSpeed - constants.gravityStepUp);
        });

        it("should accelerate with gravityDown when falling", function() {
            testObject.moveToY(constants.groundHeight - constants.runnerSize - 1000);
            var initialSpeed = 0.1;
            testObject.vspeed = initialSpeed;

            testObject.applyGravity();

            expect(testObject.vspeed).toEqual(initialSpeed - constants.gravityStepDown);
        });

        it("should move the runner by their current speed when possible", function() {
            var initialHeight = constants.groundHeight - 1000;
            testObject.moveToY(initialHeight - constants.runnerSize);
            var initialSpeed = 0.1;
            testObject.vspeed = initialSpeed;

            testObject.applyGravity();

            expect(testObject.findLowestPoint()).toEqual(initialHeight + initialSpeed);
        });
    });

    describe("jump", function() {

        function expectEventualHitsTheGround(runner) {
            var iteration = 0;
            do {
                runner.applyGravity();
                iteration++;
                if (iteration > 1000) {
                    throw "after 1000 updates, runner ended at " + runner.findLowestPoint() + " not " + constants.groundHeight + " moving at speed " + runner.vspeed;
                }
            } while (runner.findLowestPoint() != constants.groundHeight);
        }

        it("shouldn't mess up when the chargeLevel is max", function() {
            var initialHeight = constants.groundHeight;
            testObject.moveToY(initialHeight - constants.runnerSize);
            testObject.vspeed = 0;
            game = {
                world: {
                    height: 600
                }
            };

            testObject.jump(300);

            expectEventualHitsTheGround(testObject);
        });

        it("shouldn't mess up when the chargeLevel is 2", function() {
            var initialHeight = constants.groundHeight;
            testObject.moveToY(initialHeight - constants.runnerSize);
            testObject.vspeed = 0;
            game = {
                world: {
                    height: 600
                }
            };

            testObject.jump(299);

            expectEventualHitsTheGround(testObject);
        });

        it("shouldn't mess up when the chargeLevel is 1", function() {
            var initialHeight = constants.groundHeight;
            testObject.moveToY(initialHeight - constants.runnerSize);
            testObject.vspeed = 0;
            game = {
                world: {
                    height: 600
                }
            };

            testObject.jump(100);

            expectEventualHitsTheGround(testObject);
        });

        it("shouldn't jump at all when the chargeLevel is 0", function() {
            var initialHeight = constants.groundHeight;
            testObject.moveToY(initialHeight - constants.runnerSize);
            testObject.vspeed = 0;

            testObject.jump(1);

            expect(testObject.vspeed).toBe(0);
        });
    });

    describe("updateForDraw", function() {
        it("should reset to runner base colorif a jump occurs", function() {
            expect(testObject.color).toEqual(colorPalette.runner);
            expect(testObject.canJump()).toBe(true);

            testObject.jump(299);
            testObject.applyGravity();
            var chargeLevel;
            for (chargeLevel = 1; chargeLevel < constants.chargeLevels.length; ++chargeLevel) {
                testObject.updateForDraw(chargeLevel);

                expect(testObject.color).toEqual(colorPalette.runner);
                expect(testObject.canJump()).toBe(false);
            }
        });

        it("should set to charge level color  if not jumping and charge not 0", function() {
            expect(testObject.color).toEqual(colorPalette.runner);
            expect(testObject.canJump()).toBe(true);
            var chargeLevel;
            for (chargeLevel = 1; chargeLevel < constants.chargeLevels.length; ++chargeLevel) {
                testObject.updateForDraw(chargeLevel);

                expect(testObject.color).toEqual(constants.chargeColors[chargeLevel]);
            }
        });

        it("should reset to runner base color if not jumping and no charge", function() {
            expect(testObject.color).toEqual(colorPalette.runner);
            expect(testObject.canJump()).toBe(true);

            testObject.updateForDraw(0);

            expect(testObject.color).toEqual(colorPalette.runner);
        });

    });

});
