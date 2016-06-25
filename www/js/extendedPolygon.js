function ExtendedPolygon(polygonToExtend, color) {
    this.color = color;
    this.polygon = polygonToExtend.clone();
    this.visible = true;

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

    this.setHeight = function(newHeight) {
        newHeight = Math.ceil(newHeight);
        var points = this.toPoints();
        var lowestY = this.findLowestPoint();
        var highestY = this.findHighestPoint();
        var oldHeight = lowestY - highestY;
        var index;
        for (index = 0; index < points.length; ++index) {
            var point = points[index];
            point.y = (point.y) * (newHeight / oldHeight);
        }
        this.fromPoints(points);
        this.moveToY(lowestY - newHeight);
        this.height = newHeight;
    };

    this.findHeight = function() {
        return this.findLowestPoint() - this.findHighestPoint();
    };

    this.toPoints = function() {
        var components = this.polygon.toNumberArray();
        var points = [];
        var index;
        for (index = 0; index < components.length; ++index) {
            points.push({
                x: components[index++],
                y: components[index]
            });
        }
        return points;
    };

    this.fromPoints = function(points) {
        var components = [];
        var index;
        for (index = 0; index < points.length; ++index) {
            components.push(points[index].x);
            components.push(points[index].y);
        }
        this.polygon.setTo(components);
    };

    this.setLowerLeftTo = function(x, y) {
        var points = this.toPoints();
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
            points[index].x += magnitudeParts.x;
            points[index].y += magnitudeParts.y;
        }
        this.fromPoints(points);
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
        if (this.visible) {
            graphics.beginFill(this.color);
            graphics.drawShape(this.polygon);
            graphics.endFill();
        }
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

    this.onLand = new Phaser.Signal();
    this.onLand.add(function() {
        game.sound.play('land');
    });

    this.applyGravity = function() {
        if (this.vspeed !== 0 || !this.onGround()) {
            this.moveByY(this.vspeed);
            var gravityStep = this.vspeed > 0 ? constants.gravityStepDown : constants.gravityStepUp;
            this.vspeed -= gravityStep;

            // On hitting ground
            if (this.findLowerLeftPoint().y >= constants.groundHeight) {
                this.onLand.dispatch(this.vspeed);
                this.vspeed = 0;
                this.setLowerLeftTo(this.findLeftmostPoint(), constants.groundHeight);
            }
        }
    };

    this.findLowerLeftPoint = function() {
        return {
            x: this.findLeftmostPoint(),
            y: this.findLowestPoint()
        };
    };

    this.onGround = function() {
        return this.findLowerLeftPoint().y > constants.groundHeight - 1;
    };

    this.vspeed = 0;
    this.height = this.findHeight();
}
