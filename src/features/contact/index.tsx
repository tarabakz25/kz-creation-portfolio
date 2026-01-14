import { ContactForm } from "~/features/contact/components/contact-form";

export default function ContactContent() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start bg-[#131313] text-white pt-[20vh] pb-[10vh]">
      <h1 className="text-5xl font-futura_pt mb-12">Contact</h1>

      <ContactForm />
    </main>
  );
}
