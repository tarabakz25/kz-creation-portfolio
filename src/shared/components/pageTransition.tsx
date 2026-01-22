import gsap from "gsap";
import {
  useLayoutEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";

interface TransitionContextType {
  navigateTo: (url: string) => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const usePageTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error(
      "usePageTransition must be used within PageTransitionProvider",
    );
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

// Check if this is a page entry before render
const getIsPageEntry = () => {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("pageTransition") === "true";
};

export function PageTransitionProvider({ children }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPageEntry] = useState(getIsPageEntry);

  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const smoothWrapper = document.getElementById("smooth-wrapper");

    if (isPageEntry) {
      sessionStorage.removeItem("pageTransition");
      // Remove the CSS guard attribute
      document.documentElement.removeAttribute("data-page-entry");

      // Entry animation - fade in from bottom
      gsap.fromTo(
        smoothWrapper || contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
      );
    } else {
      // No transition, show immediately - but NOT on first visit (loading handles that)
      const isFirstVisit =
        document.documentElement.hasAttribute("data-first-visit");
      if (!isFirstVisit) {
        gsap.set(smoothWrapper || contentRef.current, { opacity: 1, y: 0 });
      }
    }
  }, [isPageEntry]);

  const navigateTo = (url: string) => {
    if (isAnimating || !contentRef.current) return;

    // Don't animate if same page
    if (window.location.pathname === url) return;

    setIsAnimating(true);
    sessionStorage.setItem("pageTransition", "true");

    // Exit animation - fade out
    gsap.to(contentRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        window.location.href = url;
      },
    });
  };

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      <div ref={contentRef}>{children}</div>
    </TransitionContext.Provider>
  );
}
