export function YarnMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <circle cx="37" cy="36" r="24" stroke="currentColor" strokeWidth="1.4" />
      <path d="M17 23c18 1 31 13 37 30M13 31c17 0 31 12 37 27M14 40c12 0 23 8 30 19M22 17c-1 15 13 35 30 39M31 13c-2 14 9 31 27 38M43 13c-2 11 5 25 17 30M24 56c-9 15 14 20 28 12s20-3 23 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function Thread({ className = "" }: { className?: string }) {
  return (
    <svg className={`thread ${className}`} viewBox="0 0 1400 260" fill="none" preserveAspectRatio="none" aria-hidden="true">
      <path data-thread d="M-30 165C130 250 270 35 420 105s25 153-45 95S360 5 570 78s306 176 450 91 211-65 410-20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
