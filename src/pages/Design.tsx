import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Container, Eyebrow, Icon } from "@/components/ui";
import { BAT_TYPES, BUSINESS, EXOTIC_WOODS, GAME_WOODS, getCollection, getExotic, getWood } from "@/data/site";
import { useCart, type BatType } from "@/lib/cart";
import { Link, navigate, useRoute } from "@/lib/router";
import { cn } from "@/utils/cn";

type DesignState = {
  woodId: string;
  batType: BatType;
  striped: boolean;
  handle: string;
  knob: string;
  length: string;
  weight: string;
  label: string;
  heartwood: boolean;
  notes: string;
};

function woodFromQuery(search: string): string {
  const query = new URLSearchParams(search);
  const wood = query.get("wood");
  if (wood && (getWood(wood) || getExotic(wood))) return wood;
  const collection = query.get("collection");
  const match = collection ? getCollection(collection) : undefined;
  if (match) return match.exotic ? EXOTIC_WOODS[0].id : match.woodIds[0] ?? "";
  return "";
}

const inputClass =
  "mt-2 w-full rounded-none border border-charcoal/20 bg-ivory px-4 py-3.5 font-sans text-[16px] text-ink placeholder:text-muted/70 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

function Step({ n, title, hint, children }: { n: string; title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="border-t border-charcoal/15 pt-10">
      <div className="flex flex-wrap items-baseline gap-4">
        <span className="font-display text-[2.2rem] italic leading-none text-walnut-2">{n}</span>
        <h2 className="text-[clamp(1.9rem,3vw,2.5rem)] uppercase leading-none text-ink">{title}</h2>
      </div>
      {hint && <p className="mt-4 max-w-2xl font-sans text-[15px] leading-relaxed text-muted">{hint}</p>}
      <div className="mt-7">{children}</div>
    </section>
  );
}

function Field({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-walnut-2">{label}</span>
      {children}
    </label>
  );
}

function WoodOption({
  id,
  name,
  meta,
  checked,
  onSelect,
  required,
}: {
  id: string;
  name: string;
  meta: string;
  checked: boolean;
  onSelect: (id: string) => void;
  required?: boolean;
}) {
  return (
    <label className="relative block cursor-pointer">
      <input
        type="radio"
        name="wood"
        value={id}
        checked={checked}
        required={required}
        onChange={() => onSelect(id)}
        className="peer sr-only"
      />
      <span className="flex h-full flex-col gap-2 border border-charcoal/15 bg-cream p-5 transition-all duration-300 hover:border-charcoal/45 peer-checked:border-gold peer-checked:bg-ivory peer-checked:shadow-[inset_0_0_0_1px_var(--color-gold)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold">
        <span className="font-display text-[1.45rem] leading-tight text-ink">{name}</span>
        <span className="font-sans text-[13px] leading-relaxed text-muted">{meta}</span>
      </span>
    </label>
  );
}

export default function Design() {
  const { query, path } = useRoute();
  const { addItem } = useCart();
  const [form, setForm] = useState<DesignState>(() => ({
    woodId: woodFromQuery(query.toString()),
    batType: "Baseball",
    striped: false,
    handle: "",
    knob: "",
    length: "",
    weight: "",
    label: "",
    heartwood: false,
    notes: "",
  }));

  const queryKey = query.toString();
  useEffect(() => {
    const next = woodFromQuery(queryKey);
    if (next) setForm((f) => ({ ...f, woodId: next }));
  }, [queryKey, path]);

  const update = <K extends keyof DesignState>(key: K, value: DesignState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const game = getWood(form.woodId);
  const exotic = getExotic(form.woodId);
  const selectedName = game?.name ?? exotic?.name ?? "";

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedName) return;
    addItem({
      woodId: form.woodId,
      woodName: selectedName,
      isExotic: !!exotic,
      batType: form.batType,
      handle: form.handle.trim(),
      striped: form.striped,
      knob: form.knob.trim(),
      length: form.length.trim(),
      weight: form.weight.trim(),
      label: form.label.trim(),
      heartwood: form.heartwood,
      notes: form.notes.trim(),
    });
    navigate("/cart");
  };

  return (
    <>
      <section className="bg-charcoal text-ivory">
        <Container className="py-16 lg:py-24">
          <Eyebrow>Design your bat</Eyebrow>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.8rem,6vw,5.4rem)] uppercase leading-[0.96]">
            Design it step by step. <span className="text-gold-soft">We build it by hand.</span>
          </h1>
          <p className="mt-7 max-w-2xl font-sans text-[18px] leading-[1.75] text-mist">
            Choose the details that match your game. Your design is saved to your order request, then our bat-makers review it with you before anything is
            cut. There is never a charge for designing.
          </p>
        </Container>
      </section>

      <section className="bg-ivory">
        <Container className="py-16 lg:py-24">
          <form onSubmit={onSubmit} className="grid gap-14 lg:grid-cols-12 lg:gap-16" aria-label="Design your bat">
            <div className="space-y-14 lg:col-span-7">
              <Step n="01" title="Choose your wood" hint="Select the species you want. Game woods are compared on our chart. Exotic woods are trophy, gift and display bats.">
                <p className="font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-muted">Game woods</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {GAME_WOODS.map((w) => (
                    <WoodOption
                      key={w.id}
                      id={w.id}
                      name={w.name}
                      meta={`Hardness ${w.jankaLabel} · SG ${w.specificGravity.toFixed(2)} · Impact ${w.impact}`}
                      checked={form.woodId === w.id}
                      onSelect={(id) => update("woodId", id)}
                      required
                    />
                  ))}
                </div>
                <p className="mt-8 font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-muted">Exotic trophy woods</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {EXOTIC_WOODS.map((w) => (
                    <WoodOption
                      key={w.id}
                      id={w.id}
                      name={w.name}
                      meta="Trophy, gift or display · pricing by request"
                      checked={form.woodId === w.id}
                      onSelect={(id) => update("woodId", id)}
                      required
                    />
                  ))}
                </div>
              </Step>

              <Step n="02" title="Choose your game" hint="We build baseball, softball and slow pitch bats.">
                <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Bat type">
                  {BAT_TYPES.map((type) => (
                    <label key={type} className="cursor-pointer">
                      <input
                        type="radio"
                        name="batType"
                        value={type}
                        checked={form.batType === type}
                        onChange={() => update("batType", type)}
                        className="peer sr-only"
                      />
                      <span className="inline-flex h-12 items-center border border-charcoal/20 bg-cream px-6 font-sans text-[14px] font-semibold text-ink transition-all duration-300 hover:border-charcoal/50 peer-checked:border-charcoal peer-checked:bg-charcoal peer-checked:text-ivory peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </Step>

              <Step
                n="03"
                title="Handle & knob"
                hint="Handles and knobs are fully customizable. Describe the feel you want, and our bat-makers will confirm the details on your diagram."
              >
                <label className="flex cursor-pointer items-start gap-4 border border-charcoal/15 bg-cream p-5">
                  <input
                    type="checkbox"
                    checked={form.striped}
                    onChange={(e) => update("striped", e.target.checked)}
                    className="mt-1 h-5 w-5 accent-[#b8995a]"
                  />
                  <span>
                    <span className="block font-sans text-[15px] font-semibold text-ink">Striped handle</span>
                    <span className="mt-1 block font-sans text-[14px] text-muted">Striped handles are one of the custom looks shown on our site.</span>
                  </span>
                </label>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <Field label="Handle shape or feel">
                    <input
                      value={form.handle}
                      onChange={(e) => update("handle", e.target.value)}
                      placeholder="Describe the handle you want"
                      className={inputClass}
                      maxLength={300}
                    />
                  </Field>
                  <Field label="Knob design">
                    <input
                      value={form.knob}
                      onChange={(e) => update("knob", e.target.value)}
                      placeholder="Describe the knob you want"
                      className={inputClass}
                      maxLength={300}
                    />
                  </Field>
                </div>
              </Step>

              <Step
                n="04"
                title="Length & weight"
                hint="Choose the length and weight you can comfortably handle. We confirm the exact specifications for your model on your design diagram before cutting."
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Length (inches)">
                    <input
                      value={form.length}
                      onChange={(e) => update("length", e.target.value)}
                      inputMode="decimal"
                      placeholder="Your preferred length"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Weight (ounces)">
                    <input
                      value={form.weight}
                      onChange={(e) => update("weight", e.target.value)}
                      inputMode="decimal"
                      placeholder="Your preferred weight"
                      className={inputClass}
                    />
                  </Field>
                </div>
                <p className="mt-4 font-sans text-[13px] text-muted">
                  Available ranges by model: [to be confirmed by Bear Valley Bats]
                </p>
              </Step>

              <Step n="05" title="Label & barrel" hint="Custom labeling is available on all of our bats. Heartwood barrel upgrades are available now.">
                <div className="space-y-6">
                  <Field label="Custom label text">
                    <input
                      value={form.label}
                      onChange={(e) => update("label", e.target.value)}
                      placeholder="Name, number or text for the label"
                      className={inputClass}
                      maxLength={120}
                    />
                  </Field>
                  <label className="flex cursor-pointer items-start gap-4 border border-charcoal/15 bg-cream p-5">
                    <input
                      type="checkbox"
                      checked={form.heartwood}
                      onChange={(e) => update("heartwood", e.target.checked)}
                      className="mt-1 h-5 w-5 accent-[#b8995a]"
                    />
                    <span>
                      <span className="block font-sans text-[15px] font-semibold text-ink">Request a heartwood barrel upgrade</span>
                      <span className="mt-1 block font-sans text-[14px] text-muted">
                        Available to all clients. It is completed by hand by an experienced bat-maker.
                      </span>
                    </span>
                  </label>
                </div>
              </Step>

              <Step n="06" title="Notes for our bat-makers" hint="Tell us anything else: your position, your swing, the look you want, or questions about wood.">
                <textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  rows={5}
                  maxLength={1200}
                  placeholder="Anything else we should know about your design"
                  className={inputClass}
                />
              </Step>
            </div>

            <aside className="lg:col-span-5">
              <div className="sticky top-28 border border-charcoal/12 bg-cream p-7 sm:p-9">
                <Eyebrow tone="walnut">Your design</Eyebrow>
                <h2 className="mt-4 text-[2.2rem] uppercase leading-none text-ink">{selectedName || "Choose a wood"}</h2>

                <dl className="mt-7 divide-y divide-charcoal/12 border-y border-charcoal/12 font-sans text-[14px]">
                  <SummaryRow label="Game" value={form.batType} />
                  <SummaryRow label="Handle" value={[form.handle || "To discuss", form.striped ? "Striped" : ""].filter(Boolean).join(" · ")} />
                  <SummaryRow label="Knob" value={form.knob || "To discuss"} />
                  <SummaryRow label="Length / weight" value={[form.length, form.weight].filter(Boolean).join(" · ") || "To confirm in review"} />
                  <SummaryRow label="Label" value={form.label || "None"} />
                  <SummaryRow label="Heartwood barrel" value={form.heartwood ? "Requested" : "Not requested"} />
                </dl>

                <p className="mt-6 font-sans text-[14px] leading-relaxed text-muted">
                  {exotic
                    ? "Exotic trophy bats are priced on request. Call or email for current pricing."
                    : "Pricing and availability are confirmed by our team when we review your design."}
                </p>

                <button
                  type="submit"
                  disabled={!selectedName}
                  className="mt-8 inline-flex h-14 w-full items-center justify-center gap-3 bg-gold px-8 font-sans text-[13px] font-bold uppercase tracking-[0.16em] text-charcoal shadow-[0_14px_34px_-16px_rgba(184,153,90,0.75)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-gold-soft disabled:pointer-events-none disabled:opacity-40"
                >
                  Add to Order Request <Icon name="arrow" className="h-4 w-4" />
                </button>
                <p className="mt-4 text-center font-sans text-[12px] text-muted">
                  Nothing is paid here. Free shipping on all orders within the Continental US.
                </p>

                <div className="mt-8 space-y-3 border-t border-charcoal/12 pt-6 font-sans text-[14px]">
                  <p className="text-muted">
                    Own wood?{" "}
                    <Link to="/contact?topic=custom-wood" className="font-semibold text-ink underline-offset-4 hover:underline">
                      Inquire about your wood
                    </Link>
                    .
                  </p>
                  <p className="text-muted">
                    Prefer to talk it through?{" "}
                    <a href={BUSINESS.phoneHref} className="font-semibold text-ink underline-offset-4 hover:underline">
                      {BUSINESS.phone}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </aside>
          </form>
        </Container>
      </section>
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[9rem_1fr] gap-4 py-3.5">
      <dt className="text-muted">{label}</dt>
      <dd className="font-semibold text-ink">{value}</dd>
    </div>
  );
}


