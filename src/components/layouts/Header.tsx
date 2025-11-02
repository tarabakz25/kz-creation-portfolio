import React from 'react';
import { FaXTwitter, FaGithub } from 'react-icons/fa6';
import titleImage from '~/assets/kz_creation.svg?url';

type Page = 'home' | 'profile' | 'activity' | 'blog';

interface HeaderProps {
  onPageChange: (page: Page) => void;
  currentPage: Page;
}

const Header: React.FC<HeaderProps> = ({ onPageChange, currentPage }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
    e.preventDefault();
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  return (
    <header className="fixed top-0 w-full h-24 flex items-center justify-between px-8 z-20">
      <div className="flex items-center">
        <a href="#" onClick={(e) => handleLinkClick(e, 'home')}>
          <img src={titleImage} alt="title image" className="h-10" />
        </a>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center text-[#FCFCFC] font-futura font-regular text-xl gap-12">
        <a href="#" onClick={(e) => handleLinkClick(e, 'profile')}>Profile</a>
        <a href="#" onClick={(e) => handleLinkClick(e, 'activity')}>Activity</a>
        <a href="#" onClick={(e) => handleLinkClick(e, 'blog')}>Notes</a>
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
