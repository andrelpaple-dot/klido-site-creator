import { motion, useInView, useMotionValue, useTransform, animate, useScroll, useSpring, useVelocity, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CustomCursor } from "@/components/klido/CustomCursor";
import { ScrollProgress } from "@/components/klido/ScrollProgress";
import { SiteHeader } from "@/components/klido/SiteHeader";
import { Scene3D } from "@/components/klido/Scene3D";
import { MagneticButton } from "@/components/klido/MagneticButton";
import { EasterEgg } from "@/components/klido/EasterEgg";
import { ImageTrail } from "@/components/klido/ImageTrail";

import { cases } from "@/components/klido/cases-data";
import fitforRobot from "@/assets/fitfor/robot.jpg";
import fitforNinja from "@/assets/fitfor/ninja.jpg";
import fitforAstronaut from "@/assets/fitfor/astronaut.jpg";
import fitforSamurai from "@/assets/fitfor/samurai.jpg";

const TG = "https://t.me/AndrewGeiger";
const MAIL = "mailto:hello@klido.ru";


function Section({
  id,
  label,
  className = "",
  children,
}: {
  id?: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative px-6 py-28 md:px-16 md:py-40 lg:py-48 ${className}`}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-x-8">
        {label && (
          <div className="col-span-12 mb-8 md:col-span-2 md:mb-0">
            <span className="eyebrow">{label}</span>
          </div>
        )}
        <div className={label ? "col-span-12 md:col-span-10" : "col-span-12"}>
          {children}
        </div>
      </div>
    </section>
  );
}

function Counter({ to, suffix = "", prefix = "", decimals = 0 }: { to: number; suffix?: string; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => {
    const n = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("ru-RU");
    return `${prefix}${n}${suffix}`;
  });
  useEffect(() => {
    if (inView) {
      const ctrl = animate(mv, to, { duration: 1.4, ease: [0.16, 1, 0.3, 1] });
      return ctrl.stop;
    }
  }, [inView, to, mv]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

function CounterBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(0);
  const width = useTransform(mv, (v) => `${v}%`);
  useEffect(() => {
    if (inView) {
      const ctrl = animate(mv, 100, { duration: 1.4, ease: [0.16, 1, 0.3, 1] });
      return ctrl.stop;
    }
  }, [inView, mv]);
  return (
    <div ref={ref} className="mt-5 h-[3px] w-full overflow-hidden bg-white/8">
      <motion.div style={{ width, background: "var(--bronze)" }} className="h-full" />
    </div>
  );
}


function FadeUp({
  delay = 0,
  children,
  className = "",
}: {
  delay?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function SplitWord({ word, delay, accent }: { word: string; delay: number; accent?: boolean }) {
  const chars = Array.from(word);
  return (
    <span className="inline-block whitespace-nowrap" style={{ color: accent ? "var(--bronze)" : undefined }}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.025 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function SplitLine({ words, baseDelay, accentWords = [] }: { words: string[]; baseDelay: number; accentWords?: string[] }) {
  let cursor = 0;
  return (
    <span className="block overflow-hidden">
      {words.map((w, wi) => {
        const d = baseDelay + cursor * 0.02;
        cursor += w.length + 1;
        return (
          <span key={wi}>
            <SplitWord word={w} delay={d} accent={accentWords.includes(w)} />
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </span>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const trailImages = cases.slice(0, 5).map((c) => c.image);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden px-6 pb-20 pt-32 md:px-16 md:pb-28"
    >
      <ImageTrail images={trailImages} containerRef={ref as React.RefObject<HTMLElement>} />
      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-[1400px]">
        <motion.div
          className="eyebrow mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          ⟶ klido · агентство · 2026
        </motion.div>

        <h1 className="display-xl text-[44px] text-[var(--paper)] md:text-[11vw] lg:text-[10vw]">
          <SplitLine words={["Klido.", "Строим"]} baseDelay={0.15} />
          <SplitLine words={["каналы"]} baseDelay={0.35} />
          <SplitLine words={["прямых", "продаж"]} baseDelay={0.5} accentWords={["прямых", "продаж"]} />
        </h1>

        <div className="mt-12 grid grid-cols-12 gap-8">
          <motion.p
            className="col-span-12 max-w-xl text-base text-[var(--muted-ink)] md:col-span-6 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Интернет-магазины, которые превращают трафик в продажи
            и возвращают бренду контроль над клиентом.
          </motion.p>

          <motion.div
            className="col-span-12 flex items-end md:col-span-6 md:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <MagneticButton
              href={TG}
              target="_blank"
              rel="noreferrer"
              className="group border border-[var(--paper)]/30 px-8 py-5 text-sm uppercase tracking-[0.18em] text-[var(--paper)] transition-colors duration-300 hover:border-[var(--bronze)] hover:bg-[var(--bronze)] hover:text-[var(--ink)]"
            >
              Обсудить проект
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </MagneticButton>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}


function ManifestoWord({
  progress,
  start,
  end,
  accent,
  children,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  accent?: boolean;
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, [start, end], [0.22, 1]);
  return (
    <motion.span
      className="manifesto-word"
      style={{ opacity, color: accent ? "var(--bronze)" : "var(--paper)" }}
    >
      {children}{" "}
    </motion.span>
  );
}

function ManifestoModel({
  progress,
  kind,
  className,
  range,
  drift,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  kind: "cube" | "cone" | "ring" | "spark" | "panel";
  className: string;
  range: [number, number, number];
  drift: [number, number, number];
}) {
  const opacity = useTransform(progress, [range[0], range[1], range[2]], [0, 1, 0.45]);
  const y = useTransform(progress, [range[0], range[2]], [drift[0], drift[1]]);
  const rotate = useTransform(progress, [range[0], range[2]], [drift[2], drift[2] + 130]);
  const scale = useTransform(progress, [range[0], range[1], range[2]], [0.82, 1.08, 0.96]);

  const stroke = "var(--bronze)";
  const muted = "rgba(245,245,243,0.58)";

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{ opacity, y, rotate, scale }}
    >
      <svg viewBox="0 0 140 140" className="h-full w-full overflow-visible">
        {kind === "cube" && (
          <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5">
            <path d="M70 10 121 39v60L70 130 19 99V39Z" stroke={stroke} />
            <path d="M19 39 70 69l51-30M70 69v61" stroke={muted} />
            <path d="M43 25 95 55" stroke={stroke} opacity="0.45" />
          </g>
        )}
        {kind === "cone" && (
          <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5">
            <path d="M70 14 116 106c-18 24-74 24-92 0Z" stroke={stroke} />
            <ellipse cx="70" cy="106" rx="46" ry="19" stroke={muted} />
            <path d="M70 14v111" stroke={stroke} opacity="0.5" />
          </g>
        )}
        {kind === "ring" && (
          <g fill="none" strokeWidth="5">
            <ellipse cx="70" cy="70" rx="56" ry="31" stroke={stroke} />
            <ellipse cx="70" cy="70" rx="31" ry="56" stroke={muted} />
            <circle cx="70" cy="70" r="15" stroke={stroke} opacity="0.55" />
          </g>
        )}
        {kind === "spark" && (
          <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5">
            <path d="M70 8v124M8 70h124M25 25l90 90M115 25l-90 90" stroke={stroke} />
            <circle cx="70" cy="70" r="24" stroke={muted} />
          </g>
        )}
        {kind === "panel" && (
          <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5">
            <path d="M25 31h90v78H25z" stroke={stroke} />
            <path d="M25 52h90M45 73h50M45 91h31" stroke={muted} />
            <path d="M40 31v-13h60v13" stroke={stroke} opacity="0.5" />
          </g>
        )}
      </svg>
    </motion.div>
  );
}

type TileKind = "orb" | "cube" | "ring" | "spark" | "chip";

function ManifestoTile({
  kind,
  progress,
  start,
  end,
  side,
}: {
  kind: TileKind;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  side: "left" | "right";
}) {
  // Reveal tracks the line's word progress: starts hidden, fully open by end
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.35, 1]);
  const rotate = useTransform(progress, [start, end], [side === "left" ? -32 : 32, 0]);
  const x = useTransform(
    progress,
    [start, end],
    [side === "left" ? -60 : 60, 0],
  );

  const gradients: Record<TileKind, string> = {
    orb: "radial-gradient(circle at 35% 30%, #FFE2B8 0%, #E2864A 38%, #8A2E18 78%, #2B0B05 100%)",
    cube: "linear-gradient(135deg, #C9A36A 0%, #5B3A1F 60%, #1B0F07 100%)",
    ring: "radial-gradient(circle at 50% 50%, #1E1E22 0%, #0B0B0E 70%), linear-gradient(135deg, #C9A36A, #4B2D14)",
    spark: "radial-gradient(circle at 50% 50%, #F7E7C8 0%, #C9A36A 35%, #2B1B0E 100%)",
    chip: "linear-gradient(135deg, #2E2E32 0%, #0B0B0E 100%)",
  };

  return (
    <motion.div
      aria-hidden
      className="manifesto-side-tile pointer-events-none"
      style={{ opacity, scale, rotate, x, background: gradients[kind] }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {kind === "orb" && (
          <>
            <ellipse cx="38" cy="32" rx="14" ry="8" fill="rgba(255,255,255,0.55)" />
            <ellipse cx="62" cy="74" rx="22" ry="6" fill="rgba(0,0,0,0.35)" />
          </>
        )}
        {kind === "cube" && (
          <g fill="none" stroke="rgba(255,235,210,0.9)" strokeWidth="3.5" strokeLinejoin="round">
            <path d="M50 14 84 32v36L50 86 16 68V32Z" />
            <path d="M16 32 50 50l34-18M50 50v36" stroke="rgba(255,235,210,0.45)" />
          </g>
        )}
        {kind === "ring" && (
          <g fill="none" stroke="#C9A36A" strokeWidth="4">
            <ellipse cx="50" cy="50" rx="36" ry="14" />
            <ellipse cx="50" cy="50" rx="14" ry="36" stroke="rgba(255,235,210,0.55)" />
            <circle cx="50" cy="50" r="6" fill="#C9A36A" stroke="none" />
          </g>
        )}
        {kind === "spark" && (
          <g fill="none" stroke="rgba(255,245,225,0.95)" strokeWidth="4" strokeLinecap="round">
            <path d="M50 8v84M8 50h84M22 22l56 56M78 22 22 78" />
          </g>
        )}
        {kind === "chip" && (
          <g fill="none" stroke="rgba(201,163,106,0.9)" strokeWidth="3.5" strokeLinejoin="round">
            <rect x="24" y="24" width="52" height="52" rx="6" />
            <path d="M36 36h28v28H36z" stroke="rgba(245,245,243,0.55)" />
            <path d="M50 12v12M50 76v12M12 50h12M76 50h12" />
          </g>
        )}
      </svg>
    </motion.div>
  );
}

type LineDef = {
  tokens: string[];
  accents?: string[];
  tile?: { kind: TileKind; side: "left" | "right" };
};

function ManifestoLine({
  line,
  progress,
  startSlot,
  step,
  revealStart,
}: {
  line: LineDef;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  startSlot: number;
  step: number;
  revealStart: number;
}) {
  const lineStart = revealStart + startSlot * step;
  const lineEnd = revealStart + (startSlot + line.tokens.length) * step;
  const tileStart = lineStart;
  const tileEnd = lineEnd;

  const tileOnLeft = line.tile?.side === "left";
  const shift = line.tile ? (tileOnLeft ? 1 : -1) : 0;
  const textX = useTransform(progress, [tileStart, tileEnd], [0, shift * 28]);

  const words = (
    <motion.span style={{ x: textX, display: "inline-block" }}>
      {line.tokens.map((tok, ti) => {
        const i = startSlot + ti;
        const start = revealStart + i * step;
        const end = start + step * 2.4;
        const accent = !!line.accents?.includes(tok);
        return (
          <ManifestoWord
            key={ti}
            progress={progress}
            start={start}
            end={end}
            accent={accent}
          >
            {tok}
          </ManifestoWord>
        );
      })}
    </motion.span>
  );

  return (
    <div className="manifesto-line">
      {line.tile && tileOnLeft && (
        <ManifestoTile
          kind={line.tile.kind}
          progress={progress}
          start={tileStart}
          end={tileEnd}
          side="left"
        />
      )}
      {words}
      {line.tile && !tileOnLeft && (
        <ManifestoTile
          kind={line.tile.kind}
          progress={progress}
          start={tileStart}
          end={tileEnd}
          side="right"
        />
      )}
    </div>
  );
}

function Manifesto() {
  const lines: LineDef[] = [
    {
      tokens: ["БЕРЁМ", "ЗАДАЧУ.", "ДУМАЕМ"],
      accents: ["ДУМАЕМ"],
      tile: { kind: "orb", side: "right" },
    },
    {
      tokens: ["КАК", "ПРОДАКТ,", "СТРОИМ"],
      accents: ["ПРОДАКТ,"],
      tile: { kind: "cube", side: "left" },
    },
    {
      tokens: ["КАК", "ИНЖЕНЕР."],
      accents: ["ИНЖЕНЕР."],
      tile: { kind: "ring", side: "right" },
    },
    {
      tokens: ["ЗАПУСКАЕМ", "ЗА", "НЕДЕЛИ —"],
      accents: ["НЕДЕЛИ —"],
      tile: { kind: "spark", side: "left" },
    },
    {
      tokens: ["НЕ", "ЗА", "МЕСЯЦЫ."],
      accents: ["МЕСЯЦЫ."],
      tile: { kind: "chip", side: "right" },
    },
  ];

  const totalSlots = lines.reduce((a, l) => a + l.tokens.length, 0);

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 30%"],
  });

  const REVEAL_START = 0.04;
  const REVEAL_END = 0.82;
  const span = REVEAL_END - REVEAL_START;
  const step = span / totalSlots;

  const progressWidth = useTransform(scrollYProgress, [0.02, 0.95], ["0%", "100%"]);

  let slotCursor = 0;

  return (
    <section
      ref={ref}
      id="manifesto"
      className="relative overflow-hidden border-t border-white/5 bg-[var(--ink)] py-32 md:py-48"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,163,106,0.18) 0%, rgba(201,163,106,0.05) 38%, transparent 72%)",
          filter: "blur(24px)",
        }}
      />

      <div className="absolute left-0 right-0 top-0 h-[3px] bg-[var(--paper)]/10">
        <motion.div style={{ width: progressWidth }} className="h-full bg-[var(--bronze)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-12">
        <div className="mb-10 text-center">
          <span className="eyebrow">(01) Манифест</span>
        </div>
        <div className="manifesto-copy font-display uppercase text-center">
          {lines.map((line, li) => {
            const startSlot = slotCursor;
            slotCursor += line.tokens.length;
            return (
              <ManifestoLine
                key={li}
                line={line}
                progress={scrollYProgress}
                startSlot={startSlot}
                step={step}
                revealStart={REVEAL_START}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}





function Team() {
  const roles = [
    {
      t: "Senior продакт-менеджер",
      d: "Изучает рынок и конкурентов, формулирует, что и как делать, собирает скоуп первого релиза и метрики успеха — ведёт проект от первого созвона до запуска.",
    },
    {
      t: "Senior Fullstack-разработчик",
      d: "Делает на современном стеке: frontend, backend, интеграции, деплой. От архитектуры до релиза за 2–3 недели без потери качества.",
    },
    {
      t: "Senior UX/UI-дизайнер",
      d: "Проектирует интерфейс с фокусом на конверсию. Прототип, дизайн-система, готовые экраны — продукт, которым приятно пользоваться.",
    },
    {
      t: "Аналитик и SEO-специалист",
      d: "Настраивает сквозную аналитику, события и базовое SEO, чтобы каждый рубль рекламы был виден и окупался.",
    },
  ];
  return (
    <Section id="team" label="Команда">
      <FadeUp>
        <h2 className="display-xl text-[26px] uppercase leading-[0.92] text-[var(--paper)] md:text-[3.6vw]">
          Команда<br />
          <span className="inline-block h-[0.08em] w-[0.6em] translate-y-[-0.25em] bg-[var(--paper)] align-middle" />{" "}
          <span style={{ color: "var(--bronze)" }}>из Big Tech</span><br />
          для вашего<br />бизнеса
        </h2>
      </FadeUp>
      <FadeUp delay={0.1}>
        <p className="mt-10 max-w-2xl text-lg text-[var(--muted-ink)]">
          Senior продакт-менеджеры, разработчики и дизайнеры с опытом в крупнейших
          tech-компаниях России. Применяем продуктовые подходы Big Tech к задачам
          малого и среднего бизнеса.
        </p>
      </FadeUp>

      <div className="mt-20 border-t border-white/10">
        {roles.map((r, i) => (
          <FadeUp key={i} delay={i * 0.06}>
            <div className="grid grid-cols-1 gap-6 border-b border-white/10 py-8 md:grid-cols-12 md:gap-8 md:py-10">
              <div className="md:col-span-5">
                <div className="text-lg font-semibold text-[var(--paper)] md:text-xl">{r.t}</div>
              </div>
              <div className="md:col-span-7">
                <div className="text-[15px] text-[var(--muted-ink)] md:text-base">{r.d}</div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}

import ozonLogo from "@/assets/logos/ozon.png.asset.json";
import vkLogo from "@/assets/logos/vk.png.asset.json";
import yandexLogo from "@/assets/logos/yandex.png.asset.json";
import avitoLogo from "@/assets/logos/avito.png.asset.json";
import sberLogo from "@/assets/logos/sber.png.asset.json";
import wbLogo from "@/assets/logos/wb.png.asset.json";
import magnitLogo from "@/assets/logos/magnit.png.asset.json";
import tbankLogo from "@/assets/logos/tbank.png.asset.json";

type LogoSpec = { name: string; src: string };

const COMPANY_LOGOS: LogoSpec[] = [
  { name: "Ozon", src: ozonLogo.url },
  { name: "VK", src: vkLogo.url },
  { name: "Яндекс", src: yandexLogo.url },
  { name: "Avito", src: avitoLogo.url },
  { name: "Сбер", src: sberLogo.url },
  { name: "Рувики", src: wbLogo.url },
  { name: "Магнит", src: magnitLogo.url },
  { name: "Т-Банк", src: tbankLogo.url },
];

function CompanyLogo({ spec }: { spec: LogoSpec }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 px-4 py-10 md:py-14">
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[22px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.4)] ring-1 ring-white/10 md:h-24 md:w-24">
        <img src={spec.src} alt={spec.name} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="text-sm font-semibold text-[var(--paper)] md:text-base">{spec.name}</div>
    </div>
  );
}


function TeamExperience() {
  return (
    <Section id="experience" label="Опыт нашей команды">
      <div className="grid grid-cols-2 border-y border-white/10 md:grid-cols-4">
        {COMPANY_LOGOS.map((c, i) => (
          <div
            key={c.name}
            className={`border-white/10 ${i % 2 !== 0 ? "border-l" : ""} ${i >= 2 ? "border-t" : ""} md:border-l md:border-t-0 ${i % 4 === 0 ? "md:border-l-0" : ""} ${i >= 4 ? "md:border-t" : ""}`}
          >
            <CompanyLogo spec={c} />
          </div>
        ))}
      </div>


      <div className="mt-24 grid grid-cols-3 gap-6 md:gap-12">
        {[
          { n: 30, s: "+", l: "проектов" },
          { n: 4, s: "+", l: "лет опыта" },
          { n: 8, s: "", l: "компаний Big Tech" },
        ].map((m, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div className="flex flex-col items-center text-center">
              <div className="display-xl text-[44px] leading-none text-[var(--paper)] md:text-[6vw]">
                <Counter to={m.n} />
                <span style={{ color: "var(--bronze)" }}>{m.s}</span>
              </div>
              <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted-ink)]">
                {m.l}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}

function WhatWeDo() {
  return (
    <Section label="(02) Что делаем" className="border-t border-white/5">
      <FadeUp>
        <h2 className="display-xl text-[26px] text-[var(--paper)] md:text-[3.6vw]">
          Каналы<br />
          <span style={{ color: "var(--bronze)" }}>прямых продаж.</span>
        </h2>
      </FadeUp>
      <FadeUp delay={0.1}>
        <p className="mt-10 max-w-2xl text-lg text-[var(--muted-ink)]">
          Строим каналы прямых продаж для брендов: интернет-магазины и продающие лендинги.
          Продуктовый подход — анализ ниши, дизайн под конверсию, базовое SEO,
          интеграции с CRM и аналитикой. Каждый проект под конкретную бизнес-задачу, а не по шаблону.
        </p>
      </FadeUp>

      <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
        {[
          { num: 11.67, suffix: "%", prefix: "до ", l: "конверсия на наших проектах", decimals: 2 },
          { num: 290, suffix: "%", prefix: "+", l: "рост онлайн-заказов после редизайна" },
          { num: 30, suffix: "+", prefix: "", l: "запущенных проектов для e-commerce" },
        ].map((m, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div className="border-t border-white/10 pt-6">
              <div className="display-xl text-[56px] leading-none text-[var(--paper)] md:text-[5vw]">
                <Counter to={m.num} suffix={m.suffix} prefix={m.prefix} decimals={m.decimals} />
              </div>
              <CounterBar />
              <div className="mt-6 max-w-[220px] text-sm text-[var(--muted-ink)]">{m.l}</div>
            </div>
          </FadeUp>

        ))}
      </div>
    </Section>
  );
}

function HowSystem() {
  const steps = [
    { t: "Трафик приходит на сайт", d: "Из рекламы, соцсетей, поиска — отовсюду, куда вы вкладываетесь." },
    { t: "Сайт превращает в покупателя", d: "Конверсионная структура, быстрая загрузка, удобный заказ." },
    { t: "База клиентов остаётся у вас", d: "Email, телефон, история заказов — основа для повторных продаж." },
    { t: "Повторные продажи растят выручку", d: "Свой канал даёт прямой контакт с клиентом и продажи без посредников." },
    { t: "Выручка становится предсказуемой", d: "Стабильный поток заказов, который не зависит от алгоритмов площадок." },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);

  return (
    <section
      id="system"
      className="relative border-t border-white/5"
    >
      {/* Mobile: vertical */}
      <div className="md:hidden">
        <div className="px-6 py-28">
          <span className="eyebrow">(03) Система</span>
          <h2 className="display-xl mt-8 text-[26px] text-[var(--paper)]">
            Как это<br />
            <span style={{ color: "var(--bronze)" }}>работает.</span>
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-px bg-white/10">
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col bg-[var(--ink)] p-8">
                <div className="font-display text-3xl font-bold" style={{ color: "var(--bronze)" }}>0{i + 1}</div>
                <h3 className="display-xl mt-6 text-xl text-[var(--paper)]">{s.t}</h3>
                <p className="mt-4 text-[14px] leading-relaxed text-[var(--muted-ink)]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: sticky horizontal scroll */}
      <div ref={ref} className="relative hidden md:block" style={{ height: `${steps.length * 90}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <div className="flex items-end justify-between px-16 pt-32">
            <div>
              <span className="eyebrow">(03) Система</span>
              <h2 className="display-xl mt-6 text-[3.6vw] text-[var(--paper)]">
                Как это <span style={{ color: "var(--bronze)" }}>работает.</span>
              </h2>
            </div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted-ink)]">
              ← scroll →
            </div>
          </div>
          <div className="relative mt-16 flex-1 overflow-hidden">
            <motion.div style={{ x }} className="flex h-full gap-8 pl-16 pr-[20vw] will-change-transform">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="flex h-full w-[68vw] max-w-[820px] flex-shrink-0 flex-col justify-between border border-white/10 bg-[#080808] p-12"
                >
                  <div
                    className="font-display font-bold leading-none"
                    style={{ color: "var(--bronze)", fontSize: "clamp(80px, 11vw, 180px)", letterSpacing: "-0.04em" }}
                  >
                    0{i + 1}
                  </div>
                  <div className="max-w-[520px]">
                    <h3 className="display-xl text-3xl text-[var(--paper)] md:text-[2.4vw]">{s.t}</h3>
                    <p className="mt-5 text-[15px] leading-relaxed text-[var(--muted-ink)]">{s.d}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="px-16 pb-10 pt-8">
            <div className="h-[2px] w-full bg-white/10">
              <motion.div
                style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
                className="h-full"
                aria-hidden
              >
                <div className="h-full w-full" style={{ background: "var(--bronze)" }} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function CaseRow({
  c,
  index,
  onHover,
  onLeave,
  onMove,
}: {
  c: (typeof cases)[number];
  index: number;
  onHover: (slug: string) => void;
  onLeave: () => void;
  onMove: (x: number, y: number) => void;
}) {
  const inner = (
    <>
      <div className="col-span-1 font-display text-xs text-[var(--muted-ink)] md:text-sm">
        0{index + 1}
      </div>
      <div className="col-span-7 md:col-span-6">
        <h3 className="display-xl text-2xl text-[var(--paper)] transition-colors group-hover:text-[var(--bronze)] md:text-[3.4vw] md:leading-[0.95]">
          {c.title}
        </h3>
      </div>
      <div className="col-span-3 hidden text-xs uppercase tracking-[0.18em] text-[var(--muted-ink)] md:block">
        {c.category.split("·")[0]?.trim()}
      </div>
      <div className="col-span-4 text-right md:col-span-2">
        <span className="font-display text-lg md:text-2xl" style={{ color: "var(--bronze)" }}>
          {c.heroPrefix ?? ""}{c.heroValue}{c.heroSuffix ?? ""}
        </span>
      </div>
    </>
  );

  const cls = "grid grid-cols-12 items-center gap-4 px-2 py-7 transition-colors hover:bg-white/[0.02] md:py-10";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.03 }}
      onMouseEnter={() => onHover(c.slug)}
      onMouseLeave={onLeave}
      onMouseMove={(e) => onMove(e.clientX, e.clientY)}
      className="group border-t border-white/10 last:border-b"
    >
      {c.external && c.liveUrl ? (
        <a href={c.liveUrl} target="_blank" rel="noreferrer" data-cursor="link" className={cls}>
          {inner}
        </a>
      ) : (
        <Link to="/cases/$slug" params={{ slug: c.slug }} data-cursor="link" className={cls}>
          {inner}
        </Link>
      )}
    </motion.div>
  );
}

function Cases() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 26, mass: 0.6 });
  const active = cases.find((c) => c.slug === activeSlug);

  const onMove = (x: number, y: number) => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1920;
    mx.set(Math.min(x + 28, w - 460));
    my.set(Math.max(20, y - 180));
  };

  return (
    <Section id="cases" label="(03) Кейсы" className="relative border-t border-white/5">
      <FadeUp>
        <h2 className="display-xl mb-16 text-[26px] text-[var(--paper)] md:text-[3.6vw]">
          Избранные<br /><span style={{ color: "var(--bronze)" }}>работы.</span>
        </h2>
      </FadeUp>
      <div className="relative">
        {cases.map((c, i) => (
          <CaseRow
            key={c.slug}
            c={c}
            index={i}
            onHover={setActiveSlug}
            onLeave={() => setActiveSlug(null)}
            onMove={onMove}
          />
        ))}
      </div>

      {/* Preload case previews so hover is instant */}
      <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
        {cases.map((c) => (
          <img key={c.slug} src={c.image} alt="" loading="eager" decoding="async" />
        ))}
      </div>


      <motion.div
        aria-hidden
        style={{ left: sx, top: sy, width: 420, height: 280, opacity: active ? 1 : 0, scale: active ? 1 : 0.9 }}
        transition={{ opacity: { duration: 0.25 }, scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
        className="pointer-events-none fixed z-[60] hidden overflow-hidden rounded-sm border border-white/10 bg-[#0a0a0a] shadow-2xl md:block"
      >
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <img src={active.image} alt={active.title} className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4 text-[11px] uppercase tracking-[0.2em] text-[var(--paper)]">
                {active.title}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}

function FitForItem({
  item,
  index,
}: {
  item: {
    img: string;
    tag: string;
    t: string;
    sub: string;
    bullets: string[];
  };
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Image is 130% tall — translate it from -15% to +15% as we scroll past.
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  // 3D tilt based on mouse position inside the hero
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotX = useSpring(tiltX, { stiffness: 140, damping: 16, mass: 0.4 });
  const rotY = useSpring(tiltY, { stiffness: 140, damping: 16, mass: 0.4 });
  const onTilt = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tiltY.set(px * 8);
    tiltX.set(-py * 8);
  };
  const onTiltLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <div>
      {/* Full-width hero with centered title */}
      <div
        ref={ref}
        onMouseMove={onTilt}
        onMouseLeave={onTiltLeave}
        className="relative h-[78vh] min-h-[560px] w-full overflow-hidden md:h-screen md:min-h-[760px]"
        style={{ perspective: 1200 }}
      >
        <motion.img
          src={item.img}
          alt={item.t}
          loading="lazy"
          style={{ y, rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
          className="absolute left-0 top-0 h-[130%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />

        {/* Centered title */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h3
            className="fitfor-title display-xl text-center text-[var(--paper)]"
            style={{
              fontSize: "clamp(32px, 6.6vw, 120px)",
              lineHeight: 1.2,
              paddingTop: "0.35em",
              paddingBottom: "0.1em",
              overflow: "visible",
              maxWidth: "92vw",
              wordBreak: "break-word",
              hyphens: "auto",
            }}
          >
            {item.t}
          </h3>
        </div>


        {/* Bottom-left index */}
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-12">
          <span
            className="font-display font-bold leading-none text-[var(--paper)]/70"
            style={{ letterSpacing: "-0.02em", fontSize: "clamp(28px, 3vw, 44px)" }}
          >
            //0{index + 1}
          </span>
        </div>
        <div className="absolute right-6 top-6 text-[11px] uppercase tracking-[0.3em] text-[var(--paper)]/80 md:right-12 md:top-10 md:text-xs">
          {item.tag}
        </div>
      </div>

      {/* Description block under the image */}
      <div className="relative bg-black px-6 py-20 md:px-16 md:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          {/* Ghost giant number */}
          <div className="relative md:col-span-5">
            <div
              className="font-display font-bold leading-none text-white/[0.05]"
              style={{ fontSize: "clamp(180px, 26vw, 420px)", letterSpacing: "-0.05em" }}
            >
              0{index + 1}
            </div>
          </div>

          {/* Bullets */}
          <div className="md:col-span-7">
            <p className="fitfor-sub mb-10 max-w-2xl text-[13px] uppercase tracking-[0.28em] text-[var(--muted-ink)] md:text-[14px]">
              {item.sub}
            </p>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {item.bullets.map((b, bi) => (
                <li
                  key={bi}
                  className="flex items-center justify-between gap-6 py-5 transition-colors hover:bg-white/[0.02]"
                >
                  <span className="text-[15px] text-[var(--paper)] md:text-base">{b}</span>
                  <span className="font-mono text-[11px] text-[var(--muted-ink)]">
                    0{bi + 1}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function FitFor() {
  const items = [
    {
      img: fitforRobot,
      tag: "// 01",
      t: "Растущий бренд без своего сайта",
      sub: "Бренд, который вырос из соцсетей и маркетплейсов и хочет собственный канал продаж",
      bullets: [
        "Продаёте через WB / Ozon — но зависите от их комиссий и правил",
        "Хотите собственный канал, который не отключат за ночь",
        "Нужен сайт с интеграцией CRM, оплатой и логистикой",
        "Важно стартовать быстро — пока ниша свободна",
        "Нужен продуктовый подход, а не просто шаблон",
      ],
    },
    {
      img: fitforNinja,
      tag: "// 02",
      t: "Заказы в DM съедают время",
      sub: "Продаёте через Instagram и Telegram — и больше не успеваете обрабатывать всё руками",
      bullets: [
        "Аудитория растёт — заявки тонут в директе",
        "Нет автоматизации: оплата, склад, доставка вручную",
        "Хочется сайт, который продаёт сам — без участия в каждом заказе",
        "Нужна интеграция с CRM и мессенджерами",
        "Важно сохранить визуальный тон бренда",
      ],
    },
    {
      img: fitforAstronaut,
      tag: "// 03",
      t: "Старый сайт с конверсией 1–2%",
      sub: "Магазин запускали 5+ лет назад — он работает, но не растёт",
      bullets: [
        "Дизайн устарел, мобильная версия ломается",
        "Корзина и оформление — главная точка отказа",
        "Аналитика не настроена или показывает «всё плохо»",
        "Готовы к редизайну под современные стандарты",
        "Нужен сайт, который наконец-то продаёт",
      ],
    },
    {
      img: fitforSamurai,
      tag: "// 04",
      t: "Новый бренд — новый сайт",
      sub: "После ребрендинга или запуска новой линейки — старый сайт уже не отражает то, кем вы стали",
      bullets: [
        "Сменили позиционирование, логотип или линейку",
        "Старый сайт визуально и технически — из прошлой жизни",
        "Нужен запуск быстро, без потери темпа кампании",
        "Важна консистентность бренда — от Figma до чекаута",
        "Нужен партнёр, а не подрядчик «сделал и ушёл»",
      ],
    },
  ];
  return (
    <section
      id="fitfor"
      className="relative border-t border-white/5 px-6 pt-28 md:px-16 md:pt-40 lg:pt-48"
    >
      <div className="mx-auto mb-20 max-w-[1400px] md:mb-32">
        <div className="flex flex-col items-start md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow mb-6 block">(04) Если это про вас</span>
            <FadeUp>
              <h2 className="display-xl text-[44px] text-[var(--paper)] md:text-[6vw]">
                Кому<br />
                <span style={{ color: "var(--bronze)" }}>подойдёт.</span>
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.1}>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-[var(--muted-ink)] md:mt-0">
              Четыре сценария, в которых внешний сайт становится отдельным
              каналом продаж — не дубликатом маркетплейса.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="flex flex-col">
        {items.map((it, i) => (
          <FitForItem key={i} item={it} index={i} />
        ))}
      </div>
    </section>
  );
}



function Principles() {
  const items = [
    { t: "Скорость без потери качества", d: "AI-инструменты сокращают разработку в 3 раза — без компромиссов по UX." },
    { t: "Прозрачность", d: "Доступ к Figma, репозиторию и аналитике с первого дня. Вы видите процесс, а не «чёрный ящик»." },
    { t: "Кейсы, которые можно проверить", d: "Не картинки — живые сайты. Открывайте и смотрите." },
    { t: "Честно говорим нет", d: "Если идея не сработает — скажем до старта, а не после." },
  ];
  return (
    <Section id="approach" label="(05) Подход" className="border-t border-white/5">
      <FadeUp>
        <h2 className="display-xl mb-16 text-[26px] text-[var(--paper)] md:text-[3.6vw]">
          Как мы<br /><span style={{ color: "var(--bronze)" }}>работаем.</span>
        </h2>
      </FadeUp>
      <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 md:gap-y-16">
        {items.map((it, i) => (
          <FadeUp key={i} delay={(i % 2) * 0.08}>
            <div className="flex gap-6 border-t border-white/10 pt-6">
              <span className="font-display text-2xl font-bold" style={{ color: "var(--bronze)" }}>
                0{i + 1}
              </span>
              <div>
                <h3 className="display-xl text-xl text-[var(--paper)] md:text-2xl">{it.t}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted-ink)]">{it.d}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}

function FinalCTA() {
  return (
    <Section id="contact" className="border-t border-white/5">
      <div className="text-center">
        <FadeUp>
          <h2 className="display-xl text-[52px] text-[var(--paper)] md:text-[8vw]">
            Готовы запустить<br />
            <span style={{ color: "var(--bronze)" }}>свой канал продаж?</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mx-auto mt-10 max-w-xl text-base text-[var(--muted-ink)] md:text-lg">
            30 минут на разговор. Покажем кейсы под вашу нишу — с живыми ссылками.
            Если поймём, что не подходим — скажем прямо.
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <a
            href={TG}
            target="_blank"
            rel="noreferrer"
            className="group mt-14 inline-flex items-center gap-4 bg-[var(--bronze)] px-10 py-6 text-sm uppercase tracking-[0.2em] text-[var(--ink)] transition-all duration-300 hover:bg-[var(--paper)]"
          >
            Написать в Telegram
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className="mt-10 text-sm text-[var(--muted-ink)]">
            <a href={TG} target="_blank" rel="noreferrer" className="hover:text-[var(--paper)]">
              @AndrewGeiger
            </a>{" "}
            <span className="mx-3 opacity-30">/</span>{" "}
            <a href={MAIL} className="hover:text-[var(--paper)]">hello@klido.ru</a>
          </p>
        </FadeUp>
      </div>
    </Section>
  );
}

function CityClock({ city, tz }: { city: string; tz: string }) {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: tz,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tz]);
  return (
    <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)]/70">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--ink)]" />
      <span className="text-[var(--ink)]">{city}</span>
      <span className="tabular-nums text-[var(--ink)]/70">{time}</span>
    </span>
  );
}

function Footer() {
  return (
    <footer
      className="relative z-10 border-t border-white/10"
      style={{ background: "var(--bronze)", color: "var(--ink)" }}
    >
      {/* Top contact band */}
      <div className="px-6 pt-12 pb-10 md:px-16 md:pt-16 md:pb-14">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 items-start gap-y-10">
          <div className="col-span-12 md:col-span-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ink)]/70">
              New business inquiries
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ink)]/70">
              Telegram
            </div>
            <a
              href={TG}
              target="_blank"
              rel="noreferrer"
              className="font-display text-3xl font-semibold text-[var(--ink)] underline-offset-8 transition-all hover:underline md:text-5xl"
            >
              @AndrewGeiger
            </a>
          </div>
          <div className="col-span-12 flex md:col-span-3 md:justify-end">
            <a
              href={TG}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border-2 border-[var(--ink)] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ink)] transition-all duration-300 hover:bg-[var(--ink)] hover:text-[var(--bronze)]"
            >
              Связаться
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-6 border-t border-[var(--ink)]/25 md:mx-16" />

      {/* About + giant wordmark */}
      <div className="px-6 pt-12 md:px-16 md:pt-16">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-y-8">
          <div className="col-span-12 md:col-span-3">
            <div className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[var(--ink)]/70">
              About
            </div>
          </div>
          <div className="col-span-12 md:col-span-7">
            <p className="max-w-[520px] text-lg leading-relaxed text-[var(--ink)] md:text-xl">
              Klido — продакшн-студия внешних каналов роста. Мыслим как маркетологи,
              строим как инженеры. Запускаем performance-системы за 2–4 недели —
              от бизнес-задачи до работающего канала с метриками.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-[1400px] md:mt-14">
          <h2
            aria-hidden
            className="font-display select-none text-[var(--ink)]"
            style={{
              fontSize: "clamp(96px, 26vw, 440px)",
              fontWeight: 900,
              lineHeight: 0.82,
              letterSpacing: "-0.06em",
            }}
          >
            KLIDO
          </h2>
        </div>
      </div>

      {/* Bottom band — clocks + copyright */}
      <div className="mt-2 border-t border-[var(--ink)]/25 px-6 py-6 md:px-16">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            <CityClock city="Москва" tz="Europe/Moscow" />
            <CityClock city="Дубай" tz="Asia/Dubai" />
            <CityClock city="Нью-Йорк" tz="America/New_York" />
            <CityClock city="Токио" tz="Asia/Tokyo" />
          </div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ink)]/70">
            © 2026 Klido · hello@klido.ru
          </div>
        </div>
      </div>
    </footer>
  );
}

export function KlidoLanding() {
  return (
    <div className="relative min-h-screen bg-[var(--ink)] text-[var(--paper)]" style={{ overflowX: "clip" }}>
      <Scene3D />
      <ScrollProgress />
      <CustomCursor />
      <div className="relative z-10">
        <SiteHeader />
        <main>
          <Hero />
          <Manifesto />
          <Team />
          <TeamExperience />
          <WhatWeDo />
          <HowSystem />
          <Cases />

          <FitFor />
          <Principles />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
