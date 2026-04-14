import logger from "../../utils/logger";
import InvalidPurchaseException from "../lib/InvalidPurchaseException";
import * as error from "./../../utils/errors";

/**
 * @param {Number} accountID
 * @param {{ADULT: number, CHILD: number, INFANT : number}} requestedTickets
 * @description validates the account is numeric. Throws error when invalid
 */
export function validateRequest(accountID, requestedTickets) {
  logger.debug("In validateRequest()");

  validateAccountID(accountID);
  validateNumberOfTickets(requestedTickets);
  validateTicketsLogic(requestedTickets);
}

/**
 * @param {Number} accountID
 * @description validates the account is numeric. Throws error when invalid
 */
export function validateAccountID(accountID) {
  logger.debug("In validateAccountID()");

  if (typeof accountID !== "number") {
    throw new TypeError(error.NON_NUMBER_ACCOUNT_ID);
  }

  if (Number(accountID) < 0) {
    throw new TypeError(error.NEGATIVE_ACCOUNT_ID);
  }
}

export function validateNumberOfTickets(requestedTickets) {
  logger.debug("In validateNumberOfTickets()");

  // no negative tickets
  if (
    requestedTickets.ADULT < 0 ||
    requestedTickets.INFANT < 0 ||
    requestedTickets.CHILD < 0
  ) {
    throw new InvalidPurchaseException(error.NEGATIVE_TICKETS);
  }

  // at lest 1 adult ticket
  if (requestedTickets.ADULT === 0) {
    throw new InvalidPurchaseException(error.ONE_ADULT_TICKET);
  }

  // total != 25
  if (
    requestedTickets.ADULT + requestedTickets.INFANT + requestedTickets.CHILD >
    25
  ) {
    throw new InvalidPurchaseException(error.OVER_25_TICKETS);
  }
}

export function validateTicketsLogic(requestedTickets) {
  logger.debug("In validateTicketsLogic()");

  //  # adult < infant
  if (requestedTickets.ADULT < requestedTickets.INFANT) {
    throw new InvalidPurchaseException(error.INFANT_MORE_THAN_ADULT);
  }
}
