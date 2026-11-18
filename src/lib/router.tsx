import { useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from "react";

/**
 * Lightweight hash router. Hash routing works on any static host (including the
 * single-file build), so deep links such as #/shop/canadian-yellow-birch always resolve.
 */
export type Route = { path: string; query: URLSearchParams };

function parseHash(): Route {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const [pathPart, queryPart = ""] = raw.split("?");
  const cleaned = "/" + pathPart.replace(/^\/+|\/+$/g, "");
  return { path: cleaned === "/" ? "/" : cleaned, query: new URLSearchParams(queryPart) };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parseHash);

  useEffect(() => {
    const onChange = () => setRoute(parseHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

export function navigate(to: string) {
  const target = "#" + (to.startsWith("/") ? to : "/" + to);
  if (window.location.hash === target) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.location.hash = target;
}

export function isExternal(to: string) {
  return /^(https?:|mailto:|tel:)/.test(to);
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  children?: ReactNode;
};

/** Internal links use hash routes; external, mailto and tel links open natively. */
export function Link({ to, children, onClick, ...rest }: LinkProps) {
  if (isExternal(to)) {
    const isWeb = to.startsWith("http");
    return (
      <a
        href={to}
        target={isWeb ? "_blank" : undefined}
        rel={isWeb ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={"#" + (to.startsWith("/") ? to : "/" + to)}
      onClick={(event) => {
        onClick?.(event);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
