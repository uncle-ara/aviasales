export type Segment = {
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number;
};

export type Ticket = {
  price: number;
  carrier: string;
  segments: Segment[];
};

export type ResponseTickets = {
  tickets: Ticket[];
};
