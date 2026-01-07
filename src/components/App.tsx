import { useState } from "react";
import Header from "~/components/header";
import Footer from "~/components/footer";
import Modal from "~/components/modal";
import CursorEffect from "~/components/cursorEffect";
import Logo from "~/assets/kz_creation.svg";

export default function App() {
  const [activeContent, setActiveContent] = useState<string | null>(null);

  return (
    <main
      id="main-content"
      className="w-full h-screen flex flex-col items-center justify-between"
    >
      {/*<CursorEffect />*/}
      
      <Header onNavigate={setActiveContent} />

      <img src={Logo.src} alt="logo" />

      <Modal
        contentType={activeContent}
        onClose={() => setActiveContent(null)}
      />

      <Footer />
    </main>
  );
}
