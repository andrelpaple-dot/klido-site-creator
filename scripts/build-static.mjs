#!/usr/bin/env node
// Постобработка статической сборки для reg.ru:
//  1. Переносит dist/spa-shell/index.html → dist/index.html
//  2. Удаляет пустую dist/spa-shell/
//  3. Копирует php-backend/{api,uploads,.htaccess,database.sql} в dist/
//
// Запускается из npm-скрипта "build:static" ПОСЛЕ vite build.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const php = path.join(root, "php-backend");

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function moveIndexHtml() {
  const nested = path.join(dist, "spa-shell", "index.html");
  const target = path.join(dist, "index.html");
  if (!(await exists(nested))) {
    throw new Error(`Не найден ${nested} — vite build не отработал?`);
  }
  await fs.rename(nested, target);
  await fs.rm(path.join(dist, "spa-shell"), { recursive: true, force: true });
  console.log("✓ index.html на месте");
}

async function copyPhpBackend() {
  const items = [
    ["api", "api"],
    ["uploads", "uploads"],
    [".htaccess", ".htaccess"],
    ["database.sql", "database.sql"],
  ];
  for (const [src, dst] of items) {
    const from = path.join(php, src);
    const to = path.join(dist, dst);
    if (!(await exists(from))) {
      console.warn(`⚠ пропуск ${src}: нет в php-backend/`);
      continue;
    }
    await fs.cp(from, to, { recursive: true, force: true });
    console.log(`✓ ${src} → dist/${dst}`);
  }
}

async function main() {
  if (!(await exists(dist))) {
    throw new Error("dist/ не создан — сначала отработай vite build");
  }
  await moveIndexHtml();
  await copyPhpBackend();
  console.log("\nГотово. Заливай содержимое dist/ в /www/Klido.ru/ на reg.ru.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
