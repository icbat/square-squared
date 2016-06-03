var runner = function(startingX, groundHeight) {
    var runner = new Phaser.Rectangle(startingX, groundHeight - constants.tileSize, constants.tileSize, constants.tileSize);

    runner.onGroundY = groundHeight - constants.tileSize;
    runner.vspeed = 0;
    runner.color = colorPalette.runner;

    runner.canJump = function() {
        return this.findUpperLeftPoint().y === this.onGroundY;
    };

    runner.applyGravity = function() {
        this.moveByY(this.vspeed);
        var gravityStep = this.vspeed > 0 ? constants.gravityStepDown : constants.gravityStepUp;
        this.vspeed -= gravityStep;

        // On hitting ground
        if (this.findUpperLeftPoint().y >= this.onGroundY) {
            this.vspeed = 0;
            this.moveToY(this.onGroundY);
        }
    };

    runner.jump = function() {
        this.vspeed = constants.jumpStrength;
    };

    runner.findUpperLeftPoint = function() {
      return {
        x: this.x,
        y: this.y
      };
    };

    runner.moveToY = function(destinationY) {
      this.y = destinationY;
    };

    runner.moveByY = function(impulse) {
      this.y += impulse;
    };

    return runner;
};
