import * as React from "react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  label?: string;
  style?: React.CSSProperties;
}

/** Square checkbox — navy fill + white tick when selected. */
export declare function Checkbox(props: CheckboxProps): JSX.Element;
