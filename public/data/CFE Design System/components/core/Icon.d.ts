import * as React from "react";

export type IconName =
  | "menu" | "user" | "search" | "settings" | "mail" | "bell" | "close"
  | "chevron-right" | "chevron-left" | "chevron-up" | "chevron-down"
  | "plus" | "calendar" | "filter";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Brand icon name. */
  name?: IconName;
  /** Any CSS size (number = px). Inherits currentColor. */
  size?: number | string;
  /** Accessible label; when set the icon is exposed to screen readers. */
  title?: string;
}

/** CFE brand icon set — authentic geometric glyphs from the styling guide. */
export declare function Icon(props: IconProps): JSX.Element;
export declare const iconNames: IconName[];
