import Footer from "~/components/layouts/footer";
import MenuItem from "../../components/layouts/menuItem";

export default function IndexPage() {
  return (
    <main className="px-[5vw] py-[10vh] h-screen">
      
      <div className="flex flex-col items-start w-full min-h-screen text-white gap-8">
        <h1 className="text-3xl font-futura_pt tracking-wider">Welcome to Kz Creation portfolio.</h1>
        <MenuItem />
      </div>
      
    </main>
  );
}
