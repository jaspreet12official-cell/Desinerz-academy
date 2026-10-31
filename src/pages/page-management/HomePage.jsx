import { Card, Button, Dropzone } from "../../components/ui";
import { ICONS } from "../../config/icons";

function ImageUpload({ title, currentSrc }) {
  return (
    <Card variant="flush" title={title} icon={ICONS.image}>
      <div className="p-5 space-y-4">
        {currentSrc && (
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Current Image</p>
            <div className="rounded-lg border overflow-hidden bg-gray-50 flex items-center justify-center h-40" style={{ borderColor: "#E5E7EB" }}>
              <img src={currentSrc} alt="current" className="max-h-full max-w-full object-contain" />
            </div>
          </div>
        )}
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Upload New Image</p>
          <Dropzone label="Drop image here" />
        </div>
        <Button>Upload {title.split(" ")[0]}</Button>
      </div>
    </Card>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-4 max-w-3xl">
      <ImageUpload title="Header Image" currentSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=200&fit=crop&auto=format" />
      <ImageUpload title="Footer Image" />
    </div>
  );
}
