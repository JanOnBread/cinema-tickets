import logger from "../../utils/logger";

export default function calculateCostsAndSeats(requestedTickets) {
  logger.debug("In calculateCostsAndSeats()");

  return {
    totalPrice: requestedTickets.adult * 25 + requestedTickets.child * 15,
    numSeats: requestedTickets.adult + requestedTickets.child,
  };
}
