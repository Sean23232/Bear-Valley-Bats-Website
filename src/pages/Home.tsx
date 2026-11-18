import { useEffect } from "react";
import { ButtonLink, Container, Icon, SectionHeading } from "@/components/ui";
import {
  CollectionCards,
  CraftsmanshipFeature,
  CustomWoodPanel,
  CustomizationShowcase,
  FaqList,
  FinalCTA,
  Testimonials,
  TrustStrip,
  WhyBatsSection,
  WoodTable,
} from "@/components/sections";
import { IMG } from "@/data/site";
import { Link } from "@/lib/router";

function Hero() {
  return (
    <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-charcoal text-ivory">
      <img
        src={IMG("hero-bats.jpg")}
        alt="Two handmade Bear Valley Bats with visible wood grain under dramatic studio lighting"
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full animate-ken-burns object-cover object-[62%_50%]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal via-charcoal/75 to-charcoal/15" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent" />

      <Container className="w-full pb-14 pt-36 sm:pb-20 lg:pb-24">
        <div className="max-w-3xl">
          <p className="reveal is-visible font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-gold-soft">
            Handmade · Made to order · Big Bear City, California
          </p>
          <h1 className="mt-7 text-[clamp(3.4rem,8.6vw,8rem)] uppercase leading-[0.9] text-ivory">
            Built by hand.
            <span className="block text-gold-soft">Made for the game.</span>
          </h1>
          <p className="mt-8 max-w-xl font-sans text-[17px] leading-[1.8] text-mist sm:text-[19px]">
            Premium, fully customized wood baseball and softball bats, handcrafted to your specifications using carefully selected professional-grade wood.
          </p>
          <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink to="/design" variant="gold" size="lg">
              Design Your Bat
            </ButtonLink>
            <ButtonLink to="/wood" variant="outlineLight" size="lg">
              Explore Our Wood Options
            </ButtonLink>
          </div>
          <p className="mt-12 inline-flex items-center gap-3 font-sans text-[12px] font-bold uppercase tracking-[0.22em] text-gold-soft">
            <span className="hidden h-px w-10 bg-gold sm:inline-block" aria-hidden="true" />
            <Icon name="star" className="h-4 w-4" />
            Proudly Made in the USA
          </p>
        </div>
      </Container>
    </section>
  );
}

export default function Home({ scrollTo }: { scrollTo?: string }) {
  useEffect(() => {
    if (!scrollTo) return;
    const timer = window.setTimeout(() => {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [scrollTo]);

  return (
    <>
      <Hero />
      <TrustStrip />

      <section aria-labelledby="collection-heading" className="bg-ivory">
        <Container className="py-24 lg:py-32">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Explore the collection"
              title={
                <>
                  Six woods. <span className="text-walnut-2">Each made to order.</span>
                </>
              }
              body="Explore each species for its specifications and build options, or go straight to designing your bat. Availability is confirmed when you order."
            />
            <Link to="/shop" className="inline-flex shrink-0 items-center gap-2 font-sans text-[14px] font-semibold text-ink transition-colors hover:text-walnut-2">
              View all bats <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-20">
            <CollectionCards />
          </div>
        </Container>
      </section>

      <CustomizationShowcase />
      <CraftsmanshipFeature />

      <section aria-labelledby="wood-heading" className="bg-cream">
        <Container className="py-24 lg:py-32">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Choose your wood"
              title={
                <>
                  Compare the <span className="text-walnut-2">numbers.</span>
                </>
              }
              body="Every species is measured on the three properties behind our minimum standards: hardness, specific gravity and impact strength. Choose the wood that fits how you play."
            />
            <Link to="/wood" className="inline-flex shrink-0 items-center gap-2 font-sans text-[14px] font-semibold text-ink transition-colors hover:text-walnut-2">
              Full wood guide <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-16">
            <WoodTable compact />
          </div>
        </Container>
      </section>

      <CustomWoodPanel />
      <Testimonials />
      <WhyBatsSection />

      <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-28 bg-cream">
        <Container className="py-24 lg:py-32">
          <SectionHeading
            eyebrow="Frequently asked questions"
            title={
              <>
                Answers before <span className="text-walnut-2">you order.</span>
              </>
            }
            body="Answers based on our published process and standards. Anything still being confirmed is marked clearly, and our team is glad to help with the rest."
          />
          <div className="mt-16">
            <FaqList />
          </div>
          <p className="mt-16 font-sans text-[15px] text-muted">
            Still have a question? Call{" "}
            <a href="tel:+19098551606" className="font-semibold text-ink underline-offset-4 hover:underline">
              (909) 855-1606
            </a>{" "}
            or{" "}
            <Link to="/contact" className="font-semibold text-ink underline-offset-4 hover:underline">
              send us a message
            </Link>
            .
          </p>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
