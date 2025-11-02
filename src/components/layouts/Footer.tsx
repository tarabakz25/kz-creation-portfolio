import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 w-full h-12 flex items-center justify-between px-12 relative">
      <div className="flex-1"></div>
      <p className="absolute left-1/2 transform -translate-x-1/2 text-[#FCFCFC] font-futura text-sm">© 2025 KZ Creation. All rights reserved.</p>
      <a
        href="/privacy-policy"
        className="text-[#FCFCFC] font-futura text-sm hover:underline ml-4 flex-1 flex justify-end"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy Policy
      </a>
    </footer>
  )
}

export default Footer;
