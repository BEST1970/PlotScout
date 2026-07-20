import * as React from "react";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  label?: string;
  style?: React.CSSProperties;
}

/** Pill toggle — navy track when on. */
export declare function Switch(props: SwitchProps): JSX.Element;
