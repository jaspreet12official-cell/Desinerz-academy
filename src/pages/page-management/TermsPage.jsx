import { Card, Button, RichEditor, SEOCard } from "../../components/ui";

// Terms & Conditions aur Privacy Policy dono isi page ko use karte hain
export default function TermsPage({ title }) {
  return (
    <div className="max-w-3xl space-y-4">
      <Card title={`${title} Content`}>
        <RichEditor content={`Enter ${title.toLowerCase()} content here...`} />
        <Button className="mt-4">Save Changes</Button>
      </Card>
      <SEOCard />
    </div>
  );
}
