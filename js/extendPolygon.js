var extendPolygon = function(polygonToExtend, color) {
    polygonToExtend.color = color;

    polygonToExtend.movePolygonBy = function(amountX) {
        var points = this.toNumberArray();
        var index;
        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 0) {
                points[index] += amountX;
            }
        }
        this.setTo(points);
    };

    polygonToExtend.movePolygonTo = function(destinationX) {
        var points = this.toNumberArray();
        var index;
        var minX = this.findLeftmostPoint();

        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 0) {
                // minX is necessary to adjust for the size of the this
                points[index] += destinationX - minX;
            }
        }

        this.setTo(points);
    };

    polygonToExtend.findLeftmostPoint = function() {
        var points = this.toNumberArray();
        var minX = 99999;
        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 0) {
                minX = Math.min(points[index], minX);
            }
        }
        if (minX == 99999) {
            throw "Polygon was too far off the screen, unsure how you got here, but congratulations; file a bug.";
        }
        return minX;
    };

    polygonToExtend.findRightmostPoint = function() {
        var points = this.toNumberArray();
        var maxX = -99999;
        var index;
        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 0) {
                maxX = Math.max(points[index], maxX);
            }
        }
        if (maxX == -99999) {
            throw "Polygon was too far off the screen, unsure how you got here, but congratulations; file a bug.";
        }
        return maxX;
    };

    polygonToExtend.decompose = function() {
        var rawPoints = this.toNumberArray();
        var index;
        var lines = [];
        var points = [];
        for (index = 0; index < rawPoints.length; ++index) {
            points.push({
                x: rawPoints[index++],
                y: rawPoints[index]
            });
        }
        var innerIndex;
        for (index = 0; index < points.length - 1; ++index) {
            for (innerIndex = index + 1; innerIndex < points.length; ++innerIndex) {
                var start = points[index];
                var end = points[innerIndex];

                lines.push(new Phaser.Line(start.x, start.y, end.x, end.y));
            }
        }

        return lines;
    };

    polygonToExtend.draw = function(graphics) {
      graphics.beginFill(this.color);
      graphics.drawShape(this);
      graphics.endFill();
    };

    return polygonToExtend;
};
