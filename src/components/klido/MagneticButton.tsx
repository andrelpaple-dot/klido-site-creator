import { useRef, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: ReactNode;
  href?: string;
  className?: string;
  radius?: number;
  strength?: number;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "ref">;

export function MagneticButton({
  children,
  href,
  className = "",
  radius = 80,
  strength = 0.35,
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < radius + Math.max(r.width, r.height) / 2) {
      mx.set(dx * strength);
      my.set(dy * strength);
    } else {
      mx.set(0);
      my.set(0);
    }
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y, display: "inline-flex" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      {...(rest as any)}
    >
      <motion.span style={{ display: "inline-flex", alignItems: "center", gap: "1rem" }}>
        {children}
      </motion.span>
    </motion.a>
  );
}
