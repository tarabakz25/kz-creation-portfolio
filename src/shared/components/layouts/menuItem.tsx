import gsap from 'gsap';
import { useEffect, useRef } from "react";
import { FadeBlob } from '~/shared/components/gsap/fadeBlob';

const menuItems = [
  {
    title: "top",
    url: "/",
  },
  {
    title: "about",
    url: "/about",
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
    <main className="flex flex-col gap-1">
      {menuItems.map(({ title, url }) => {
      
        return (
          <FadeBlob key={title} href={url} className='font-avenir text-xl'>
            {title}
          </FadeBlob>
        )
      })}
    </main>
  )
}
