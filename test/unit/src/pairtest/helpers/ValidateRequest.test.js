import {
  validateRequest,
  validateAccountID,
  validateNumberOfTickets,
  validateTicketsLogic,
} from "../../../../../src/pairtest/helpers/ValidateRequest";
import * as error from "../../../../../src/utils/errors";

describe("ValidateRequest", () => {
  test("should be defined", () => {
    expect(validateRequest).toBeDefined();
    expect(validateAccountID).toBeDefined();
    expect(validateNumberOfTickets).toBeDefined();
    expect(validateTicketsLogic).toBeDefined();
  });

  // Validate Account ID

  test("should give an error if the account ID is not a number", () => {
    expect(() => validateAccountID("string")).toThrow(
      error.NON_NUMBER_ACCOUNT_ID,
    );
  });

  test("should give an error if the account ID is negative", () => {
    expect(() => validateAccountID(-1)).toThrow(error.NEGATIVE_ACCOUNT_ID);
  });

  // validate number of tickets

  test("should give an error if there are any negative tickets", () => {
    expect(() =>
      validateNumberOfTickets({ adult: -1, infant: -1, child: -1 }),
    ).toThrow(error.NEGATIVE_TICKETS);
  });

  test("should give an error if there are no adult ticket purchase ", () => {
    expect(() =>
      validateNumberOfTickets({ adult: 0, infant: 1, child: 1 }),
    ).toThrow(error.ONE_ADULT_TICKET);
  });

  test("should give an error if more then 25 tickets are bought at once", () => {
    expect(() =>
      validateNumberOfTickets({ adult: 26, infant: 0, child: 0 }),
    ).toThrow(error.OVER_25_TICKETS);
  });

  // validateTicketsLogic
  test("should give an error if the number of infant ticket is more then the number of adult tickets", () => {
    expect(() =>
      validateTicketsLogic({ adult: 1, infant: 2, child: 0 }),
    ).toThrow(error.INFANT_MORE_THAN_ADULT);
  });
});
