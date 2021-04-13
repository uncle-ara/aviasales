import React from "react";

import Ticket from "./components/Ticket";
import styles from "./App.module.scss";
import Tabs from "./components/Tabs/Tabs";

const App = React.memo(() => {
  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <div className={styles.logo} />
      </div>
      <div className={""}>
        <div className="left">{/* <Filter /> */}</div>
        <div className="right">
          <Tabs />
          <Ticket />
        </div>
      </div>
    </div>
  );
});

export default App;
