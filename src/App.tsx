import React from "react";

import Filter from "./components/Filter";
import Ticket from "./components/Ticket";
import Sort, { Round } from "./components/Sort";

import styles from "./App.module.scss";

const App = React.memo(() => {
  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <div className={styles.logo} />
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <Filter />
        </div>
        <div className={styles.right}>
          <div className={styles.sorts}>
            <Sort round={Round.Left}>Самый дешевый</Sort>
            <Sort round={Round.Default}>Самый быстрый</Sort>
            <Sort round={Round.Right}>Оптимальный</Sort>
          </div>
          <div className={styles.ticket}>
            <Ticket />
          </div>
        </div>
      </div>
    </div>
  );
});

export default App;
