import { BUSINESS, COLLECTIONS, IMG } from "@/data/site";
import { Link } from "@/lib/router";
import { Icon } from "@/components/ui";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Shop All Bats", to: "/shop" },
      ...COLLECTIONS.map((c) => ({ label: c.title, to: `/shop/${c.slug}` })),
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Wood Options", to: "/wood" },
      { label: "Customization", to: "/customization" },
      { label: "Our Craftsmanship", to: "/craftsmanship" },
      { label: "About Us", to: "/about" },
      { label: "Frequently Asked Questions", to: "/faq" },
    ],
  },
  {
    title: "Order",
    links: [
      { label: "Design Your Bat", to: "/design" },
      { label: "Order Requests & Checkout", to: "/cart" },
      { label: "Custom Wood Projects", to: "/contact?topic=custom-wood" },
      { label: "Shipping & Policies", to: "/policies" },
      { label: "Online Store", to: BUSINESS.storeUrl },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-charcoal text-ivory">
      <div className="hairline" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 pb-12 pt-20 sm:px-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:px-12">
        <div className="lg:col-span-4">
          <img src={IMG("logo-light.png")} alt="Bear Valley Bats" width={391} height={96} className="h-12 w-auto" />
          <p className="mt-7 max-w-sm font-display text-[1.6rem] leading-snug text-ivory/90">
            Built by hand. <span className="italic text-gold-soft">Made for the game.</span>
          </p>
          <p className="mt-5 max-w-sm font-sans text-[15px] leading-relaxed text-mist">
            Family-owned. Hand made to order in {BUSINESS.location}, {BUSINESS.elevation}.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-gold-soft">
            <Icon name="star" className="h-4 w-4" /> Proudly made in the USA
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-2 lg:col-span-5 lg:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-gold-soft">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="font-sans text-[14px] text-mist transition-colors hover:text-ivory"

                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="md:col-span-2 lg:col-span-3">
          <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-gold-soft">Contact</h3>
          <ul className="mt-5 space-y-4 font-sans text-[14px] text-mist">
            <li>
              <a href={BUSINESS.phoneHref} className="inline-flex items-center gap-3 text-ivory transition-colors hover:text-gold-soft">
                <Icon name="phone" className="h-4 w-4 text-gold" /> {BUSINESS.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${BUSINESS.primaryEmail}`} className="inline-flex items-center gap-3 transition-colors hover:text-ivory">
                <Icon name="mail" className="h-4 w-4 text-gold" /> {BUSINESS.primaryEmail}
              </a>
            </li>
            <li>
              <a href={`mailto:${BUSINESS.secondaryEmail}`} className="inline-flex items-center gap-3 transition-colors hover:text-ivory">
                <Icon name="mail" className="h-4 w-4 text-gold" /> {BUSINESS.secondaryEmail}
              </a>
            </li>
            <li className="inline-flex items-start gap-3">
              <Icon name="pin" className="mt-0.5 h-4 w-4 text-gold" /> {BUSINESS.location}
            </li>
            <li className="inline-flex items-start gap-3">
              <Icon name="truck" className="mt-0.5 h-4 w-4 text-gold" /> Free shipping on all orders within the Continental US
            </li>
          </ul>

          <h3 className="mt-10 font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-gold-soft">Follow</h3>
          <p className="mt-4 rounded-sm border border-dashed border-gold/50 px-3 py-2.5 font-sans text-[13px] text-mist">
            <span className="font-semibold text-gold-soft">[Social media links: to be confirmed]</span>
          </p>
        </div>
      </div>

      <div className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-5 py-7 font-sans text-[12px] text-mist sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>© {new Date().getFullYear()} Bear Valley Bats. All rights reserved. Hand made in Big Bear City, California, USA.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/policies" className="transition-colors hover:text-ivory">Shipping</Link>
            <Link to="/policies" className="transition-colors hover:text-ivory">Returns</Link>
            <Link to="/policies" className="transition-colors hover:text-ivory">Privacy</Link>
            <Link to="/faq" className="transition-colors hover:text-ivory">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
