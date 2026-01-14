import gsap from 'gsap';
import { useEffect, useRef } from "react";
import { FadeBlob } from '~/components/gsap/fadeBlob';

const menuItems = [
  {
    title: "about",
    url: "/about"
  },
  {
    title: "lab",
    url: "/lab",
  },
  {
    title: "contact",
    url: "/contact"
  }
];

export default function MenuItem() {
  
  return (
    <main className="flex flex-col gap-2">
      {menuItems.map(({ title, url }) => {
        return (
          <FadeBlob key={title} href={url} className='font-eurostile font-light tracking-wide text-xl'>
            {title}
          </FadeBlob>
        )
      })}
    </main>
  )
}