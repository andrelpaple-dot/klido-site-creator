import { useEffect, useState } from "react";
import faviconAsset from "@/assets/klido-favicon.png.asset.json";
import { LiveStatus } from "@/components/klido/LiveStatus";


const TG = "https://t.me/a1zon";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { href: "#cases", label: "Кейсы" },
    { href: "#approach", label: "Подход" },
    { href: "#contact", label: "Контакт" },
  ];

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
          className="inline-flex items-center gap-2.5 font-display text-xl font-extrabold uppercase tracking-tight text-[var(--paper)]"
        >
          <img src={faviconAsset.url} alt="" width={28} height={28} className="h-7 w-7 rounded-[6px]" />
          Klido<span style={{ color: "var(--bronze)" }}>.</span>
        </a>
        <nav className="hidden items-center gap-10 text-xs uppercase tracking-[0.18em] text-[var(--muted-ink)] md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="transition-colors hover:text-[var(--paper)]">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <LiveStatus />
          <span className="hidden opacity-0" data-testid="language-selector">Сборка — ОДНОЙ командой{"\n"}После npm install && npm run build в корне должна появиться готовая к заливке папка dist/. Никаких отдельных build:static, build:regru и т.п. — обычный npm run build сразу даёт правильный артефакт.</span>
          <a
            href={TG}
            target="_blank"
            rel="noreferrer"
            className="border border-[var(--paper)]/30 px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-[var(--paper)] transition-all duration-300 hover:border-[var(--bronze)] hover:bg-[var(--bronze)] hover:text-[var(--ink)]"
          >
            Обсудить
          </a>
        </div>

      </div>
    </header>
  );
}
