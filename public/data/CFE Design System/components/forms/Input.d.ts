import * as React from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  /** Perched label sitting on the top border. */
  label?: string;
  /** Show the required asterisk. @default false */
  required?: boolean;
  /** Error message — turns border/label red and renders below. */
  error?: string;
  /** Helper text shown below when there is no error. */
  hint?: string;
  /** Node rendered inside the field on the right (icon button, clear, etc.). */
  rightSlot?: React.ReactNode;
  /** Wrapper style. */
  style?: React.CSSProperties;
}

/** Outlined text field with the brand's perched label. */
export declare function Input(props: InputProps): JSX.Element;
