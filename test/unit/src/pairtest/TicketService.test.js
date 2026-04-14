import TicketService from "../../../../src/pairtest/TicketService";
import TicketTypeRequest from "../../../../src/pairtest/lib/TicketTypeRequest";
import * as constant from "../../../../src/utils/constants";
import * as error from "../../../../src/utils/errors";

const errorMessage = (errorString) =>
  new Error(`Purchase failed: ${errorString}`);

describe("TicketService", () => {
  let ticketService;

  beforeEach(() => {
    ticketService = new TicketService();
  });

  // GENERAL CHECK
  test("should be defined", () => {
    expect(ticketService.purchaseTickets).toBeDefined();
  });

  test("should throw an error if the payment service returns and error", () => {
    ticketService.purchaseTickets(
      constant.TEST_ACCOUNT_ID,
      new TicketTypeRequest(constant.ADULT_TYPE, 1),
    );
  });

  test("should throw an error if the seat reservation service returns and error", () => {
    ticketService.purchaseTickets(
      constant.TEST_ACCOUNT_ID,
      new TicketTypeRequest(constant.ADULT_TYPE, 1),
    );
  });

  // BUSINESS LOGIC

  test("should return the cost and number of seats allocated", () => {
    const result = ticketService.purchaseTickets(
      constant.TEST_ACCOUNT_ID,
      new TicketTypeRequest(constant.ADULT_TYPE, 3),
      new TicketTypeRequest(constant.CHILD_TYPE, 2),
      new TicketTypeRequest(constant.INFANT_TYPE, 1),
    );

    expect(result).toEqual({ price: 105, seatReservation: 5 });
  });

  test("should return the cost and number of seats allocated when there are no child tickets", () => {
    const result = ticketService.purchaseTickets(
      constant.TEST_ACCOUNT_ID,
      new TicketTypeRequest(constant.ADULT_TYPE, 3),
      new TicketTypeRequest(constant.INFANT_TYPE, 3),
    );

    expect(result).toEqual({ price: 75, seatReservation: 3 });
  });

  test("should return the cost and number of seats allocated when there are no infant tickets", () => {
    const result = ticketService.purchaseTickets(
      constant.TEST_ACCOUNT_ID,
      new TicketTypeRequest(constant.ADULT_TYPE, 1),
      new TicketTypeRequest(constant.CHILD_TYPE, 3),
    );

    expect(result).toEqual({ price: 70, seatReservation: 4 });
  });

  test("should throw an error if more the 25 ticket was about at once", () => {
    expect(() =>
      ticketService.purchaseTickets(
        constant.TEST_ACCOUNT_ID,
        new TicketTypeRequest(constant.ADULT_TYPE, 26),
      ),
    ).toThrow(errorMessage(error.OVER_25_TICKETS));
  });

  test("should throw an error if an invalid number of tickets is attempting to be purchased", () => {
    expect(() =>
      ticketService.purchaseTickets(
        constant.TEST_ACCOUNT_ID,
        new TicketTypeRequest(constant.ADULT_TYPE, -1),
      ),
    ).toThrow(errorMessage(error.NEGATIVE_TICKETS));
  });

  test("Child and Infant tickets cannot be purchased without purchasing an Adult ticket", () => {
    expect(() =>
      ticketService.purchaseTickets(
        constant.TEST_ACCOUNT_ID,
        new TicketTypeRequest(constant.CHILD_TYPE, 1),
        new TicketTypeRequest(constant.INFANT_TYPE, 1),
      ),
    ).toThrow(errorMessage(error.ONE_ADULT_TICKET));
  });

  test("Infant ticket shouldn't exceed total adult tickets", () => {
    expect(() =>
      ticketService.purchaseTickets(
        constant.TEST_ACCOUNT_ID,
        new TicketTypeRequest(constant.ADULT_TYPE, 1),
        new TicketTypeRequest(constant.INFANT_TYPE, 2),
      ),
    ).toThrow(errorMessage(error.INFANT_MORE_THAN_ADULT));
  });
});
