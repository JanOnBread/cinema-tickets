import extractTicketRequest from "../../../../../src/pairtest/helpers/ExtractTicketRequest";
import TicketTypeRequest from "../../../../../src/pairtest/lib/TicketTypeRequest";
import * as constant from "../../../../../src/utils/constants";

describe("CalculateCostsAndSeats", () => {
  test("should be defined", () => {
    expect(extractTicketRequest).toBeDefined();
  });

  test("should correctly extract the ticketTypeRequest", () => {
    const result = extractTicketRequest([
      new TicketTypeRequest(constant.ADULT_TYPE, 3),
      new TicketTypeRequest(constant.CHILD_TYPE, 2),
      new TicketTypeRequest(constant.INFANT_TYPE, 1),
    ]);

    expect(result).toEqual({
      adult: 3,
      child: 2,
      infant: 1,
    });
  });
});
