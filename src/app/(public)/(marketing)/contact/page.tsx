import { ContactForm } from "@/components/form/contact-form";
import { PageTitle } from "@/components/modules/page-title";

export default function ContactPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8">
      <PageTitle
        title="Contact"
        detail="Send a message to the HandyHub inbox. We reply to the email you enter."
      />
      <ContactForm />
    </div>
  );
}
