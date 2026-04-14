import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import logger from "../utils/logger.js";
import extractTicketRequest from "./helpers/ExtractTicketRequest.js";
import { validateRequest } from "./helpers/ValidateRequest.js";
import calculateCostsAndSeats from "./helpers/CalculateCostsAndSeats.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  #makePayment(accountId, totalPrice) {
    new TicketPaymentService().makePayment(accountId, totalPrice);
  }

  #reserveSeats(accountId, numSeatsRequired) {
    new SeatReservationService().reserveSeat(accountId, numSeatsRequired);
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    logger.debug("In purchaseTickets()");

    // throws InvalidPurchaseException

    try {
      let requestedTickets = extractTicketRequest(ticketTypeRequests);

      validateRequest(accountId, requestedTickets);

      const { totalPrice, numSeats } = calculateCostsAndSeats(requestedTickets);

      this.#makePayment(accountId, totalPrice);
      this.#reserveSeats(accountId, numSeats);

      return { price: totalPrice, seatReservation: numSeats };
    } catch (error) {
      throw new InvalidPurchaseException(`Purchase failed: ${error?.message}`);
    }
  }
}
