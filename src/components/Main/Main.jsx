import React from "react";
import Filter from "../Filter/Filter";
import Tabs from "../Tabs/Tabs";
import Ticket from "../Ticket/Ticket";

import styles from "./Main.module.scss";

const Main = () => {
  return (
    <div className={styles.base}>
      <div className={styles.logo}></div>
      <Filter />
      <Tabs />
      <Ticket />
    </div>
  );
};

export default Main;
