import * as React from "react";

export interface SelectOption { value: string; label: string; }

export interface SelectProps {
  label?: string;
  required?: boolean;
  /** Options as strings or { value, label } objects. */
  options?: Array<string | SelectOption>;
  placeholder?: string;
  value?: string;
  onChange?: (e: { target: { value: string } }) => void;
  /** Show a clear (×) affordance when a value is set. @default false */
  clearable?: boolean;
  error?: string;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}

/** Outlined dropdown with perched label, brand caret and optional clear. */
export declare function Select(props: SelectProps): JSX.Element;
