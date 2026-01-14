import MenuItem from "./components/menuItem";

export default function IndexPage() {
  return (
    <main className="relative bg-[#131313] min-h-screen">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(128, 128, 128, 0.1) 0.05rem, transparent 0rem),
                            linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 0.05rem, transparent 0rem)`,
          backgroundSize: "6rem 6rem",
        }}
      />
      
      <div className="relative flex flex-col items-start w-full min-h-screen text-white px-[5vw] py-[10vh] gap-4">
        <h1 className="text-3xl font-futura_100 tracking-wider">Welcome to Kz Creation portfolio.</h1>
        <MenuItem />
      </div>
    </main>
  );
}
