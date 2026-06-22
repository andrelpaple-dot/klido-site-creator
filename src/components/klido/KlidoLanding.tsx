import { motion, useInView, useMotionValue, useTransform, animate, useScroll } from "framer-motion";
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

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${prefix}${Math.round(v).toLocaleString("ru-RU")}${suffix}`);
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
          интернет<span style={{ color: "var(--bronze)" }}>—</span>магазины<br />
          для брендов<br />
          <span style={{ color: "var(--bronze)" }}>на WB и Ozon</span>
        </motion.h1>

        <div className="mt-12 grid grid-cols-12 gap-8">
          <motion.p
            className="col-span-12 max-w-xl text-base text-[var(--muted-ink)] md:col-span-6 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Запускаем внешний канал продаж, куда вы льёте свой трафик — и удерживаете маржу,
            которую забирают маркетплейсы.
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

function Manifesto() {
  // Slash = line break, * marks bronze accent words
  const phrase =
    "Берём задачу,/думаем как/*продакт*/и строим/как *инженер*./Запускаем/за *недели,*/не за *месяцы.*";
  const lines = phrase.split("/");
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.15 });

  return (
    <Section label="(01) Манифест" className="border-t border-white/5">
      <div
        ref={wrapRef}
        className="font-display uppercase leading-[0.92] tracking-[-0.035em] text-[var(--paper)]"
        style={{ fontSize: "clamp(44px, 9vw, 168px)", fontWeight: 800 }}
      >
        {lines.map((line, li) => {
          const words = line.split(" ");
          return (
            <div key={li} className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: li * 0.08 }}
              >
                {words.map((w, wi) => {
                  const accent = w.startsWith("*") && w.endsWith("*");
                  const clean = accent ? w.slice(1, -1) : w;
                  return (
                    <span key={wi} style={accent ? { color: "var(--bronze)" } : undefined}>
                      {clean}
                      {wi < words.length - 1 ? " " : ""}
                    </span>
                  );
                })}
              </motion.div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function WhatWeDo() {
  return (
    <Section label="(02) Что делаем" className="border-t border-white/5">
      <FadeUp>
        <h2 className="display-xl text-[34px] text-[var(--paper)] md:text-[6vw]">
          Продуктовый<br />
          <span style={{ color: "var(--bronze)" }}>подход.</span>
        </h2>
      </FadeUp>
      <FadeUp delay={0.1}>
        <p className="mt-10 max-w-2xl text-lg text-[var(--muted-ink)]">
          Анализ ниши — дизайн под конверсию — базовое SEO — интеграции с CRM и аналитикой.
          Запускаем интернет-магазины и лендинги для брендов, торгующих на маркетплейсах.
        </p>
      </FadeUp>

      <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
        {[
          { num: 290, suffix: "%", prefix: "+", l: "рост онлайн-заказов после редизайна" },
          { num: 30, suffix: "+", prefix: "", l: "запущенных проектов для e-commerce" },
        ].map((m, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div className="border-t border-white/10 pt-6">
              <div className="display-xl text-[56px] leading-none text-[var(--paper)] md:text-[5vw]">
                <Counter to={m.num} suffix={m.suffix} prefix={m.prefix} />
              </div>
              <div className="mt-6 max-w-[220px] text-sm text-[var(--muted-ink)]">{m.l}</div>
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
    { t: "Продаёте на WB или Ozon", d: "Комиссии 50%+ съедают маржу. Нужен внешний канал для своего трафика." },
    { t: "Бренд из Instagram / Telegram", d: "Аудитория растёт, обработка заказов в DM съедает время. Нужен сайт с CRM." },
    { t: "Старый интернет-магазин", d: "Сайт с 2018 года, конверсия 1–2%. Готовы к редизайну под современные стандарты." },
    { t: "Новый бренд после ребрендинга", d: "Сменили позиционирование. Нужен сайт за 2 недели, а не 2 месяца." },
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
    { t: "Скорость без потери качества", d: "AI-инструменты и собственные шаблоны сокращают разработку в 3 раза — без компромиссов по UX." },
    { t: "Полная прозрачность", d: "Доступ к Figma, репозиторию и аналитике с первого дня. Вы видите процесс, а не «черный ящик»." },
    { t: "Фокус на бизнес-метрики", d: "Считаем конверсию, выручку и LTV — а не часы и слои в Photoshop." },
    { t: "Стратегия до дизайна", d: "Сначала разбираем нишу, аудиторию и цифры — потом рисуем. Поэтому решения попадают в цель." },
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
            Готовы<br />
            <span style={{ color: "var(--bronze)" }}>запустить?</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mx-auto mt-10 max-w-xl text-base text-[var(--muted-ink)] md:text-lg">
            30 минут на разговор. Покажем 2–3 похожих кейса под вашу нишу
            и расскажем, как выстроим внешний канал именно для вашего бренда.
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
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--ink)] text-[var(--paper)]">
      <Scene3D />
      <ScrollProgress />
      <CustomCursor />
      <div className="relative z-10">
        <SiteHeader />
        <main>
          <Hero />
          <Manifesto />
          <WhatWeDo />
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
