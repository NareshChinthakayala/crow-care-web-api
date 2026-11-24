import { Fragment } from "react";
import { cx } from "../../utils/format";
import { EmptyState } from "./Display";

/**
 * A table that turns into stacked cards on phones.
 *
 * columns: [{
 *   key,                 unique id (and the row field to show if no `render`)
 *   header,              column title ("" for an actions column)
 *   label,               label shown on phones (defaults to header)
 *   render(row, index),  custom cell content
 *   main,                this cell is the card title on phones
 *   hideOnMobile,        hide this column on phones
 *   nowrap,              keep content on one line
 * }]
 *
 * groupBy(row) + groupLabel(key): insert a heading row whenever the group changes
 * (rows should already be sorted by that group).
 */
export function DataTable({ columns, rows, rowKey = (row) => row.id, groupBy, groupLabel, emptyMessage = "Nothing to show." }) {
  if (!rows.length) return <EmptyState>{emptyMessage}</EmptyState>;

  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} className={cx(col.hideOnMobile && "hide-m")}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          const group = groupBy?.(row);
          const startsGroup = groupBy && (i === 0 || groupBy(rows[i - 1]) !== group);
          return (
            <Fragment key={rowKey(row)}>
              {startsGroup && (
                <tr className="grp">
                  <td colSpan={columns.length}>{groupLabel ? groupLabel(group) : group}</td>
                </tr>
              )}
              <tr>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    data-label={col.label ?? col.header}
                    className={cx(col.main && "td-main", col.hideOnMobile && "hide-m", col.nowrap && "nowrap")}
                  >
                    {col.render ? col.render(row, i) : row[col.key]}
                  </td>
                ))}
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
