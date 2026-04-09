import TicketService from "../../../src/pairtest/TicketService";

describe("TestService", () => {
  it(" should give an error if a child and or an infant ticket is selected but no adult ticket is also selected ", () => {
    requestTickets = {
      child: 1,
      infant: 1,
      adult: 0,
    };
  });
});

// Adult ticket.

// |   Ticket Type    |     Price   |

// | ---------------- | ----------- |

// |    INFANT        |    £0       |

// |    CHILD         |    £15     |

// |    ADULT         |    £25      |
