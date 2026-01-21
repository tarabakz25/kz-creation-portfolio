import { ContactForm } from "~/features/contact/components/contact-form";
import MenuItem from "~/shared/components/layouts/menuItem";

export default function ContactPage() {
  return (
    <main className="flex justify-between px-[5vw] py-[10vh] h-screen">
      
      <div className="flex flex-col items-start w-full min-h-screen text-white gap-8">
        <h1 className="text-3xl font-futura_pt tracking-wider">Say HELLO !</h1>
        <MenuItem />
      </div>
      
      <div className="flex flex-col justify-center items-start w-full text-white gap-8">
        <ContactForm />
      </div>
      
      
    </main>
  );
}
