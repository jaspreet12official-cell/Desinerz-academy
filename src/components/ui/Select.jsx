import { labelCls } from "./formStyles";

/** Dropdown. options: [{ value, label }] */
export default function Select({ label, options, className = "", ...rest }) {
  return (
    <div className={className}>
      {label && <label className={labelCls}>{label}</label>}
      <select
        className="border rounded-lg px-3 py-2 text-sm font-medium text-gray-700 bg-white outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 cursor-pointer"
        style={{ borderColor: "#E5E7EB" }}
        {...rest}
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}
