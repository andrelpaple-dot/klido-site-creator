// src/lib/phpApi.ts
// Утилита для общения с PHP-эндпоинтами на reg.ru.
// Читаем через text() + JSON.parse, чтобы PHP-ошибки в виде HTML не крашили фронт.

const API_BASE = "/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const raw = await res.text();
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`API ${path}: invalid JSON (${res.status}). Body: ${raw.slice(0, 200)}`);
  }
  const body = parsed as { ok?: boolean; data?: T; error?: string };
  if (!res.ok || body?.ok === false) {
    throw new Error(body?.error || `API ${path}: HTTP ${res.status}`);
  }
  return (body?.data ?? (parsed as T)) as T;
}

export const phpApi = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, data: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(data) }),
};
