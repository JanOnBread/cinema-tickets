import logger from "../../utils/logger";
import InvalidPurchaseException from "../lib/InvalidPurchaseException";
import * as error from "./../../utils/errors";
import { MAX_TICKET_PURCHASE } from "./../../utils/constants";
/**
 * @description Validates account and ticket request.
 * @param {Number} accountID
 * @param {{ADULT: number, CHILD: number, INFANT: number}} requestedTickets
 */
export function validateRequest(accountID, requestedTickets) {
  logger.debug("In validateRequest()");

  validateAccountID(accountID);
  validateTicketQuantities(requestedTickets);
  validateTicketLogic(requestedTickets);
}

/**
 * @description Validates the account ID is a positive number.
 * @param {Number} accountID
 */
export function validateAccountID(accountID) {
  logger.debug("In validateAccountID()");

  if (typeof accountID !== "number") {
    throw new TypeError(error.NON_NUMBER_ACCOUNT_ID);
  }

  if (accountID < 0) {
    throw new TypeError(error.NEGATIVE_ACCOUNT_ID);
  }
}

/**
 * @description Validates the number of requested tickets, ensuring they adhere to business logic.
 * @param {{ADULT: number, CHILD: number, INFANT: number}} requestedTickets
 */
export function validateTicketQuantities(requestedTickets) {
  logger.debug("In validateTicketQuantities()");

  if (hasNegativeTickets(requestedTickets)) {
    throw new InvalidPurchaseException(error.NEGATIVE_TICKETS);
  }

  if (requestedTickets.ADULT === 0) {
    throw new InvalidPurchaseException(error.ONE_ADULT_TICKET);
  }

  if (
    requestedTickets.ADULT + requestedTickets.INFANT + requestedTickets.CHILD >
    MAX_TICKET_PURCHASE
  ) {
    throw new InvalidPurchaseException(error.OVER_25_TICKETS);
  }
}

/**
 * @description Checks if any ticket count is negative.
 * @param {{ADULT: number, CHILD: number, INFANT: number}} requestedTickets
 * @returns {boolean} true if any ticket count is negative
 */
function hasNegativeTickets(requestedTickets) {
  return (
    requestedTickets.ADULT < 0 ||
    requestedTickets.INFANT < 0 ||
    requestedTickets.CHILD < 0
  );
}

/**
 * Validates business logic related to ticket quantities.
 * @param {{ADULT: number, CHILD: number, INFANT: number}} requestedTickets
 */
export function validateTicketLogic(requestedTickets) {
  logger.debug("In validateTicketLogic()");

  if (requestedTickets.ADULT < requestedTickets.INFANT) {
    throw new InvalidPurchaseException(error.INFANT_MORE_THAN_ADULT);
  }
}
