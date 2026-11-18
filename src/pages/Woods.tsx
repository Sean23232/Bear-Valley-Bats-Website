import { ButtonLink, Container, Eyebrow, Reveal, SectionHeading } from "@/components/ui";
import { CustomWoodPanel, ExoticCards, GameWoodCards, PageHero, WoodTable } from "@/components/sections";
import { STANDARDS } from "@/data/site";

const GUIDE = [
  {
    title: "For lighter models",
    body: "Our guide points to Northern White Ash, Canadian Yellow Birch, Pecan Hickory and European Beech.",
  },
  {
    title: "For heavier models",
    body: "Any of our true hickories is the best fit. Pignut Hickory is the heaviest species on our chart.",
  },
  {
    title: "Know your swing",
    body: "Know the length and weight you can comfortably handle, or the size you expect to handle after a winter in the weight room.",
  },
  {
    title: "Still unsure?",
    body: "Email or call us. We explain our recommendation based on your hitting style, the pitching you expect and the bat you prefer.",
  },
];

export default function Woods() {
  return (
    <>
      <PageHero
        eyebrow="Wood options"
        title={
          <>
            Choose your wood. <span className="text-gold-soft">Know why.</span>
          </>
        }
        body="Every species is compared on the three properties behind our minimum standards: hardness, specific gravity and impact strength. Choose by how you play, then design your bat."
        image="jatoba.jpg"
        imageAlt="Brazilian Cherry (Jatoba) bat with deep red and golden hues"
      >
        <ButtonLink to="/design" variant="gold" size="lg">
          Design Your Bat
        </ButtonLink>
        <ButtonLink to="/contact" variant="outlineLight" size="lg">
          Ask for Wood Advice
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="standards-heading" className="bg-cream">
        <Container className="py-24 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow tone="walnut">Our minimum standards</Eyebrow>
              <h2 id="standards-heading" className="mt-5 text-[clamp(2.4rem,4.4vw,3.6rem)] uppercase text-ink">
                Every species must pass.
              </h2>
              <p className="mt-6 font-sans text-[16px] leading-[1.8] text-muted">
                We studied the mechanical properties of wood and developed our own standards. Each species must meet every minimum before we make bats from it.
              </p>
            </Reveal>
            <ul className="grid gap-px bg-charcoal/12 sm:grid-cols-3 lg:col-span-8">
              {STANDARDS.map((s, i) => (
                <Reveal key={s.label} delay={i * 100} className="h-full">
                  <li className="flex h-full flex-col bg-ivory p-8">
                    <p className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-walnut-2">{s.label}</p>
                    <p className="mt-6 font-display text-[4rem] leading-none text-ink">{s.minimum}</p>
                    <p className="mt-5 font-sans text-[14px] leading-relaxed text-muted">{s.note}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="chart-heading" className="bg-ivory">
        <Container className="py-24 lg:py-32">
          <SectionHeading
            eyebrow="Side by side"
            title={
              <>
                The comparison <span className="text-walnut-2">chart.</span>
              </>
            }
            body="Sort any column to compare species. Bars show each value relative to the highest on the chart."
          />
          <div className="mt-16">
            <WoodTable />
          </div>
        </Container>
      </section>

      <section aria-labelledby="choose-heading" className="bg-charcoal text-ivory">
        <Container className="py-24 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Eyebrow>How to choose</Eyebrow>
              <h2 id="choose-heading" className="mt-5 text-[clamp(2.4rem,4.4vw,3.6rem)] uppercase">
                Start with the weight you can swing.
              </h2>
              <blockquote className="mt-8 border-l-2 border-gold pl-6 font-display text-[1.75rem] italic leading-snug text-ivory/90">
                “You want to choose the wood with the highest number that you can swing comfortably.”
              </blockquote>
              <p className="mt-4 font-sans text-[13px] text-mist">From the Bear Valley Bats guide to impact strength divided by specific gravity.</p>
            </Reveal>
            <div className="grid gap-px bg-ivory/12 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
              {GUIDE.map((g, i) => (
                <Reveal key={g.title} delay={i * 90} className="h-full">
                  <div className="h-full bg-charcoal p-8">
                    <h3 className="text-[1.8rem] leading-tight text-ivory">{g.title}</h3>
                    <p className="mt-3 font-sans text-[15px] leading-relaxed text-mist">{g.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="game-heading" className="bg-ivory">
        <Container className="py-24 lg:py-32">
          <SectionHeading
            eyebrow="Game woods"
            title={
              <>
                Eight species, <span className="text-walnut-2">eight characters.</span>
              </>
            }
            body="What each species is, and where it fits in a game bat. Every species is available to design with."
          />
          <div className="mt-16">
            <GameWoodCards />
          </div>
        </Container>
      </section>

      <section aria-labelledby="exotic-heading" className="bg-cream">
        <Container className="py-24 lg:py-32">
          <SectionHeading
            eyebrow="Exotic wood trophy bats"
            title={
              <>
                Built to be <span className="text-walnut-2">admired.</span>
              </>
            }
            body="Some exotic species are unsuitable for baseball but make stunningly beautiful bats. Others are extremely heavy, which makes them ideal as team warm-up bats. These are trophy, gift, display and warm-up bats, not game bats."
          />
          <div className="mt-16">
            <ExoticCards />
          </div>
          <div className="mt-20 flex flex-col gap-8 border-t border-charcoal/15 pt-12 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-2xl font-sans text-[16px] leading-relaxed text-muted">
              Don't see the wood you want? If you have a particular type of wood in mind that is not listed here, contact us and we will attempt to locate it for you.
            </p>
            <ButtonLink to="/contact" variant="ink">
              Request a Wood
            </ButtonLink>
          </div>
        </Container>
      </section>

      <CustomWoodPanel />
    </>
  );
}
