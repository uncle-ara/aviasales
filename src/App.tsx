import React, { useEffect, useState } from "react";

import Filters, {
  FilterType,
  initCheckboxSelected,
} from "./components/Filters";
import Sort, { BillType } from "./components/Sort";
import Ticket from "./components/Ticket";
import { ResponseTickets, Ticket as TicketData } from "./types";

import styles from "./App.module.scss";

const SEARCH_ID = "2q74u";

const App = React.memo(() => {
  const [billTypeSelected, setBillTypeSelected] = useState<BillType>();
  const [filtersSelected, setFiltersSelected] = useState(initCheckboxSelected);
  const [tickets, setTickets] = useState<TicketData[]>([]);

  useEffect(() => {
    fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${SEARCH_ID}`)
      .then((res) => res.json())
      .then(({ tickets }: ResponseTickets) => setTickets(tickets));
  }, []);

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
            {tickets.slice(0, 1).map(({ price, carrier, segments }) => (
              <Ticket price={price} carrier={carrier} segments={segments} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default App;
