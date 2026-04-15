import logger from "../../utils/logger";
import * as constants from "./../../utils/constants";

/**
 * @description extract ticketTypeRequest so it's easier to work with
 * @param {Array} ticketTypeRequests
 */
export default function extractTicketRequest(ticketTypeRequests) {
  logger.debug("In extractTicketRequest()");

  const ticketCounts = {
    [constants.ADULT_TYPE]: 0,
    [constants.CHILD_TYPE]: 0,
    [constants.INFANT_TYPE]: 0,
  };

  for (const ticket of ticketTypeRequests) {
    const ticketType = ticket.getTicketType();
    if (Object.hasOwn(ticketCounts, ticketType)) {
      ticketCounts[ticketType] += ticket.getNoOfTickets();
    }
  }

  return ticketCounts;
}
