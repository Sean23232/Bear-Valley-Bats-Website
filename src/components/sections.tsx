import { useMemo, useState, type ReactNode } from "react";
import { Link } from "@/lib/router";
import { cn } from "@/utils/cn";
import {
  AvailabilityChip,
  ButtonLink,
  Container,
  Eyebrow,
  Icon,
  Reveal,
  SectionHeading,
  WithPlaceholders,
  type IconName,
} from "@/components/ui";
import {
  BUSINESS,
  COLLECTIONS,
  CRAFT_PILLARS,
  CUSTOM_OPTIONS,
  CUSTOM_WOOD_SPECIES,
  EXOTIC_WOODS,
  FAQ_ITEMS,
  GAME_WOODS,
  IMG,
  PROCESS_STEPS,
  REGIS_STORY,
  TESTIMONIALS,
  TRUST_ITEMS,
  WHY_ITEMS,
  getCollection,
  impactRatio,
  type Collection,
  type GameWood,
} from "@/data/site";

/* ------------------------------------------------------------------ */
/* Page hero (sub pages)                                                */
/* ------------------------------------------------------------------ */

export function PageHero({
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal text-ivory">
      {image && (
        <>
          <img
            src={IMG(image)}
            alt={imageAlt ?? ""}
            className="absolute inset-0 -z-10 h-full w-full animate-ken-burns object-cover opacity-45"
            fetchPriority="high"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/35" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-charcoal to-transparent" aria-hidden="true" />
        </>
      )}
      <Container className="flex min-h-[420px] flex-col justify-end pb-16 pt-20 sm:min-h-[500px] lg:pb-24 lg:pt-28">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.9rem,6.6vw,6rem)] uppercase leading-[0.96]">{title}</h1>
          {body && <div className="mt-7 max-w-2xl font-sans text-[18px] leading-[1.75] text-mist">{body}</div>}
          {children && <div className="mt-10 flex flex-wrap gap-4">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Trust strip                                                          */
/* ------------------------------------------------------------------ */

const TRUST_ICONS: Record<string, IconName> = {
  handmade: "handmade",
  wood: "rings",
  custom: "slider",
  shipping: "truck",
};

export function TrustStrip() {
  return (
    <section aria-label="Why choose Bear Valley Bats" className="border-b border-charcoal/10 bg-cream">
      <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST_ITEMS.map((item, i) => (
          <Reveal key={item.key} delay={i * 90}>
            <div
              className={cn(
                "flex h-full flex-col gap-5 py-10 sm:px-7 lg:py-12",
                i > 0 && "border-t border-charcoal/10 sm:border-t-0 lg:border-l",
                i % 2 === 1 && "sm:border-l sm:border-t-0 lg:border-l",
                i >= 2 && "sm:border-t",
              )}
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/60 text-walnut-2">
                <Icon name={TRUST_ICONS[item.key]} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-[1.65rem] leading-[1.1] text-ink">{item.title}</h3>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-muted">{item.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Collection cards                                                     */
/* ------------------------------------------------------------------ */

export function CollectionCards({ collections = COLLECTIONS }: { collections?: Collection[] }) {
  return (
    <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
      {collections.map((c, i) => (
        <Reveal key={c.slug} delay={(i % 3) * 110}>
          <article className="group flex h-full flex-col">
            <Link
              to={`/shop/${c.slug}`}
              aria-label={`Explore ${c.title}`}
              className="relative block aspect-[4/3] overflow-hidden bg-charcoal"
            >
              <img
                src={IMG(c.image)}
                alt={c.imageAlt}
                loading="lazy"
                className="h-full w-full object-contain p-5 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-ivory/95 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal">
                {c.exotic ? "Trophy & display" : "Game bats"}
              </span>
            </Link>

            <div className="flex flex-1 flex-col pt-7">
              <Eyebrow tone="walnut">{c.kicker}</Eyebrow>
              <h3 className="mt-3 text-[2.25rem] leading-[1] text-ink">{c.title}</h3>
              <p className="mt-4 flex-1 font-sans text-[15px] leading-relaxed text-muted">{c.blurb}</p>
              <div className="mt-6">
                <AvailabilityChip status={c.availability} />
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-charcoal/10 pt-6">
                <ButtonLink to={`/shop/${c.slug}`} variant="outlineDark" className="h-11 px-6">
                  Explore
                </ButtonLink>
                <Link
                  to={`/design?collection=${c.slug}`}
                  className="inline-flex items-center gap-2 font-sans text-[13px] font-semibold text-walnut-2 transition-colors hover:text-ink"
                >
                  Design this bat <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Customization showcase                                               */
/* ------------------------------------------------------------------ */

export function CustomizationShowcase() {
  return (
    <section className="relative overflow-hidden bg-charcoal text-ivory">
      <Container className="py-24 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-6">
            <div className="space-y-4">
              <figure className="relative overflow-hidden bg-charcoal-3">
                <img
                  src={IMG("custom-label.jpg")}
                  alt="Close-up of a custom-labeled Bear Valley Bat with a white barrel"
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-[1400ms] hover:scale-[1.03]"
                />
                <figcaption className="absolute bottom-4 left-4 rounded-sm bg-charcoal/80 px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-soft backdrop-blur">
                  Custom labeling on every bat
                </figcaption>
              </figure>
              <div className="grid grid-cols-2 gap-4">
                <figure className="relative overflow-hidden bg-charcoal-3">
                  <img
                    src={IMG("handle-closeup.jpg")}
                    alt="Close-up of a bat knob and handle"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <figcaption className="absolute bottom-3 left-3 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/90">
                    Knob & handle
                  </figcaption>
                </figure>
                <figure className="relative overflow-hidden bg-charcoal-3">
                  <img
                    src={IMG("striped-handles.jpg")}
                    alt="Bear Valley Bats with striped handles"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <figcaption className="absolute bottom-3 left-3 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/90">
                    Striped handles
                  </figcaption>
                </figure>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <SectionHeading
                tone="dark"
                eyebrow="The art of customization"
                title={
                  <>
                    Designed around <span className="text-gold-soft">your</span> game.
                  </>
                }
                body="Your bat is designed with you, from the handle to the label. Every choice is confirmed on a diagram before we cut."
              />
            </Reveal>

            <ol className="mt-12 divide-y divide-ivory/10 border-y border-ivory/10">
              {CUSTOM_OPTIONS.map((opt, i) => (
                <Reveal key={opt.n} delay={i * 80}>
                  <li className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                    <span className="font-display text-[1.4rem] italic text-gold-soft">{opt.n}</span>
                    <div>
                      <h3 className="text-[1.6rem] leading-tight text-ivory">{opt.title}</h3>
                      <p className="mt-2 font-sans text-[15px] leading-relaxed text-mist">{opt.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            <div className="mt-12 flex flex-wrap items-center gap-6">
              <ButtonLink to="/design" variant="gold" size="lg">
                Customize Your Bat
              </ButtonLink>
              <Link
                to="/customization"
                className="inline-flex items-center gap-2 font-sans text-[13px] font-semibold text-gold-soft transition-colors hover:text-ivory"
              >
                See every option <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Craftsmanship feature                                                */
/* ------------------------------------------------------------------ */

export function CraftsmanshipFeature() {
  return (
    <section className="bg-ivory">
      <Container className="py-24 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="relative lg:col-span-6">
            <div className="absolute -bottom-6 -right-6 hidden h-full w-full border border-gold/60 sm:block" aria-hidden="true" />
            <figure className="relative overflow-hidden bg-charcoal">
              <img
                src={IMG("craftsman.jpg")}
                alt="A bat-maker shaping a bat on a lathe in the workshop"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="absolute bottom-5 left-5 right-5 rounded-sm bg-charcoal/80 p-4 font-sans text-[13px] leading-relaxed text-ivory/90 backdrop-blur sm:right-auto sm:max-w-sm">
                Hand made in {BUSINESS.location}. Every bat is shaped, sealed and finished by an expert craftsman.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-5 lg:col-start-8">
            <Eyebrow tone="walnut">Our craftsmanship</Eyebrow>
            <h2 className="mt-5 text-[clamp(2.6rem,5vw,4.4rem)] uppercase leading-[0.98] text-ink">
              Not mass produced.
              <span className="block text-walnut-2">Personally crafted.</span>
            </h2>
            <p className="mt-7 font-sans text-[17px] leading-[1.8] text-muted">
              We have never mass-produced bats and have no desire to. Each bat takes several hours of hand work, compared with a few minutes for a mass-produced bat.
            </p>

            <ul className="mt-10 space-y-7">
              {CRAFT_PILLARS.map((p) => (
                <li key={p.title} className="flex gap-5 border-t border-charcoal/12 pt-6">
                  <Icon name="check" className="mt-1 h-5 w-5 text-gold" />
                  <div>
                    <h3 className="text-[1.6rem] leading-tight text-ink">{p.title}</h3>
                    <p className="mt-2 font-sans text-[15px] leading-relaxed text-muted">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <ButtonLink to="/craftsmanship" variant="ink">
                Explore Our Craftsmanship
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Wood comparison table                                                */
/* ------------------------------------------------------------------ */

type SortKey = "name" | "janka" | "specificGravity" | "impact" | "ratio";

const MAX_VALUES = {
  janka: Math.max(...GAME_WOODS.map((w) => w.janka)),
  specificGravity: Math.max(...GAME_WOODS.map((w) => w.specificGravity)),
  impact: Math.max(...GAME_WOODS.map((w) => w.impact)),
  ratio: Math.max(...GAME_WOODS.map((w) => impactRatio(w))),
};

function sortValue(w: GameWood, key: SortKey): string | number {
  if (key === "name") return w.name;
  if (key === "ratio") return impactRatio(w);
  return w[key];
}

function Metric({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div className="min-w-[110px]">
      <div className="font-sans text-[15px] font-semibold tabular-nums text-ink">{label}</div>
      <div className="mt-2.5 h-[3px] w-full bg-charcoal/10" aria-hidden="true">
        <div className="h-full bg-gold transition-[width] duration-700" style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
      </div>
    </div>
  );
}

export function WoodTable({ compact = false }: { compact?: boolean }) {
  const [sortKey, setSortKey] = useState<SortKey>("janka");
  const [desc, setDesc] = useState(true);

  const rows = useMemo(() => {
    return [...GAME_WOODS].sort((a, b) => {
      const va = sortValue(a, sortKey);
      const vb = sortValue(b, sortKey);
      const cmp = typeof va === "string" ? va.localeCompare(String(vb)) : (va as number) - (vb as number);
      return desc ? -cmp : cmp;
    });
  }, [sortKey, desc]);

  const onSort = (key: SortKey) => {
    if (key === sortKey) {
      setDesc((v) => !v);
    } else {
      setSortKey(key);
      setDesc(key !== "name");
    }
  };

  const columns: { key: SortKey; label: string }[] = [
    { key: "name", label: "Wood species" },
    { key: "janka", label: "Hardness (Janka)" },
    { key: "specificGravity", label: "Specific gravity" },
    { key: "impact", label: "Impact strength" },
    { key: "ratio", label: "Impact ÷ density" },
  ];

  return (
    <div>
      <div className="table-scroll -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <table className={cn("w-full border-collapse text-left", compact ? "min-w-[760px]" : "min-w-[900px]")}>
          <caption className="sr-only">
            Wood species comparison chart showing hardness, specific gravity, impact strength and the impact-to-density ratio.
            Sort by clicking a column heading.
          </caption>
          <thead>
            <tr className="border-b border-charcoal/25">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={sortKey === col.key ? (desc ? "descending" : "ascending") : "none"}
                  className="pb-4 pr-6 align-bottom"
                >
                  <button
                    type="button"
                    onClick={() => onSort(col.key)}
                    className="inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-walnut-2 transition-colors hover:text-ink"
                  >
                    {col.label}
                    <span aria-hidden="true" className={cn("text-[12px]", sortKey === col.key ? "text-gold" : "text-charcoal/30")}>
                      {sortKey === col.key ? (desc ? "↓" : "↑") : "↕"}
                    </span>
                  </button>
                </th>
              ))}
              {!compact && (
                <th scope="col" className="pb-4 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-walnut-2">
                  Intended use
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((w) => (
              <tr key={w.id} className="border-b border-charcoal/10 transition-colors hover:bg-walnut/[0.035]">
                <th scope="row" className="py-6 pr-6 text-left align-top font-normal">
                  <span className="block font-display text-[1.5rem] leading-tight text-ink">{w.name}</span>
                  <span className="mt-1.5 block font-sans text-[12px] text-muted">
                    {getCollection(w.collection)?.title}
                  </span>
                </th>
                <td className="py-6 pr-6 align-top">
                  <Metric label={w.jankaLabel} value={w.janka} max={MAX_VALUES.janka} />
                </td>
                <td className="py-6 pr-6 align-top">
                  <Metric label={w.specificGravity.toFixed(2)} value={w.specificGravity} max={MAX_VALUES.specificGravity} />
                </td>
                <td className="py-6 pr-6 align-top">
                  <Metric label={String(w.impact)} value={w.impact} max={MAX_VALUES.impact} />
                </td>
                <td className="py-6 pr-6 align-top">
                  <Metric label={String(impactRatio(w))} value={impactRatio(w)} max={MAX_VALUES.ratio} />
                </td>
                {!compact && (
                  <td className="max-w-xs py-6 align-top font-sans text-[14px] leading-relaxed text-muted">{w.bestFor}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 max-w-3xl font-sans text-[13px] leading-relaxed text-muted">
        Values from the Bear Valley Bats Wood Species Comparison Chart. Impact ÷ density is calculated as impact strength divided by
        specific gravity, the ratio our guide recommends for choosing wood. Bars show each value relative to the highest on the chart.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Custom wood projects                                                 */
/* ------------------------------------------------------------------ */

export function CustomWoodPanel() {
  return (
    <section className="walnut-panel text-ivory">
      <Container className="py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Custom wood projects</Eyebrow>
            <h2 className="mt-5 text-[clamp(2.6rem,5vw,4.4rem)] uppercase leading-[0.98]">
              Bring your own <span className="text-gold-soft">wood.</span>
            </h2>
            <div className="mt-7 space-y-5 font-sans text-[17px] leading-[1.8] text-mist">
              <p>
                Bear Valley Bats regularly makes custom bats from wood our clients provide, for a truly personal, professional-grade bat. Think about
                using a custom bat made from a tree you grew yourself.
              </p>
              <p>
                Providing your own wood is never required to buy a custom Bear Valley Bat. Every piece of customer wood must be reviewed for suitability
                before we begin. If you are unsure about the species or quality, email or call us and we will review it with you.
              </p>
            </div>

            <p className="mt-10 font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-gold-soft">We have made bats from</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {CUSTOM_WOOD_SPECIES.map((s) => (
                <li key={s} className="rounded-full border border-ivory/25 px-4 py-2 font-sans text-[14px] text-ivory">
                  {s}
                </li>
              ))}
              <li className="rounded-full border border-dashed border-ivory/25 px-4 py-2 font-sans text-[14px] text-mist">and other species</li>
            </ul>
          </Reveal>

          <Reveal delay={150} className="flex flex-col justify-between gap-10 lg:col-span-5 lg:col-start-8">
            <blockquote className="border border-gold/40 bg-charcoal/35 p-8 sm:p-10">
              <p className="font-display text-[2rem] italic leading-[1.2] text-ivory">
                “We will not make a bat from inferior wood unless it is for trophy or display purposes.”
              </p>
              <footer className="mt-6 font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-gold-soft">Our standard for customer wood</footer>
            </blockquote>

            <div className="space-y-5">
              <p className="font-sans text-[15px] leading-relaxed text-mist">
                Send us the species, the tree and any details you have. We will tell you what happens next, and our team will walk you through the
                design.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <ButtonLink to="/contact?topic=custom-wood" variant="gold" size="lg">
                  Inquire About Your Wood
                </ButtonLink>
                <a href={BUSINESS.phoneHref} className="font-sans text-[14px] font-semibold text-gold-soft transition-colors hover:text-ivory">
                  Call {BUSINESS.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                          */
/* ------------------------------------------------------------------ */

export function Testimonials() {
  const [lead, ...rest] = TESTIMONIALS;
  return (
    <section className="bg-ivory">
      <Container className="py-24 lg:py-32">
        <SectionHeading
          eyebrow="Customer proof"
          title={
            <>
              In the players' <span className="text-walnut-2">words.</span>
            </>
          }
          body="Reviews reproduced from bearvalleybats.com, lightly edited for length. Each is from a customer who chose to share their experience."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <figure className="flex h-full flex-col justify-between border border-charcoal/12 bg-cream p-8 sm:p-12">
              <span className="font-display text-[6rem] leading-[0.5] text-gold">“</span>
              <blockquote className="mt-6 font-display text-[2rem] leading-[1.25] text-ink sm:text-[2.4rem]">{lead.quote}</blockquote>
              <figcaption className="mt-10 font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-walnut-2">{lead.attribution}</figcaption>
            </figure>
          </Reveal>

          <div className="flex flex-col gap-8 lg:col-span-5">
            {rest.map((t, i) => (
              <Reveal key={t.attribution + i} delay={120 + i * 120} className="flex-1">
                <figure className="flex h-full flex-col justify-between border-l-2 border-gold pl-7">
                  <blockquote className="font-display text-[1.45rem] leading-[1.4] text-ink">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-muted">{t.attribution}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-24 grid items-center gap-12 border-t border-charcoal/12 pt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <figure className="relative overflow-hidden bg-charcoal">
              <img src={IMG("regis.jpg")} alt="A batter swinging a bat during a game" loading="lazy" className="aspect-[3/2] w-full object-cover" />
            </figure>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Eyebrow tone="walnut">A player's story</Eyebrow>
            <h3 className="mt-5 text-[clamp(2.2rem,4vw,3.4rem)] uppercase leading-[1] text-ink">{REGIS_STORY.headline}</h3>
            <div className="mt-6 space-y-4 font-sans text-[16px] leading-[1.75] text-muted">
              {REGIS_STORY.paragraphs.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
            <p className="mt-6 font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-walnut-2">Cody Regis, former UCLA second baseman</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why Bear Valley Bats                                                 */
/* ------------------------------------------------------------------ */

export function WhyBatsSection() {
  return (
    <section className="bg-charcoal text-ivory">
      <Container className="py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              tone="dark"
              eyebrow="Why Bear Valley Bats"
              title={
                <>
                  Five reasons we <span className="text-gold-soft">build differently.</span>
                </>
              }
              body={
                <>
                  Our process makes mass production impossible. Every bat is hand made to order, from wood we choose with care, and finished for the long
                  haul.
                </>
              }
            />
            <div className="mt-10 hidden lg:block">
              <ButtonLink to="/about" variant="outlineLight">
                About Our Family Business
              </ButtonLink>
            </div>
          </Reveal>

          <ol className="lg:col-span-6 lg:col-start-7">
            {WHY_ITEMS.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <li className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-ivory/12 py-8 first:border-t-0 first:pt-0 sm:grid-cols-[4.5rem_1fr]">
                  <span className="font-display text-[2.2rem] italic leading-none text-gold-soft">0{i + 1}</span>
                  <div>
                    <h3 className="text-[2rem] leading-[1.05] text-ivory">{item.title}</h3>
                    <p className="mt-3 font-sans text-[16px] leading-[1.75] text-mist">{item.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                  */
/* ------------------------------------------------------------------ */

export function FaqList() {
  const categories = Array.from(new Set(FAQ_ITEMS.map((i) => i.category)));
  return (
    <div className="space-y-14">
      {categories.map((cat) => (
        <div key={cat} className="grid gap-6 md:grid-cols-12 md:gap-10">
          <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-walnut-2 md:col-span-3 md:pt-7">{cat}</h3>
          <div className="divide-y divide-charcoal/12 border-t border-charcoal/12 md:col-span-9">
            {FAQ_ITEMS.filter((i) => i.category === cat).map((item) => (
              <details key={item.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-[1.55rem] leading-snug text-ink [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-charcoal/20 text-ink transition-transform duration-500 group-open:rotate-180">
                    <Icon name="chevron" className="h-4 w-4" />
                  </span>
                </summary>
                <div className="mt-5 max-w-3xl font-sans text-[16px] leading-[1.8] text-muted">
                  <WithPlaceholders text={item.a} />
                </div>
              </details>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Order steps                                                          */
/* ------------------------------------------------------------------ */

export function OrderSteps({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {PROCESS_STEPS.map((step, i) => (
        <Reveal key={step.n} delay={i * 100}>
          <li className={cn("h-full border-t pt-7", dark ? "border-ivory/20" : "border-charcoal/20")}>
            <span className={cn("font-display text-[3rem] italic leading-none", dark ? "text-gold-soft" : "text-walnut-2")}>{step.n}</span>
            <h3 className={cn("mt-5 text-[1.7rem] leading-tight", dark ? "text-ivory" : "text-ink")}>{step.title}</h3>
            <p className={cn("mt-3 font-sans text-[15px] leading-relaxed", dark ? "text-mist" : "text-muted")}>{step.body}</p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Final conversion                                                     */
/* ------------------------------------------------------------------ */

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-charcoal text-ivory">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden="true" />
      <Container className="py-28 text-center lg:py-40">
        <Reveal>
          <Eyebrow className="justify-self-center">Start your custom order</Eyebrow>
          <h2 className="mx-auto mt-7 max-w-5xl text-[clamp(2.9rem,6.4vw,6rem)] uppercase leading-[0.96]">
            Your game.
            <span className="block">Your specifications.</span>
            <span className="block text-gold-soft">Your bat.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl font-sans text-[18px] leading-[1.75] text-mist">
            Start with the wood, shape, and details that match the way you play.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <ButtonLink to="/design" variant="gold" size="lg">
              Start Your Custom Order
            </ButtonLink>
            <ButtonLink to={BUSINESS.phoneHref} variant="outlineLight" size="lg">
              Call {BUSINESS.phone}
            </ButtonLink>
          </div>
          <p className="mt-10 font-sans text-[13px] text-mist">
            Or email{" "}
            <a href={`mailto:${BUSINESS.primaryEmail}`} className="text-ivory underline-offset-4 hover:text-gold-soft hover:underline">
              {BUSINESS.primaryEmail}
            </a>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Exotic wood cards                                                    */
/* ------------------------------------------------------------------ */

export function ExoticCards() {
  return (
    <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
      {EXOTIC_WOODS.map((w, i) => (
        <Reveal key={w.id} delay={(i % 3) * 100}>
          <article className="flex h-full flex-col">
            <figure className="relative aspect-[4/3] overflow-hidden bg-charcoal">
              <img src={IMG(w.image)} alt={`${w.name} trophy bat`} loading="lazy" className="h-full w-full object-contain p-4" />
            </figure>
            <div className="flex flex-1 flex-col pt-6">
              <h3 className="text-[2rem] leading-[1] text-ink">{w.name}</h3>
              {w.latin && <p className="mt-1.5 font-display text-[1.1rem] italic text-walnut-2">{w.latin}</p>}
              <p className="mt-4 font-sans text-[15px] leading-relaxed text-muted">{w.character}</p>
              <p className="mt-4 border-l-2 border-gold pl-4 font-sans text-[14px] leading-relaxed text-ink">
                <span className="font-semibold">Use: </span>
                {w.use}
              </p>
              {(w.hardness || w.weightNote || w.example) && (
                <ul className="mt-5 space-y-1.5 font-sans text-[13px] text-muted">
                  {w.hardness && <li>Hardness: {w.hardness}</li>}
                  {w.weightNote && <li>{w.weightNote}</li>}
                  {w.example && <li>{w.example}</li>}
                </ul>
              )}
              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
                <a
                  href={`mailto:${BUSINESS.primaryEmail}?subject=${encodeURIComponent(`Exotic trophy bat pricing: ${w.name}`)}`}
                  className="inline-flex items-center gap-2 font-sans text-[13px] font-semibold text-walnut-2 transition-colors hover:text-ink"
                >
                  Email for pricing <Icon name="arrow" className="h-4 w-4" />
                </a>
                <Link
                  to={`/design?wood=${w.id}`}
                  className="inline-flex items-center gap-2 font-sans text-[13px] font-semibold text-walnut-2 transition-colors hover:text-ink"
                >
                  Design with {w.name} <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Game wood cards                                                      */
/* ------------------------------------------------------------------ */

export function GameWoodCards({ woods = GAME_WOODS }: { woods?: GameWood[] }) {
  return (
    <div className="grid gap-px bg-charcoal/12 md:grid-cols-2">
      {woods.map((w, i) => (
        <Reveal key={w.id} delay={(i % 2) * 90} className="h-full">
          <article className="flex h-full flex-col gap-6 bg-ivory p-8 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-walnut-2">
                  {getCollection(w.collection)?.title}
                </p>
                <h3 className="mt-3 text-[2.2rem] leading-[1] text-ink">{w.name}</h3>
              </div>
              <AvailabilityChip status={w.availability} />
            </div>

            <dl className="grid grid-cols-3 gap-4 border-y border-charcoal/12 py-5">
              <div>
                <dt className="font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Hardness</dt>
                <dd className="mt-1 font-display text-[1.7rem] text-ink">{w.jankaLabel}</dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Specific gravity</dt>
                <dd className="mt-1 font-display text-[1.7rem] text-ink">{w.specificGravity.toFixed(2)}</dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Impact</dt>
                <dd className="mt-1 font-display text-[1.7rem] text-ink">{w.impact}</dd>
              </div>
            </dl>

            <div className="space-y-3 font-sans text-[15px] leading-relaxed text-muted">
              <p>{w.character}</p>
              <p>
                <span className="font-semibold text-ink">Best suited to: </span>
                {w.bestFor}
              </p>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              <Link
                to={`/design?wood=${w.id}`}
                className="inline-flex items-center gap-2 font-sans text-[13px] font-semibold text-ink transition-colors hover:text-walnut-2"
              >
                Design with {w.name} <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link
                to={`/shop/${w.collection}`}
                className="inline-flex items-center gap-2 font-sans text-[13px] font-semibold text-muted transition-colors hover:text-ink"
              >
                View collection
              </Link>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export { getCollection };
