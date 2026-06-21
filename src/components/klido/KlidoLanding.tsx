import { motion, useInView, useMotionValue, useTransform, animate, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
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
  const lines = [
    { t: "Маркетплейсы забирают", a: "до 60% выручки." },
    { t: "Свой канал возвращает", a: "контроль и клиента." },
    { t: "Мы делаем этот канал —", a: "с измеримой конверсией." },
  ];
  return (
    <Section label="(01) Манифест" className="border-t border-white/5">
      <div className="space-y-12 md:space-y-20">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
          >
            <p className="display-xl text-[32px] text-[var(--paper)] md:text-[5.5vw]">
              {l.t}{" "}
              <span style={{ color: "var(--bronze)" }}>{l.a}</span>
            </p>
          </motion.div>
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

      <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
        {[
          { num: 12, suffix: "%", prefix: "до ", l: "средняя конверсия наших работ" },
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

function CaseRow({ c, index }: { c: (typeof cases)[number]; index: number }) {
  return (
    <motion.article
      data-cursor="link"
      className="group relative grid grid-cols-12 gap-x-8 border-t border-white/10 py-10 transition-colors hover:bg-white/[0.02] md:py-14"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="col-span-2 md:col-span-1">
        <span className="eyebrow">0{index + 1}</span>
      </div>
      <div className="col-span-10 md:col-span-5">
        <h3 className="display-xl text-3xl text-[var(--paper)] transition-colors group-hover:text-[var(--bronze)] md:text-5xl">
          {c.title}
        </h3>
        <div className="mt-3 text-xs uppercase tracking-[0.15em] text-[var(--muted-ink)]">
          {c.category}
        </div>
      </div>
      <div className="col-span-12 mt-6 grid grid-cols-2 gap-x-6 gap-y-5 md:col-span-6 md:mt-0 md:grid-cols-4">
        {c.metrics.map((m, i) => (
          <div key={i}>
            <div className="font-display text-lg font-semibold text-[var(--paper)] md:text-xl">
              {m.value}
            </div>
            <div className="mt-1 text-xs text-[var(--muted-ink)]">{m.label}</div>
          </div>
        ))}
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
          <CaseRow key={c.slug} c={c} index={i} />
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
    <Section label="(04) Кому" className="border-t border-white/5">
      <FadeUp>
        <h2 className="display-xl mb-16 text-[34px] text-[var(--paper)] md:text-[6vw]">
          Кому<br /><span style={{ color: "var(--bronze)" }}>подойдёт.</span>
        </h2>
      </FadeUp>
      <div className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2">
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
    </Section>
  );
}

function Principles() {
  const items = [
    { t: "Скорость без потери качества", d: "AI-инструменты сокращают разработку в 3 раза." },
    { t: "Прозрачность", d: "Доступ к Figma, репозиторию и аналитике с первого дня." },
    { t: "Фокус на бизнес-метрики", d: "Считаем конверсию и выручку, а не часы." },
    { t: "Честно говорим нет", d: "Если идея не сработает — скажем до старта." },
  ];
  return (
    <Section label="(05) Как" className="border-t border-white/5">
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
    <Section className="border-t border-white/5">
      <div className="text-center">
        <FadeUp>
          <h2 className="display-xl text-[52px] text-[var(--paper)] md:text-[8vw]">
            Готовы<br />
            <span style={{ color: "var(--bronze)" }}>запустить?</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mx-auto mt-10 max-w-xl text-base text-[var(--muted-ink)] md:text-lg">
            30 минут на разговор. Покажем 2–3 похожих кейса под вашу нишу.
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

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[var(--ink)] px-6 py-10 md:px-16">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-3 text-xs uppercase tracking-[0.15em] text-[var(--muted-ink)] md:flex-row md:items-center">
        <div>© 2026 Klido</div>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <a href={MAIL} className="hover:text-[var(--paper)]">hello@klido.ru</a>
          <a href={TG} target="_blank" rel="noreferrer" className="hover:text-[var(--paper)]">
            @AndrewGeiger
          </a>
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
