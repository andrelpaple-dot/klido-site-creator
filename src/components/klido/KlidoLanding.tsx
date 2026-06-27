import { motion, useInView, useMotionValue, useTransform, animate, useScroll } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CustomCursor } from "@/components/klido/CustomCursor";
import { ScrollProgress } from "@/components/klido/ScrollProgress";
import { SiteHeader } from "@/components/klido/SiteHeader";
import { Scene3D } from "@/components/klido/Scene3D";

import { cases } from "@/components/klido/cases-data";

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

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-end px-6 pb-20 pt-32 md:px-16 md:pb-28"
    >
      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-[1400px]">
        <motion.div
          className="eyebrow mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          ⟶ klido · агентство · 2026
        </motion.div>

        <motion.h1
          className="display-xl text-[44px] text-[var(--paper)] md:text-[11vw] lg:text-[10vw]"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          Klido. Строим<br />
          каналы<br />
          <span style={{ color: "var(--bronze)" }}>прямых продаж</span>
        </motion.h1>

        <div className="mt-12 grid grid-cols-12 gap-8">
          <motion.p
            className="col-span-12 max-w-xl text-base text-[var(--muted-ink)] md:col-span-6 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Интернет-магазины, которые превращают трафик в продажи
            и возвращают бренду контроль над клиентом.
          </motion.p>

          <motion.div
            className="col-span-12 flex items-end md:col-span-6 md:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a
              href={TG}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-4 border border-[var(--paper)]/30 px-8 py-5 text-sm uppercase tracking-[0.18em] text-[var(--paper)] transition-all duration-300 hover:border-[var(--bronze)] hover:bg-[var(--bronze)] hover:text-[var(--ink)]"
            >
              Обсудить проект
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
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
  const opacity = useTransform(progress, [start, (start + end) / 2, end], [0, 1, 1]);
  const scale = useTransform(progress, [start, end], [0.55, 1]);
  const rotate = useTransform(progress, [start, end], [side === "left" ? -28 : 28, 0]);
  const x = useTransform(
    progress,
    [start, end],
    [side === "left" ? -80 : 80, 0],
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
  const tileEnd = lineStart + (lineEnd - lineStart) * 0.6;

  const shift = line.tile ? (line.tile.side === "left" ? 1 : -1) : 0;
  const x = useTransform(progress, [tileStart, tileEnd], [0, shift * 60]);

  return (
    <div className="manifesto-line relative">
      {line.tile && (
        <ManifestoTile
          kind={line.tile.kind}
          progress={progress}
          start={tileStart}
          end={tileEnd}
          side={line.tile.side}
        />
      )}
      <motion.span style={{ x, display: "inline-block" }}>
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
        <h2 className="display-xl text-[34px] uppercase leading-[0.92] text-[var(--paper)] md:text-[6.4vw]">
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
        <h2 className="display-xl text-[34px] text-[var(--paper)] md:text-[6vw]">
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
  ];
  return (
    <Section id="system" label="(03) Система" className="border-t border-white/5">
      <FadeUp>
        <h2 className="display-xl text-[34px] text-[var(--paper)] md:text-[6vw]">
          Как это<br />
          <span style={{ color: "var(--bronze)" }}>работает.</span>
        </h2>
      </FadeUp>
      <div className="mt-16 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-4">
        {steps.map((s, i) => (
          <FadeUp key={i} delay={i * 0.06}>
            <div className="flex h-full flex-col bg-[var(--ink)] p-8 md:p-10">
              <div className="font-display text-3xl font-bold md:text-4xl" style={{ color: "var(--bronze)" }}>
                0{i + 1}
              </div>
              <h3 className="display-xl mt-6 text-xl text-[var(--paper)] md:text-2xl">{s.t}</h3>
              <p className="mt-4 text-[14px] leading-relaxed text-[var(--muted-ink)]">{s.d}</p>
              {i < steps.length - 1 && (
                <div className="mt-6 hidden text-2xl text-[var(--bronze)]/60 md:block">→</div>
              )}
            </div>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}

function CaseCard({ c, index }: { c: (typeof cases)[number]; index: number }) {
  const reverse = index % 2 === 1;
  return (
    <motion.article
      data-cursor="image"
      className="group relative grid grid-cols-12 gap-y-8 border-t border-white/10 py-16 md:gap-x-12 md:py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image */}
      <div className={`col-span-12 md:col-span-7 ${reverse ? "md:order-2" : ""}`}>
        <div className="relative overflow-hidden border border-white/5 bg-white/[0.02]">
          <div className="aspect-[4/3] w-full md:aspect-[16/10]">
            <img
              src={c.image}
              alt={c.title}
              loading="lazy"
              width={1024}
              height={1024}
              className="h-full w-full object-cover transition-all duration-[1400ms] ease-out [filter:grayscale(0.85)_contrast(1.05)_brightness(0.78)_sepia(0.25)] group-hover:[filter:grayscale(0)_contrast(1)_brightness(1)_sepia(0)] group-hover:scale-[1.04]"
            />
          </div>
          {/* bronze tint overlay (fades on hover) */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-90 transition-opacity duration-[1400ms] ease-out group-hover:opacity-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(201,163,106,0.55) 0%, rgba(20,16,10,0.85) 100%)",
            }}
          />
          {/* readability gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute left-5 top-5 text-xs uppercase tracking-[0.2em] text-[var(--paper)]/85">
            0{index + 1} / {String(cases.length).padStart(2, "0")}
          </div>
          <div className="absolute bottom-5 right-5 text-[10px] uppercase tracking-[0.2em] text-[var(--paper)]/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            наведите · показать оригинал
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`col-span-12 flex flex-col justify-between md:col-span-5 ${reverse ? "md:order-1" : ""}`}>
        <div>
          <div className="eyebrow mb-5">{c.category}</div>
          <h3 className="display-xl text-3xl text-[var(--paper)] transition-colors group-hover:text-[var(--bronze)] md:text-[44px] lg:text-5xl">
            {c.title}
          </h3>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[var(--muted-ink)] md:text-base">
            {c.description}
          </p>
        </div>

        {/* Hero animated number */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <div
            className="display-xl text-[64px] leading-none md:text-[88px] lg:text-[104px]"
            style={{ color: "var(--bronze)" }}
          >
            <Counter to={c.heroValue} prefix={c.heroPrefix ?? ""} suffix={c.heroSuffix ?? ""} />
          </div>
          <div className="mt-3 text-sm text-[var(--muted-ink)]">{c.heroLabel}</div>

          <div className="mt-6 grid grid-cols-3 gap-x-4">
            {c.metrics.map((m, i) => (
              <div key={i}>
                <div className="font-display text-base font-semibold text-[var(--paper)] md:text-lg">
                  {m.value}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[var(--muted-ink)]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/cases/$slug"
              params={{ slug: c.slug }}
              className="group/btn inline-flex items-center gap-3 border border-[var(--paper)]/25 px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-[var(--paper)] transition-all hover:border-[var(--bronze)] hover:bg-[var(--bronze)] hover:text-[var(--ink)]"
            >
              Смотреть кейс
              <span aria-hidden className="transition-transform group-hover/btn:translate-x-1">→</span>
            </Link>
            {c.liveUrl && (
              <a
                href={c.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="group/btn inline-flex items-center gap-3 bg-[var(--bronze)] px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-[var(--ink)] transition-all hover:bg-[var(--paper)]"
              >
                Открыть сайт
                <span aria-hidden className="transition-transform group-hover/btn:translate-x-1">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Cases() {
  return (
    <Section id="cases" label="(03) Кейсы" className="border-t border-white/5">
      <FadeUp>
        <h2 className="display-xl mb-16 text-[34px] text-[var(--paper)] md:text-[6vw]">
          Избранные<br /><span style={{ color: "var(--bronze)" }}>работы.</span>
        </h2>
      </FadeUp>
      <div>
        {cases.map((c, i) => (
          <CaseCard key={c.slug} c={c} index={i} />
        ))}
        <div className="h-px w-full bg-white/10" />
      </div>
    </Section>
  );
}

function FitFor() {
  const items = [
    { t: "Растущий бренд без своего сайта", d: "Продаёте через соцсети, маркетплейсы или офлайн. Нужен свой канал, чтобы не зависеть от посредников и комиссий." },
    { t: "Бренд из Instagram / Telegram", d: "Аудитория растёт, ручная обработка заказов в DM съедает время. Нужен сайт с автоматизацией и интеграцией с CRM." },
    { t: "Старый интернет-магазин", d: "Сайт работает с 2018 года, конверсия 1–2%. Готовы к редизайну под современные стандарты." },
    { t: "Новый бренд после ребрендинга", d: "Сменили позиционирование или линейку. Нужен новый сайт быстро." },
  ];
  return (
    <section id="fitfor" className="relative border-t border-white/5 px-6 py-28 md:px-16 md:py-40 lg:py-48">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="eyebrow mb-6">(04) Кому</span>
          <FadeUp>
            <h2 className="display-xl text-[34px] text-[var(--paper)] md:text-[6vw]">
              Кому<br /><span style={{ color: "var(--bronze)" }}>подойдёт.</span>
            </h2>
          </FadeUp>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2">
          {items.map((it, i) => (
            <FadeUp key={i} delay={(i % 2) * 0.1}>
              <div className="h-full bg-[var(--ink)] p-8 transition-colors hover:bg-white/[0.03] md:p-10">
                <div className="eyebrow mb-4">0{i + 1}</div>
                <h3 className="display-xl text-2xl text-[var(--paper)] md:text-3xl">{it.t}</h3>
                <p className="mt-5 text-[15px] leading-relaxed text-[var(--muted-ink)]">{it.d}</p>
              </div>
            </FadeUp>
          ))}
        </div>
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
        <h2 className="display-xl mb-16 text-[34px] text-[var(--paper)] md:text-[6vw]">
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
