"use client";

import React, { useState } from "react";
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
  onPageChange: (page: Page) => void;
  currentPage: Page;
}

/**
 * ナビゲーション項目の定義
 */
const NAV_ITEMS = [
  { page: "profile" as const, label: "Profile" },
  { page: "activity" as const, label: "Note" },
  { page: "works" as const, label: "Works" },
];

/**
 * ヘッダーコンポーネント
 * ナビゲーションとコンタクトダイアログを提供
 */
const Header: React.FC<HeaderProps> = ({ onPageChange, currentPage }) => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePageChange = (page: Page) => {
    if (currentPage !== page) {
      onPageChange(page);
      setIsMobileMenuOpen(false);
    }
  };

  const handleContactClick = () => {
    setIsContactDialogOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 w-full h-24 flex items-center justify-between px-4 sm:px-6 md:px-8 z-20">
        <div className="flex items-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange("home");
            }}
          >
            <img src={titleImage} alt="title image" className="h-8 sm:h-10" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center text-[#FCFCFC] font-eurostile font-regular text-xl gap-12">
          {NAV_ITEMS.map(({ page, label }) => (
            <HoverCornerButton
              key={page}
              onClick={() => handlePageChange(page)}
              className="px-2 py-2"
            >
              {label}
            </HoverCornerButton>
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
                <button
                  onClick={() => handlePageChange("home")}
                  className={`text-left px-4 py-3 text-[#FCFCFC] font-eurostile text-lg transition-colors ${
                    currentPage === "home" ? "text-[#E5E5E5]" : ""
                  } hover:text-[#E5E5E5]`}
                >
                  Home
                </button>
                {NAV_ITEMS.map(({ page, label }) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`text-left px-4 py-3 text-[#FCFCFC] font-eurostile text-lg transition-colors ${
                      currentPage === page ? "text-[#E5E5E5]" : ""
                    } hover:text-[#E5E5E5]`}
                  >
                    {label}
                  </button>
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
