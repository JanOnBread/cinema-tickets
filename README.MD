# CINEMA TICKETS

A JavaScript service simulating microservice interactions between `TickerService.js`, `TicketPaymentService.js`, and `ServiceReservationService.js`.

For this test, the focus will be on developing the `TickerService.js` to meet the following business requirements. The code will be clean, reusable, and well-tested.

The core logic resides in the `TickerService` class in `TickerService.js`. It accepts a numeric account ID and an array of ticket requests. There are three ticket types: `ADULT`, `CHILD`, and `INFANT`. The service validates the requests based on business rules, calculates the total cost and required number of seats, then calls external services to process payment and reserve the seats. Finally, the service returns the total ticket cost and the number of seats reserved.

# Business rules and conditions

![alt text](resource/image.png)

- There are 3 types of tickets i.e. `INFANT`, `CHILD`, and `ADULT`.

- The ticket prices are based on the type of ticket.

- The ticket purchaser declares how many and what type of tickets they want to buy.

- Multiple tickets can be purchased at any given time.

- Only a maximum of 25 tickets that can be purchased at a time.

- Infants do not pay for a ticket and are not allocated a seat. They will be sitting on an Adult's lap.

- Child and Infant tickets cannot be purchased without purchasing an Adult ticket.

- There is an existing `TicketPaymentService` responsible for taking payments.

- There is an existing `SeatReservationService` responsible for reserving seats.

## Assumptions

- All accounts with an id greater than zero are valid. They also have sufficient funds to pay for any no of tickets.

- The `TicketPaymentService` implementation is an external provider with no defects.

- The payment will always go through once a payment request has been made to the `TicketPaymentService`.

- The `SeatReservationService` implementation is an external provider with no defects.

- The seat will always be reserved once a reservation request has been made to the `SeatReservationService`.

# Logic to apply

Looking at the business rules and assumptions, we format that into logic and validations we should apply to the code.

## Ways validation would fail

- If the account ID was not a number or negative.

- If a negative number of tickets was attempted to be purchased

- If child and infant tickets are selected without an adult ticket ie `{CHILD : 1+, INFANT: 1+, ADULT : 0 }` which means at least one adult ticket must be purchased.

- if more then 25 tickets were being purchased at once

- Assume adult can only have 1 infant on their lap so the # adult ticket must be greater or equal to # infant tickets

# Approach

The plan, as illustrated in the diagram above, is to allow the request to flow through the `TicketService.js`. The request will go through a series of steps: extraction, validation, and calculation, before finally being sent to `TicketPaymentService.js` and `SeatReservationService.js` to handle the payment and reserve the correct number of seats.

This entire process is wrapped in a try-catch block, so if an error occurs at any point, it will be caught and thrown back.

A brief explanation of the helper modules:

- `ExtractTicketRequest.js`: Extracts the ticket type request, making it easier to work with during validation and cost calculation.
- `ValidationRequest.js`: Validates the request against the business logic.
- `CalculateCostsAndSeats.js`: If the request passes validation, this module uses the extracted data to calculate the total cost and the number of seats to reserve.

# Setup

The services uses Node version 24.14.1 the LTD version of node as of writing this. An 'nvmrc' file is provided and we can switch to use this node version with the command

```
nvm use
```

To install packages and dependencies:

```
npm install
```

# Tests

The unit tests can be ran with

```
npm run test:unit
```

We can run our linting test via

```
npm run test:lint
```
