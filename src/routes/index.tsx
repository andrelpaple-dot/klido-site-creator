import { createFileRoute } from "@tanstack/react-router";
import { KlidoLanding } from "@/components/klido/KlidoLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Klido — интернет-магазины для брендов на Wildberries и Ozon" },
      {
        name: "description",
        content:
          "Klido — агентство интернет-магазинов для брендов, продающих на Wildberries и Ozon. Запускаем внешний канал продаж с измеримой конверсией.",
      },
      {
        property: "og:title",
        content: "Klido — интернет-магазины для брендов на WB и Ozon",
      },
      {
        property: "og:description",
        content:
          "Запускаем внешний канал продаж, куда вы льёте свой трафик — и удерживаете маржу, которую забирают маркетплейсы.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return <KlidoLanding />;
}
