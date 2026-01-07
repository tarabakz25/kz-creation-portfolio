"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ScreenMigration from "./ScreenMigration";

/**
 * Grid transition overlay for Astro View Transitions
 * Listens to View Transition events and displays grid animation during page navigation
 */
export default function ViewTransitionGrid() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Track mount state to avoid SSR issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen to Astro View Transitions events
  useEffect(() => {
    if (!mounted) return;

    const handleStart = () => {
      setIsTransitioning(true);
    };

    const handleEnd = () => {
      // Grid animation completes on its own via onFadeOutComplete
    };

    document.addEventListener("astro:before-preparation", handleStart);
    document.addEventListener("astro:after-swap", handleEnd);

    return () => {
      document.removeEventListener("astro:before-preparation", handleStart);
      document.removeEventListener("astro:after-swap", handleEnd);
    };
  }, [mounted]);

  // Don't render until mounted (avoid SSR) or if not transitioning
  if (!mounted || !isTransitioning) return null;

  // Portal to document.body to overlay on top of everything
  return createPortal(
    <ScreenMigration
      onFadeInComplete={() => {
        // Grid fade-in complete, page content will swap
      }}
      onFadeOutComplete={() => {
        // Grid fade-out complete, hide overlay
        setIsTransitioning(false);
      }}
    />,
    document.body
  );
}
