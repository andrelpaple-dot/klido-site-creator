import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { cases } from "@/components/klido/cases-data";
import { SiteHeader } from "@/components/klido/SiteHeader";
import { CustomCursor } from "@/components/klido/CustomCursor";
import { ScrollProgress } from "@/components/klido/ScrollProgress";

const TG = "https://t.me/AndrewGeiger";

export const Route = createFileRoute("/cases/$slug")({
  loader: ({ params }) => {
    const c = cases.find((x) => x.slug === params.slug);
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — кейс Klido` : "Кейс — Klido" },
      {
        name: "description",
        content: loaderData?.description ?? "Кейс Klido — канал прямых продаж для бренда.",
      },
    ],
  }),
  component: CasePage,
});

function CasePage() {
  const c = Route.useLoaderData();

  const taskByCase: Record<string, string> = {
    grooming:
      "Бренд продавал через DM в соцсетях, сайта-каталога не было. Заявки терялись, обработка вручную съедала время основателя.",
    tsargrad:
      "Тренажёры продавали офлайн и через одностраничник с конверсией 1.5%. Аренда не была оформлена как продукт — клиенты уходили к конкурентам.",
    "vision-minimal":
      "Старый интернет-магазин 2018 года, конверсия 6.8%, высокий процент отказов. Премиум-сегмент требовал нового UX.",
    "furniture-mood":
      "Бренд дизайнерской мебели работал только через шоурум. Нужен был свой канал онлайн-продаж с SEO-трафиком.",
    "vita-prime":
      "Бренд добавок лил Директ на лендинг с конверсией 2.3% и CPO 4 800 ₽ — реклама уходила в минус.",
    "crunch-world":
      "Импортёр редких чипсов продавал через WB с комиссией 50%+. Маржа уходила маркетплейсу.",
    "noir-bar":
      "Бар принимал брони по телефону, сайт работал как визитка. Конверсия в брони — 8%, часть звонков терялась.",
    "space-hub":
      "Коворкинг с заполняемостью 40%. Не было онлайн-выбора места и оплаты — все заявки шли через менеджера.",
  };

  const didByCase: Record<string, string[]> = {
    grooming: [
      "Структура каталога под профессиональные сегменты (грумеры / салоны)",
      "Дизайн под конверсию: быстрая карточка, оформление заказа в 2 шага",
      "B2B-кабинет с ценами для оптовых клиентов",
      "Интеграция с amoCRM и складом",
    ],
    tsargrad: [
      "Раздел аренды как отдельный продукт с калькулятором",
      "Оплата в рассрочку и онлайн-доставка",
      "SEO-структура под коммерческие запросы",
      "Интеграция с CRM и сквозной аналитикой",
    ],
    "vision-minimal": [
      "Новый UX премиум-каталога и быстрая карточка товара",
      "Подбор по форме лица и онлайн-примерка",
      "Интеграция с CRM и системой клиник-партнёров",
      "Оптимизация LCP / CLS до зелёной зоны",
    ],
    "furniture-mood": [
      "SEO-структура каталога под коммерческие кластеры",
      "Фильтры по стилю, размеру, материалу",
      "Личный кабинет дизайнера с прайсами",
      "Базовая интеграция с 1С",
    ],
    "vita-prime": [
      "Перепаковка офферов под боли аудитории Директа",
      "Лендинг + интернет-магазин в одной воронке",
      "Up-sell в корзине и подписка на повтор",
      "Сквозная аналитика и UTM-разметка",
    ],
    "crunch-world": [
      "D2C-магазин с подпиской на коробку",
      "Доставка по РФ с трекингом",
      "Контент-блоки с историей бренда и обзорами",
    ],
    "noir-bar": [
      "Сайт-визитка с системой бронирования столов",
      "Афиша событий и интеграция с CRM",
      "Карта зала с выбором стола",
    ],
    "space-hub": [
      "Онлайн-выбор рабочего места и оплата",
      "Личный кабинет резидента и продление",
      "Корпоративные тарифы и счета",
    ],
  };

  const task = taskByCase[c.slug] ?? "Бренду требовался собственный канал прямых продаж с измеримой конверсией.";
  const did = didByCase[c.slug] ?? [
    "Аналитика ниши и конкурентов",
    "Дизайн под конверсию",
    "Интеграция с CRM и аналитикой",
    "Запуск и поддержка",
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--ink)] text-[var(--paper)]">
      <ScrollProgress />
      <CustomCursor />
      <SiteHeader />

      <main className="pt-32 md:pt-40">
        {/* Header */}
        <section className="px-6 pb-16 md:px-16">
          <div className="mx-auto max-w-[1400px]">
            <Link to="/" className="eyebrow inline-flex items-center gap-2 text-[var(--muted-ink)] hover:text-[var(--paper)]">
              ← все кейсы
            </Link>
            <div className="mt-8 grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-8">
                <div className="eyebrow mb-5">{c.category}</div>
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="display-xl text-[44px] text-[var(--paper)] md:text-[8vw]"
                >
                  {c.title}
                </motion.h1>
              </div>
              <div className="col-span-12 flex items-end md:col-span-4 md:justify-end">
                {c.liveUrl && (
                  <a
                    href={c.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 bg-[var(--bronze)] px-7 py-5 text-xs uppercase tracking-[0.22em] text-[var(--ink)] transition-all hover:bg-[var(--paper)]"
                  >
                    Открыть сайт · {c.liveLabel ?? "live"}
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Big screenshot */}
        <section className="px-6 md:px-16">
          <div className="mx-auto max-w-[1400px]">
            <div className="relative overflow-hidden border border-white/10 bg-white/[0.02]">
              <img src={c.image} alt={c.title} className="h-full w-full object-cover" />
            </div>
          </div>
        </section>

        {/* Task */}
        <section className="px-6 py-24 md:px-16 md:py-32">
          <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-3">
              <span className="eyebrow">(01) Задача</span>
            </div>
            <div className="col-span-12 md:col-span-9">
              <p className="max-w-3xl text-xl leading-relaxed text-[var(--paper)] md:text-2xl">{task}</p>
            </div>
          </div>
        </section>

        {/* Did */}
        <section className="border-t border-white/5 px-6 py-24 md:px-16 md:py-32">
          <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-3">
              <span className="eyebrow">(02) Что сделали</span>
            </div>
            <div className="col-span-12 md:col-span-9">
              <ul className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2">
                {did.map((d, i) => (
                  <li key={i} className="flex gap-5 bg-[var(--ink)] p-6 md:p-8">
                    <span className="font-display text-2xl font-bold" style={{ color: "var(--bronze)" }}>
                      0{i + 1}
                    </span>
                    <span className="text-[15px] leading-relaxed text-[var(--paper)] md:text-base">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Result */}
        <section className="border-t border-white/5 px-6 py-24 md:px-16 md:py-32">
          <div className="mx-auto max-w-[1400px]">
            <span className="eyebrow">(03) Результат</span>
            <div className="mt-10">
              <div className="display-xl text-[72px] leading-none md:text-[12vw]" style={{ color: "var(--bronze)" }}>
                {c.heroPrefix ?? ""}{c.heroValue}{c.heroSuffix ?? ""}
              </div>
              <div className="mt-5 text-base text-[var(--muted-ink)] md:text-lg">{c.heroLabel}</div>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-3">
              {c.metrics.map((m: { value: string; label: string }, i: number) => (
                <div key={i} className="bg-[var(--ink)] p-8 md:p-10">
                  <div className="font-display text-3xl text-[var(--paper)] md:text-4xl">{m.value}</div>
                  <div className="mt-3 text-[12px] uppercase tracking-[0.18em] text-[var(--muted-ink)]">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 px-6 py-28 text-center md:px-16 md:py-40">
          <div className="mx-auto max-w-[1000px]">
            <h2 className="display-xl text-[40px] text-[var(--paper)] md:text-[6vw]">
              Хотите<br />
              <span style={{ color: "var(--bronze)" }}>так же?</span>
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-base text-[var(--muted-ink)] md:text-lg">
              30 минут на разговор. Покажем кейсы под вашу нишу — с живыми ссылками.
            </p>
            <a
              href={TG}
              target="_blank"
              rel="noreferrer"
              className="group mt-12 inline-flex items-center gap-4 bg-[var(--bronze)] px-10 py-6 text-sm uppercase tracking-[0.2em] text-[var(--ink)] transition-all hover:bg-[var(--paper)]"
            >
              Обсудить проект
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
