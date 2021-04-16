import React from "react";
import { getTimeFromMins, getTimeFromAndTo } from "../../helpers";
import styles from "./Ticket.module.scss";

export type Segment = {
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number;
};

export type Props = {
  price: number;
  carrier: string;
  segments: Segment[];
};

const Ticket = ({ price, carrier, segments }: Props) => {
  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <div className={styles.price}>{price.toLocaleString("ru")} Р</div>
        <div className={styles.carrier}>
          <img src={`http://pics.avs.io/99/36/${carrier}.png`} />
        </div>
      </div>
      <div className={styles.body}>
        {segments.map(
          ({ origin, destination, date, stops, duration }, index) => (
            <div key={index} className={styles.row}>
              <div className={styles.column}>
                <div className={styles.title}>
                  {origin}-{destination}
                </div>
                <div className={styles.value}>
                  {getTimeFromAndTo(date, duration)}
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.title}>В пути</div>
                <div className={styles.value}>{getTimeFromMins(duration)}</div>
              </div>
              <div className={styles.column}>
                <div className={styles.title}>{stops.length} Пересадки</div>
                <div className={styles.value}>{stops}</div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Ticket;
