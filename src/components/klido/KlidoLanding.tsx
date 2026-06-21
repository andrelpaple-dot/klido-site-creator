import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { CustomCursor } from "@/components/klido/CustomCursor";
import { ScrollProgress } from "@/components/klido/ScrollProgress";
import { SiteHeader } from "@/components/klido/SiteHeader";
import { cases } from "@/components/klido/cases-data";

const TG = "https://t.me/AndrewGeiger";
const MAIL = "mailto:hello@klido.ru";

function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`px-6 py-16 md:px-12 md:py-24 lg:py-32 ${className}`}
    >
      <div className="mx-auto max-w-[1200px]">{children}</div>
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
      const ctrl = animate(mv, to, { duration: 1.2, ease: "easeOut" });
      return ctrl.stop;
    }
  }, [inView, to, mv]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

function FadeUp({
  delay = 0,
  amount = 0.3,
  children,
  className = "",
}: {
  delay?: number;
  amount?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center px-6 pt-24 md:px-12"
    >
      <div className="mx-auto max-w-[1200px]">
        <motion.h1
          className="font-display text-[40px] leading-[1.05] tracking-tight text-[var(--ink)] md:text-[64px] lg:text-[72px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        >
          Klido. Интернет-магазины для брендов, продающих на{" "}
          <span style={{ color: "var(--bronze)" }}>Wildberries</span> и{" "}
          <span style={{ color: "var(--bronze)" }}>Ozon</span>.
        </motion.h1>

        <motion.p
          className="mt-8 max-w-3xl text-lg text-[var(--muted-ink)] md:text-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          Запускаем внешний канал продаж, куда вы льёте свой трафик — и удерживаете маржу,
          которую забирают маркетплейсы.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          <a
            href={TG}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-8 py-4 text-base font-medium text-[var(--ivory)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#1a1a1a]"
          >
            Обсудить проект
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Manifesto() {
  const lines = [
    "Маркетплейсы забирают до 60% выручки.",
    "Свой канал возвращает контроль и прямой контакт с клиентом.",
    "Мы делаем этот канал — с измеримой конверсией.",
  ];
  return (
    <Section className="border-t border-[var(--hairline)]">
      <div className="space-y-10 md:space-y-14">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            className="font-display text-[26px] leading-[1.25] text-[var(--ink)] md:text-[40px] lg:text-[44px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.15 }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </Section>
  );
}

function WhatWeDo() {
  return (
    <Section className="border-t border-[var(--hairline)]">
      <FadeUp>
        <h2 className="font-display text-3xl text-[var(--ink)] md:text-5xl">Что мы делаем</h2>
      </FadeUp>
      <FadeUp delay={0.1}>
        <p className="mt-6 max-w-3xl text-base text-[var(--muted-ink)] md:text-lg">
          Запускаем интернет-магазины и продающие лендинги для брендов, торгующих на
          маркетплейсах. Продуктовый подход: анализ ниши — дизайн под конверсию — базовое SEO —
          интеграции с CRM и аналитикой.
        </p>
      </FadeUp>

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
        {[
          { num: 12, suffix: "%", prefix: "до ", l1: "средняя конверсия", l2: "наших работ" },
          { num: 290, suffix: "%", prefix: "+", l1: "рост онлайн-заказов", l2: "после редизайна" },
          { num: 30, suffix: "+", prefix: "", l1: "запущенных проектов", l2: "для e-commerce" },
        ].map((m, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div className="font-display text-[40px] leading-none text-[var(--ink)] md:text-[60px]">
              <Counter to={m.num} suffix={m.suffix} prefix={m.prefix} />
            </div>
            <div className="mt-4 text-sm text-[var(--muted-ink)]">
              {m.l1}
              <br />
              {m.l2}
            </div>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}

function CaseCard({ c, index }: { c: (typeof cases)[number]; index: number }) {
  return (
    <motion.article
      data-cursor="image"
      className="group rounded-2xl border border-[var(--hairline)] bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.18)] md:p-7"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 2) * 0.1 }}
    >
      <div className="relative overflow-hidden rounded-xl">
        <div
          className="aspect-[16/9] w-full"
          style={{
            background:
              "linear-gradient(135deg, #ECECE6 0%, #E8E8E4 50%, #DCDCD6 100%)",
          }}
          aria-hidden
        />
        <div
          className="absolute bottom-3 right-3 w-[24%] overflow-hidden rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
          aria-hidden
        >
          <div
            className="aspect-[9/16] w-full"
            style={{
              background:
                "linear-gradient(180deg, #F4F4EF 0%, #E2E2DC 100%)",
            }}
          />
        </div>
      </div>

      <div className="mt-5 text-xs uppercase tracking-[0.12em] text-[var(--muted-ink)]">
        {c.category}
      </div>
      <h3 className="mt-2 font-display text-2xl text-[var(--ink)] md:text-3xl">{c.title}</h3>

      <div className="mt-5 h-px w-full bg-[var(--hairline)]" />

      <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5">
        {c.metrics.map((m, i) => (
          <div key={i}>
            <div className="font-display text-xl text-[var(--ink)] md:text-2xl">{m.value}</div>
            <div className="mt-1 text-xs text-[var(--muted-ink)]">{m.label}</div>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

function Cases() {
  return (
    <Section id="cases" className="border-t border-[var(--hairline)]">
      <FadeUp>
        <h2 className="font-display text-3xl text-[var(--ink)] md:text-5xl">Кейсы</h2>
      </FadeUp>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {cases.map((c, i) => (
          <CaseCard key={c.slug} c={c} index={i} />
        ))}
      </div>
    </Section>
  );
}

function FitFor() {
  const items = [
    {
      t: "Продаёте на Wildberries или Ozon",
      d: "Комиссии 50%+ съедают маржу. Хотите внешний канал, чтобы лить туда свой трафик и удерживать клиента для повторных продаж.",
    },
    {
      t: "Бренд из Instagram или Telegram",
      d: "Аудитория растёт, ручная обработка заказов в DM съедает время. Нужен сайт с автоматизацией и интеграцией с CRM.",
    },
    {
      t: "Старый интернет-магазин",
      d: "Сайт работает с 2018 года, конверсия 1–2%. Готовы к редизайну под современные стандарты.",
    },
    {
      t: "Новый бренд после ребрендинга",
      d: "Сменили позиционирование или линейку. Нужен новый сайт за 2 недели, а не 2 месяца.",
    },
  ];
  return (
    <Section className="border-t border-[var(--hairline)]">
      <FadeUp>
        <h2 className="font-display text-3xl text-[var(--ink)] md:text-5xl">Кому подойдёт</h2>
      </FadeUp>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {items.map((it, i) => (
          <FadeUp key={i} delay={(i % 2) * 0.1}>
            <div className="h-full rounded-2xl border border-[var(--hairline)] bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.12)]">
              <h3 className="font-display text-xl text-[var(--ink)] md:text-2xl">{it.t}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted-ink)]">{it.d}</p>
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
    <Section className="border-t border-[var(--hairline)]">
      <FadeUp>
        <h2 className="font-display text-3xl text-[var(--ink)] md:text-5xl">Как мы работаем</h2>
      </FadeUp>
      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-14">
        {items.map((it, i) => (
          <FadeUp key={i} delay={(i % 2) * 0.08}>
            <div className="flex items-baseline gap-4">
              <span
                className="font-display text-2xl"
                style={{ color: "var(--bronze)" }}
              >
                0{i + 1}
              </span>
              <div>
                <h3 className="font-display text-xl text-[var(--ink)] md:text-2xl">{it.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted-ink)]">{it.d}</p>
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
    <Section className="border-t border-[var(--hairline)]">
      <div className="mx-auto max-w-3xl text-center">
        <FadeUp>
          <h2 className="font-display text-3xl text-[var(--ink)] md:text-5xl lg:text-[56px]">
            Готовы запустить свой канал продаж?
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-base text-[var(--muted-ink)] md:text-lg">
            30 минут на разговор. Покажем 2–3 похожих кейса под вашу нишу. Если поймём, что не
            подходим — скажем прямо.
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <a
            href={TG}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-8 py-4 text-base font-medium text-[var(--ivory)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#1a1a1a]"
          >
            Написать в Telegram
            <span aria-hidden>→</span>
          </a>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className="mt-6 text-sm text-[var(--muted-ink)]">
            <a
              href={TG}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:text-[var(--ink)] hover:underline"
            >
              @AndrewGeiger
            </a>{" "}
            |{" "}
            <a
              href={MAIL}
              className="underline-offset-4 hover:text-[var(--ink)] hover:underline"
            >
              hello@klido.ru
            </a>
          </p>
        </FadeUp>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: "#0D0D0D" }} className="px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-3 text-sm text-[#6B6B6B] md:flex-row md:items-center">
        <div>© 2025 Klido</div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href={MAIL} className="transition-colors hover:text-[var(--ivory)]">
            hello@klido.ru
          </a>
          <a
            href={TG}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[var(--ivory)]"
          >
            @AndrewGeiger
          </a>
        </div>
      </div>
    </footer>
  );
}

export function KlidoLanding() {
  return (
    <div className="relative overflow-x-hidden bg-[var(--ivory)] text-[var(--ink)]">
      <ScrollProgress />
      <CustomCursor />
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
  );
}
