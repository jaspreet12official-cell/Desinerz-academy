import { Card, Button, Input, Dropzone, RichEditor, SEOCard } from "../../components/ui";

const contactDetails = [
  { heading: "Phone Number", content: "+91 7419148583" },
  { heading: "Email Address", content: "hello@desinerz.com" },
  { heading: "Office Address", content: "Desinerz Academy, Maharishi Dayanand Digital Campus" },
];

export default function ContactPage() {
  return (
    <div className="max-w-3xl space-y-4">
      <Card title="Top Contact Content">
        <RichEditor content={"Get in touch with us\n\nReach Us To Build Your Future"} />
        <Button className="mt-4">Update Content</Button>
      </Card>

      <Card title="Contact Details">
        <div className="space-y-5">
          {contactDetails.map((item, i) => (
            <div key={item.heading} className="grid grid-cols-2 gap-4 pb-5 border-b last:border-0 last:pb-0" style={{ borderColor: "#F3F4F6" }}>
              <Input label={`Heading ${i + 1}`} defaultValue={item.heading} />
              <Input label={`Content ${i + 1}`} defaultValue={item.content} />
              <div className="col-span-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">Image {i + 1}</p>
                <Dropzone label="Drop image or browse" />
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-4">Save Contact Section</Button>
      </Card>

      <SEOCard />
    </div>
  );
}
