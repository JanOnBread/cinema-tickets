//   return {
//     adult: adultCount,
//     child: childCount,
//     infant: infantCount,
//   };
// }

import logger from "../../utils/logger";

// |   Ticket Type    |     Price   |

// | ---------------- | ----------- |

// |    INFANT        |    £0       |

// |    CHILD         |    £15     |

// |    ADULT         |    £25      |

//   const totalPrice = calculateTotalCost(requestedTickets);
//   const numSeats = calculateNumberOfSeats(requestedTickets);

export default function calculateCostsAndSeats(requestedTickets) {
  logger.debug("In calculateCostsAndSeats()");

  return {
    totalPrice: requestedTickets.adult * 25 + requestedTickets.child * 15,
    numSeats: requestedTickets.adult + requestedTickets.child,
  };
}
