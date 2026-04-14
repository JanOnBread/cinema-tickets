import logger from "../../utils/logger";
import * as constants from "../../utils/constants";

/**
 * @param {{ADULT: number, CHILD: number, INFANT : number}} requestedTickets
 * @returns {{totalPrice: number, numSeats: number}}
 * @description Calculate the total cost and number of seat based on the ticket request
 */
export default function calculateCostsAndSeats(requestedTickets) {
  logger.debug("In calculateCostsAndSeats()");

  return {
    totalPrice:
      requestedTickets.ADULT * constants.ADULT_PRICE +
      requestedTickets.CHILD * constants.CHILD_PRICE +
      requestedTickets.INFANT * constants.INFANT_PRICE,
    numSeats: requestedTickets.ADULT + requestedTickets.CHILD,
  };
}
