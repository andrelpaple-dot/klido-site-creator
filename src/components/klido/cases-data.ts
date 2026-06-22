import visionImg from "@/assets/cases/vision.jpg";
import furnitureImg from "@/assets/cases/furniture.jpg";
import vitaImg from "@/assets/cases/vita.jpg";
import tsargradImg from "@/assets/cases/tsargrad.jpg";
import crunchImg from "@/assets/cases/crunch.jpg";
import groomingImg from "@/assets/cases/grooming.jpg";
import noirImg from "@/assets/cases/noir.jpg";
import spaceImg from "@/assets/cases/space.jpg";

export type CaseMetric = { value: string; label: string };

export type CaseItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  /** Главное число для крупной анимации (например 290) */
  heroValue: number;
  heroPrefix?: string;
  heroSuffix?: string;
  heroLabel: string;
  metrics: CaseMetric[];
};

export const cases: CaseItem[] = [
  {
    slug: "vision-minimal",
    title: "VISION MINIMAL",
    category: "e-commerce · премиальная оптика",
    description:
      "Редизайн интернет-магазина оптики премиум-сегмента. Новый UX, быстрая карточка, интеграция CRM.",
    image: visionImg,
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
    title: "FURNITURE MOOD",
    category: "маркетплейс · дизайнерская мебель",
    description:
      "Собственный маркетплейс мебели. SEO-структура, фильтры, личный кабинет дизайнера.",
    image: furnitureImg,
    heroValue: 60,
    heroPrefix: "",
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
    title: "VITA PRIME",
    category: "e-commerce · витамины и БАДы",
    description:
      "Лендинг + интернет-магазин для бренда добавок. Перепаковка офферов под Яндекс.Директ.",
    image: vitaImg,
    heroValue: 9,
    heroPrefix: "",
    heroSuffix: ".7%",
    heroLabel: "конверсия из Директа",
    metrics: [
      { value: "2.3 → 9.7%", label: "конверсия" },
      { value: "4 800 → 890 ₽", label: "CPO" },
      { value: "×5.4", label: "ROAS" },
    ],
  },
  {
    slug: "tsargrad",
    title: "ЦАРЬГРАД",
    category: "e-commerce · тренажёры",
    description:
      "Магазин силовых тренажёров. Новая карточка товара, калькулятор подбора, оплата в рассрочку.",
    image: tsargradImg,
    heroValue: 5,
    heroPrefix: "",
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
    title: "CRUNCH WORLD",
    category: "e-commerce · импортные снеки",
    description:
      "Запуск D2C для импортёра чипсов. Подписочная модель, доставка по РФ, чек выше WB.",
    image: crunchImg,
    heroValue: 12,
    heroPrefix: "",
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
    title: "GROOMING STUDIO",
    category: "услуги · премиум-груминг",
    description:
      "Сайт-портфолио салона с онлайн-записью. Интеграция YClients и WhatsApp-уведомления.",
    image: groomingImg,
    heroValue: 9,
    heroPrefix: "",
    heroSuffix: "%",
    heroLabel: "конверсия в запись (было 2%)",
    metrics: [
      { value: "2 → 9%", label: "конверсия" },
      { value: "30", label: "заявок / мес." },
      { value: "×4.5", label: "загрузка" },
    ],
  },
  {
    slug: "noir-bar",
    title: "NOIR BAR",
    category: "HoReCa · авторский бар",
    description:
      "Сайт-визитка бара с системой бронирования столов и афишей событий.",
    image: noirImg,
    heroValue: 11,
    heroPrefix: "",
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
    title: "SPACE HUB",
    category: "услуги · коворкинг",
    description:
      "Сайт коворкинга с онлайн-выбором рабочего места, оплатой и личным кабинетом резидента.",
    image: spaceImg,
    heroValue: 80,
    heroPrefix: "",
    heroSuffix: "%",
    heroLabel: "заполняемость (было 40%)",
    metrics: [
      { value: "40 → 80%+", label: "заполняемость" },
      { value: "70+", label: "заявок" },
      { value: "12", label: "корп. клиентов" },
    ],
  },
];
