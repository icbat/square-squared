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
          testObject.moveToY(constants.groundHeight - constants.runnerSize - 1000);
          var initialSpeed = 0.1;
          testObject.vspeed = initialSpeed;

          testObject.applyGravity();

          expect(testObject.findLowestPoint()).toEqual(initialHeight + initialSpeed);
        });
    });

});
