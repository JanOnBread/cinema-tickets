import logger from "../../utils/logger";

/**
 *
 * @param {Array} ticketTypeRequests
 * @description
 */

export default function extractTicketRequest(ticketTypeRequests) {
  logger.debug("In extractTicketRequest()");

  let adultCount = 0,
    childCount = 0,
    infantCount = 0;

  for (const ticket of ticketTypeRequests) {
    if (ticket.getTicketType() === "ADULT") {
      adultCount = ticket.getNoOfTickets();
    } else if (ticket.getTicketType() === "CHILD") {
      childCount = ticket.getNoOfTickets();
    } else if (ticket.getTicketType() === "INFANT") {
      infantCount = ticket.getNoOfTickets();
    }
  }

  return {
    adult: adultCount,
    child: childCount,
    infant: infantCount,
  };
}
