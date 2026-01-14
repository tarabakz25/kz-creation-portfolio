import profile from "~/content/profile/kizuki-aiki.json";
import MenuItem from "~/components/layouts/menuItem";

const socials = [
  {
    name: 'X',
    url: 'https://x.com/kz25_kmc/',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/tarabakz25/',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/kz25_01/',
  },
  {
    name: 'prarie card',
    url: 'https://my.prairie.cards/u/kz25_kmc',
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen flex justify-between px-[5vw] py-[10vh]">
      <div className="flex flex-col items-start w-full min-h-screen text-white gap-8">
        <h1 className="text-3xl font-futura_pt tracking-wider">Who am I ?</h1>
        <MenuItem />
      </div>
      <div className="w-full items-right text-white">
        <div className="text-right space-y-4">
          <h1 className="text-3xl font-futura_100">Kizuki Aiki</h1>
          <h2 className="text-xl font-eurostile font-light">Full Stack Developer / App && Web Designer</h2>
        </div>
      </div>
    </main>
  )
}