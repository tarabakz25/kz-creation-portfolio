import React, { useState } from 'react';
import { Hamburger } from './ui/hamburger';

const MenuItems = [
  { name: 'Home', href: "/home" },
  { name: 'About', href: "/about" },
  { name: 'Blogs', href: "/blogs" },
  { name: 'Services', href: "/services" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between py-4 px-8 blur-bg fixed top-0 left-0 right-0 text-white z-50">
        <a className="text-3xl font-fugaz" href="/">Kz Creation</a>
        <Hamburger open={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </header>
      
      {/* メニュー */}
      <nav
        className={`fixed top-0 bottom-0 right-0 bg-black/30 backdrop-blur-lg text-white z-40 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <div className="flex flex-col h-full gap-4 justify-center">
          {MenuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-4 py-2 font-fugaz text-3xl transition-transform duration-300 ease-in-out hover:translate-x-2"
              onClick={() => setIsOpen(false)} // メニュー項目をクリックしたらメニューを閉じる
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>
      
      {/* オーバーレイ（背景をクリックしたらメニューを閉じる） */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 top-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
