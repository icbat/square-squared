function ExtendedPolygon(polygonToExtend, color) {
    this.color = color;
    this.polygon = polygonToExtend;

    this.movePolygonBy = function(amountX) {
        var points = this.polygon.toNumberArray();
        var index;
        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 0) {
                points[index] += amountX;
            }
        }
        this.polygon.setTo(points);
    };

    this.moveToX = function(destinationX) {
        var points = this.polygon.toNumberArray();
        var index;
        var minX = this.findLeftmostPoint();

        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 0) {
                // minX is necessary to adjust for the size of the this
                points[index] += destinationX - minX;
            }
            points[index] = Math.floor(points[index]);
        }

        this.polygon.setTo(points);
    };

    this.setLowerLeftTo = function(x, y) {
        var points = this.polygon.toNumberArray();
        console.log("before", points);
        var lowerLeftPoint = {
            x: this.findLeftmostPoint(),
            y: this.findLowestPoint()
        };

        var magnitudeParts = {
          x: x - lowerLeftPoint.x,
          y: y - lowerLeftPoint.y
        };


        var index;
        for (index = 0; index < points.length; ++index) {
          if (index % 2 === 0) {
            points[index] += magnitudeParts.x;
          } else {
            points[index] += magnitudeParts.y;
          }
        }
        console.log(points);
        this.polygon.setTo(points);
    };

    this.moveToY = function(destinationY) {
        var points = this.polygon.toNumberArray();
        var index;
        var minY = this.findHighestPoint();

        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 1) {
                // minY is necessary to adjust for the size of the this
                points[index] += destinationY - minY;
            }
        }

        this.polygon.setTo(points);
    };

    this.moveByY = function(amountY) {
        var points = this.polygon.toNumberArray();
        var index;
        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 1) {
                points[index] += amountY;
            }
        }
        this.polygon.setTo(points);
    };

    this.findLeftmostPoint = function() {
        var points = this.polygon.toNumberArray();
        var minX = 99999;
        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 0) {
                minX = Math.min(points[index], minX);
            }
        }
        if (minX == 99999) {
            throw "Polygon was too far off the screen, unsure how you got here, but congratulations; file a bug." + points;
        }
        return minX;
    };

    this.findRightmostPoint = function() {
        var points = this.polygon.toNumberArray();
        var maxX = -99999;
        var index;
        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 0) {
                maxX = Math.max(points[index], maxX);
            }
        }
        if (maxX == -99999) {
            throw "Polygon was too far off the screen, unsure how you got here, but congratulations; file a bug." + points;
        }
        return maxX;
    };


    this.findHighestPoint = function() {
        var points = this.polygon.toNumberArray();
        var minY = 99999;
        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 1) {
                minY = Math.min(points[index], minY);
            }
        }
        if (minY == 99999) {
            throw "Polygon was too far off the screen, unsure how you got here, but congratulations; file a bug." + points;
        }
        return minY;
    };

    this.findLowestPoint = function() {
        var points = this.polygon.toNumberArray();
        var maxY = -99999;
        var index;
        for (index = 0; index < points.length; ++index) {
            if (index % 2 === 1) {
                maxY = Math.max(points[index], maxY);
            }
        }
        if (maxY == -99999) {
            throw "Polygon was too far off the screen, unsure how you got here, but congratulations; file a bug." + points;
        }
        return maxY;
    };

    this.decompose = function() {
        var rawPoints = this.polygon.toNumberArray();
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

    this.draw = function(graphics) {
        graphics.beginFill(this.color);
        graphics.drawShape(this.polygon);
        graphics.endFill();
    };

    this.intersects = function(other) {
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
}
