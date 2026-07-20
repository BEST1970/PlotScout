import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Semantic colour. @default "neutral" */
  tone?: "neutral" | "info" | "success" | "warning" | "danger" | "cyan";
  /** Solid fill instead of soft tint. @default false */
  solid?: boolean;
  /** @default "md" */
  size?: "sm" | "md";
}

/** Compact status / count label in the brand semantic colours. */
export declare function Badge(props: BadgeProps): JSX.Element;
