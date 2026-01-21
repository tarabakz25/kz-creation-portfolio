import profile from "~/content/profile/kizuki-aiki.json";

interface Props {
  variant: "top" | "content";
}

export default function Footer({ variant }: Props) {
  if (variant === "top") {
    return (
      <footer className="px-16 py-6 w-full flex justify-between text-white font-comma">
        <p>A developer</p>
        <p>© Kz Creation</p>
      </footer>
    );
  } else {
    return (
      <footer className="w-full bg-[#131313] text-white py-20 flex flex-col items-center justify-center gap-8">
        <div className="w-full max-w-4xl h-[1px] bg-white/20 mb-8"></div>
        <div className="flex gap-12">
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-none text-lg font-futura_pt tracking-wider hover:text-white/60 transition-colors"
            >
              {social.label}
            </a>
          ))}
        </div>
        <div className="font-futura_pt text-xs tracking-[0.2em] text-white/40 mt-4">
          © 2026 Kz Creation
        </div>
      </footer>
    );
  }
}
