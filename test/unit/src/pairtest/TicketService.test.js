import TicketService from "../../../../src/pairtest/TicketService";
import TicketTypeRequest from "../../../../src/pairtest/lib/TicketTypeRequest";
import * as constant from "../../../../src/utils/constants";
import * as error from "../../../../src/utils/errors";
import TicketPaymentService from "../../../../src/thirdparty/paymentgateway/TicketPaymentService";
import SeatReservationService from "../../../../src/thirdparty/seatbooking/SeatReservationService";

jest.mock("../../../../src/thirdparty/paymentgateway/TicketPaymentService");
jest.mock("../../../../src/thirdparty/seatbooking/SeatReservationService");

const errorMessage = (errorString) =>
  new Error(`Purchase failed: ${errorString}`);

describe("TicketService", () => {
  let ticketService;
  let mockMakePayment;
  let mockSeatReservation;

  beforeEach(() => {
    ticketService = new TicketService();

    mockMakePayment = jest.fn();
    TicketPaymentService.mockImplementation(() => {
      return { makePayment: mockMakePayment };
    });

    mockSeatReservation = jest.fn();
    SeatReservationService.mockImplementation(() => {
      return { reserveSeat: mockSeatReservation };
    });
  });

  // GENERAL CHECK
  test("should be defined", () => {
    expect(ticketService.purchaseTickets).toBeDefined();
  });

  test("should throw an error if the payment service returns an error", () => {
    mockMakePayment.mockImplementationOnce(() => {
      throw new Error(error.TICKET_PAYMENT_FAILED);
    });

    expect(() =>
      ticketService.purchaseTickets(
        constant.TEST_ACCOUNT_ID,
        new TicketTypeRequest(constant.ADULT_TYPE, 1),
      ),
    ).toThrow(errorMessage(error.TICKET_PAYMENT_FAILED));
  });

  test("should throw an error if the seat reservation service returns an error", () => {
    mockSeatReservation.mockImplementationOnce(() => {
      throw new Error(error.SEAT_RESERVATION_FAILED);
    });

    expect(() =>
      ticketService.purchaseTickets(
        constant.TEST_ACCOUNT_ID,
        new TicketTypeRequest(constant.ADULT_TYPE, 1),
      ),
    ).toThrow(errorMessage(error.SEAT_RESERVATION_FAILED));
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
