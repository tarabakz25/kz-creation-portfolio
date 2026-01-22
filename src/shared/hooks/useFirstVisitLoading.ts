import gsap from "gsap";
import { useEffect } from "react";

/**
 * Handles the first-visit loading animation.
 * The loading overlay is defined in Layout.astro as static HTML
 * to ensure it's visible before React hydration.
 */
export function useFirstVisitLoading() {
  useEffect(() => {
    const isFirstVisit = document.documentElement.hasAttribute("data-first-visit");
    const loadingOverlay = document.getElementById("loading-overlay");
    const loadingBg = document.getElementById("loading-bg");
    const loadingText = document.getElementById("loading-text");
    const loadingLine = document.getElementById("loading-line");
    const smoothWrapper = document.getElementById("smooth-wrapper");

    if (!isFirstVisit) {
      if (loadingOverlay) loadingOverlay.style.display = "none";
      if (smoothWrapper) gsap.set(smoothWrapper, { opacity: 1, y: 0 });
      return;
    }

    if (!loadingOverlay || !loadingBg || !loadingText || !loadingLine) return;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("hasVisited", "true");
        document.documentElement.removeAttribute("data-first-visit");
        loadingOverlay.style.display = "none";

        if (smoothWrapper) {
          gsap.fromTo(
            smoothWrapper,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          );
        }
      },
    });

    tl.to(loadingText, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(loadingLine, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, "-=0.3")
      .to(loadingText, { opacity: 0, y: -20, duration: 0.5, ease: "power2.in", delay: 0.3 })
      .to(loadingLine, { opacity: 0, duration: 0.3 }, "-=0.3")
      .to(loadingBg, { yPercent: -100, duration: 0.8, ease: "power3.inOut" });

    return () => {
      tl.kill();
    };
  }, []);
}
