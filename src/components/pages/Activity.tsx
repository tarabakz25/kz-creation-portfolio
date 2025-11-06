"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ActivityItem {
  date: string;
  period?: string;
  title: string;
  description?: string;
  tags?: string[];
}

const activityItems: ActivityItem[] = [
  {
    date: 'Apr 2023',
    title: 'Enrollment at Kamiyama Marugoto College of Technology',
  },
  {
    date: 'Oct 2023',
    title: 'Kosen Programming Contest 2023 Free Category Finals Participation',
    tags: ['contest'],
  },
  {
    date: 'Aug 2024',
    title: 'TwoGate DevCamp 2024 Summer - TwoGate Award',
    tags: ['hackathon'],
  },
  {
    date: 'Oct 2024',
    title: 'Kosen Programming Contest 2024 Competitive Category Finals Participation',
    tags: ['contest'],
  },
  {
    date: 'Jan 2025',
    title: 'Kamiyama Marugoto College of Technology In-House Hackathon - Special Award',
    tags: ['hackathon'],
  },
  {
    date: 'Jun 2025',
    title: 'Participating in the Hack1 Grand Prix 2025',
    tags: ['hackathon'],
  },
];

export default function Activity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const items = itemsRef.current;
    const itemHeight = 200; // 各アイテムの高さ
    const baseOffset = container.clientHeight / 2 - itemHeight / 2;
    const maxScroll = (items.length - 1) * itemHeight;

    // 初期位置の設定
    items.forEach((item, index) => {
      gsap.set(item, {
        y: index * itemHeight + baseOffset,
        scale: 0.85,
        opacity: 0.4,
      });
    });

    // アイテムの位置とスケールを更新する関数
    const updateItems = () => {
      const centerY = container.clientHeight / 2;

      items.forEach((item, index) => {
        const itemY = index * itemHeight - scrollPositionRef.current + baseOffset;
        const distanceFromCenter = Math.abs(centerY - (itemY + itemHeight / 2));
        const maxDistance = container.clientHeight / 2;

        // 中央に近いほど大きく、遠いほど小さく
        const scale = Math.max(0.85, 1 - (distanceFromCenter / maxDistance) * 0.15);
        const opacity = Math.max(0.4, 1 - (distanceFromCenter / maxDistance) * 0.6);

        gsap.to(item, {
          y: itemY,
          scale: scale,
          opacity: opacity,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    };

    // ホイールイベント
    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const withinVerticalBounds = e.clientY >= rect.top && e.clientY <= rect.bottom;
      let isPointerInside = false;

      if (e.target instanceof Node && container.contains(e.target)) {
        isPointerInside = true;
      } else {
        const elementAtPoint = document.elementFromPoint(e.clientX, e.clientY);
        if (elementAtPoint && container.contains(elementAtPoint)) {
          isPointerInside = true;
        }
      }

      if (!isPointerInside && !withinVerticalBounds) {
        return;
      }

      e.preventDefault();
      scrollPositionRef.current = Math.max(0, Math.min(maxScroll, scrollPositionRef.current + e.deltaY * 0.5));
      updateItems();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    updateItems();

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div ref={containerRef} className="mx-auto max-w-2xl h-screen p-4 overflow-hidden select-none relative">
      <div className="relative h-full">
        {activityItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) itemsRef.current[index] = el;
            }}
            className="absolute left-0 right-0 will-change-transform"
          >
            <div className="mb-8 p-6 main-fg transform-gpu" style={{ height: '180px' }}>
              <div className="text-sm mb-1 font-futura">
                {item.date} {item.period && ` - ${item.period}`}
              </div>
              <div className="text-2xl font-semibold mb-2 font-eurostile">{item.title}</div>
              {item.description && (
                <div className="mb-2">{item.description}</div>
              )}
              {item.tags && (
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-2 py-1 font-futura"
                    >
                      # {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
