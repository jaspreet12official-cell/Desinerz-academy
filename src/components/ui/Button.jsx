import Icon from "./Icon";

const VARIANTS = {
  primary: "btn-primary flex items-center gap-2",
  edit: "btn-edit",
  danger: "btn-danger",
  link: "text-xs text-indigo-500 hover:text-indigo-700 font-medium transition-colors",
  outline: "flex items-center gap-1.5 px-3 py-2 text-sm border rounded-lg bg-white hover:bg-gray-50 transition-colors font-medium text-gray-600",
};

/** variant: primary | edit | danger | outline | link.  icon = path from ICONS */
export default function Button({ variant = "primary", icon, className = "", children, ...rest }) {
  return (
    <button
      type="button"
      className={`${VARIANTS[variant]} ${className}`}
      style={variant === "outline" ? { borderColor: "#E5E7EB" } : undefined}
      {...rest}
    >
      {icon && <Icon path={icon} size={14} className={variant === "outline" ? "text-gray-400" : ""} />}
      {children}
    </button>
  );
}
