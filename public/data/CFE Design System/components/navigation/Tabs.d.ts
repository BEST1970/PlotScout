import * as React from "react";

export interface TabItem { value: string; label: React.ReactNode; }

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Strings or { value, label } objects. */
  items: Array<string | TabItem>;
  value?: string;
  onChange?: (value: string) => void;
  /** "underline" tabs (gradient underline) or "pill" filter chips. @default "underline" */
  variant?: "underline" | "pill";
}

/** Section navigation — underline tabs or pill filter chips. */
export declare function Tabs(props: TabsProps): JSX.Element;
