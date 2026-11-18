import { useEffect } from "react";
import { AvailabilityChip, ButtonLink, Container, Eyebrow, Icon, Reveal, SectionHeading } from "@/components/ui";
import { CollectionCards, ExoticCards, GameWoodCards, OrderSteps } from "@/components/sections";
import { BUSINESS, COLLECTIONS, GAME_WOODS, IMG, getCollection } from "@/data/site";
import { Link } from "@/lib/router";

function Breadcrumb({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-ivory/10 bg-charcoal">
      <Container className="py-4">
        <ol className="flex flex-wrap items-center gap-2 font-sans text-[12px] text-mist">
          <li>
            <Link to="/" className="transition-colors hover:text-ivory">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/shop" className="transition-colors hover:text-ivory">
              Shop Bats
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ivory">
            {title}
          </li>
        </ol>
      </Container>
    </nav>
  );
}

export default function Product({ slug }: { slug: string }) {
  const collection = getCollection(slug);

  useEffect(() => {
    if (collection) document.title = `${collection.title} | Bear Valley Bats`;
  }, [collection]);

  if (!collection) {
    return (
      <section className="bg-ivory">
        <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
          <Eyebrow tone="walnut">Collection not found</Eyebrow>
          <h1 className="mt-5 text-[clamp(2.6rem,5vw,4.4rem)] uppercase text-ink">We could not find that bat.</h1>
          <p className="mt-5 max-w-xl font-sans text-[17px] text-muted">The collection you requested may have moved. Browse all bats to find the wood you are looking for.</p>
          <div className="mt-10">
            <ButtonLink to="/shop" variant="ink">
              Shop All Bats
            </ButtonLink>
          </div>
        </Container>
      </section>
    );
  }

  const woods = collection.exotic ? [] : GAME_WOODS.filter((w) => collection.woodIds.includes(w.id));
  const others = COLLECTIONS.filter((c) => c.slug !== collection.slug).slice(0, 3);

  return (
    <>
      <Breadcrumb title={collection.title} />

      <section className="bg-charcoal text-ivory">
        <Container className="grid items-center gap-12 py-14 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <Reveal className="lg:col-span-7">
            <figure className="relative aspect-[4/3] overflow-hidden bg-charcoal-3">
              <img src={IMG(collection.image)} alt={collection.imageAlt} className="h-full w-full object-contain p-6" fetchPriority="high" />
            </figure>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <Eyebrow>{collection.kicker}</Eyebrow>
            <h1 className="mt-5 text-[clamp(2.8rem,5.2vw,5rem)] uppercase leading-[0.96]">{collection.title}</h1>
            <p className="mt-6 font-sans text-[17px] leading-[1.75] text-mist">{collection.blurb}</p>

            <div className="mt-7">
              <AvailabilityChip status={collection.availability} dark />
            </div>

            <dl className="mt-8 grid gap-6 border-y border-ivory/12 py-7">
              <div>
                <dt className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gold-soft">Pricing</dt>
                <dd className="mt-2 font-sans text-[15px] leading-relaxed text-mist">
                  {collection.exotic
                    ? "Exotic wood prices change quickly. Call or email for current pricing."
                    : "Pricing is provided by our team for your specifications. Call or email to request it."}
                </dd>
              </div>
              <div>
                <dt className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gold-soft">Production</dt>
                <dd className="mt-2 font-sans text-[15px] leading-relaxed text-mist">
                  Hand made to order, with design review before cutting. There is never a charge for design.
                </dd>
              </div>
            </dl>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <ButtonLink to={`/design?collection=${collection.slug}`} variant="gold" size="lg">
                Design This Bat
              </ButtonLink>
              <ButtonLink to={BUSINESS.storeUrl} variant="outlineLight" size="lg">
                Online Store
              </ButtonLink>
            </div>
            <p className="mt-6 font-sans text-[14px] text-mist">
              Prefer to talk it through?{" "}
              <a href={BUSINESS.phoneHref} className="font-semibold text-gold-soft transition-colors hover:text-ivory">
                Call {BUSINESS.phone}
              </a>
            </p>

            <ul className="mt-10 space-y-4">
              {collection.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 font-sans text-[15px] text-ivory/90">
                  <Icon name="check" className="mt-0.5 h-4 w-4 text-gold" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="about-heading" className="bg-ivory">
        <Container className="grid gap-12 py-24 lg:grid-cols-12 lg:gap-16 lg:py-32">
          <div className="lg:col-span-5">
            <Eyebrow tone="walnut">About this wood</Eyebrow>
            <h2 id="about-heading" className="mt-5 text-[clamp(2.4rem,4.4vw,3.8rem)] uppercase text-ink">
              {collection.title}
            </h2>
          </div>
          <div className="space-y-6 font-sans text-[17px] leading-[1.85] text-muted lg:col-span-6 lg:col-start-7">
            {collection.description.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="specs-heading" className="bg-cream">
        <Container className="py-24 lg:py-32">
          <SectionHeading
            eyebrow={collection.exotic ? "Exotic species" : "Specifications"}
            title={
              <>
                {collection.exotic ? "Choose your species." : "Options in this "}
                {!collection.exotic && <span className="text-walnut-2">collection.</span>}
              </>
            }
            body={
              collection.exotic
                ? "Each exotic species is personalized to your request. These bats are built for trophies, gifts, display and warm-up, not game use."
                : "Values come from the Bear Valley Bats Wood Species Comparison Chart. Choose the species, then design your bat."
            }
          />
          <div className="mt-16">{collection.exotic ? <ExoticCards /> : <GameWoodCards woods={woods} />}</div>
        </Container>
      </section>

      <section aria-labelledby="process-heading" className="bg-ivory">
        <Container className="py-24 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow tone="walnut">Ordering {collection.title}</Eyebrow>
              <h2 id="process-heading" className="mt-5 text-[clamp(2.2rem,4vw,3.4rem)] uppercase text-ink">
                Four clear steps.
              </h2>
              <p className="mt-6 font-sans text-[16px] leading-relaxed text-muted">
                Your bat is designed with you before it is made. You approve the diagram, and nothing is cut until you do.
              </p>
              <div className="mt-10">
                <ButtonLink to={`/design?collection=${collection.slug}`} variant="ink">
                  Start Your Custom Order
                </ButtonLink>
              </div>
            </Reveal>
            <div className="lg:col-span-8">
              <OrderSteps />
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="others-heading" className="bg-cream">
        <Container className="py-24 lg:py-32">
          <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="others-heading" className="text-[clamp(2.2rem,4vw,3.4rem)] uppercase text-ink">
              More to explore
            </h2>
            <Link to="/shop" className="inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-ink hover:text-walnut-2">
              All collections <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <CollectionCards collections={others} />
        </Container>
      </section>
    </>
  );
}
