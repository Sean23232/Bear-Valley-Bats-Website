import { ButtonLink, Container, Eyebrow, Icon, Reveal, SectionHeading } from "@/components/ui";
import { OrderSteps, PageHero } from "@/components/sections";
import { BUSINESS } from "@/data/site";
import { Link } from "@/lib/router";

const PILLARS = [
  {
    icon: "handmade" as const,
    title: "We hand make every bat",
    body: "Every bat is handmade and made to order. We never sell pre-made bats, and we do not put a custom name on a pre-made bat.",
  },
  {
    icon: "pen" as const,
    title: "We cut no corners",
    body: "We use multi-part, multi-step hardwood sealer and finish, a process similar to commercial wood flooring, not a one-step dip.",
  },
  {
    icon: "slider" as const,
    title: "Designs unique to you",
    body: "Our clients play an important role in designing their bats, and we are happy to assist with every design.",
  },
  {
    icon: "star" as const,
    title: "Proudly made in the USA",
    body: `Family-owned and built in ${BUSINESS.location}, a small mountain community ${BUSINESS.elevation}.`,
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Bear Valley Bats"
        title={
          <>
            Family-owned, <span className="text-gold-soft">hand made in the mountains.</span>
          </>
        }
        body={`We are located in Big Bear City, a small mountain community ${BUSINESS.elevation.replace("7,000 feet in the", "7,000 feet high in the")} of Southern California. We hand make every one of our bats.`}
        image="pistachio.jpg"
        imageAlt="Pistachio trophy bat with yellow sapwood and dark heartwood"
      />

      <section aria-labelledby="purpose-heading" className="bg-ivory">
        <Container className="grid gap-12 py-24 lg:grid-cols-12 lg:gap-16 lg:py-32">
          <Reveal className="lg:col-span-5">
            <Eyebrow tone="walnut">Our purpose</Eyebrow>
            <h2 id="purpose-heading" className="mt-5 text-[clamp(2.4rem,4.4vw,3.8rem)] uppercase leading-[1] text-ink">
              One purpose. <span className="text-walnut-2">Every bat by hand.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-6 font-sans text-[17px] leading-[1.85] text-muted lg:col-span-6 lg:col-start-7">
            <p>
              We have never mass-produced bats, and we have no desire to. We started our business with a single purpose: produce the premier wood bat, with
              each and every bat custom-made by hand.
            </p>
            <p>
              Our process makes mass production impossible. The time we put into each bat is several hours, compared with a few minutes for a mass-produced
              bat. We feel confident you will notice the difference in quality.
            </p>
            <p>
              Our clients are amateurs and professionals from all over the world. Every technique we use to increase performance conforms to the rules of
              Major League Baseball.
            </p>
          </Reveal>
        </Container>
      </section>

      <section aria-label="What we stand for" className="bg-cream">
        <Container className="py-24 lg:py-28">
          <ul className="grid gap-px bg-charcoal/12 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 90} className="h-full">
                <li className="flex h-full flex-col gap-6 bg-ivory p-8 lg:p-10">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/60 text-walnut-2">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="text-[1.8rem] leading-[1.05] text-ink">{p.title}</h3>
                  <p className="font-sans text-[15px] leading-relaxed text-muted">{p.body}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="order-heading" className="bg-ivory">
        <Container className="py-24 lg:py-32">
          <SectionHeading
            eyebrow="How to order"
            title={
              <>
                A four-step <span className="text-walnut-2">process.</span>
              </>
            }
            body="From choosing your wood to receiving a hand made bat. There is never a charge for designing your bat."
          />
          <div className="mt-16">
            <OrderSteps />
          </div>
        </Container>
      </section>

      <section className="bg-charcoal text-ivory">
        <Container className="grid gap-14 py-24 lg:grid-cols-12 lg:py-28">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Talk with us</Eyebrow>
            <h2 className="mt-5 text-[clamp(2.4rem,4.4vw,3.6rem)] uppercase leading-[1] text-ivory">Questions are always welcome.</h2>
            <p className="mt-6 max-w-xl font-sans text-[17px] leading-[1.8] text-mist">
              We look forward to discussing any questions you have about baseball bats, even if you decide to purchase elsewhere.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink to="/contact" variant="gold" size="lg">
                Contact Us
              </ButtonLink>
              <ButtonLink to="/design" variant="outlineLight" size="lg">
                Design Your Bat
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
            <dl className="divide-y divide-ivory/12 border-y border-ivory/12">
              <div className="py-6">
                <dt className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gold-soft">Phone</dt>
                <dd className="mt-2">
                  <a href={BUSINESS.phoneHref} className="font-display text-[1.9rem] text-ivory transition-colors hover:text-gold-soft">
                    {BUSINESS.phone}
                  </a>
                </dd>
              </div>
              <div className="py-6">
                <dt className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gold-soft">Email</dt>
                <dd className="mt-2 space-y-1 font-sans text-[16px] text-mist">
                  <a href={`mailto:${BUSINESS.primaryEmail}`} className="block transition-colors hover:text-ivory">
                    {BUSINESS.primaryEmail}
                  </a>
                  <a href={`mailto:${BUSINESS.secondaryEmail}`} className="block transition-colors hover:text-ivory">
                    {BUSINESS.secondaryEmail}
                  </a>
                </dd>
              </div>
              <div className="py-6">
                <dt className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gold-soft">Location</dt>
                <dd className="mt-2 font-sans text-[16px] text-mist">{BUSINESS.location}</dd>
              </div>
              <div className="py-6">
                <dt className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gold-soft">Hours</dt>
                <dd className="mt-2 font-sans text-[16px] text-mist">[Business hours: to be confirmed]</dd>
              </div>
            </dl>
            <p className="mt-8 font-sans text-[14px] text-mist">
              Looking for a wood? <Link to="/wood" className="font-semibold text-gold-soft hover:text-ivory">Compare every species</Link>.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
