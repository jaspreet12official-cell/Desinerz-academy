import { useState } from "react";
import { Card, Button, Dropzone, Icon } from "../../components/ui";
import { ICONS } from "../../config/icons";

const galleryImages = [
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1560523160-754a9e25c68f?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=260&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=260&fit=crop",
];

export default function GalleryPage() {
  const [images, setImages] = useState(galleryImages);
  return (
    <div className="max-w-5xl space-y-4">
      <Card title="Upload Gallery Images">
        <Dropzone label="Drop up to 10 images" />
        <p className="text-xs text-gray-400 mt-2">You can upload up to 10 images at once.</p>
        <Button className="mt-3">Upload</Button>
      </Card>

      <Card title="Gallery Images">
        <div className="grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <div key={src} className="relative group rounded-lg overflow-hidden aspect-video bg-gray-100">
              <img src={src} alt={`gallery-${i}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => setImages(images.filter((_, j) => j !== i))}
                  className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                >
                  <Icon path={ICONS.trash} size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
