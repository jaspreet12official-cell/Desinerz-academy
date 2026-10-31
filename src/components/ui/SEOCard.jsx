import { useState } from "react";
import Icon from "./Icon";
import Input from "./Input";
import Button from "./Button";
import { ICONS } from "../../config/icons";

export default function SEOCard() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
      <button type="button" onClick={() => setOpen(!open)} className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-2">
          <Icon path={ICONS.filter} size={14} className="text-indigo-500" />
          <span className="text-sm font-semibold" style={{ color: "#1A1D21" }}>SEO Settings</span>
        </div>
        <Icon path={open ? ICONS.chevronDown : ICONS.chevronRight} size={14} className="text-gray-400" />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-3 space-y-3 border-t" style={{ borderColor: "#F3F4F6" }}>
          <Input label="Meta Title" placeholder="Enter meta title…" />
          <Input label="Meta Description" multiline placeholder="Enter meta description…" />
          <Button>Save SEO</Button>
        </div>
      )}
    </div>
  );
}
