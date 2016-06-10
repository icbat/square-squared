var expectEveryPointIsAWholeNumber = function(extended) {
    var points = extended.polygon.toNumberArray();
    var i;
    for (i = 0; i < points.length; i++) {
        expect(points[i] % 1).toEqual(0);
    }
};

describe("An extended polgyon", function() {
    var badHeight = 413;
    constants.groundHeight = badHeight - constants.runnerSize;
    var polygon = new Phaser.Polygon(
        new Phaser.Point(0, constants.groundHeight),
        new Phaser.Point(0, constants.groundHeight - constants.runnerSize),
        new Phaser.Point(constants.runnerSize, constants.groundHeight - constants.runnerSize),
        new Phaser.Point(constants.runnerSize, constants.groundHeight)
    );
    var testObject = new ExtendedPolygon(polygon);

    it("should be able to moveToY when everything is an integer", function() {
        expectEveryPointIsAWholeNumber(testObject);
        testObject.moveToY(13);
        expectEveryPointIsAWholeNumber(testObject);
    });
});
