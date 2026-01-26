import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/shared/components/ui/button";
import { Input } from "~/shared/components/ui/input";
import { Textarea } from "~/shared/components/ui/textarea";
import { Label } from "~/shared/components/ui/label";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      const googleFormUrl = import.meta.env.PUBLIC_GOOGLE_FORM_URL;
      const nameEntry = import.meta.env.PUBLIC_GOOGLE_FORM_NAME_ENTRY;
      const emailEntry = import.meta.env.PUBLIC_GOOGLE_FORM_EMAIL_ENTRY;
      const messageEntry = import.meta.env.PUBLIC_GOOGLE_FORM_MESSAGE_ENTRY;

      if (!googleFormUrl || !nameEntry || !emailEntry || !messageEntry) {
        throw new Error("Google Form configuration is missing");
      }

      // Create FormData for Google Form submission
      const googleFormData = new FormData();
      googleFormData.append(nameEntry, formData.get("name") as string);
      googleFormData.append(emailEntry, formData.get("email") as string);
      googleFormData.append(messageEntry, formData.get("message") as string);

      // Submit to Google Form using no-cors (Google Forms doesn't support CORS)
      await fetch(googleFormUrl, {
        method: "POST",
        mode: "no-cors",
        body: googleFormData,
      });

      // With no-cors, we can't check response, but if no error thrown, assume success
      toast.success("Message sent successfully!");
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl flex flex-col items-end gap-8"
    >
      <div className="grid w-full items-center gap-3">
        <Input
          required
          name="name"
          type="text"
          id="name"
          placeholder="Name..."
          autoComplete="name"
          className="bg-white/5 border border-none text-white placeholder:text-white/30 h-12"
        />
      </div>
      <div className="grid w-full items-center gap-3">
        <Input
          required
          name="email"
          type="email"
          id="email"
          placeholder="Email..."
          autoComplete="email"
          className="bg-white/5 border border-none text-white placeholder:text-white/30 h-12"
        />
      </div>
      <div className="grid w-full gap-3">
        <Textarea
          required
          name="message"
          id="message"
          placeholder="Message..."
          className="bg-white/5 border border-none text-white placeholder:text-white/30 min-h-[240px] resize-none"
        />
      </div>
      <Button
        disabled={isLoading}
        type="submit"
        className="px-8 bg-white text-black hover:bg-white/90 font-futura_pt tracking-wider text-lg h-12 mt-4"
      >
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
