import * as React from "react";

import { cn } from "~/lib/utils";

export interface HamburgerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  open: boolean
}

export const Hamburger = React.forwardRef<HTMLButtonElement, HamburgerProps>(
  ({ className, open, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative size-8 flex flex-col items-center justify-center group",
          className
        )}
        aria-label="Toggle menu"
        {...props}
      >
        <span
          className={cn(
            "bg-current absolute h-0.5 w-6 rounded-full transition-all duration-300 ease-in-out",
            open 
              ? "rotate-45 translate-x-0 group-hover:rotate-30" 
              : "-translate-y-2 group-hover:-translate-x-2"
          )}
        />
        <span
          className={cn(
            "bg-current absolute h-0.5 w-6 rounded-full transition-all duration-300 ease-in-out",
            open 
              ? "opacity-0" 
              : "translate-y-0 group-hover:-translate-x-1"
          )}    
        />
        <span
          className={cn(
            "bg-current absolute h-0.5 w-6 rounded-full transition-all duration-300 ease-in-out",
            open 
              ? "-rotate-45 translate-x-0 group-hover:-rotate-30" 
              : "translate-y-2"
          )}
        />
      </button>
    )
  }
);

Hamburger.displayName = "Hamburger";
