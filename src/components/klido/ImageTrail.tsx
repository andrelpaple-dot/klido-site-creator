import { useEffect, useRef } from "react";

const POOL_LIMIT = 8;
const LIFESPAN = 700;
const MIN_DIST = 90;

export function ImageTrail({ images, containerRef }: { images: string[]; containerRef: React.RefObject<HTMLElement> }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef<{ x: number; y: number } | null>(null);
  const idxRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const layer = layerRef.current;
    if (!container || !layer || images.length === 0) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      const last = lastRef.current;
      if (last && Math.hypot(x - last.x, y - last.y) < MIN_DIST) return;
      lastRef.current = { x, y };

      const img = document.createElement("img");
      img.src = images[idxRef.current % images.length];
      idxRef.current += 1;
      img.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:180px;height:120px;object-fit:cover;transform:translate(-50%,-50%) scale(0.6);opacity:0;transition:opacity 220ms ease, transform 700ms cubic-bezier(0.16,1,0.3,1);border:1px solid rgba(201,163,106,0.4);box-shadow:0 30px 60px -20px rgba(0,0,0,0.6);pointer-events:none;filter:saturate(0.85);will-change:opacity,transform;`;
      layer.appendChild(img);
      while (layer.children.length > POOL_LIMIT) layer.removeChild(layer.firstChild!);

      requestAnimationFrame(() => {
        img.style.opacity = "1";
        img.style.transform = `translate(-50%,-50%) scale(1)`;
      });
      setTimeout(() => {
        img.style.opacity = "0";
        img.style.transform = `translate(-50%,-50%) scale(0.85)`;
      }, LIFESPAN);
      setTimeout(() => img.remove(), LIFESPAN + 700);
    };

    container.addEventListener("mousemove", onMove);
    return () => container.removeEventListener("mousemove", onMove);
  }, [images, containerRef]);

  return (
    <div
      ref={layerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
    />
  );
}
