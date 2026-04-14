import calculateCostsAndSeats from "../../../../../src/pairtest/helpers/CalculateCostsAndSeats";

describe("CalculateCostsAndSeats", () => {
  test("should be defined", () => {
    expect(calculateCostsAndSeats).toBeDefined();
  });

  test("should calculate the right 1 for total cost and seats", () => {
    const result = calculateCostsAndSeats({ adult: 1, child: 1, infant: 1 });

    expect(result).toEqual({ totalPrice: 40, numSeats: 2 });
  });
});
