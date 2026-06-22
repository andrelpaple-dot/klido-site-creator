export function Scene3D() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden opacity-90">
      <div className="kinetic-bg-model kinetic-bg-model-a" aria-hidden>
        <svg viewBox="0 0 220 220" className="h-full w-full">
          <g fill="none" stroke="var(--bronze)" strokeWidth="2.5" opacity="0.45">
            <path d="M110 18 190 64v92l-80 46-80-46V64Z" />
            <path d="M30 64 110 110l80-46M110 110v92" />
            <path d="M70 42 150 88" />
          </g>
        </svg>
      </div>
      <div className="kinetic-bg-model kinetic-bg-model-b" aria-hidden>
        <svg viewBox="0 0 220 220" className="h-full w-full">
          <g fill="none" stroke="var(--paper)" strokeWidth="2" opacity="0.28">
            <ellipse cx="110" cy="110" rx="86" ry="44" />
            <ellipse cx="110" cy="110" rx="44" ry="86" />
            <circle cx="110" cy="110" r="24" stroke="var(--bronze)" />
          </g>
        </svg>
      </div>
      <div className="scene-vignette absolute inset-0" />
    </div>
  );
}
