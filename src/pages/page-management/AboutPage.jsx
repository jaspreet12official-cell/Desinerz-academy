import { useState } from "react";
import { Card, Button, Input, Dropzone, RichEditor, SEOCard } from "../../components/ui";

const aboutContent = `About\n\nWhat is Desinerz Academy?\n\nAt Desinerz Academy, we are more than a coaching centre — we are a nurturing community where students receive personalized guidance and support to choose the right career path from the start of their learning journey. Our focus is on education and creating a family-like environment, where care, encouragement, and personal development are paramount.`;

export default function AboutPage() {
  const [mediaMode, setMediaMode] = useState("image");
  return (
    <div className="space-y-4 max-w-3xl">
      <Card title="Top Body Content">
        <RichEditor content={aboutContent} />
        <Button className="mt-4">Update Content</Button>
      </Card>

      <Card title="Top Image / Video">
        <div className="flex rounded-lg overflow-hidden border mb-4 w-fit" style={{ borderColor: "#E5E7EB" }}>
          {["image", "video"].map((mode) => (
            <button
              key={mode}
              onClick={() => setMediaMode(mode)}
              className="px-4 py-1.5 text-sm font-medium transition-all"
              style={{ background: mediaMode === mode ? "#4F46E5" : "white", color: mediaMode === mode ? "white" : "#6B7280" }}
            >
              {mode === "image" ? "Image" : "Video Link"}
            </button>
          ))}
        </div>
        {mediaMode === "image" ? <Dropzone label="Upload Top Image" /> : <Input placeholder="https://youtube.com/embed/…" />}
        <Button className="mt-4">Update Top Section</Button>
      </Card>

      <Card title="Bottom Body Content">
        <RichEditor content="Enter bottom body content here..." />
        <Button className="mt-4">Update Content</Button>
      </Card>

      <SEOCard />
    </div>
  );
}
