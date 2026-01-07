"use client";

import React, { useState, useEffect } from "react";
import titleImage from "~/assets/kz_creation.svg?url";
import ContactDialog from "./ContactDialog";
import { HoverCornerButton } from "~/components/ui/hover-corner-button";
import { Hamburger } from "~/components/ui/hamburger";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import type { Page } from "~/types";

interface HeaderProps {
  currentPage: Page;
}

const NAV_ITEMS = [
  { page: "home" as const, label: "Home", href: "/" },
  { page: "profile" as const, label: "Profile", href: "/profile" },
  { page: "works" as const, label: "Works", href: "/works" },
];

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on page navigation
  useEffect(() => {
    const handlePageLoad = () => {
      setIsMobileMenuOpen(false);
    };

    document.addEventListener("astro:page-load", handlePageLoad);
    return () => {
      document.removeEventListener("astro:page-load", handlePageLoad);
    };
  }, []);

  const handleContactClick = () => {
    setIsContactDialogOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 w-full h-24 flex items-center justify-between px-4 sm:px-6 md:px-8 z-20">
        <div className="flex items-center">
          <a href="/" data-astro-prefetch>
            <img src={titleImage} alt="title image" className="h-8 sm:h-10" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center text-[#FCFCFC] font-eurostile font-regular text-xl gap-12">
          {NAV_ITEMS.map(({ page, label, href }) => (
            <a key={page} href={href} data-astro-prefetch>
              <HoverCornerButton
                className={`px-2 py-2 ${currentPage === page ? "opacity-100" : "opacity-70"}`}
              >
                {label}
              </HoverCornerButton>
            </a>
          ))}
        </div>

        {/* Desktop Contact Button */}
        <div className="hidden md:flex items-center justify-center">
          <HoverCornerButton onClick={handleContactClick} className="px-8 py-4">
            Contact Me!
          </HoverCornerButton>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-[#FCFCFC] p-2"
              aria-label="Open menu"
            >
              <Hamburger open={isMobileMenuOpen} />
            </button>
            <SheetContent
              side="right"
              className="bg-[#121212] border-[#252525] w-64"
            >
              <SheetHeader>
                <SheetTitle className="text-[#FCFCFC] font-eurostile text-xl">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {NAV_ITEMS.map(({ page, label, href }) => (
                  <a
                    key={page}
                    href={href}
                    data-astro-prefetch
                    className={`text-left px-4 py-3 text-[#FCFCFC] font-eurostile text-lg transition-colors ${
                      currentPage === page ? "text-[#E5E5E5]" : ""
                    } hover:text-[#E5E5E5]`}
                  >
                    {label}
                  </a>
                ))}
                <button
                  onClick={handleContactClick}
                  className="text-left px-4 py-3 text-[#FCFCFC] font-eurostile text-lg transition-colors hover:text-[#E5E5E5] mt-4 border-t border-[#252525] pt-4"
                >
                  Contact Me!
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <ContactDialog
        open={isContactDialogOpen}
        onOpenChange={setIsContactDialogOpen}
      />
    </>
  );
};

export default Header;
