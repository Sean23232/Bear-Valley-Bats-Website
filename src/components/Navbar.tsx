import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { Link, useRoute } from "@/lib/router";
import { NAV_LINKS, IMG } from "@/data/site";
import { Icon, ButtonLink } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function Navbar() {
  const { path } = useRoute();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to: string) => (to === "/" ? path === "/" : path === to || path.startsWith(to + "/"));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-charcoal/[0.97] backdrop-blur-md transition-[border-color,box-shadow] duration-500",
        scrolled ? "border-gold/25 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)]" : "border-white/[0.06]",
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-[78px] max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Bear Valley Bats home">
          <img src={IMG("logo-light.png")} alt="Bear Valley Bats" width={391} height={96} className="h-9 w-auto sm:h-10" />
        </Link>

        <ul className="hidden items-center gap-5 xl:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                aria-current={isActive(link.to) ? "page" : undefined}
                className={cn(
                  "relative py-2 font-sans text-[14px] font-medium tracking-[0.01em] transition-colors duration-300",
                  "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500",
                  isActive(link.to) ? "text-ivory after:scale-x-100" : "text-mist hover:text-ivory hover:after:scale-x-100",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/cart"
            aria-label={`Order requests: ${count} bat${count === 1 ? "" : "s"}`}
            className="relative hidden rounded-full p-2 text-ivory transition-colors hover:text-gold-soft sm:inline-flex"
          >
            <Icon name="cart" className="h-[22px] w-[22px]" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 font-sans text-[10px] font-bold text-charcoal">
                {count}
              </span>
            )}
          </Link>

          <ButtonLink to="/shop" variant="gold" className="hidden h-11 px-5 text-[11px] xl:inline-flex">
            Shop Custom Bats
          </ButtonLink>

          <Link
            to="/cart"
            aria-label={`Cart and order requests, ${count} item${count === 1 ? "" : "s"}`}
            className="relative inline-flex rounded-full p-2 text-ivory xl:hidden"
          >
            <Icon name="cart" className="h-[22px] w-[22px]" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 font-sans text-[10px] font-bold text-charcoal">
                {count}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-ivory xl:hidden"
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t border-white/[0.06] bg-charcoal transition-[max-height,opacity] duration-500 ease-out xl:hidden",
          open ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="mx-auto max-w-[1320px] px-5 pb-8 pt-4 sm:px-8">
          <ul className="divide-y divide-white/[0.07]">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  aria-current={isActive(link.to) ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between py-4 font-display text-[1.6rem] leading-none",
                    isActive(link.to) ? "text-gold-soft" : "text-ivory",
                  )}
                >
                  {link.label}
                  <Icon name="arrow" className="h-4 w-4 text-gold" />
                </Link>
              </li>
            ))}
            <li>
              <Link to="/cart" className="flex items-center justify-between py-4 font-display text-[1.6rem] leading-none text-ivory">
                Order Requests {count > 0 && <span className="font-sans text-sm text-gold-soft">({count})</span>}
                <Icon name="arrow" className="h-4 w-4 text-gold" />
              </Link>
            </li>
          </ul>
          <ButtonLink to="/design" variant="gold" size="lg" className="mt-6 w-full">
            Design Your Bat
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
