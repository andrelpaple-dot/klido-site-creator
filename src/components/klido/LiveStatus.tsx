import { useEffect, useState } from "react";

export function LiveStatus() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Moscow",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[var(--muted-ink)] lg:inline-flex">
      <span className="relative flex h-2 w-2">
        <span
          className="absolute inset-0 animate-ping rounded-full opacity-70"
          style={{ background: "var(--bronze)" }}
        />
        <span
          className="relative h-2 w-2 rounded-full"
          style={{ background: "var(--bronze)" }}
        />
      </span>
      <span>На связи</span>
      <span className="opacity-40">·</span>
      <span className="tabular-nums text-[var(--paper)]">{time} МСК</span>
      <span className="opacity-40">·</span>
      <span>ответ ~7 мин</span>
    </span>
  );
}
