import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { CollectionCards, OrderSteps, PageHero } from "@/components/sections";

export default function Shop() {
  return (
    <>
      <PageHero
        eyebrow="Shop custom bats"
        title={
          <>
            Every bat, <span className="text-gold-soft">made to order.</span>
          </>
        }
        body="Explore each wood for its specifications and build options. We never sell pre-made bats. Choose a wood, design your bat, and our bat-makers review it with you."
        image="birch-hero.jpg"
        imageAlt="Canadian Yellow Birch bats on a dark studio background"
      >
        <ButtonLink to="/design" variant="gold" size="lg">
          Design Your Bat
        </ButtonLink>
        <ButtonLink to="/wood" variant="outlineLight" size="lg">
          Compare Woods
        </ButtonLink>
      </PageHero>

      <section aria-label="Collections" className="bg-ivory">
        <Container className="py-24 lg:py-32">
          <CollectionCards />
        </Container>
      </section>

      <section aria-labelledby="how-heading" className="bg-cream">
        <Container className="py-24 lg:py-32">
          <SectionHeading
            eyebrow="How ordering works"
            title={
              <>
                From wood to <span className="text-walnut-2">finished bat.</span>
              </>
            }
            body="A clear, four-step process. Your design is never cut until you have reviewed the diagram."
          />
          <div className="mt-16">
            <OrderSteps />
          </div>
        </Container>
      </section>

      <section className="bg-charcoal text-ivory">
        <Container className="flex flex-col items-start justify-between gap-8 py-16 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] uppercase">Not sure which wood?</h2>
            <p className="mt-3 max-w-xl font-sans text-[16px] leading-relaxed text-mist">
              Compare hardness, specific gravity and impact strength side by side, or ask our bat-makers to recommend a wood for your game.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <ButtonLink to="/wood" variant="gold">
              Compare Woods
            </ButtonLink>
            <ButtonLink to="/contact" variant="outlineLight">
              Ask Our Team
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
