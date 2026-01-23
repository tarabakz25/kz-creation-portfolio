import profile from "./content/kizuki-aiki.json";
import MenuItem from "~/shared/components/layouts/menuItem";
import { PageTransitionProvider } from "~/shared/components/pageTransition";

const socials = [
  {
    name: "X",
    url: "https://x.com/kz25_kmc/",
  },
  {
    name: "GitHub",
    url: "https://github.com/tarabakz25/",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/kizu25_01/",
  },
  {
    name: "Prarie Card",
    url: "https://my.prairie.cards/u/kz25_kmc",
  },
];

export default function AboutPage() {
  return (
    <PageTransitionProvider>
    <main className="h-screen flex justify-between px-[5vw] py-[10vh]">
      <div className="flex flex-col items-start w-full min-h-screen text-white gap-8">
        <h1 className="text-3xl font-futura_pt tracking-wider">Who am I ?</h1>
        <MenuItem />
      </div>
      <div className="w-full items-right text-white flex flex-col justify-between">
        <div className="text-right space-y-4">
          <h1 className="text-3xl font-futura_pt tracking-wider">Kizuki Aiki</h1>
          <h2 className="text-xl font-avenir font-light">
            Full Stack Developer / App && Web Designer
          </h2>
        </div>
        
        <div className="text-right space-y-4 font-avenir">
        </div>

        <div className="w-full flex flex-col text-right text-white">
          {socials.map((social, index) => {
            return (
              <a
                key={index}
                href={social.url}
                className="text-white hover:text-gray-300 font-futura_pt tracking-wider"
              >
                {social.name}
              </a>
            );
          })}
        </div>
      </div>
    </main>
    </PageTransitionProvider>
  );
}
