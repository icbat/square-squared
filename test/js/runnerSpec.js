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

        it("shouldn't mess up at any charge level", function() {
            var initialHeight = constants.groundHeight;
            testObject.moveToY(initialHeight - constants.runnerSize);
            testObject.vspeed = 0;
            var i;
            for (i = 0; i < constants.chargeLevels; ++i) {
                testObject.jump(i);

                expectEventualHitsTheGround(testObject);
            }

        });

        it("shouldn't jump at all when the chargeLevel is 0", function() {
            var initialHeight = constants.groundHeight;
            testObject.moveToY(initialHeight - constants.runnerSize);
            testObject.vspeed = 0;

            testObject.jump(0);

            expect(testObject.vspeed).toBe(0);
        });
    });

    describe("updateForDraw", function() {
        describe("the color ", function() {
            it("should be set to charge level color  if not jumping and charge not 0", function() {
                expect(testObject.color).toEqual(colorPalette.runner);
                expect(testObject.onGround()).toBe(true);
                var chargeLevel;
                for (chargeLevel = 1; chargeLevel < constants.chargeLevels.length; ++chargeLevel) {
                    testObject.updateBeforeDraw(chargeLevel);

                    expect(testObject.color).toEqual(constants.chargeColors[chargeLevel]);
                }
            });

            it("should be reset to runner base color if not jumping and no charge", function() {
                expect(testObject.color).toEqual(colorPalette.runner);
                expect(testObject.onGround()).toBe(true);

                testObject.updateBeforeDraw(0);

                expect(testObject.color).toEqual(colorPalette.runner);
            });
        });
        it("the height should correspond to the charge height variable", function() {
          var chargeLevel;
          for (chargeLevel = 0; chargeLevel < constants.chargeLevels.length; ++chargeLevel) {
              testObject.updateBeforeDraw(chargeLevel);

              expect(testObject.findHeight()).toEqual(constants.chargeHeights[chargeLevel]);
          }
        });


    });

});
