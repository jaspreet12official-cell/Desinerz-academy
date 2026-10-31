const VARIANTS = {
  success: "pill-success",
  warning: "pill-warning",
  danger: "pill-danger",
  info: "text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700",
  code: "font-mono text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded",
};

/** variant: success | warning | danger | info | code */
export default function Badge({ variant = "info", children }) {
  return <span className={VARIANTS[variant]}>{children}</span>;
}
