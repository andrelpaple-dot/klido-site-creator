// Отдельный конфиг для статической SPA-сборки под reg.ru.
// Запуск: npm run build:static
// На выходе: ./dist с index.html + assets/ + api/ + .htaccess
//
// НЕ ЗАМЕНЯЕТ основной vite.config.ts (TanStack Start / nitro / Cloudflare).
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "node:path";
import fs from "node:fs/promises";

// Базовый URL, откуда скачивать Lovable-ассеты (/__l5e/...) во время билда.
// Опубликованный сайт всегда отдаёт ассеты по этим путям.
const ASSET_BASE =
  process.env.STATIC_ASSET_BASE ?? "https://klido-site-creator.lovable.app";

/**
 * Резолвит импорты вида `import x from "./foo.png.asset.json"`:
 *   1. Читает .asset.json
 *   2. Скачивает бинарь с ASSET_BASE + url
 *   3. Эмитит как обычный bundle-ассет (хешированное имя)
 *   4. Возвращает модуль с default = { url: <bundled URL> }
 */
function lovableAssetsStaticPlugin(): Plugin {
  const PREFIX = "\0lovable-asset:";
  return {
    name: "lovable-assets-static",
    enforce: "pre",
    async resolveId(source, importer) {
      if (!source.endsWith(".asset.json")) return null;
      // Резолвим относительно импортёра, перенаправляем на виртуальный id
      // (без .json в конце) — иначе встроенный JSON-плагин Vite перехватит load.
      const base = importer ? path.dirname(importer) : process.cwd();
      const abs = path.isAbsolute(source) ? source : path.resolve(base, source);
      return PREFIX + abs;
    },
    async load(id) {
      if (!id.startsWith(PREFIX)) return null;
      const real = id.slice(PREFIX.length);
      const raw = await fs.readFile(real, "utf8");
      const data = JSON.parse(raw) as {
        url: string;
        original_filename: string;
        content_type?: string;
      };
      const remote = ASSET_BASE.replace(/\/$/, "") + data.url;
      const res = await fetch(remote);
      if (!res.ok) {
        throw new Error(
          `[lovable-assets-static] ${data.original_filename}: ${res.status} ${res.statusText} at ${remote}`,
        );
      }
      const bytes = Buffer.from(await res.arrayBuffer());
      const refId = this.emitFile({
        type: "asset",
        name: data.original_filename,
        source: bytes,
      });
      return [
        `const url = import.meta.ROLLUP_FILE_URL_${refId};`,
        `export default {`,
        `  url,`,
        `  original_filename: ${JSON.stringify(data.original_filename)},`,
        `  content_type: ${JSON.stringify(data.content_type ?? "")},`,
        `};`,
      ].join("\n");
    },
  };
}

export default defineConfig({
  // Корень — папка проекта; HTML-shell живёт в spa-shell/ чтобы не конфликтовать
  // с TanStack Start на dev/обычном билде.
  root: path.resolve(__dirname),
  publicDir: false,
  plugins: [
    lovableAssetsStaticPlugin(),
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    tsconfigPaths(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-query"],
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2020",
    sourcemap: false,
    rollupOptions: {
      input: path.resolve(__dirname, "spa-shell/index.html"),
    },
  },
});
