import logger from "../../utils/logger";
import InvalidPurchaseException from "../lib/InvalidPurchaseException";
import * as error from "./../../utils/errors";

/**
 * @param {Number} accountID
 * @param {{adult: number, child: number, infant : number}} requestedTickets
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
function validateAccountID(accountID) {
  logger.debug("In validateAccountID()");

  if (typeof accountID !== "number") {
    throw new TypeError(error.NON_NUMBER_ACCOUNT_ID);
  }

  if (Number(accountID) < 0) {
    throw new TypeError(error.NEGATIVE_ACCOUNT_ID);
  }
}

function validateNumberOfTickets(requestedTickets) {
  logger.debug("In validateNumberOfTickets()");

  // no negative tickets
  if (
    requestedTickets.adult < 0 ||
    requestedTickets.infant < 0 ||
    requestedTickets.child < 0
  ) {
    throw new InvalidPurchaseException(error.NEGATIVE_TICKETS);
  }

  // at lest 1 adult ticket
  if (requestedTickets.adult === 0) {
    throw new InvalidPurchaseException(error.ONE_ADULT_TICKET);
  }

  // total != 25
  if (
    requestedTickets.adult + requestedTickets.infant + requestedTickets.child >
    25
  ) {
    throw new InvalidPurchaseException(error.OVER_25_TICKETS);
  }
}

function validateTicketsLogic(requestedTickets) {
  logger.debug("In validateTicketsLogic()");

  // #child/infant ticket < adult ticket
  if (
    requestedTickets.adult <
    requestedTickets.child + requestedTickets.infant
  ) {
    throw new InvalidPurchaseException(error.CHILD_INFANT_MORE_THAN_ADULT);
  }
}
