import Footer from "~/components/layouts/footer";
import MenuItem from "./components/menuItem";

export default function IndexPage() {
  return (
    <main className="relative min-h-screen">
      
      <div className="relative flex flex-col items-start w-full min-h-screen text-white px-[5vw] py-[10vh] gap-4">
        <h1 className="text-3xl font-futura_100 tracking-wider">Welcome to Kz Creation portfolio.</h1>
        <MenuItem />
      </div>
      
      <div className="fixed left-0 bottom-0 w-full">
        <Footer />
      </div>
    </main>
  );
}
