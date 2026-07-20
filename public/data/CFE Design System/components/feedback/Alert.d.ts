import * as React from "react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Semantic colour. @default "warning" */
  tone?: "info" | "success" | "warning" | "danger";
  /** Bold lead line. */
  title?: React.ReactNode;
}

/** Inline status message with left accent bar and soft tint. */
export declare function Alert(props: AlertProps): JSX.Element;
