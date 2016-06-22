describe("Charge levels", function() {
    it("should return 2 with the highest level", function() {
      expect(chargeLevel(constants.chargeLevels[2], 100)).toBe(2);
      expect(chargeLevel(constants.chargeLevels[2] + 1, 100)).toBe(2);
    });

    it("should return 1 with the 2nd highest level", function() {
      expect(chargeLevel(constants.chargeLevels[1], 100)).toBe(1);
      expect(chargeLevel(constants.chargeLevels[1] + 1, 100)).toBe(1);
    });

    it("should return 0 with the lowest level", function() {
      expect(chargeLevel(constants.chargeLevels[1] - 1, 100)).toBe(0);
    });

    it("should return 0 below 0", function() {
      expect(chargeLevel(-123, 100)).toBe(0);
    });

    it("should return 3 at greater than 100%", function() {
      expect(chargeLevel(110, 100));
    });

});
