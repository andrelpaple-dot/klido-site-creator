import { createFileRoute } from "@tanstack/react-router";
import { KlidoLanding } from "@/components/klido/KlidoLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Klido — интернет-магазины под ключ" },
      {
        name: "description",
        content:
          "Делаем интернет-магазины под ключ для брендов: каталог, оплата, доставка.",
      },
      {
        property: "og:title",
        content: "Klido — интернет-магазины под ключ",
      },
      {
        property: "og:description",
        content:
          "Делаем интернет-магазины под ключ для брендов: каталог, оплата, доставка.",
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
