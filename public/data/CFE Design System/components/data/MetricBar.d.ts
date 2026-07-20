import * as React from "react";

export interface MetricBarProps extends React.HTMLAttributes<HTMLDivElement> {
  leftLabel: React.ReactNode;
  leftValue: React.ReactNode;
  rightLabel: React.ReactNode;
  rightValue: React.ReactNode;
  /** Split point 0–100 (left portion). @default 50 */
  percent?: number;
  /** Left fill colour. @default cyan */
  fill?: string;
  /** Right track colour. @default navy */
  track?: string;
  /** Show the % labels inside the bar. @default true */
  showPercent?: boolean;
}

/** OEE-breakdown split bar with left/right label-value pairs. */
export declare function MetricBar(props: MetricBarProps): JSX.Element;
