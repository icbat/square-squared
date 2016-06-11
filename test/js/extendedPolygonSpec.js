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

    beforeEach(function() {
      polygon = new Phaser.Polygon(
          new Phaser.Point(0, constants.groundHeight),
          new Phaser.Point(0, constants.groundHeight - constants.runnerSize),
          new Phaser.Point(constants.runnerSize, constants.groundHeight - constants.runnerSize),
          new Phaser.Point(constants.runnerSize, constants.groundHeight)
      );
      testObject = new ExtendedPolygon(polygon);

    });

    it("moveToY should take you to an integer pixel when starting from whole numbers", function() {
        expectEveryYCoordToBeWhole(testObject, true);
        testObject.moveToY(13);
        expectEveryYCoordToBeWhole(testObject, true);
    });

    it("moveToY should take you to an integer pixel when starting from a fraction that rounds down", function() {
        testObject.moveByY(0.1);
        expectEveryYCoordToBeWhole(testObject, false);

        testObject.moveToY(13);
        expectEveryYCoordToBeWhole(testObject, true);
    });

    it("moveToY should take you to an integer pixel when starting from a fraction that rounds up", function() {
        testObject.moveByY(0.9);
        expectEveryYCoordToBeWhole(testObject, false);

        testObject.moveToY(13);
        expectEveryYCoordToBeWhole(testObject, true);
    });
});
