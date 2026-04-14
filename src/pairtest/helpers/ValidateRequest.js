import InvalidPurchaseException from "../lib/InvalidPurchaseException";

export function validateRequest(accountID, requestedTickets) {
  logger.debug("In validateRequest()");

  validateAccountID(accountID);
  validateNumberOfTickets(requestedTickets);
  validateTicketsLogic(requestedTickets);
}

/**
 *
 * @param {Number} accountId
 * @description validates the account is numeric. Throws error when invalid
 */
function validateAccountID(accountID) {
  logger.debug("In validateAccountID()");

  if (typeof accountID !== "number") {
    throw new TypeError("account ID is not an number");
  }

  if (Number(accountID) < 0) {
    throw new TypeError("account ID is a negative number");
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
    throw new InvalidPurchaseException("no negative tickets can be purchased");
  }

  // at lest 1 adult ticket
  if (requestedTickets.adult === 0) {
    throw new InvalidPurchaseException(
      "at least 1 adult needs to be purchased",
    );
  }

  // total != 25
  if (
    requestedTickets.adult + requestedTickets.infant + requestedTickets.child >
    25
  ) {
    throw new InvalidPurchaseException(
      "can't purchase more then 25 tickets at once",
    );
  }
}

function validateTicketsLogic(requestedTickets) {
  logger.debug("In validateTicketsLogic()");

  // #child/infant ticket < adult ticket
  if (
    requestedTickets.adult <
    requestedTickets.child + requestedTickets.infant
  ) {
    throw new InvalidPurchaseException(
      "the total child and infant ticket is greater then the number of adult ticket purchased",
    );
  }
}
