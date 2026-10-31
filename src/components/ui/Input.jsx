import { labelCls, inputCls, inputStyle } from "./formStyles";

/** Text input with optional label. Pass multiline for a textarea. */
export default function Input({ label, multiline = false, rows = 3, className = "", ...rest }) {
  return (
    <div className={className}>
      {label && <label className={labelCls}>{label}</label>}
      {multiline
        ? <textarea rows={rows} className={`${inputCls} resize-none`} style={inputStyle} {...rest} />
        : <input className={inputCls} style={inputStyle} {...rest} />}
    </div>
  );
}
