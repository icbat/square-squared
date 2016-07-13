var game;
describe("The runner", function() {
    var testObject;
    var badHeight = 413;

    beforeEach(function() {
        objects.runner = {};
        game = {
            sound: {
                play: function() {}
            },
            camera: {
                shake: function() {}
            },
            add: {
                tween: function() {
                    return {
                        to: function() {},
                        yoyo: function() {},
                        start: function() {}
                    };
                }
            }
        };
        // Usually defined in the init state (Because it needs the World to exist first)
        constants.groundHeight = badHeight - constants.runnerSize;

        var polygonPoints = [{
            "x": 0,
            "y": constants.groundHeight
        }, {
            "x": 0,
            "y": constants.groundHeight - constants.runnerSize
        }, {
            "x": constants.runnerSize,
            "y": constants.groundHeight - constants.runnerSize
        }, {
            "x": constants.runnerSize,
            "y": constants.groundHeight
        }];
        testObject = runner(polygonPoints, colorPalette.runner, constants.groundHeight);
    });

    describe("applyGravity", function() {
        it("should set them to be on the ground if they would go through it", function() {
            testObject.moveToY(constants.groundHeight - constants.runnerSize - 0.1);
            expect(testObject.findLowestPoint()).not.toEqual(constants.groundHeight);
            testObject.vspeed = 0.5;

            testObject.applyGravity(1 / constants.desiredFPS);

            expect(testObject.findLowestPoint()).toEqual(constants.groundHeight);
        });

        it("should stop moving when they go a bit through the ground", function() {
            testObject.moveToY(constants.groundHeight - constants.runnerSize - 0.1);
            expect(testObject.findLowestPoint()).not.toEqual(constants.groundHeight);
            testObject.vspeed = 0.5;

            testObject.applyGravity(1 / constants.desiredFPS);

            expect(testObject.vspeed).toEqual(0);
        });

        it("should they stop moving when they hit the ground exactly", function() {
            testObject.moveToY(constants.groundHeight - constants.runnerSize - 0.5);
            expect(testObject.findLowestPoint()).not.toEqual(constants.groundHeight);
            testObject.vspeed = 0.5;

            testObject.applyGravity(1 / constants.desiredFPS);

            expect(testObject.vspeed).toEqual(0);
        });

        it("should move the runner by their current speed when possible", function() {
            var initialHeight = constants.groundHeight - 1000;
            testObject.moveToY(initialHeight - constants.runnerSize);
            var initialSpeed = 0.1;
            testObject.vspeed = initialSpeed;

            testObject.applyGravity(1 / constants.desiredFPS);

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
    });

    describe("updateForDraw", function() {
        var coefficient;
        beforeAll(function() {
            coefficient = constants.motionTweenCoefficient;
            constants.motionTweenCoefficient = 1;
        });
        afterAll(function() {
            constants.motionTweenCoefficient = coefficient;
        });
        describe("the color", function() {
            it("should be set to charge level color  if not jumping and charge not 0", function() {
                expect(testObject.color).toEqual(Phaser.Color.hexToRGB(colorPalette.runner));
                expect(testObject.onGround()).toBe(true);
                var charge;
                for (charge = 1; charge < constants.chargeLevels.length; ++charge) {
                    testObject.updateBeforeDraw(charge, true);

                    expect(testObject.color).toEqual(constants.chargeColors[charge]);
                }
            });

            it("should be reset to runner base color if not jumping and no charge", function() {
                expect(testObject.color).toEqual(Phaser.Color.hexToRGB(colorPalette.runner));
                expect(testObject.onGround()).toBe(true);

                testObject.updateBeforeDraw(0, false);

                expect(testObject.color).toEqual(Phaser.Color.hexToRGB(colorPalette.runner));
            });

            it("should NOT be reset to runner base color if jumping and no charge", function() {
                testObject.color = colorPalette.obstacleBig;
                testObject.vspeed = -2;
                testObject.applyGravity();
                expect(testObject.onGround()).toBe(false);

                testObject.updateBeforeDraw(0, false);

                expect(testObject.color).toEqual(colorPalette.obstacleBig);
            });
        });
        it("the height should correspond to the charge height variable", function() {
            var charge;
            for (charge = 0; charge < constants.chargeLevels.length; ++charge) {
                testObject.updateBeforeDraw(charge, true);

                expect(testObject.findHeight()).toEqual(constants.chargeHeights[charge]);
            }
        });


    });

});
