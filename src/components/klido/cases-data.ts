import visionAsset from "@/assets/cases/vision.jpg.asset.json";
import furnitureAsset from "@/assets/cases/furniture.jpg.asset.json";
import vitaAsset from "@/assets/cases/vita.jpg.asset.json";
import tsargradAsset from "@/assets/cases/tsargrad.jpg.asset.json";
import crunchAsset from "@/assets/cases/crunch.jpg.asset.json";
import groomingAsset from "@/assets/cases/grooming.jpg.asset.json";
import noirAsset from "@/assets/cases/noir.jpg.asset.json";
import spaceAsset from "@/assets/cases/space.jpg.asset.json";
import motorsAsset from "@/assets/cases/motors.jpg.asset.json";
import septikAsset from "@/assets/cases/septik.jpg.asset.json";

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

export const cases: CaseItem[] = [
  {
    slug: "vision-minimal",
    title: "LUMIÈRE",
    category: "e-commerce · премиальная оптика",
    description:
      "Редизайн интернет-магазина оптики премиум-сегмента. Новый UX, быстрая карточка, интеграция CRM.",
    image: visionAsset.url,
    heroValue: 290,
    heroPrefix: "+",
    heroSuffix: "%",
    heroLabel: "рост онлайн-заказов",
    metrics: [
      { value: "6.8 → 11.67%", label: "конверсия" },
      { value: "−34%", label: "отказы" },
      { value: "12 400 ₽", label: "средний чек" },
    ],
  },
  {
    slug: "furniture-mood",
    title: "FORMA",
    category: "маркетплейс · дизайнерская мебель",
    description:
      "Собственный маркетплейс мебели. SEO-структура, фильтры, личный кабинет дизайнера.",
    image: furnitureAsset.url,
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
    image: vitaAsset.url,
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
    image: tsargradAsset.url,
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
    image: crunchAsset.url,
    heroValue: 12,
    heroSuffix: ".3%",
    heroLabel: "конверсия с первого касания",
    metrics: [
      { value: "12.3%", label: "конверсия" },
      { value: "1 600 ₽", label: "средний чек" },
      { value: "38%", label: "повторных" },
    ],
  },
  {
    slug: "grooming",
    title: "СТИЛЬ ГРУМЕРА",
    category: "e-commerce · одежда для грумеров",
    description:
      "Магазин профессиональной одежды и инструмента для грумеров. Каталог, B2B-кабинет.",
    image: groomingAsset.url,
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
    image: noirAsset.url,
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
    image: spaceAsset.url,
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
    image: motorsAsset.url,
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
    image: septikAsset.url,
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
