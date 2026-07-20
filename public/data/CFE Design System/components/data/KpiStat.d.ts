import * as React from "react";

export interface KpiStatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Unit suffix, e.g. "%". */
  unit?: string;
  /** Delta chip, e.g. "+2%". */
  delta?: React.ReactNode;
  deltaTone?: "success" | "danger" | "neutral";
  /** 0–100 — renders a two-tone progress bar under the value. */
  percent?: number;
  /** Fill colour of the progress bar. @default cyan */
  barColor?: string;
  align?: "left" | "center" | "right";
}

/**
 * Dashboard KPI tile — big value with optional delta and two-tone bar.
 *
 * @startingPoint section="Data" subtitle="OEE-style KPI tile with progress bar" viewport="360x180"
 */
export declare function KpiStat(props: KpiStatProps): JSX.Element;
