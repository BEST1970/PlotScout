import * as React from "react";
import type { IconName } from "./Icon";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Brand icon to render. */
  icon?: IconName;
  /** @default "primary" */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Square (default) or fully round. @default "square" */
  shape?: "square" | "round";
  /** Accessible label (required for icon-only controls). */
  label?: string;
}

/** Compact single-icon control — steppers, add actions, table tools, card chevrons. */
export declare function IconButton(props: IconButtonProps): JSX.Element;
