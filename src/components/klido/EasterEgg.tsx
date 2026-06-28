import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function EasterEgg() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const target = "klido";
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      buf = (buf + e.key.toLowerCase()).slice(-target.length);
      if (buf === target) {
        setActive(true);
        window.setTimeout(() => setActive(false), 1800);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none fixed inset-0 z-[9998] flex items-center justify-center"
          style={{ background: "var(--ink)" }}
        >
          <motion.div
            initial={{ scale: 0.4, rotate: -18, opacity: 0 }}
            animate={{ scale: [0.4, 1.15, 1], rotate: [-18, 6, 0], opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold"
            style={{
              fontSize: "clamp(140px, 30vw, 520px)",
              color: "var(--bronze)",
              letterSpacing: "-0.05em",
              lineHeight: 0.8,
            }}
          >
            KLIDO
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: 0 }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            className="absolute bottom-12 left-0 h-[2px]"
            style={{ background: "var(--bronze)" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
