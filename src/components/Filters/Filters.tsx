import React, { useState } from "react";
import cx from "classnames";

import styles from "./Filters.module.scss";
import Checkbox from "../Checkbox/";

export enum FilterType {
  All,
  Direct,
  OneTransfer,
  TwoTransfer,
  ThreeTransfer,
}

const setValues = <T,>(obj: Record<string | number, T>, value: T) => {
  let result = {} as Record<string | number, T>;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = value;
    }
  }
  return result;
};

const elements = [
  { type: FilterType.All, label: "Все" },
  { type: FilterType.Direct, label: "Без пересадок" },
  { type: FilterType.OneTransfer, label: "1 пересадка" },
  { type: FilterType.TwoTransfer, label: "2 пересадки" },
  { type: FilterType.ThreeTransfer, label: "3 пересадки" },
];

export const initCheckboxSelected = {
  [FilterType.All]: true,
  [FilterType.Direct]: true,
  [FilterType.OneTransfer]: true,
  [FilterType.TwoTransfer]: true,
  [FilterType.ThreeTransfer]: true,
};

export type Filters = typeof initCheckboxSelected;

export type Props = {
  filters: Filters;
  onChange: (filters: Filters) => void;
};

const updateFilters = (current: Filters, type: FilterType, value: boolean) => {
  if (type === FilterType.All) {
    return setValues(current, value) as Filters;
  }
  return { ...current, [type]: value, [FilterType.All]: false };
};

const Filters = ({ filters, onChange }: Props) => {
  return (
    <div className={styles.base}>
      <div className={styles.title}>Количество пересадок</div>
      {elements.map(({ type, label }) => (
        <div key={type} className={styles.checkbox}>
          <Checkbox
            label={label}
            value={filters[type]}
            onChange={(value) => onChange(updateFilters(filters, type, value))}
          />
        </div>
      ))}
    </div>
  );
};

export default React.memo(Filters);
