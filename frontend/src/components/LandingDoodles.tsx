import React from "react";

// Hand-drawn wavy underline accent in expressive magenta
export function WavyUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block overflow-visible ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M3 14C45 4 85 16 122 7C160 -2 195 15 237 8"
        stroke="#d946d8"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Hand-drawn curved arrow with label
export function HandDrawnArrow({
  className = "",
  direction = "right",
}: {
  className?: string;
  direction?: "left" | "right";
}) {
  return (
    <svg
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible ${className}`}
    >
      {direction === "right" ? (
        <>
          <path
            d="M8 12C32 8 68 18 84 46"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="2 0"
          />
          <path
            d="M72 48L85 47L88 35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <path
            d="M92 12C68 8 32 18 16 46"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M28 48L15 47L12 35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}

// Hand-drawn 4-point sparkle in magenta
export function MagentaSparkle({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z"
        fill="#d946d8"
        stroke="#d946d8"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Hand-drawn rough circle sketch
export function HandDrawnCircle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M12 32C18 14 55 5 105 8C145 10 156 26 150 42C142 56 95 58 48 55C18 52 4 39 10 24"
        stroke="#d946d8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Hand-drawn lightbulb / idea doodle
export function IdeaDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Light rays */}
      <path d="M22 4V8" stroke="#d946d8" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 10L12 13" stroke="#d946d8" strokeWidth="2" strokeLinecap="round" />
      <path d="M35 10L32 13" stroke="#d946d8" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 22H9" stroke="#d946d8" strokeWidth="2" strokeLinecap="round" />
      <path d="M35 22H39" stroke="#d946d8" strokeWidth="2" strokeLinecap="round" />
      {/* Bulb body */}
      <path
        d="M14 22C14 17.58 17.58 14 22 14C26.42 14 30 17.58 30 22C30 25 28.5 27 27 29V32C27 32.55 26.55 33 26 33H18C17.45 33 17 32.55 17 32V29C15.5 27 14 25 14 22Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Filament */}
      <path
        d="M19 25C20.5 23.5 23.5 23.5 25 25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Base threads */}
      <path d="M18 36H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 39H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Hand-drawn box / vault sketch
export function VaultSketch({ className = "" }: { className?: string }) {
  return (
    <svg
      width="54"
      height="54"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="6"
        y="10"
        width="42"
        height="36"
        rx="6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="27" cy="28" r="7" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="27" cy="28" r="2.5" fill="#d946d8" />
      <path d="M27 18V21" stroke="#d946d8" strokeWidth="2" strokeLinecap="round" />
      <path d="M27 35V38" stroke="#d946d8" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 28H20" stroke="#d946d8" strokeWidth="2" strokeLinecap="round" />
      <path d="M34 28H37" stroke="#d946d8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Hand-drawn decorative swirls
export function SwirlDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 18C10 8 22 6 26 14C30 22 20 30 14 26C10 22 14 14 22 14C28 14 30 20 30 22"
        stroke="#d946d8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Fun cute hand-drawn character brain with smiley face & cute blush
export function DoodleSmileyBrain({ className = "" }: { className?: string }) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible ${className}`}
    >
      {/* Brain bumps / contours */}
      <path
        d="M20 18C16 18 12 22 12 27C10 28 8 32 8 36C8 42 12 46 16 47C16 51 20 54 26 53C28 53 30 51 31 49C33 51 35 53 37 53C43 54 47 51 47 47C51 46 55 42 55 36C55 32 53 28 51 27C51 22 47 18 43 18C41 18 39 19 38 20C36 17 33 16 31 16C29 16 26 17 24 20C23 19 21 18 20 18Z"
        fill="#faf5ff"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Brain central fissure */}
      <path
        d="M31 18V48"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 3"
      />
      {/* Cute eyes */}
      <circle cx="24" cy="34" r="2.5" fill="currentColor" />
      <circle cx="38" cy="34" r="2.5" fill="currentColor" />
      {/* Catchlight */}
      <circle cx="23" cy="33" r="0.8" fill="white" />
      <circle cx="37" cy="33" r="0.8" fill="white" />
      {/* Happy smile */}
      <path
        d="M27 40C29 42 33 42 35 40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Pink blush cheeks */}
      <ellipse cx="20" cy="37" rx="2.5" ry="1.5" fill="#d946d8" opacity="0.6" />
      <ellipse cx="42" cy="37" rx="2.5" ry="1.5" fill="#d946d8" opacity="0.6" />
      {/* Thought sparkles above head */}
      <path d="M31 8L31 12" stroke="#d946d8" strokeWidth="2" strokeLinecap="round" />
      <path d="M42 9L40 12" stroke="#d946d8" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 9L22 12" stroke="#d946d8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Hand-drawn paper plane with a looping dotted flight path
export function DoodlePaperAirplane({ className = "" }: { className?: string }) {
  return (
    <svg
      width="120"
      height="70"
      viewBox="0 0 120 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible ${className}`}
    >
      {/* Looping trail */}
      <path
        d="M8 58C28 62 48 45 42 30C36 15 15 22 25 40C35 58 72 45 88 28"
        stroke="#d946d8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
      {/* Paper airplane body */}
      <g transform="translate(85, 12) rotate(15)">
        <polygon
          points="0,15 28,0 12,28"
          fill="#ffffff"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polygon
          points="0,15 28,0 14,14"
          fill="#f3e8ff"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <line
          x1="14"
          y1="14"
          x2="10"
          y2="24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

// Hand-drawn sticky note with pushpin & curl
export function DoodleStickyNote({ className = "" }: { className?: string }) {
  return (
    <svg
      width="68"
      height="68"
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Sticky paper */}
      <path
        d="M10 14C10 12 12 10 14 10H52C54 10 56 12 56 14V46L46 56H14C12 56 10 54 10 52V14Z"
        fill="#fdf2f8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Folded corner */}
      <path
        d="M46 46H56L46 56V46Z"
        fill="#fbcfe8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Scribble note lines */}
      <path d="M18 24H44" stroke="#d946d8" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 31H38" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 38H42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Push pin */}
      <circle cx="33" cy="8" r="4" fill="#d946d8" stroke="currentColor" strokeWidth="1.5" />
      <line x1="33" y1="12" x2="33" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Hand-drawn steaming coffee mug with curly aroma
export function DoodleCoffeeCup({ className = "" }: { className?: string }) {
  return (
    <svg
      width="54"
      height="54"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Steam curls */}
      <path
        d="M18 14C16 10 20 8 18 4"
        stroke="#d946d8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M26 13C24 9 28 7 26 3"
        stroke="#d946d8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Cup body */}
      <path
        d="M10 17H34V34C34 38 30 42 26 42H18C14 42 10 38 10 34V17Z"
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cup handle */}
      <path
        d="M34 22H39C42 22 44 24 44 27C44 30 42 32 39 32H34"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Saucer plate */}
      <path
        d="M6 46H38"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Mini heart on cup */}
      <path
        d="M20 27C18.5 25 20.5 23 22 24.5C23.5 23 25.5 25 24 27L22 29L20 27Z"
        fill="#d946d8"
      />
    </svg>
  );
}

// Hand-drawn looping arrow for callouts
export function DoodleLoopArrow({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      width="72"
      height="50"
      viewBox="0 0 72 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible ${className} ${flip ? "-scale-x-100" : ""}`}
    >
      <path
        d="M8 8C26 6 48 10 52 24C56 38 38 46 28 38C20 30 26 18 42 24C54 28 62 36 64 44"
        stroke="#d946d8"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M56 42L65 44L66 35"
        stroke="#d946d8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Hand-drawn stars cluster
export function DoodleStarsCluster({ className = "" }: { className?: string }) {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Big star */}
      <path
        d="M22 6L25 18L37 21L25 24L22 36L19 24L7 21L19 18L22 6Z"
        fill="#d946d8"
        stroke="#d946d8"
        strokeWidth="1"
      />
      {/* Small star 1 */}
      <path
        d="M40 26L41.5 32L47.5 33.5L41.5 35L40 41L38.5 35L32.5 33.5L38.5 32L40 26Z"
        fill="#4f46e5"
      />
      {/* Mini dot */}
      <circle cx="12" cy="38" r="2" fill="#d946d8" />
      <circle cx="34" cy="12" r="1.5" fill="#4f46e5" />
    </svg>
  );
}

// Hand-drawn sketchy highlight box
export function DoodleHighlightBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <svg
        viewBox="0 0 160 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] overflow-visible pointer-events-none"
        preserveAspectRatio="none"
      >
        <path
          d="M8 8H152C155 8 157 12 156 18V38C156 44 153 46 148 46H12C7 46 4 43 4 36V14C4 9 7 8 12 8"
          stroke="#d946d8"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="4 2"
        />
      </svg>
      {children}
    </span>
  );
}
