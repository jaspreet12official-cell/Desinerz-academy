import Icon from "./Icon";
import { ICONS } from "../../config/icons";

export default function Dropzone({ label }) {
  return (
    <div className="dropzone">
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
          <Icon path={ICONS.upload} size={18} className="text-indigo-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">{label}</p>
          <p className="text-xs text-gray-400 mt-0.5">Drag & drop or <span className="text-indigo-600 font-medium">browse</span></p>
        </div>
        <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>
  );
}
