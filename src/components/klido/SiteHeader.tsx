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
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(0,0,0,0.7)" : "transparent",
        backdropFilter: scrolled ? "saturate(140%) blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-16">
        <a
          href="#top"
          className="font-display text-xl font-extrabold uppercase tracking-tight text-[var(--paper)]"
        >
          Klido<span style={{ color: "var(--bronze)" }}>.</span>
        </a>
        <nav className="hidden items-center gap-10 text-xs uppercase tracking-[0.18em] text-[var(--muted-ink)] md:flex">
          <a href="#cases" className="transition-colors hover:text-[var(--paper)]">Кейсы</a>
          <a href="#" className="transition-colors hover:text-[var(--paper)]">Подход</a>
          <a href="#" className="transition-colors hover:text-[var(--paper)]">Контакт</a>
        </nav>
        <a
          href={TG}
          target="_blank"
          rel="noreferrer"
          className="border border-[var(--paper)]/30 px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-[var(--paper)] transition-all duration-300 hover:border-[var(--bronze)] hover:bg-[var(--bronze)] hover:text-[var(--ink)]"
        >
          Обсудить
        </a>
      </div>
    </header>
  );
}
