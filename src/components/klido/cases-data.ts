export type CaseMetric = { value: string; label: string };

export type CaseItem = {
  slug: string;
  title: string;
  category: string;
  metrics: CaseMetric[];
};

export const cases: CaseItem[] = [
  {
    slug: "vision-minimal",
    title: "VISION MINIMAL",
    category: "e-commerce · премиальная оптика",
    metrics: [
      { value: "6.8% → 11.67%", label: "конверсия" },
      { value: "+290%", label: "онлайн-заказы" },
      { value: "−34%", label: "отказы" },
      { value: "12 400 ₽", label: "средний чек" },
    ],
  },
  {
    slug: "furniture-mood",
    title: "FURNITURE MOOD",
    category: "маркетплейс · дизайнерская мебель",
    metrics: [
      { value: "60+", label: "позиций в ТОП-10" },
      { value: "47", label: "позиций в ТОП-3" },
      { value: "3 100", label: "органики в мес." },
      { value: "4.2%", label: "конверсия" },
    ],
  },
  {
    slug: "vita-prime",
    title: "VITA PRIME",
    category: "e-commerce · витамины и БАДы",
    metrics: [
      { value: "2.3% → 9.7%", label: "конверсия из Директа" },
      { value: "4 800 → 890 ₽", label: "CPO" },
    ],
  },
  {
    slug: "tsargrad",
    title: "ЦАРЬГРАД",
    category: "e-commerce · тренажёры",
    metrics: [
      { value: "1.5% → 5.9%", label: "конверсия" },
      { value: "30–70", label: "заказов / мес." },
    ],
  },
  {
    slug: "crunch-world",
    title: "CRUNCH WORLD",
    category: "e-commerce · импортные чипсы",
    metrics: [
      { value: "12.3%", label: "конверсия" },
      { value: "1 600 ₽", label: "средний чек" },
    ],
  },
  {
    slug: "grooming",
    title: "GROOMING STUDIO",
    category: "услуги · груминг",
    metrics: [
      { value: "2% → 9%", label: "конверсия" },
      { value: "30", label: "заявок / мес." },
    ],
  },
  {
    slug: "noir-bar",
    title: "NOIR BAR",
    category: "HoReCa · премиум-бар",
    metrics: [
      { value: "8% → 11%", label: "бронирования" },
      { value: "59", label: "звонков" },
    ],
  },
  {
    slug: "space-hub",
    title: "SPACE HUB",
    category: "услуги · коворкинг",
    metrics: [
      { value: "40% → 80%+", label: "заполняемость" },
      { value: "70+", label: "заявок" },
    ],
  },
];
