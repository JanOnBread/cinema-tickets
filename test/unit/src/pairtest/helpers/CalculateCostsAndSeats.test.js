import calculateCostsAndSeats from "../../../../../src/pairtest/helpers/CalculateCostsAndSeats";

describe("CalculateCostsAndSeats", () => {
  test("should be defined", () => {
    expect(calculateCostsAndSeats).toBeDefined();
  });

  test("should calculate the right 1 for total cost and seats", () => {
    const result = calculateCostsAndSeats({ ADULT: 1, CHILD: 1, INFANT: 1 });

    expect(result).toEqual({ totalPrice: 40, numSeats: 2 });
  });
});
