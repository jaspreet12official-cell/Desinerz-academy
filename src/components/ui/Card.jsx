import Icon from "./Icon";

/**
 * Card with optional title / icon / actions.
 * variant="padded" (default) -> p-5 content (forms)
 * variant="flush"            -> no padding, header bar (tables)
 */
export default function Card({ title, icon, actions, variant = "padded", className = "", children }) {
  const border = { borderColor: "#E5E7EB" };

  if (variant === "flush") {
    return (
      <div className={`bg-white rounded-xl border overflow-hidden ${className}`} style={border}>
        {(title || actions) && (
          <div className="px-5 py-3.5 border-b flex items-center gap-2" style={{ borderColor: "#F3F4F6" }}>
            {icon && <Icon path={icon} size={15} className="text-indigo-500" />}
            <h3 className="text-sm font-semibold" style={{ color: "#1A1D21" }}>{title}</h3>
            {actions && <div className="ml-auto">{actions}</div>}
          </div>
        )}
        {children}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl border p-5 ${className}`} style={border}>
      {(title || actions) && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold" style={{ color: "#1A1D21" }}>{title}</h3>
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}
