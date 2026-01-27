import MenuItem from "~/shared/components/layouts/menuItem";

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
    <main className="h-screen flex justify-between px-[5vw] py-[10vh]">
      <div className="flex flex-col items-start w-full min-h-screen text-white gap-8">
        <h1 className="text-3xl font-futura_pt tracking-wider">Who am I ?</h1>
        <MenuItem />
      </div>
      <div className="w-full items-right text-white flex flex-col justify-between">
        <div className="text-right space-y-4">
          <h1 className="text-3xl font-futura_pt tracking-wider">
            Kizuki Aiki
          </h1>
          <h2 className="text-xl font-avenir font-light">
            Full Stack Developer / App && Web Designer
          </h2>
        </div>

        <div className="text-xl text-right font-light space-y-4 font-avenir">
          <div>Next.js / Astro / Vite / React / Tailwindcss / Node.js </div>   
          <div>Vercel / Supabase / Drizzle / Prisma / DynamoDB / API Gateway / AWS Lambda</div>
          <div>Cursor / Claude code / Manus / Google AI Studio</div>
        </div>

        <div className="w-full flex flex-col items-end text-right text-white">
          {socials.map((social, index) => {
            return (
              <a
                key={index}
                href={social.url}
                className="flex items-center gap-2 text-white hover:text-gray-300 font-futura_pt tracking-wider"
              >
                {social.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}
