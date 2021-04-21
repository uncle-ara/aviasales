import React, { useEffect, useState } from "react";

import Filters, {
  FilterType,
  initCheckboxSelected,
} from "./components/Filters";
import Sort, { BillType } from "./components/Sort";
import Ticket from "./components/Ticket";
import { ResponseTickets, Segment, Ticket as TicketData } from "./types";

import styles from "./App.module.scss";

const validSegments = (segments: Segment[], maxStops: number) => {
  for (const segment of segments) {
    if (segment.stops.length > maxStops) {
      return false;
    }
  }
  return true;
};

const calcTotalDuration = (ticket: TicketData) =>
  ticket.segments.reduce((acc, segment) => acc + segment.duration, 0);

const calcTotalStops = (ticket: TicketData) =>
  ticket.segments.reduce((acc, segment) => acc + segment.stops.length, 0);

const THERTY_MINS = 1000 * 60 * 30;

const App = React.memo(() => {
  const [billTypeSelected, setBillTypeSelected] = useState<BillType>();
  const [ticketsCount, setTicketsCount] = useState(5);
  const [filtersSelected, setFiltersSelected] = useState(initCheckboxSelected);
  const [tickets, setTickets] = useState<TicketData[]>([]);

  useEffect(() => {
    const cache = localStorage.getItem("ticketsCache");
    try {
      const { tickets, date }: { tickets: TicketData[]; date: number } =
        cache && JSON.parse(cache);
      if (Date.now() - date < THERTY_MINS) {
        return setTickets(tickets);
      }
    } catch (e) {
      console.warn("Invalid cache", e);
    }

    const request = () => {
      fetch(`https://front-test.beta.aviasales.ru/search`)
        .then((res) => res.json())
        .then(({ searchId }: { searchId: string }) =>
          fetch(
            `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`
          )
        )
        .then((res) => res.json())
        .then(({ tickets }: ResponseTickets) => {
          localStorage.setItem(
            "ticketsCache",
            JSON.stringify({ tickets, date: Date.now() })
          );
          setTickets(tickets);
        })
        .catch(request);
    };
    request();
  }, []);

  const filterTicket = (ticket: TicketData) => {
    if (filtersSelected[FilterType.All]) {
      return true;
    }

    if (
      filtersSelected[FilterType.OneTransfer] &&
      validSegments(ticket.segments, 1)
    ) {
      return true;
    }

    if (
      filtersSelected[FilterType.TwoTransfer] &&
      validSegments(ticket.segments, 2)
    ) {
      return true;
    }

    if (
      filtersSelected[FilterType.ThreeTransfer] &&
      validSegments(ticket.segments, 3)
    ) {
      return true;
    }

    if (
      filtersSelected[FilterType.Direct] &&
      validSegments(ticket.segments, 0)
    ) {
      return true;
    }

    return false;
  };

  const sortTickets = (ticketA: TicketData, ticketB: TicketData) => {
    if (billTypeSelected === BillType.Cheap) {
      return ticketA.price - ticketB.price;
    }
    if (billTypeSelected === BillType.Fast) {
      return calcTotalDuration(ticketA) - calcTotalDuration(ticketB);
    }
    if (billTypeSelected === BillType.Optimal) {
      return calcTotalStops(ticketA) - calcTotalStops(ticketB);
    }
    return 0;
  };

  const handleClickMore = () => {
    setTicketsCount((x) => x + 5);
  };

  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <div className={styles.logo} />
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <Filters filters={filtersSelected} onChange={setFiltersSelected} />
        </div>
        <div className={styles.right}>
          <div className={styles.sort}>
            <Sort onSelect={setBillTypeSelected} selected={billTypeSelected} />
          </div>
          <div className={styles.tickets}>
            {tickets
              .filter(filterTicket)
              .sort(sortTickets)
              .slice(0, ticketsCount)
              .map(({ price, carrier, segments }) => (
                <Ticket price={price} carrier={carrier} segments={segments} />
              ))}
          </div>
          <button className={styles.more} onClick={handleClickMore}>
            Показать еще 5 билетов!
          </button>
        </div>
      </div>
    </div>
  );
});

export default App;
