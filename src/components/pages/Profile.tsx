import React from 'react';
import { FaTag } from "react-icons/fa6";

import ProfileIcon from '~/assets/images/u3629887153_a_short-haired_anime_boy_sitting_wearing_a_black__7ac53e52-ff93-4e02-8942-30490f55db56_0.png?url';

const tools = [
  "Next.js", "React", "TailwindCSS", "Astro", "Rust", "Figma", "Cursor", "Neovim" 
];
const awards = [
  "Kosen Programming Contest 2025 Competitive Programming Division - 3rd place in the semifinals",
  "TwoGate DevCamp 2024 - TwoGate Award",
]

const Profile: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-16 ">
      <div className="w-full flex items-center justify-center gap-8">
        <img src={ProfileIcon} alt="profile icon" className="w-48 h-48 object-cover rounded-3xl" />
        <div className="flex flex-col main-fg gap-2">
          <h1 className="text-3xl font-futura">Kizuki Aiki</h1>
          <h2 className="text-xl font-eurostile tracking-widest">Web Engineering, UI/UX Design and AI/LLM Coding</h2>
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <h3 className="text-2xl font-futura main-fg">My main tools</h3>
        <div className="w-full flex items-center justify-center gap-4 flex-wrap mt-4 px-8">
          {tools.map((tool) => (
            <div key={tool} className="flex items-center gap-2 bg-[#353535] main-fg px-4 py-2 rounded-lg font-eurostile tracking-widest text-lg">
              <FaTag />
              <span>{tool}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4 flex-wrap">
        <h3 className="text-2xl font-futura main-fg">Awards & Recognitions</h3>
        <div className="w-full flex flex-col items-center justify-center gap-4 mt-4 px-8">
          {awards.map((award, index) => (
            <div key={index} className="flex items-center gap-2 bg-[#353535] main-fg px-4 py-2 rounded-lg font-eurostile tracking-wider text-lg">
              <FaTag />
              <span>{award}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile;
