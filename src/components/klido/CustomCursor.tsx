import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"default" | "link" | "image">("default");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      if (target?.closest("img, [data-cursor='image']")) {
        setVariant("image");
      } else if (target?.closest("a, button, [role='button'], [data-cursor='link']")) {
        setVariant("link");
      } else {
        setVariant("default");
      }
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringSize = variant === "image" ? 72 : variant === "link" ? 56 : 36;
  const beige = "#C9A36A";
  const ringBg = variant === "link" || variant === "image" ? "rgba(201,163,106,0.18)" : "transparent";

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "9999px",
          backgroundColor: beige,
          boxShadow: "0 0 12px rgba(201,163,106,0.55)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: variant === "default" ? 1 : 0,
          transition: "opacity 200ms ease",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: ringSize,
          height: ringSize,
          borderRadius: "9999px",
          border: `1.5px solid ${beige}`,
          backgroundColor: ringBg,
          pointerEvents: "none",
          zIndex: 9999,
          transition: "width 200ms ease, height 200ms ease, background-color 200ms ease",
          willChange: "transform",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          color: beige,
          fontFamily: "Inter, sans-serif",
          letterSpacing: "0.05em",
        }}
      >
        {variant === "image" ? "смотреть" : ""}
      </div>
    </>
  );
}
