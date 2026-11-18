import { ButtonLink, Container, Eyebrow, Reveal, WithPlaceholders } from "@/components/ui";
import { PageHero } from "@/components/sections";
import { IMG } from "@/data/site";

const CHAPTERS = [
  {
    n: "01",
    eyebrow: "The grain",
    title: "Straight grain, end to end.",
    body: [
      "For wood used in baseball bats, grain is the most important factor, followed by density. The most reliable indicator of quality is straight grain throughout the length of the bat, especially the barrel.",
      "Recent studies seem to indicate this is less critical in Canadian Yellow Birch, but it is especially important in Northern White Ash.",
    ],
    image: "ash.jpg",
    alt: "Northern White Ash bat showing straight grain",
  },
  {
    n: "02",
    eyebrow: "Selection",
    title: "Hand selected from Grade #1 stock.",
    body: [
      "We use only hand selected wood from Grade #1 stock. Each bat is as individual as the player, so we are more selective about the wood we use.",
      "Every species must meet our minimum standards for impact bending strength, specific gravity and surface hardness before we build from it.",
    ],
    image: "birch.jpg",
    alt: "Canadian Yellow Birch game bat",
  },
  {
    n: "03",
    eyebrow: "Making",
    title: "Several hours of hand work per bat.",
    body: [
      "Our techniques are unique to the industry. The time we put into each bat is several hours, compared with a few minutes for a mass-produced bat.",
      "Every technique we use to increase performance conforms to the rules of Major League Baseball. We do not reveal our techniques, so please don't ask.",
    ],
    image: "mtn-mahogany.jpg",
    alt: "Mountain Mahogany trophy bat under blue studio light",
  },
  {
    n: "04",
    eyebrow: "Finish",
    title: "Multi-step sealing and a hardened barrel.",
    body: [
      "We do not dip your bat into a one-step polyurethane finish. We use multi-part, multi-step hardwood sealer and finish, a process similar to commercial flooring in schools, hospitals and bowling alleys.",
      "Our penetrating sealer system becomes part of the wood and hardens the barrel surface.",
    ],
    image: "pignut.jpg",
    alt: "Pignut Hickory game bat",
  },
  {
    n: "05",
    eyebrow: "Design",
    title: "Designed with you.",
    body: [
      "Our designs are unique to our clients. Clients play an important role in designing their own bats, and we are happy to assist with the design.",
      "There is never any charge for designing your bat, no matter how long it might take.",
    ],
    image: "custom-label.jpg",
    alt: "Close-up of a custom-labeled bat",
  },
];

export default function Craftsmanship() {
  return (
    <>
      <PageHero
        eyebrow="Our craftsmanship"
        title={
          <>
            Not mass produced. <span className="text-gold-soft">Personally crafted.</span>
          </>
        }
        body="Every Bear Valley Bat is hand made to order by an expert craftsman, from wood selected with care. Here is how a bat comes together, one step at a time."
        image="craftsman.jpg"
        imageAlt="A bat-maker shaping a bat on a lathe in the workshop"
      />

      <section aria-label="Craftsmanship process" className="bg-ivory">
        <Container className="space-y-28 py-24 lg:space-y-36 lg:py-32">
          {CHAPTERS.map((c, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={c.n} className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <Reveal className={flip ? "lg:order-2 lg:col-span-6" : "lg:col-span-6"}>
                  <figure className="overflow-hidden bg-charcoal">
                    <img src={IMG(c.image)} alt={c.alt} loading="lazy" className="aspect-[4/3] w-full object-contain p-4" />
                  </figure>
                </Reveal>
                <Reveal delay={120} className={flip ? "lg:order-1 lg:col-span-5 lg:col-start-1" : "lg:col-span-5 lg:col-start-8"}>
                  <p className="font-display text-[1.4rem] italic text-walnut-2">{c.n}</p>
                  <Eyebrow tone="walnut" className="mt-3">
                    {c.eyebrow}
                  </Eyebrow>
                  <h2 className="mt-4 text-[clamp(2.2rem,4vw,3.4rem)] uppercase leading-[1] text-ink">{c.title}</h2>
                  <div className="mt-6 space-y-5 font-sans text-[17px] leading-[1.8] text-muted">
                    {c.body.map((p) => (
                      <p key={p.slice(0, 40)}>
                        <WithPlaceholders text={p} />
                      </p>
                    ))}
                  </div>
                </Reveal>
              </div>
            );
          })}
        </Container>
      </section>

      <section className="walnut-panel text-ivory">
        <Container className="py-24 text-center lg:py-32">
          <Reveal>
            <span className="font-display text-[6rem] leading-[0.5] text-gold">“</span>
            <blockquote className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2rem,4vw,3.2rem)] italic leading-[1.2] text-ivory">
              When you receive your Bear Valley Bat, you will immediately know you have purchased something not previously available to the public.
            </blockquote>
            <p className="mt-8 font-sans text-[12px] font-bold uppercase tracking-[0.22em] text-gold-soft">From our About page</p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-cream">
        <Container className="flex flex-col items-start justify-between gap-10 py-20 lg:flex-row lg:items-center">
          <Reveal>
            <h2 className="text-[clamp(2.2rem,4vw,3.4rem)] uppercase text-ink">Built to your specifications.</h2>
            <p className="mt-4 max-w-2xl font-sans text-[17px] leading-relaxed text-muted">
              Start with the wood, then design the handle, knob, length, weight and label that fit your game.
            </p>
          </Reveal>
          <div className="flex flex-wrap gap-4">
            <ButtonLink to="/design" variant="ink" size="lg">
              Start Your Custom Order
            </ButtonLink>
            <ButtonLink to="/wood" variant="outlineDark" size="lg">
              Explore Wood Options
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
