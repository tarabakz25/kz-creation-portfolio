import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import MenuItem from "~/components/layouts/menuItem";
import worksData from "./content/works.json";
import type { ImageMetadata } from "astro";

// Register GSAP plugins
gsap.registerPlugin(Observer, useGSAP);

// Import images
const imagesGlob = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/content/works/*.{webp,png,jpg,jpeg}",
  { eager: true },
);

// Helper to get image from path
const getImage = (path: string) => {
  const cleanPath = path.replace(/^~/, "/src");
  const imageModule = imagesGlob[cleanPath];
  return imageModule ? imageModule.default : null;
};

const works = worksData
  .map((work) => ({
    ...work,
    imageObj: getImage(work.image),
  }))
  .filter((w) => w.imageObj);

export default function LabPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAnimating = useRef(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Ref to track current index for Observer without re-binding
  const indexRef = useRef(currentIndex);

  useEffect(() => {
    indexRef.current = currentIndex;
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    if (
      isAnimating.current ||
      index < 0 ||
      index >= works.length ||
      index === indexRef.current
    )
      return;

    isAnimating.current = true;
    const direction = index > indexRef.current ? 1 : -1;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(index);
        isAnimating.current = false;
      },
    });

    // Animate Out
    tl.to(contentRef.current, {
      opacity: 0,
      y: -20 * direction,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  useGSAP(() => {
    // Animate In when index changes
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
    );
  }, [currentIndex]);

  useGSAP(() => {
    const obs = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onUp: () => goToSlide(indexRef.current - 1),
      onDown: () => goToSlide(indexRef.current + 1),
      tolerance: 10,
      preventDefault: true,
    });

    return () => obs.kill();
  }, []);

  const currentWork = works[currentIndex];

  if (!currentWork) return null;

  return (
    <main className="h-screen flex justify-between px-[5vw] py-[10vh] overflow-hidden">
      {/* Left Section: Static */}
      <div className="flex flex-col items-start w-full min-h-screen text-white gap-8 z-20 pointer-events-none">
        <h1 className="text-3xl font-futura_pt tracking-wider pointer-events-auto">
          My Works.
        </h1>
        <div className="pointer-events-auto">
          <MenuItem />
        </div>
      </div>

      {/* Right Section: Dynamic Content */}
      <div
        className="w-full flex flex-col justify-center items-end text-white relative z-10"
        ref={contentRef}
      >
        <div className="w-full max-w-2xl flex flex-col gap-6 items-end text-right">
          {/* Image */}
          <a
            href={currentWork.url || undefined}
            target={currentWork.url ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`block w-full aspect-video rounded-lg overflow-hidden border border-white/10 shadow-2xl relative group ${currentWork.url ? "cursor-pointer hover:border-white/30" : "cursor-default"}`}
          >
            <img
              src={currentWork.imageObj!.src}
              alt={currentWork.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {currentWork.url && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="font-futura_pt tracking-widest text-sm border border-white px-3 py-1 rounded-full">
                  VISIT
                </span>
              </div>
            )}
          </a>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-center justify-end gap-3">
              <span className="text-xs font-mono text-white/50">
                0{currentIndex + 1} / 0{works.length}
              </span>
              <h2 className="text-4xl font-futura_pt font-bold leading-none">
                {currentWork.name}
              </h2>
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              {currentWork.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-white/70 bg-white/5 px-2 py-1 rounded border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Indicators (Optional, but good for UX) */}
        <div className="absolute right-[-2vw] top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {works.map((_, idx) => (
            <div
              key={idx}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-white h-3" : "bg-white/20"}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
