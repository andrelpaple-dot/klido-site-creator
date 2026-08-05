import groomingImg from "@/assets/cases/grooming-v2.jpg.asset.json";
import septikImg from "@/assets/cases/septik-v2.jpg.asset.json";
import tsargradImg from "@/assets/cases/tsargrad-v2.jpg.asset.json";
import pamyatnikiImg from "@/assets/cases/pamyatniki-v2.png.asset.json";
import crunchThumb from "@/assets/cases/crunch-v2.jpg.asset.json";
import crunchFull from "@/assets/cases/crunch-full.jpg.asset.json";

export type CaseMetric = { value: string; label: string };

export type CaseItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  fullImage?: string;
  heroValue: number;
  heroPrefix?: string;
  heroSuffix?: string;
  heroLabel: string;
  metrics: CaseMetric[];
  liveUrl?: string;
  liveLabel?: string;
  external?: boolean;
};

export const cases: CaseItem[] = [
  {
    slug: "grooming",
    title: "СТИЛЬ ГРУМЕРА",
    category: "интернет-магазин · одежда для грумеров",
    description:
      "Интернет-магазин бренда профессиональной одежды для грумеров. Каталог, B2B-кабинет.",
    image: groomingImg.url,
    liveUrl: "https://xn----8sbiimsj5acclr7i.xn--p1ai/catalog/zhenskaya-kollekciya/bryuki-bridzhi-shorty",
    liveLabel: "стиль-грумера.рф",
    external: true,
    heroValue: 9,
    heroSuffix: "%",
    heroLabel: "конверсия в заказ (было 2%)",
    metrics: [
      { value: "2 → 9%", label: "конверсия" },
      { value: "30", label: "заявок" },
      { value: "×4.5", label: "выручка" },
    ],
  },
  {
    slug: "septik-tehno",
    title: "СЕПТИК ТЕХНО",
    category: "интернет-магазин · автономная канализация",
    description:
      "Сайт продаж и монтажа септиков. Калькулятор подбора, заявки.",
    image: septikImg.url,
    liveUrl: "https://xn----itbbkkuhcqmd1b.xn--p1ai/",
    liveLabel: "септик-техно.рф",
    external: true,
    heroValue: 7,
    heroSuffix: ".4%",
    heroLabel: "конверсия в заявку",
    metrics: [
      { value: "7.4%", label: "конверсия" },
      { value: "60+", label: "заявок" },
      { value: "×3.2", label: "выручка" },
    ],
  },
  {
    slug: "tsargrad",
    title: "ЦАРЬГРАД",
    category: "интернет-магазин · аренда и продажа тренажёров",
    description:
      "Канал прямых продаж: аренда и продажа силовых тренажёров. Калькулятор подбора, оплата в рассрочку.",
    image: tsargradImg.url,
    liveUrl: "https://tsargrad.pro/",
    liveLabel: "tsargrad.pro",
    external: true,
    heroValue: 5,
    heroSuffix: ".9%",
    heroLabel: "конверсия (было 1.5%)",
    metrics: [
      { value: "1.5 → 5.9%", label: "конверсия" },
      { value: "30–70", label: "заказов" },
      { value: "×2.8", label: "выручка" },
    ],
  },
  {
    slug: "pamyatniki-krasnoufimsk",
    title: "ПАМЯТНИКИ КРАСНОУФИМСК",
    category: "сайт услуг · изготовление памятников",
    description:
      "Сайт мастерской памятников: каталог, конструктор, онлайн-заявка с расчётом.",
    image: pamyatnikiImg.url,
    liveUrl: "https://xn----7sbb4aackccmhegoeysef5av2u.xn--p1ai/",
    liveLabel: "памятники-красноуфимск.рф",
    external: true,
    heroValue: 8,
    heroSuffix: "%",
    heroLabel: "конверсия в заявку",
    metrics: [
      { value: "8%", label: "конверсия" },
      { value: "40+", label: "заявок" },
      { value: "×3", label: "выручка" },
    ],
  },
  {
    slug: "crunch-chips",
    title: "CRUNCH CHIPS",
    category: "интернет-магазин · импортные снеки",
    description:
      "D2C-магазин для импортёра редких чипсов. Подписочная модель, доставка по РФ.",
    image: crunchThumb.url,
    fullImage: crunchFull.url,
    heroValue: 12,
    heroSuffix: ".3%",
    heroLabel: "конверсия с первого касания",
    metrics: [
      { value: "12.3%", label: "конверсия" },
      { value: "−41%", label: "CPO" },
      { value: "38%", label: "повторных" },
    ],
  },
];
