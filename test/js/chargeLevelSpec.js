describe("Charge levels", function() {
    it("should return 3 with the highest level", function() {
        expect(chargeLevel(constants.chargeLevels[3])).toBe(3);
        expect(chargeLevel(constants.chargeLevels[3] + 1)).toBe(3);
    });

    it("should return 2 with the 2nd highest level", function() {
      expect(chargeLevel(constants.chargeLevels[2])).toBe(2);
      expect(chargeLevel(constants.chargeLevels[2] + 1)).toBe(2);
    });

    it("should return 1 with the 3rd highest level", function() {
      expect(chargeLevel(constants.chargeLevels[1])).toBe(1);
      expect(chargeLevel(constants.chargeLevels[1] + 1)).toBe(1);
    });

    it("should return 0 with the lowest level", function() {
      expect(chargeLevel(constants.chargeLevels[1] - 1)).toBe(0);
    });

    it("should return 0 at 0", function() {
      expect(chargeLevel(0)).toBe(0);
    });

    it("should return 3 at 100%", function() {
      expect(chargeLevel(100)).toBe(3);
    });

    it("should return 0 below 0", function() {
      expect(chargeLevel(-123)).toBe(0);
    });

    it("should return 3 at greater than 100%", function() {
      expect(chargeLevel(110));
    });

});
