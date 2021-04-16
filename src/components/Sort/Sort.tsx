import React from "react";
import cx from "classnames";

import styles from "./Sort.module.scss";

export enum BillType {
  Cheap,
  Fast,
  Optimal,
}

export type Props = {
  onSelect: (type: BillType) => void;
  selected?: BillType;
};

const elements = [
  { type: BillType.Cheap, text: "Самый дешевый" },
  { type: BillType.Fast, text: "Самый быстрый" },
  { type: BillType.Optimal, text: "Оптимальный" },
];

const Sort = ({ onSelect, selected }: Props) => {
  return (
    <div className={styles.base}>
      {elements.map(({ type, text }) => (
        <button
          key={type}
          className={cx(
            styles.button,
            selected === type && styles.button_selected
          )}
          onClick={() => onSelect(type)}
        >
          {text}
        </button>
      ))}
    </div>
  );
};

export default React.memo(Sort);
