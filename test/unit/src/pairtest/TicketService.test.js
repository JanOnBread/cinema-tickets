import TicketService from "../../../../src/pairtest/TicketService";
import TicketTypeRequest from "../../../../src/pairtest/lib/TicketTypeRequest";

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
    const result = ticketService.purchaseTickets(
      1,
      new TicketTypeRequest("ADULT", 3),
      new TicketTypeRequest("CHILD", 2),
      new TicketTypeRequest("INFANT", 1),
    );

    expect(result).toEqual({ price: 105, seatReservation: 5 });
  });

  test("should throw an error if more the 25 ticket was about at once", () => {
    expect(() =>
      ticketService.purchaseTickets(1, new TicketTypeRequest("ADULT", 26)),
    ).toThrow(
      new Error("Purchase failed: can't purchase more then 25 tickets at once"),
    );
  });

  test("should throw an error if an invalid number of tickets is attempting to be purchased", () => {
    expect(() =>
      ticketService.purchaseTickets(1, new TicketTypeRequest("ADULT", -1)),
    ).toThrow(
      new Error("Purchase failed: no negative tickets can be purchased"),
    );
  });

  test("Child and Infant tickets cannot be purchased without purchasing an Adult ticket", () => {
    expect(() =>
      ticketService.purchaseTickets(
        1,
        new TicketTypeRequest("CHILD", 1),
        new TicketTypeRequest("INFANT", 1),
      ),
    ).toThrow(
      new Error("Purchase failed: at least 1 adult needs to be purchased"),
    );
  });

  test("Assume an adult can only have 1 infant on their lap", () => {
    expect(() =>
      ticketService.purchaseTickets(
        1,
        new TicketTypeRequest("ADULT", 1),
        new TicketTypeRequest("INFANT", 2),
      ),
    ).toThrow(
      new Error(
        "Purchase failed: the total child and infant ticket is greater then the number of adult ticket purchased",
      ),
    );
  });
});
