import Icon from "./Icon";
import { ICONS } from "../../config/icons";

export default function SearchInput({ placeholder = "Search…", value, onChange }) {
  return (
    <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2" style={{ borderColor: "#E5E7EB" }}>
      <Icon path={ICONS.search} size={14} className="text-gray-400" />
      <input placeholder={placeholder} value={value} onChange={onChange} className="text-sm outline-none w-52 text-gray-700 placeholder-gray-400" />
    </div>
  );
}
