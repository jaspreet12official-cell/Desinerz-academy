import { useState } from "react";

const tools = ["B", "I", "U", "S", "H1", "H2", "UL", "OL", "Lk", "Img", "</>"];

export default function RichEditor({ content }) {
  const [text, setText] = useState(content);
  return (
    <div className="rounded-lg border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
      <div className="rich-toolbar">
        {tools.map((t) => <button key={t} type="button" className="toolbar-btn" title={t}>{t}</button>)}
        <div className="toolbar-divider" />
        <button type="button" className="toolbar-btn text-red-400 font-normal">✕</button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full min-h-48 px-4 py-3 text-sm text-gray-700 outline-none resize-y"
        style={{ borderTop: "1px solid #F3F4F6" }}
      />
    </div>
  );
}
