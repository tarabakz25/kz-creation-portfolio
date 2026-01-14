import profile from "~/content/profile/kizuki-aiki.json";

interface ProfileContentProps {
  iconSrc: string;
  catchcopySrc: string;
}

const contents = [
  {
    title: "About",
    content: `
      神山まるごと高専一期生 / 高専プログラミングコンテスト '23 '24 / TwoGate
      Dev Camp 2024 Summer / Hack1グランプリ2025 / JAPAN AI HACKATHON 2025
    `,
  },
  {
    title: "Skills",
    content: `
      フルスタックWeb開発、アイデア企画、アプリ･Webデザイン
    `,
  },
];

export default function AboutContent({
  iconSrc,
  catchcopySrc,
}: ProfileContentProps) {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start bg-[#131313] text-white">
      <div className="w-full flex items-center justify-between gap-4 px-64 pt-[30vh]">
        <div className="flex flex-col pl-24 gap-10">
          <div className="flex flex-col">
            <h1 className="text-5xl font-futura_pt">Kizuki Aiki</h1>
            <h2 className="text-xl font-shuei_gothic">
              相木 絆煌 /{" "}
              <span className="font-light tracking-wider font-futura_100">
                Tokushima && Tokyo
              </span>
            </h2>
          </div>
          <img src={catchcopySrc} alt="" className="w-auto h-10" />
        </div>

        <img src={iconSrc} alt="icon" className="w-48 h-auto rounded-3xl" />
      </div>

      <div className="w-full flex flex-col gap-12 px-[20vw] py-[30vh]">
        {contents.map((content) => {
          return (
            <div key={content.title} className="flex justify-between">
              <div className="text-4xl font-futura_pt">{content.title}</div>
              <div className="text-xl w-[40vw] pt-4 font-shuei_gothic">
                {content.content}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
