import { ButtonLink, Container, Eyebrow, Icon, Reveal, SectionHeading, WithPlaceholders } from "@/components/ui";
import { OrderSteps, PageHero } from "@/components/sections";
import { IMG } from "@/data/site";

type Detail = {
  id: string;
  n: string;
  title: string;
  image?: string;
  alt?: string;
  body: string;
  tell: string[];
  placeholder?: string;
};

const DETAILS: Detail[] = [
  {
    id: "handles",
    n: "01",
    title: "Handles & knobs",
    image: "striped-handles.jpg",
    alt: "Bear Valley Bats with striped handles",
    body: "Handles and knobs are fully customizable. Striped handles, shown throughout our site, are one custom look we build.",
    tell: ["The handle shape or feel you want", "The knob design you prefer", "Whether you want striped handles"],
    placeholder: "[Handle profiles and knob styles by model: to be confirmed with our bat-makers]",
  },
  {
    id: "length-weight",
    n: "02",
    title: "Length & weight",
    body: "Choose the length and weight you can comfortably handle, or the size you anticipate handling after a winter in the weight room. We confirm both on your design diagram before cutting.",
    tell: ["Your preferred length, in inches", "Your preferred weight, in ounces", "Your game: baseball, softball or slow pitch"],
    placeholder: "[Available lengths and weights by model: to be confirmed]",
  },
  {
    id: "labels",
    n: "03",
    title: "Custom labels",
    image: "custom-label.jpg",
    alt: "Close-up of a custom-labeled Bear Valley Bat",
    body: "Custom labeling is available on all of our bats. Describe the label you want, and we will confirm the layout with you during design review.",
    tell: ["The exact text you want on the label", "Any layout preferences for review"],
  },
  {
    id: "heartwood",
    n: "04",
    title: "Heartwood barrel upgrade",
    image: "craftsman.jpg",
    alt: "A bat-maker shaping a bat in the workshop",
    body: "Available now to all clients. The upgrade requires an experienced bat-maker and premium wood quality, and it is completed by hand. As our guide puts it: no computer can replace the experienced eye of a skilled bat-maker.",
    tell: ["Tell us you would like the heartwood barrel upgrade", "Tell us your wood choice so we can confirm suitability"],
  },
  {
    id: "trophy",
    n: "05",
    title: "Exotic trophy personalization",
    image: "lignum.jpg",
    alt: "Dark exotic wood trophy bat",
    body: "Exotic wood trophy bats are fully custom and can be personalized almost any way you want, for gifts, awards, display and warm-up bats.",
    tell: ["Your species choice or request", "The occasion: gift, award, display or warm-up"],
  },
];

function DetailRow({ detail, flip }: { detail: Detail; flip: boolean }) {
  return (
    <div className={`grid items-center gap-12 lg:grid-cols-12 lg:gap-16 ${flip ? "" : ""}`}>
      <Reveal className={flip ? "lg:order-2 lg:col-span-6" : "lg:col-span-6"}>
        {detail.image ? (
          <figure className="overflow-hidden bg-charcoal">
            <img src={IMG(detail.image)} alt={detail.alt ?? ""} loading="lazy" className="aspect-[4/3] w-full object-contain p-4" />
          </figure>
        ) : (
          <div className="flex aspect-[4/3] flex-col justify-end bg-walnut p-10 text-ivory">
            <span className="font-display text-[7rem] italic leading-none text-gold-soft/80">{detail.n}</span>
          </div>
        )}
      </Reveal>

      <Reveal delay={120} className={flip ? "lg:order-1 lg:col-span-5 lg:col-start-1" : "lg:col-span-5 lg:col-start-8"}>
        <p className="font-display text-[1.4rem] italic text-walnut-2">{detail.n}</p>
        <h2 className="mt-3 text-[clamp(2.2rem,4vw,3.4rem)] uppercase leading-[1] text-ink">{detail.title}</h2>
        <p className="mt-6 font-sans text-[17px] leading-[1.8] text-muted">
          <WithPlaceholders text={detail.body} />
        </p>
        <div className="mt-8">
          <Eyebrow tone="walnut" className="mb-4">
            What to tell us
          </Eyebrow>
          <ul className="space-y-3">
            {detail.tell.map((t) => (
              <li key={t} className="flex items-start gap-3 font-sans text-[15px] text-ink">
                <Icon name="check" className="mt-0.5 h-4 w-4 text-gold" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        {detail.placeholder && (
          <p className="mt-8 font-sans text-[14px] text-muted">
            <WithPlaceholders text={detail.placeholder} />
          </p>
        )}
      </Reveal>
    </div>
  );
}

export default function Customization() {
  return (
    <>
      <PageHero
        eyebrow="The art of customization"
        title={
          <>
            Your bat, shaped <span className="text-gold-soft">around your game.</span>
          </>
        }
        body="Handles, knobs, length, weight, custom labels and heartwood barrel upgrades. Every choice is designed with a bat-maker and confirmed on a diagram before we cut."
        image="custom-label.jpg"
        imageAlt="Close-up of a custom-labeled Bear Valley Bat"
      >
        <ButtonLink to="/design" variant="gold" size="lg">
          Customize Your Bat
        </ButtonLink>
        <ButtonLink to="/wood" variant="outlineLight" size="lg">
          Choose a Wood First
        </ButtonLink>
      </PageHero>

      <section aria-label="Customization options" className="bg-ivory">
        <Container className="space-y-28 py-24 lg:space-y-36 lg:py-32">
          {DETAILS.map((d, i) => (
            <DetailRow key={d.id} detail={d} flip={i % 2 === 1} />
          ))}
        </Container>
      </section>

      <section aria-labelledby="process-heading" className="bg-cream">
        <Container className="py-24 lg:py-32">
          <SectionHeading
            eyebrow="From idea to bat"
            title={
              <>
                Four steps, <span className="text-walnut-2">one design.</span>
              </>
            }
            body="You shape the design, we confirm it on a diagram, and you approve it before anything is cut."
          />
          <div className="mt-16">
            <OrderSteps />
          </div>
        </Container>
      </section>

      <section className="bg-charcoal text-ivory">
        <Container className="flex flex-col items-start justify-between gap-10 py-20 lg:flex-row lg:items-center">
          <Reveal>
            <p className="font-display text-[clamp(2rem,3.6vw,3rem)] leading-tight">
              There is never any charge for designing your bat, <span className="italic text-gold-soft">no matter how long it takes.</span>
            </p>
          </Reveal>
          <ButtonLink to="/design" variant="gold" size="lg">
            Customize Your Bat
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
