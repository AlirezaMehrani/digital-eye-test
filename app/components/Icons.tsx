import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Line({ size = 18, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const Logo = ({ size = 34, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 34 34"
    fill="none"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <rect x="1" y="1" width="32" height="32" rx="7" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
    <path d="M9 22.5V14.6L17 8.2l8 6.4v7.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M17 12.6V22.5M12.4 22.5h9.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
  </svg>
);

export const Phone = (props: IconProps) => (
  <Line {...props}>
    <path d="M5 3.8h3.2l1.6 4-2 1.4a12 12 0 0 0 6 6l1.4-2 4 1.6V18c0 1.2-1 2.2-2.2 2.1A15.6 15.6 0 0 1 3 6.2C2.9 5 3.9 4 5 3.8Z" />
  </Line>
);

export const MapPin = (props: IconProps) => (
  <Line {...props}>
    <path d="M12 21s6.5-5.6 6.5-10.3A6.5 6.5 0 0 0 5.5 10.7C5.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.4" />
  </Line>
);

export const Bed = (props: IconProps) => (
  <Line {...props}>
    <path d="M3 18v-8M3 13h18v5M21 18v-4.5a2.5 2.5 0 0 0-2.5-2.5H10V8" />
    <path d="M5.5 10.5h3" />
    <circle cx="7" cy="10.5" r="1.2" />
  </Line>
);

export const Bath = (props: IconProps) => (
  <Line {...props}>
    <path d="M4 12h16v2.5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V12Z" />
    <path d="M7 12V6.6A2.1 2.1 0 0 1 9.1 4.5c1.2 0 2.1 1 2.1 2.1" />
    <path d="M7 18.5 6 21M17 18.5 18 21" />
  </Line>
);

export const Ruler = (props: IconProps) => (
  <Line {...props}>
    <path d="M4.5 14.5 14.5 4.5l5 5-10 10-5-5Z" />
    <path d="M7.5 11.5l1.7 1.7M10.5 8.5l1.7 1.7M13.5 5.5l1.7 1.7" />
  </Line>
);

export const Search = (props: IconProps) => (
  <Line {...props}>
    <circle cx="11" cy="11" r="6.2" />
    <path d="m15.6 15.6 4 4" />
  </Line>
);

export const ArrowRight = (props: IconProps) => (
  <Line {...props}>
    <path d="M4.5 12h14M13 6.5l5.5 5.5L13 17.5" />
  </Line>
);

export const ArrowLeft = (props: IconProps) => (
  <Line {...props}>
    <path d="M19.5 12h-14M11 17.5 5.5 12 11 6.5" />
  </Line>
);

export const ChevronDown = (props: IconProps) => (
  <Line {...props}>
    <path d="m6 9.5 6 6 6-6" />
  </Line>
);

export const Heart = ({ filled = false, ...props }: IconProps & { filled?: boolean }) => (
  <Line {...props} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20s-7.2-4.4-7.2-9.4A4.4 4.4 0 0 1 12 7.9a4.4 4.4 0 0 1 7.2 2.7C19.2 15.6 12 20 12 20Z" />
  </Line>
);

export const Menu = (props: IconProps) => (
  <Line {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Line>
);

export const Close = (props: IconProps) => (
  <Line {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Line>
);

export const House = (props: IconProps) => (
  <Line {...props}>
    <path d="M4 20v-9.2L12 4.5l8 6.3V20" />
    <path d="M9.5 20v-5.6h5V20" />
  </Line>
);

export const Handshake = (props: IconProps) => (
  <Line {...props}>
    <path d="M3 10.5l4-4 3.4 3.4 1.6-1.4 1.6 1.4L17 6.5l4 4" />
    <path d="M7 10.2v3.4l3.2 3.2a1.6 1.6 0 0 0 2.3 0l1-1 2 2h4.5" />
    <path d="M7 6.5 3 10.5" />
  </Line>
);

export const Chart = (props: IconProps) => (
  <Line {...props}>
    <path d="M4 19.5h16" />
    <path d="M7 19.5v-6M12 19.5V7.5M17 19.5v-9" />
    <path d="M5.5 10.5 11 5.5l3 3 4.5-4" />
  </Line>
);

export const Shield = (props: IconProps) => (
  <Line {...props}>
    <path d="M12 20.5s6.5-3 6.5-8.4V6.4L12 4.2 5.5 6.4v5.7c0 5.4 6.5 8.4 6.5 8.4Z" />
    <path d="m9.3 12.4 2 2 3.4-3.6" />
  </Line>
);

export const Camera = (props: IconProps) => (
  <Line {...props}>
    <path d="M4 8.5h3l1.3-2h7.4L17 8.5h3v10H4v-10Z" />
    <circle cx="12" cy="13.3" r="3.1" />
  </Line>
);

export const Key = (props: IconProps) => (
  <Line {...props}>
    <circle cx="8.5" cy="8.5" r="3.8" />
    <path d="m11.4 11.4 7.6 7.6M16.5 16.5l-1.6 1.6M18.4 14.6 20 16.2" />
  </Line>
);

export const Globe = (props: IconProps) => (
  <Line {...props}>
    <circle cx="12" cy="12" r="8" />
    <path d="M4.5 10h15M4.5 14h15" />
    <path d="M12 4c2 2.2 3 5 3 8s-1 5.8-3 8c-2-2.2-3-5-3-8s1-5.8 3-8Z" />
  </Line>
);

export const Mail = (props: IconProps) => (
  <Line {...props}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4.5 7.5 7.5 5.4 7.5-5.4" />
  </Line>
);

export const Check = (props: IconProps) => (
  <Line {...props}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Line>
);

export const Instagram = (props: IconProps) => (
  <Line {...props}>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.6" />
    <path d="M16.8 7.4h.01" />
  </Line>
);

export const LinkedIn = (props: IconProps) => (
  <Line {...props}>
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M8 10.5V16M8 8.1v.01M12 16v-3.2a1.9 1.9 0 0 1 3.8 0V16" />
  </Line>
);

export const Facebook = (props: IconProps) => (
  <Line {...props}>
    <path d="M14.5 8.5h2M14.5 8.5V7a1.5 1.5 0 0 1 1.5-1.5h.8M14.5 8.5V20M11 12.2h5.5" />
    <path d="M6 4.5h12v15H6z" opacity="0.35" />
  </Line>
);

export const Quote = (props: IconProps) => (
  <Line {...props}>
    <path d="M9.5 7.5c-2.6.6-4 2.4-4 5.1v3.9h4.6v-5H7.6c0-1.5.8-2.4 2.4-2.8l-.5-1.2ZM18 7.5c-2.6.6-4 2.4-4 5.1v3.9h4.6v-5h-2.5c0-1.5.8-2.4 2.4-2.8l-.5-1.2Z" />
  </Line>
);

export const iconMap = {
  house: House,
  handshake: Handshake,
  chart: Chart,
  shield: Shield,
  camera: Camera,
  key: Key,
  globe: Globe,
} as const;

export type IconName = keyof typeof iconMap;
