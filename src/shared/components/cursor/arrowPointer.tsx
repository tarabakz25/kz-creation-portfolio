import { useEffect, useRef } from "react";

export default function ArrowPointer() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({
    distanceX: 0,
    distanceY: 0,
    distance: 0,
    pointerX: 0,
    pointerY: 0,
  });
  const previousPointerRef = useRef({ x: 0, y: 0 });
  const angleRef = useRef({
    current: 0,
    previous: 0,
    displace: 0,
  });
  const cursorSize = 30;
  const degrees = 57.296;

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Check if mobile device
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const position = positionRef.current;
      const previousPointer = previousPointerRef.current;
      const angle = angleRef.current;

      // Update position
      previousPointer.x = position.pointerX;
      previousPointer.y = position.pointerY;
      position.pointerX = event.pageX + document.body.getBoundingClientRect().x;
      position.pointerY = event.pageY + document.body.getBoundingClientRect().y;
      position.distanceX = previousPointer.x - position.pointerX;
      position.distanceY = previousPointer.y - position.pointerY;
      position.distance = Math.sqrt(
        position.distanceY ** 2 + position.distanceX ** 2,
      );

      // Move cursor
      cursor.style.transform = `translate3d(${position.pointerX}px, ${position.pointerY}px, 0)`;

      // Rotate cursor
      if (position.distance > 1) {
        rotate(cursor, position, angle);
      } else {
        cursor.style.transform += ` rotate(${angle.displace}deg)`;
      }
    };

    const rotate = (
      cursor: HTMLElement,
      position: typeof positionRef.current,
      angle: typeof angleRef.current,
    ) => {
      let unsortedAngle =
        Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) *
        degrees;
      let modAngle: number;
      angle.previous = angle.current;

      // Calculate angle based on quadrant
      if (position.distanceX <= 0 && position.distanceY >= 0) {
        angle.current = 90 - unsortedAngle + 0;
      } else if (position.distanceX < 0 && position.distanceY < 0) {
        angle.current = unsortedAngle + 90;
      } else if (position.distanceX >= 0 && position.distanceY <= 0) {
        angle.current = 90 - unsortedAngle + 180;
      } else if (position.distanceX > 0 && position.distanceY > 0) {
        angle.current = unsortedAngle + 270;
      }

      if (isNaN(angle.current)) {
        angle.current = angle.previous;
      } else {
        if (angle.current - angle.previous <= -270) {
          angle.displace += 360 + angle.current - angle.previous;
        } else if (angle.current - angle.previous >= 270) {
          angle.displace += angle.current - angle.previous - 360;
        } else {
          angle.displace += angle.current - angle.previous;
        }
      }

      cursor.style.transform += ` rotate(${angle.displace}deg)`;

      // Adjust cursor position based on rotation
      setTimeout(() => {
        modAngle =
          angle.displace >= 0
            ? angle.displace % 360
            : 360 + (angle.displace % 360);

        if (modAngle >= 45 && modAngle < 135) {
          cursor.style.left = `${-cursorSize}px`;
          cursor.style.top = `${-cursorSize / 2}px`;
        } else if (modAngle >= 135 && modAngle < 225) {
          cursor.style.left = `${-cursorSize / 2}px`;
          cursor.style.top = `${-cursorSize}px`;
        } else if (modAngle >= 225 && modAngle < 315) {
          cursor.style.left = "0px";
          cursor.style.top = `${-cursorSize / 2}px`;
        } else {
          cursor.style.left = `${-cursorSize / 2}px`;
          cursor.style.top = "0px";
        }
      }, 0);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Don't render on mobile
  if (
    typeof window !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  ) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="curzr"
      style={{
        boxSizing: "border-box",
        position: "fixed",
        top: "0px",
        left: `${-cursorSize / 2}px`,
        zIndex: 2147483647,
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
        transition: "250ms, transform 50ms",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="100%"
        height="100%"
      >
        <path
          className="inner"
          d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z"
          fill="#F2F5F8"
        />
        <path
          className="outer"
          d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z"
          fill="#111920"
        />
      </svg>
    </div>
  );
}
