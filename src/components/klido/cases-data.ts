export type CaseMetric = { value: string; label: string };

export type CaseItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  heroValue: number;
  heroPrefix?: string;
  heroSuffix?: string;
  heroLabel: string;
  metrics: CaseMetric[];
};

function escapeSvgText(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function casePreview(title: string, mark: string, accent = "#c9a36a") {
  const safeTitle = escapeSvgText(title);
  const safeMark = escapeSvgText(mark);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 820">
    <rect width="1200" height="820" fill="#050505"/>
    <path d="M0 620C210 500 340 720 560 570S880 250 1200 360v460H0Z" fill="${accent}" opacity=".18"/>
    <circle cx="920" cy="180" r="180" fill="none" stroke="${accent}" stroke-width="3" opacity=".55"/>
    <circle cx="920" cy="180" r="92" fill="none" stroke="#f5f5f3" stroke-width="2" opacity=".22"/>
    <path d="M120 130h460v300H120zM160 190h260M160 250h340M160 310h210" fill="none" stroke="#f5f5f3" stroke-width="8" stroke-linecap="round" opacity=".55"/>
    <path d="M720 520 930 398l210 122v172L930 812 720 692Z" fill="none" stroke="${accent}" stroke-width="8" opacity=".72"/>
    <path d="M720 520 930 642l210-122M930 642v170" fill="none" stroke="#f5f5f3" stroke-width="5" opacity=".32"/>
    <text x="116" y="675" fill="#f5f5f3" font-family="Arial, sans-serif" font-size="82" font-weight="800" letter-spacing="2">${safeTitle}</text>
    <text x="120" y="735" fill="${accent}" font-family="Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="8">${safeMark}</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const cases: CaseItem[] = [
  {
    slug: "vision-minimal",
    title: "LUMIÈRE",
    category: "e-commerce · премиальная оптика",
    description:
      "Редизайн интернет-магазина оптики премиум-сегмента. Новый UX, быстрая карточка, интеграция CRM.",
    image: casePreview("LUMIÈRE", "OPTICS / D2C"),
    heroValue: 290,
    heroPrefix: "+",
    heroSuffix: "%",
    heroLabel: "рост онлайн-заказов",
    metrics: [
      { value: "6.8 → 11.67%", label: "конверсия" },
      { value: "−34%", label: "отказы" },
      { value: "+64%", label: "глубина каталога" },
    ],
  },
  {
    slug: "furniture-mood",
    title: "FORMA",
    category: "маркетплейс · дизайнерская мебель",
    description:
      "Собственный маркетплейс мебели. SEO-структура, фильтры, личный кабинет дизайнера.",
    image: casePreview("FORMA", "FURNITURE / SEO", "#d7b47c"),
    heroValue: 60,
    heroSuffix: "+",
    heroLabel: "позиций в ТОП-10 Яндекса",
    metrics: [
      { value: "47", label: "позиций в ТОП-3" },
      { value: "3 100", label: "органики / мес." },
      { value: "4.2%", label: "конверсия" },
    ],
  },
  {
    slug: "vita-prime",
    title: "VITALEAF",
    category: "e-commerce · витамины и БАДы",
    description:
      "Лендинг + интернет-магазин для бренда добавок. Перепаковка офферов под Яндекс.Директ.",
    image: casePreview("VITALEAF", "WELLNESS / DIRECT", "#b9c96a"),
    heroValue: 97,
    heroPrefix: "",
    heroSuffix: "%",
    heroLabel: "рост конверсии из Директа",
    metrics: [
      { value: "2.3 → 9.7%", label: "конверсия" },
      { value: "4 800 → 890 ₽", label: "CPO" },
      { value: "×5.4", label: "ROAS" },
    ],
  },
  {
    slug: "tsargrad",
    title: "ЦАРЬГРАД",
    category: "e-commerce · прокат тренажёров",
    description:
      "Магазин и сервис проката силовых тренажёров. Калькулятор подбора, оплата в рассрочку.",
    image: casePreview("ЦАРЬГРАД", "FITNESS / RENT", "#c9a36a"),
    heroValue: 5,
    heroSuffix: ".9%",
    heroLabel: "конверсия (было 1.5%)",
    metrics: [
      { value: "1.5 → 5.9%", label: "конверсия" },
      { value: "30–70", label: "заказов / мес." },
      { value: "×2.8", label: "выручка" },
    ],
  },
  {
    slug: "crunch-world",
    title: "KRUNCH.WORLD",
    category: "e-commerce · импортные снеки",
    description:
      "Запуск D2C для импортёра редких чипсов. Подписочная модель, доставка по РФ, чек выше WB.",
    image: casePreview("KRUNCH", "SNACKS / D2C", "#d58a5f"),
    heroValue: 12,
    heroSuffix: ".3%",
    heroLabel: "конверсия с первого касания",
    metrics: [
      { value: "12.3%", label: "конверсия" },
      { value: "−41%", label: "CPO" },
      { value: "38%", label: "повторных" },
    ],
  },
  {
    slug: "grooming",
    title: "СТИЛЬ ГРУМЕРА",
    category: "e-commerce · одежда для грумеров",
    description:
      "Магазин профессиональной одежды и инструмента для грумеров. Каталог, B2B-кабинет.",
    image: casePreview("ГРУМИНГ", "PRO WEAR / B2B", "#c9a36a"),
    heroValue: 9,
    heroSuffix: "%",
    heroLabel: "конверсия в заказ (было 2%)",
    metrics: [
      { value: "2 → 9%", label: "конверсия" },
      { value: "+180", label: "заявок / мес." },
      { value: "×4.5", label: "выручка" },
    ],
  },
  {
    slug: "noir-bar",
    title: "NOIR & OR",
    category: "HoReCa · авторский бар",
    description:
      "Сайт-визитка бара с системой бронирования столов и афишей событий.",
    image: casePreview("NOIR & OR", "HORECA / BOOKING", "#d0a96a"),
    heroValue: 11,
    heroSuffix: "%",
    heroLabel: "конверсия в бронь",
    metrics: [
      { value: "8 → 11%", label: "бронирования" },
      { value: "59", label: "звонков / мес." },
      { value: "+42%", label: "посещаемость" },
    ],
  },
  {
    slug: "space-hub",
    title: "КОНТУР",
    category: "услуги · коворкинг",
    description:
      "Сайт коворкинга с онлайн-выбором рабочего места, оплатой и личным кабинетом резидента.",
    image: casePreview("КОНТУР", "COWORKING / SAAS", "#8fb9c9"),
    heroValue: 80,
    heroSuffix: "%",
    heroLabel: "заполняемость (было 40%)",
    metrics: [
      { value: "40 → 80%+", label: "заполняемость" },
      { value: "70+", label: "заявок" },
      { value: "12", label: "корп. клиентов" },
    ],
  },
  {
    slug: "motors",
    title: "MOTORS.PRO",
    category: "услуги · ремонт двигателей",
    description:
      "Лендинг для СТО капитального ремонта двигателей. Калькулятор стоимости и квиз-заявка.",
    image: casePreview("MOTORS", "SERVICE / LEADS", "#c9a36a"),
    heroValue: 7,
    heroSuffix: ".2%",
    heroLabel: "конверсия в заявку",
    metrics: [
      { value: "1.4 → 7.2%", label: "конверсия" },
      { value: "−58%", label: "CPL" },
      { value: "×3.1", label: "поток заявок" },
    ],
  },
  {
    slug: "septik",
    title: "СЕПТИКУРАЛ",
    category: "e-commerce · автономная канализация",
    description:
      "Каталог септиков под ключ с расчётом, замером и установкой. Региональное SEO + Директ.",
    image: casePreview("СЕПТИК", "REGIONAL / SEO", "#9fc98f"),
    heroValue: 4,
    heroSuffix: "×",
    heroLabel: "рост заявок за 3 месяца",
    metrics: [
      { value: "2.1 → 6.4%", label: "конверсия" },
      { value: "120+", label: "заявок / мес." },
      { value: "ТОП-3", label: "по 18 запросам" },
    ],
  },
];
