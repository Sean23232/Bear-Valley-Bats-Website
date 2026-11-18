import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Link } from "@/lib/router";

export type ButtonVariant = "gold" | "ink" | "outlineLight" | "outlineDark" | "text";

export function buttonClass(variant: ButtonVariant = "gold", size: "md" | "lg" = "md") {
  const base =
    "group inline-flex items-center justify-center gap-3 whitespace-nowrap font-sans text-[12px] font-bold uppercase tracking-[0.16em] transition-all duration-500 ease-out disabled:pointer-events-none disabled:opacity-50";
  const sizes = {
    md: "h-12 px-7",
    lg: "h-14 px-9 text-[13px]",
  };
  const variants: Record<ButtonVariant, string> = {
    gold: "bg-gold text-charcoal shadow-[0_14px_34px_-16px_rgba(184,153,90,0.75)] hover:-translate-y-0.5 hover:bg-gold-soft",
    ink: "bg-charcoal text-ivory hover:-translate-y-0.5 hover:bg-walnut",
    outlineLight: "border border-ivory/45 text-ivory hover:border-gold hover:text-gold-soft",
    outlineDark: "border border-charcoal/30 text-ink hover:border-charcoal hover:bg-charcoal hover:text-ivory",
    text: "h-auto px-0 text-gold-soft underline-offset-[10px] hover:text-ivory hover:underline",
  };
  return cn(base, variant === "text" ? "" : sizes[size], variants[variant]);
}

export function ButtonLink({
  to,
  variant = "gold",
  size = "md",
  className,
  children,
  ...rest
}: {
  to: string;
  variant?: ButtonVariant;
  size?: "md" | "lg";
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  return (
    <Link to={to} className={cn(buttonClass(variant, size), className)} {...rest}>
      {children}
    </Link>
  );
}

/** Fades and lifts children into view the first time they enter the viewport. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12", className)}>{children}</div>;
}

export function Eyebrow({ children, tone = "gold", className }: { children: ReactNode; tone?: "gold" | "walnut" | "ivory"; className?: string }) {
  const color = { gold: "text-gold-soft", walnut: "text-walnut-2", ivory: "text-gold-soft" }[tone];
  return (
    <p className={cn("font-sans text-[11px] font-bold uppercase tracking-[0.28em]", color, className)}>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Eyebrow tone={dark ? "gold" : "walnut"} className="mb-5">
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className={cn("text-[clamp(2.4rem,4.6vw,4.1rem)] uppercase", dark ? "text-ivory" : "text-ink")}>{title}</h2>
      {body && (
        <div className={cn("mt-6 font-sans text-[17px] leading-[1.75]", dark ? "text-mist" : "text-muted")}>{body}</div>
      )}
    </div>
  );
}

/** Renders bracketed text such as [to be confirmed] as a visible placeholder marker. */
export function WithPlaceholders({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <span
            key={i}
            className="mx-0.5 inline-block rounded-sm border border-dashed border-gold bg-gold/10 px-1.5 py-px font-sans text-[0.86em] font-semibold text-walnut-2"
          >
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function AvailabilityChip({ status, dark = false }: { status: "listed" | "confirm"; dark?: boolean }) {
  const listed = status === "listed";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.12em]",
        dark ? "border-ivory/25 text-ivory/80" : "border-charcoal/15 text-muted",
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", listed ? "bg-gold" : "bg-mist")} aria-hidden="true" />
      {listed ? "Listed as available · confirm stock" : "Confirm availability before ordering"}
    </span>
  );
}

export type IconName =
  | "cart"
  | "menu"
  | "close"
  | "phone"
  | "mail"
  | "arrow"
  | "check"
  | "pin"
  | "star"
  | "handmade"
  | "rings"
  | "slider"
  | "truck"
  | "chevron"
  | "pen";

const ICON_PATHS: Record<IconName, ReactNode> = {
  cart: (
    <>
      <path d="M3 4h2.2l2.3 11.1a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20.5 8H6.1" />
      <circle cx="9.5" cy="19.5" r="1.4" />
      <circle cx="17" cy="19.5" r="1.4" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h11" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </>
  ),
  arrow: <path d="M4.5 12h14M13 6.5l5.5 5.5-5.5 5.5" />,
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  star: <path d="M12 3.8l2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.7l-5.1 2.8 1-5.7-4.1-4 5.7-.8z" />,
  handmade: <path d="M4 20l4-1 10-10-3-3L5 16zM14 7l3 3" />,
  rings: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.6" />
    </>
  ),
  slider: (
    <>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  chevron: <path d="M6 9l6 6 6-6" />,
  pen: <path d="M4 20h4.5L19 9.5 14.5 5 4 15.5zM13 6.5l4.5 4.5" />,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5 shrink-0", className)}
      aria-hidden="true"
      focusable="false"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

export function GoldRule({ className }: { className?: string }) {
  return <div className={cn("hairline w-full", className)} aria-hidden="true" />;
}
