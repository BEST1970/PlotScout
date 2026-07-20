import * as React from "react";

export interface DataTableColumn {
  key: string;
  header: React.ReactNode;
  /** Show the header filter caret. @default true */
  filterable?: boolean;
  /** Render this column's cells as brand blue links. */
  link?: boolean;
  /** Custom cell renderer. */
  render?: (value: any, row: any) => React.ReactNode;
  width?: number | string;
}

export interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: DataTableColumn[];
  rows: Array<Record<string, any>>;
  /** Zebra striping. @default true */
  striped?: boolean;
  /** Pad out to at least this many rows with empty striped rows. */
  minRows?: number;
}

/**
 * Application data grid — navy header, filter carets, zebra rows, link cells.
 *
 * @startingPoint section="Data" subtitle="Navy-header grid with filter carets" viewport="700x300"
 */
export declare function DataTable(props: DataTableProps): JSX.Element;
