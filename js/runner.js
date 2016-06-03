var runner = function(startingX, groundHeight) {
    var runner = new Phaser.Rectangle(startingX, groundHeight - constants.tileSize, constants.tileSize, constants.tileSize);

    runner.onGroundY = groundHeight - constants.tileSize;
    runner.vspeed = 0;
    runner.color = colorPalette.runner;

    runner.canJump = function() {
        return this.y === this.onGroundY;
    };

    runner.applyGravity = function() {
        this.y += this.vspeed;
        var gravityStep = this.vspeed > 0 ? constants.gravityStepDown : constants.gravityStepUp;
        this.vspeed -= gravityStep;

        // On hitting ground
        if (this.y >= this.onGroundY) {
            this.vspeed = 0;
            this.y = this.onGroundY;
        }
    };

    runner.jump = function() {
        this.vspeed = constants.jumpStrength;
    };

    return runner;
};
