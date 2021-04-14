import React from "react";
import cx from "classnames";

import styles from "./Sort.module.scss";

export enum Round {
  Default = `default`,
  Left = `left`,
  Right = `right`,
}

export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  round: Round;
};

const Sort = ({ className, round = Round.Default, ...rest }: Props) => {
  return (
    <button
      className={cx(styles.base, className, styles[`base_round_${round}`])}
      {...rest}
    ></button>
  );
};

export default React.memo(Sort);
