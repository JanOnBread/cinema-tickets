import TicketService from "../src/pairtest/TicketService";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";

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
    ticketService.purchaseTickets(1, new TicketTypeRequest("ADULT", 1));
  });

  test("should throw an error if the seat reservation service returns and error", () => {
    ticketService.purchaseTickets(1, new TicketTypeRequest("ADULT", 1));
  });

  // BUSINESS LOGIC

  test("should return the cost and number of seats allocated", () => {
    ticketService.purchaseTickets(1, new TicketTypeRequest("ADULT", 1));
  });

  test("should throw an error if more the 25 ticket was about at once", () => {
    ticketService.purchaseTickets(1, new TicketTypeRequest("ADULT", 1));
  });

  test("should throw an error if an invalid number of tickets is attempting to be purchased", () => {
    ticketService.purchaseTickets(1, new TicketTypeRequest("ADULT", -1));
  });

  test("Child and Infant tickets cannot be purchased without purchasing an Adult ticket", () => {
    ticketService.purchaseTickets(1, new TicketTypeRequest("CHILD", 1));

    ticketService.purchaseTickets(1, new TicketTypeRequest("INFANT", 1));

    ticketService.purchaseTickets(
      1,
      new TicketTypeRequest("CHILD", 1),
      new TicketTypeRequest("INFANT", 1),
    );
  });

  test("Assume an adult can only have 1 infant on their lap", () => {
    const result = ticketService.purchaseTickets(
      1,
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("INFANT", 2),
    );

    expect(result).toThrow(InvalidInputException);
  });
});
