import logger from "../../utils/logger";
import * as constants from "../../utils/constants";

/**
 * @param {{adult: number, child: number, infant : number}} requestedTickets
 * @returns {{totalPrice: number, numSeats: number}}
 * @description Calculate the total cost and number of seat based on the ticket request
 */
export default function calculateCostsAndSeats(requestedTickets) {
  logger.debug("In calculateCostsAndSeats()");

  return {
    totalPrice:
      requestedTickets.adult * constants.ADULT_PRICE +
      requestedTickets.child * constants.CHILD_PRICE +
      requestedTickets.infant * constants.INFANT_PRICE,
    numSeats: requestedTickets.adult + requestedTickets.child,
  };
}

// return {
//   adult: adultCount,
//   child: childCount,
//   infant: infantCount,
// };
