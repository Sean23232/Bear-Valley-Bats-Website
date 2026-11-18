import { useMemo, useState, type FormEvent } from "react";
import { ButtonLink, Container, Eyebrow, Icon, Reveal } from "@/components/ui";
import { PageHero } from "@/components/sections";
import { BUSINESS } from "@/data/site";
import { useCart, type OrderItem } from "@/lib/cart";
import { Link } from "@/lib/router";

type Customer = {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  notes: string;
};

const EMPTY_CUSTOMER: Customer = {
  name: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  country: "United States",
  notes: "",
};

const inputClass =
  "mt-2 w-full rounded-none border border-charcoal/20 bg-ivory px-4 py-3.5 font-sans text-[16px] text-ink placeholder:text-muted/70 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

function buildSummary(items: OrderItem[], c: Customer): string {
  const lines: string[] = [
    "BEAR VALLEY BATS: CUSTOM ORDER REQUEST",
    "",
    "CUSTOMER",
    `Name: ${c.name}`,
    `Email: ${c.email}`,
    `Phone: ${c.phone || "Not provided"}`,
    "",
    "SHIP TO",
    c.street,
    `${c.city}, ${c.state} ${c.zip}`,
    c.country,
    "",
    `BATS REQUESTED (${items.length})`,
  ];

  items.forEach((item, i) => {
    lines.push(`${i + 1}. ${item.woodName}${item.isExotic ? " (exotic trophy: pricing by request)" : ""}`);
    lines.push(`   Game: ${item.batType}`);
    lines.push(`   Handle: ${item.handle || "To discuss"}${item.striped ? " (striped)" : ""}`);
    lines.push(`   Knob: ${item.knob || "To discuss"}`);
    lines.push(`   Length: ${item.length || "To confirm"}   Weight: ${item.weight || "To confirm"}`);
    lines.push(`   Label: ${item.label || "None"}`);
    lines.push(`   Heartwood barrel upgrade: ${item.heartwood ? "Requested" : "Not requested"}`);
    if (item.notes) lines.push(`   Notes: ${item.notes}`);
    lines.push("");
  });

  if (c.notes) {
    lines.push("ORDER NOTES", c.notes, "");
  }
  lines.push("Please confirm pricing, availability and lead time with me before the order is finalized.");
  return lines.join("\n");
}

function Empty() {
  return (
    <section className="bg-ivory">
      <Container className="flex min-h-[50vh] flex-col items-start justify-center gap-8 py-24">
        <Eyebrow tone="walnut">Your order requests</Eyebrow>
        <h2 className="text-[clamp(2.4rem,5vw,4rem)] uppercase text-ink">No bats in your request yet.</h2>
        <p className="max-w-xl font-sans text-[17px] leading-relaxed text-muted">
          Design a bat step by step, or explore the collection first. Each design you add appears here for review.
        </p>
        <div className="flex flex-wrap gap-4">
          <ButtonLink to="/design" variant="ink" size="lg">
            Design Your Bat
          </ButtonLink>
          <ButtonLink to="/shop" variant="outlineDark" size="lg">
            Shop Bats
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

export default function Cart() {
  const { items, removeItem, clear } = useCart();
  const [customer, setCustomer] = useState<Customer>(EMPTY_CUSTOMER);
  const [agreed, setAgreed] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const [copied, setCopied] = useState(false);

  const summary = useMemo(() => buildSummary(items, customer), [items, customer]);
  const update = <K extends keyof Customer>(key: K, value: Customer[K]) => setCustomer((c) => ({ ...c, [key]: value }));

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (items.length === 0) return;
    const subject = `Custom bat order request (${items.length}) | ${customer.name}`;
    window.location.href = `mailto:${BUSINESS.primaryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`;
    setPrepared(true);
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Order requests & checkout"
        title={
          <>
            Your custom bats, <span className="text-gold-soft">ready for review.</span>
          </>
        }
        body="Review each design, add your shipping details, and send your request. Our team confirms pricing, availability and lead time with you before any order is finalized."
      />

      {items.length === 0 ? (
        <Empty />
      ) : (
        <section className="bg-ivory">
          <Container className="grid gap-14 py-16 lg:grid-cols-12 lg:gap-14 lg:py-24">
            <div className="space-y-12 lg:col-span-7">
              <div>
                <Eyebrow tone="walnut">Your bats ({items.length})</Eyebrow>
                <ul className="mt-6 space-y-5">
                  {items.map((item) => (
                    <Reveal key={item.id}>
                      <li className="border border-charcoal/12 bg-cream p-7 sm:p-8">
                        <div className="flex items-start justify-between gap-6">
                          <div>
                            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-walnut-2">
                              {item.batType}
                              {item.isExotic ? " · Exotic trophy" : ""}
                            </p>
                            <h3 className="mt-2 text-[2rem] leading-none text-ink">{item.woodName}</h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="shrink-0 font-sans text-[13px] font-semibold text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                        <dl className="mt-6 grid gap-x-8 gap-y-3 font-sans text-[14px] sm:grid-cols-2">
                          <Detail label="Handle" value={`${item.handle || "To discuss"}${item.striped ? " · striped" : ""}`} />
                          <Detail label="Knob" value={item.knob || "To discuss"} />
                          <Detail label="Length / weight" value={[item.length, item.weight].filter(Boolean).join(" · ") || "To confirm in review"} />
                          <Detail label="Label" value={item.label || "None"} />
                          <Detail label="Heartwood barrel" value={item.heartwood ? "Requested" : "Not requested"} />
                          {item.notes && <Detail label="Notes" value={item.notes} />}
                        </dl>
                        <p className="mt-6 border-t border-charcoal/12 pt-4 font-sans text-[13px] text-muted">
                          {item.isExotic
                            ? "Pricing: call or email for current pricing."
                            : "Pricing and availability: confirmed by Bear Valley Bats."}
                        </p>
                      </li>
                    </Reveal>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-6">
                  <Link to="/design" className="font-sans text-[14px] font-semibold text-ink underline-offset-4 hover:underline">
                    Add another bat
                  </Link>
                  <button
                    type="button"
                    onClick={clear}
                    className="font-sans text-[14px] font-semibold text-muted underline-offset-4 hover:text-ink hover:underline"
                  >
                    Clear all requests
                  </button>
                </div>
              </div>

              <form onSubmit={onSubmit} className="border-t border-charcoal/15 pt-12" aria-label="Checkout details">
                <Eyebrow tone="walnut">Your details</Eyebrow>
                <h2 className="mt-4 text-[clamp(2.2rem,4vw,3.2rem)] uppercase text-ink">Request checkout</h2>
                <p className="mt-4 max-w-2xl font-sans text-[15px] leading-relaxed text-muted">
                  This sends your order request to Bear Valley Bats. No payment is collected on this page.
                </p>

                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-walnut-2">Full name</span>
                    <input required value={customer.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" className={inputClass} />
                  </label>
                  <label className="block">
                    <span className="font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-walnut-2">Email</span>
                    <input required type="email" value={customer.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" className={inputClass} />
                  </label>
                  <label className="block">
                    <span className="font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-walnut-2">Phone</span>
                    <input type="tel" value={customer.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" className={inputClass} />
                  </label>
                  <label className="block">
                    <span className="font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-walnut-2">Country</span>
                    <input required value={customer.country} onChange={(e) => update("country", e.target.value)} autoComplete="country-name" className={inputClass} />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-walnut-2">Street address</span>
                    <input required value={customer.street} onChange={(e) => update("street", e.target.value)} autoComplete="street-address" className={inputClass} />
                  </label>
                  <label className="block">
                    <span className="font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-walnut-2">City</span>
                    <input required value={customer.city} onChange={(e) => update("city", e.target.value)} autoComplete="address-level2" className={inputClass} />
                  </label>
                  <div className="grid grid-cols-2 gap-6">
                    <label className="block">
                      <span className="font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-walnut-2">State</span>
                      <input required value={customer.state} onChange={(e) => update("state", e.target.value)} autoComplete="address-level1" className={inputClass} />
                    </label>
                    <label className="block">
                      <span className="font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-walnut-2">ZIP</span>
                      <input required value={customer.zip} onChange={(e) => update("zip", e.target.value)} autoComplete="postal-code" className={inputClass} />
                    </label>
                  </div>
                  <label className="block sm:col-span-2">
                    <span className="font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-walnut-2">Order notes (optional)</span>
                    <textarea rows={4} value={customer.notes} onChange={(e) => update("notes", e.target.value)} className={inputClass} />
                  </label>
                </div>

                <label className="mt-8 flex cursor-pointer items-start gap-4 border border-charcoal/15 bg-cream p-5">
                  <input type="checkbox" required checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 h-5 w-5 accent-[#b8995a]" />
                  <span className="font-sans text-[14px] leading-relaxed text-ink">
                    I understand this is an order request. Bear Valley Bats will confirm pricing, availability and lead time with me before my order is finalized.
                  </span>
                </label>

                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={!agreed || items.length === 0}
                    className="inline-flex h-14 items-center justify-center gap-3 bg-charcoal px-9 font-sans text-[13px] font-bold uppercase tracking-[0.16em] text-ivory transition-all duration-500 hover:-translate-y-0.5 hover:bg-walnut disabled:pointer-events-none disabled:opacity-40"
                  >
                    Send Order Request <Icon name="arrow" className="h-4 w-4" />
                  </button>
                  <p className="font-sans text-[13px] text-muted" role="status" aria-live="polite">
                    Your email app opens with the full request ready to send.
                  </p>
                </div>

                {prepared && (
                  <div className="mt-10 border border-gold/50 bg-gold/10 p-7">
                    <p className="font-display text-[1.8rem] text-ink">Your request is ready to send.</p>
                    <p className="mt-3 font-sans text-[15px] leading-relaxed text-muted">
                      If your email app did not open, copy the summary and send it to {BUSINESS.primaryEmail}, or call {BUSINESS.phone}.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4">
                      <button type="button" onClick={copySummary} className="inline-flex h-11 items-center border border-charcoal px-5 font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-charcoal hover:text-ivory">
                        {copied ? "Copied" : "Copy summary"}
                      </button>
                      <button type="button" onClick={clear} className="inline-flex h-11 items-center px-2 font-sans text-[13px] font-semibold text-muted underline-offset-4 hover:text-ink hover:underline">
                        Clear order requests once sent
                      </button>
                    </div>
                  </div>
                )}

                <details className="mt-10 border border-charcoal/12 bg-cream p-6">
                  <summary className="cursor-pointer font-sans text-[14px] font-semibold text-ink">Preview your order request</summary>
                  <pre className="mt-6 max-h-96 overflow-auto whitespace-pre-wrap font-sans text-[13px] leading-relaxed text-muted">{summary}</pre>
                </details>
              </form>
            </div>

            <aside className="lg:col-span-5">
              <div className="sticky top-28 space-y-8">
                <div className="border border-charcoal/12 bg-cream p-8">
                  <Eyebrow tone="walnut">Summary</Eyebrow>
                  <dl className="mt-6 divide-y divide-charcoal/12 font-sans text-[14px]">
                    <div className="flex justify-between gap-6 py-3.5">
                      <dt className="text-muted">Bats in request</dt>
                      <dd className="font-semibold text-ink">{items.length}</dd>
                    </div>
                    <div className="flex justify-between gap-6 py-3.5">
                      <dt className="text-muted">Shipping</dt>
                      <dd className="text-right font-semibold text-ink">Free within the Continental US</dd>
                    </div>
                    <div className="flex justify-between gap-6 py-3.5">
                      <dt className="text-muted">Pricing</dt>
                      <dd className="text-right font-semibold text-ink">Confirmed by our team</dd>
                    </div>
                    <div className="flex justify-between gap-6 py-3.5">
                      <dt className="text-muted">Payment</dt>
                      <dd className="text-right font-semibold text-ink">[Payment methods: to be confirmed]</dd>
                    </div>
                  </dl>
                  <p className="mt-6 font-sans text-[13px] leading-relaxed text-muted">
                    Exotic trophy bats are priced on request. Call or email for current pricing.
                  </p>
                </div>

                <div className="border border-charcoal/12 bg-charcoal p-8 text-ivory">
                  <Eyebrow>What happens next</Eyebrow>
                  <ol className="mt-6 space-y-5">
                    {[
                      "We review your request and contact you to confirm details.",
                      "You receive our Basic Design Form and a bat-maker's diagram for review.",
                      "Once you approve the design, an expert craftsman hand makes your bat.",
                      "Your bat is professionally packaged and shipped.",
                    ].map((text, i) => (
                      <li key={text} className="grid grid-cols-[2.5rem_1fr] gap-3 font-sans text-[15px] leading-relaxed text-mist">
                        <span className="font-display text-[1.5rem] italic leading-none text-gold-soft">0{i + 1}</span>
                        {text}
                      </li>
                    ))}
                  </ol>
                </div>

                <p className="font-sans text-[14px] text-muted">
                  Prefer to order through our online store?{" "}
                  <a href={BUSINESS.storeUrl} className="font-semibold text-ink underline-offset-4 hover:underline">
                    Visit the store
                  </a>
                  .
                </p>
              </div>
            </aside>
          </Container>
        </section>
      )}
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-muted">{label}</dt>
      <dd className="mt-1 text-ink">{value}</dd>
    </div>
  );
}
