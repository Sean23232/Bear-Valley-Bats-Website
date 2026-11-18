import { ButtonLink, Container, Eyebrow, Reveal, WithPlaceholders } from "@/components/ui";
import { PageHero } from "@/components/sections";
import { POLICY_SECTIONS } from "@/data/site";

export default function Policies() {
  return (
    <>
      <PageHero
        eyebrow="Shipping & policies"
        title={
          <>
            Clear terms, <span className="text-gold-soft">before you order.</span>
          </>
        }
        body="Free shipping within the Continental US, our custom order process, and the policies that protect you. Items still being finalized are marked clearly."
      />

      <section className="bg-ivory">
        <Container className="py-24 lg:py-32">
          <div className="divide-y divide-charcoal/12 border-t border-charcoal/12">
            {POLICY_SECTIONS.map((section, i) => (
              <Reveal key={section.id} delay={i * 60}>
                <article className="grid gap-8 py-14 md:grid-cols-12 md:gap-12">
                  <div className="md:col-span-4">
                    <Eyebrow tone="walnut">{String(i + 1).padStart(2, "0")}</Eyebrow>
                    <h2 className="mt-3 text-[clamp(2rem,3.4vw,2.8rem)] uppercase leading-[1] text-ink">{section.title}</h2>
                  </div>
                  <div className="space-y-4 font-sans text-[17px] leading-[1.8] text-muted md:col-span-7 md:col-start-6">
                    {section.body.map((p) => (
                      <p key={p.slice(0, 50)}>
                        <WithPlaceholders text={p} />
                      </p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-8 rounded-none bg-cream p-10 md:flex-row md:items-center">
            <div>
              <h2 className="text-[2.2rem] uppercase text-ink">Questions about a policy?</h2>
              <p className="mt-3 max-w-xl font-sans text-[16px] leading-relaxed text-muted">
                Call or email before you order and we will walk you through the details for your specific bat.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <ButtonLink to="/contact" variant="ink">
                Contact Us
              </ButtonLink>
              <ButtonLink to="/faq" variant="outlineDark">
                Read the FAQ
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
