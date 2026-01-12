import { GithubIcon } from "lucide-react";
import { MenuHover } from "./gsap/menuHover";

export default function Header() {const items = [{ label: "profile" }, { label: "lab" }, { label: "contact" }];

return (
  <header className="w-full flex items-center justify-between py-6 px-16 font-comma"><nav className="flex items-center gap-24">
    {items.map((i) => {
      return (
        <MenuHover key={i.label} href={`/${i.label}`} className="text-xl font-medium text-white px-1">
          {i.label}
        </MenuHover>
      );
    })}
  </nav>

  <MenuHover href="https://github.com/tarabakz25" className="flex gap-2">
      <GithubIcon className="w-6 h-auto text-white" />
      <p className="text-xl font-medium text-white px-1">GitHub</p>
  </MenuHover>
</header>
);
}
