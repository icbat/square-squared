var expectEveryYCoordToBeWhole = function(extended, shouldBeTrue) {
    var points = extended.polygon.toNumberArray();
    var i;
    console.log("Inspecting", points);
    for (i = 1; i < points.length; i += 2) {
        if (shouldBeTrue) {
            expect(points[i] % 1).toEqual(0);
        } else {
            expect(points[i] % 1).not.toEqual(0);
        }
    }
};

describe("An extended polgyon", function() {
    var badHeight = 413;
    constants.groundHeight = badHeight - constants.runnerSize;
    var polygon;
    var testObject;



    describe("moveToY", function() {
        beforeEach(function() {
            polygon = new Phaser.Polygon(
                new Phaser.Point(0, constants.groundHeight),
                new Phaser.Point(0, constants.groundHeight - constants.runnerSize),
                new Phaser.Point(constants.runnerSize, constants.groundHeight - constants.runnerSize),
                new Phaser.Point(constants.runnerSize, constants.groundHeight)
            );
            testObject = new ExtendedPolygon(polygon);

        });
        it("should take you to an integer pixel when starting from whole numbers", function() {
            expectEveryYCoordToBeWhole(testObject, true);
            testObject.moveToY(13);
            expectEveryYCoordToBeWhole(testObject, true);
        });

        it("should take you to an integer pixel when starting from a fraction that rounds down", function() {
            testObject.moveByY(0.1);
            expectEveryYCoordToBeWhole(testObject, false);

            testObject.moveToY(13);
            expectEveryYCoordToBeWhole(testObject, true);
        });

        it("should take you to an integer pixel when starting from a fraction that rounds up", function() {
            testObject.moveByY(0.9);
            expectEveryYCoordToBeWhole(testObject, false);

            testObject.moveToY(13);
            expectEveryYCoordToBeWhole(testObject, true);
        });

        it("should take you to an integer pixel when starting from a fraction that rounds up", function() {
            testObject.moveToY(349.49999999999994);
            expectEveryYCoordToBeWhole(testObject, false);

            testObject.moveToY(349);
            expectEveryYCoordToBeWhole(testObject, true);
        });
    });

    describe("setLowerLeftTo", function() {
        it("works with a square", function() {
            var initialLowerLeft = {
                x: 0,
                y: constants.groundHeight
            };
            var sideLength = constants.runnerSize;
            polygon = new Phaser.Polygon(
                new Phaser.Point(initialLowerLeft.x, initialLowerLeft.y),
                new Phaser.Point(initialLowerLeft.x, initialLowerLeft.y - sideLength),
                new Phaser.Point(initialLowerLeft.x + sideLength, initialLowerLeft.y - sideLength),
                new Phaser.Point(initialLowerLeft.x + sideLength, initialLowerLeft.y)
            );
            testObject = new ExtendedPolygon(polygon);

            expect(testObject.findLowestPoint()).toBe(initialLowerLeft.y);
            expect(testObject.findHighestPoint()).toBe(initialLowerLeft.y - sideLength);
            expect(testObject.findLeftmostPoint()).toBe(initialLowerLeft.x);
            expect(testObject.findRightmostPoint()).toBe(initialLowerLeft.x + sideLength);

            var destination = {
                x: 413,
                y: 600
            };
            testObject.setLowerLeftTo(destination.x, destination.y);

            expect(testObject.findLowestPoint()).toBe(destination.y);
            expect(testObject.findHighestPoint()).toBe(destination.y - sideLength);
            expect(testObject.findLeftmostPoint()).toBe(destination.x);
            expect(testObject.findRightmostPoint()).toBe(destination.x + sideLength);
        });
        it("works with a triangle", function() {
            var initialLowerLeft = {
                x: 0,
                y: constants.groundHeight
            };
            var sideLength = constants.runnerSize;
            polygon = new Phaser.Polygon(
                new Phaser.Point(initialLowerLeft.x, initialLowerLeft.y),
                new Phaser.Point(initialLowerLeft.x + sideLength / 4, initialLowerLeft.y),
                new Phaser.Point(initialLowerLeft.x + sideLength / 8, initialLowerLeft.y - sideLength / 4)
            );
            testObject = new ExtendedPolygon(polygon);

            expect(testObject.findLowestPoint()).toBe(initialLowerLeft.y);
            expect(testObject.findHighestPoint()).toBe(initialLowerLeft.y - sideLength / 4);
            expect(testObject.findLeftmostPoint()).toBe(initialLowerLeft.x);
            expect(testObject.findRightmostPoint()).toBe(initialLowerLeft.x + sideLength / 4);

            var destination = {
                x: 200,
                y: 133
            };
            testObject.setLowerLeftTo(destination.x, destination.y);

            expect(testObject.findLowestPoint()).toBe(destination.y);
            expect(testObject.findHighestPoint()).toBe(destination.y - sideLength / 4);
            expect(testObject.findLeftmostPoint()).toBe(destination.x);
            expect(testObject.findRightmostPoint()).toBe(destination.x + sideLength / 4);
        });
    });

});
