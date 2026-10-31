import Card from "./Card";
import Button from "./Button";

/**
 * columns: [{ key, header, render?(row), align?: "right", nowrap?, cellClass? }]
 * rowKey:  field name or (row) => key
 * actions: adds Edit / Delete column (onEdit, onDelete receive the row; deleteLabel renames Delete)
 * title + headerActions: optional header bar    footer: a <tr> for <tfoot>
 * empty: node shown instead of the table when data is empty    scroll: wide table scrolls sideways
 */
export default function DataTable({ columns, data, rowKey, actions = false, deleteLabel = "Delete", onEdit, onDelete, title, headerActions, footer, empty, scroll = false }) {
  if (empty && data.length === 0) return empty;

  const getKey = typeof rowKey === "function" ? rowKey : (r) => r[rowKey];
  const cols = actions
    ? [...columns, {
        key: "__actions",
        header: "Actions",
        render: (row) => (
          <div className="flex gap-2">
            <Button variant="edit" onClick={() => onEdit?.(row)}>Edit</Button>
            <Button variant="danger" onClick={() => onDelete?.(row)}>{deleteLabel}</Button>
          </div>
        ),
      }]
    : columns;

  return (
    <Card variant="flush" title={title} actions={headerActions}>
      <div className="overflow-x-auto">
        <table className={`w-full ${scroll ? "min-w-max" : ""}`}>
          <thead>
            <tr className="border-b" style={{ borderColor: "#F3F4F6" }}>
              {cols.map((c) => (
                <th key={c.key} className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400 ${c.align === "right" ? "text-right" : "text-left"} ${c.nowrap ? "whitespace-nowrap" : ""}`}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={getKey(row)} className="border-b table-row" style={{ borderColor: "#F9FAFB" }}>
                {cols.map((c) => (
                  <td key={c.key} className={`px-4 py-3 ${c.cellClass ?? "text-sm text-gray-700"} ${c.align === "right" ? "text-right" : ""} ${c.nowrap ? "whitespace-nowrap" : ""}`}>
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {footer && <tfoot>{footer}</tfoot>}
        </table>
      </div>
    </Card>
  );
}
