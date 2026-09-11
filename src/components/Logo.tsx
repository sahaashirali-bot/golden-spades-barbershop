export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Golden Spades Barbershop"
    >
      <circle
        cx="50"
        cy="50"
        r="47"
        fill="var(--color-felt)"
        stroke="var(--color-gold)"
        strokeWidth="2.5"
      />
      <circle
        cx="50"
        cy="50"
        r="39"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="1"
        opacity="0.6"
      />
      <path
        d="M50 27c9 11 20 18.5 20 29a14 14 0 0 1-20.8 12.2A14 14 0 0 1 30 56c0-10.5 11-18 20-29Z"
        fill="var(--color-gold)"
      />
      <path
        d="M46.5 66h7c0 5.5-2 8-7.5 9.5v1.5h8v2h-18v-2h7.5v-1.5C38.5 74 46.5 71.5 46.5 66Z"
        fill="var(--color-gold)"
      />
    </svg>
  );
}

export function LogoWordmark({ className }: { className?: string }) {
  return (
    <div className={className}>
      <span className="font-display text-2xl italic leading-none block text-onyx">
        Golden Spades
      </span>
      <span className="text-xs tracking-[0.35em] text-gold-ink uppercase block">
        Barbershop
      </span>
    </div>
  );
}
