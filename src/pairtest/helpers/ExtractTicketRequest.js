import logger from "../../utils/logger";
import * as constants from "./../../utils/constants";

/**
 * @param {Array} ticketTypeRequests
 * @description extract ticketTypeRequest so it's easier to work with
 */
export default function extractTicketRequest(ticketTypeRequests) {
  logger.debug("In extractTicketRequest()");

  let adultCount = 0,
    childCount = 0,
    infantCount = 0;

  for (const ticket of ticketTypeRequests) {
    if (ticket.getTicketType() === constants.ADULT_TYPE) {
      adultCount = ticket.getNoOfTickets();
    } else if (ticket.getTicketType() === constants.CHILD_TYPE) {
      childCount = ticket.getNoOfTickets();
    } else if (ticket.getTicketType() === constants.INFANT_TYPE) {
      infantCount = ticket.getNoOfTickets();
    }
  }

  return {
    adult: adultCount,
    child: childCount,
    infant: infantCount,
  };
}
