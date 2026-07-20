import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "panel" = white app panel (default) · "dark" = navy content card · "tint" = navy-05 content card. */
  variant?: "panel" | "dark" | "tint";
  /** Optional bold title rendered in the card header. */
  title?: React.ReactNode;
  /** Optional node aligned to the right of the header row (e.g. a control). */
  headerRight?: React.ReactNode;
  /** Show the brand's circular chevron affordance bottom-right. @default false */
  chevron?: boolean;
  /** Click handler for the chevron. */
  onChevron?: () => void;
  /** Override the default padding. */
  padding?: number | string;
}

/**
 * Surface container — white dashboard panels and navy / tint brand content cards.
 *
 * @startingPoint section="Core" subtitle="White panel, navy & tint content cards" viewport="700x260"
 */
export declare function Card(props: CardProps): JSX.Element;
