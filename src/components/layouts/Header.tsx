import React from 'react';
import { FaSquareXTwitter, FaXTwitter, FaGithub } from 'react-icons/fa6';
import titleImage from '~/assets/images/kz_creation.svg?url';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 w-full h-24 flex items-center justify-between px-8 z-20">
      <div className="flex items-center">
        <a href="#">
          <img src={titleImage} alt="title image" className="w-48" />
        </a>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center text-[#FCFCFC] font-fugaz text-3xl gap-12">
        <a href="">Profile</a>
        <a href="">Activity</a>
        <a href="">Notes</a>
      </div>
      <div className="flex items-center justify-center">
        <a 
          href="https://twitter.com/kz25_kmc/" 
          target="_blank" 
          rel="noopener noreferrer">
            <FaXTwitter className="text-2xl text-[#FCFCFC] transition-colors duration-300" />
        </a>
        <a 
          href="https://github.com/tarabakz25/"
          target="_blank"
          rel="noopener noreferrer">
            <FaGithub className="ml-6 text-2xl text-[#FCFCFC] transition-colors duration-300" />
        </a>
      </div>
    </header>
  )
}

export default Header;
