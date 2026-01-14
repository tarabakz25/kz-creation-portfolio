import { Mail } from 'lucide-react';
import { MenuHover } from '~/components/gsap/menuHover';

interface Props {
  valiant: string,
};

export default function Header({ valiant }: Props) {
  
  if (valiant === 'top') {
    return (
      <header className="w-full flex items-center justify-between py-6 px-16 font-futura_100 tracking-wider">
        <nav className="flex items-center gap-24">
          {items.map((i) => {
            return (
              <MenuHover
                key={i.label}
                href={`/${i.label}`}
                className="text-xl font-medium text-white px-1 cursor-none"
              >
                {i.label}
              </MenuHover>
            );
          })}
        </nav>
  
        <MenuHover href="/contact" className="flex gap-2 cursor-none">
          <Mail className="w-6 h-auto text-white" />
          <p className="text-xl font-medium text-white px-1">Contact</p>
        </MenuHover>
      </header>
    )
  } else {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between py-6 px-16 font-futura_100 tracking-wider bg-[#131313]/80 backdrop-blur-sm">
        <div className="flex items-center gap-16">
          <a href="/" className="hover:opacity-70 transition-opacity">
            <img src={Logo.src} alt="Kz Creation" className="h-4 w-auto" />
          </a>
  
          <nav className="flex items-center gap-12">
            {items.map((i) => {
              return (
                <MenuHover
                  key={i.label}
                  href={`/${i.label}`}
                  className="text-xl font-medium text-white px-1 cursor-none"
                >
                  {i.label}
                </MenuHover>
              );
            })}
          </nav>
        </div>
  
        <MenuHover href="/contact" className="flex gap-2 cursor-none">
          <Mail className="w-6 h-auto text-white" />
          <p className="text-xl font-medium text-white px-1">Contact</p>
        </MenuHover>
      </header>
    )
  }
}