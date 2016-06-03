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

    polygonToExtend.moveToX = function(destinationX) {
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

    polygonToExtend.moveToY = function(destinationY) {
        var points = this.toNumberArray();
        var index;
        var minY = this.findHighestPoint();

        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 1) {
                // minY is necessary to adjust for the size of the this
                points[index] += destinationY - minY;
            }
        }

        this.setTo(points);
    };

    polygonToExtend.moveByY = function(amountY) {
        var points = this.toNumberArray();
        var index;
        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 1) {
                points[index] += amountY;
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


    polygonToExtend.findHighestPoint = function() {
        var points = this.toNumberArray();
        var minY = 99999;
        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 1) {
                minY = Math.min(points[index], minY);
            }
        }
        if (minY == 99999) {
            throw "Polygon was too far off the screen, unsure how you got here, but congratulations; file a bug.";
        }
        return minY;
    };

    polygonToExtend.findLowestPoint = function() {
        var points = this.toNumberArray();
        var maxY = -99999;
        var index;
        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 1) {
                maxY = Math.max(points[index], maxY);
            }
        }
        if (maxY == -99999) {
            throw "Polygon was too far off the screen, unsure how you got here, but congratulations; file a bug.";
        }
        return maxY;
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

    polygonToExtend.intersects = function(other) {
        var myLines = this.decompose();
        var myIndex;
        var theirLines = other.decompose();
        var theirIndex;
        for (myIndex = 0; myIndex < myLines.length; ++myIndex) {
            for (theirIndex = 0; theirIndex < theirLines.length; ++theirIndex) {
                if (myLines[myIndex].intersects(theirLines[theirIndex])) {
                    return true;
                }
            }
        }
        return false;
    };

    return polygonToExtend;
};
