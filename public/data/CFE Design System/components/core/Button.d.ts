import * as React from "react";
import type { IconName } from "./Icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "gradient";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Brand icon name shown before the label. */
  iconLeft?: IconName;
  /** Brand icon name shown after the label. */
  iconRight?: IconName;
  /** Append the brand's trailing chevron affordance. @default false */
  chevron?: boolean;
  /** Stretch to fill the container width. @default false */
  fullWidth?: boolean;
  /** Render as a different element (e.g. "a"). @default "button" */
  as?: "button" | "a";
}

/**
 * Primary action control for CFE applications.
 *
 * @startingPoint section="Core" subtitle="Navy / tinted / outline / ghost button" viewport="700x180"
 */
export declare function Button(props: ButtonProps): JSX.Element;
