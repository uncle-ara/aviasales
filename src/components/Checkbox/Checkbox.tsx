import React from "react";
import cx from "classnames";

import styles from "./Checkbox.module.scss";

export type Props = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

const Checkbox = ({ label, value, onChange }: Props) => {
  return (
    <div className={styles.base} onClick={() => onChange(!value)}>
      <div className={cx(styles.checkbox, value && styles.checkbox_selected)} />
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default React.memo(Checkbox);
