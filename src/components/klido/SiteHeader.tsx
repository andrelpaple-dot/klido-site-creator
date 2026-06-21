import { useEffect, useState } from "react";

const TG = "https://t.me/AndrewGeiger";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.06)" : "none",
        backdropFilter: scrolled ? "saturate(140%) blur(8px)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-12">
        <a href="#top" className="font-display text-2xl tracking-tight text-[var(--ink)]">
          Klido
        </a>
        <a
          href={TG}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[var(--ink)] bg-[var(--ink)] px-5 py-2 text-sm font-medium text-[var(--ivory)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#1a1a1a]"
        >
          Обсудить проект
        </a>
      </div>
    </header>
  );
}
