import { useEffect, useState, type FormEvent } from "react";
import { Container, Eyebrow, Icon, Reveal, WithPlaceholders } from "@/components/ui";
import { PageHero } from "@/components/sections";
import { BUSINESS } from "@/data/site";
import { useRoute } from "@/lib/router";
import { BAT_TYPES } from "@/data/site";

const TOPICS = [
  { value: "general", label: "General question" },
  { value: "custom-order", label: "Start a custom order" },
  { value: "custom-wood", label: "Custom wood project (bring your own wood)" },
  { value: "exotic", label: "Exotic trophy bat pricing" },
  { value: "heartwood", label: "Heartwood barrel upgrade" },
  { value: "wood-help", label: "Help choosing a wood" },
];

const inputClass =
  "mt-2 w-full rounded-none border border-charcoal/20 bg-ivory px-4 py-3.5 font-sans text-[16px] text-ink placeholder:text-muted/70 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

const labelClass = "block font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-walnut-2";

export default function Contact() {
  const { query } = useRoute();
  const topicFromUrl = TOPICS.find((t) => t.value === query.get("topic"))?.value ?? "general";

  const [topic, setTopic] = useState(topicFromUrl);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [batType, setBatType] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setTopic(topicFromUrl);
    setSent(false);
  }, [topicFromUrl]);

  const topicLabel = TOPICS.find((t) => t.value === topic)?.label ?? "General question";

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = `${topicLabel} | ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Topic: ${topicLabel}`,
      `Bat type: ${batType || "Not specified"}`,
      "",
      message,
    ].join("\n");
    window.location.href = `mailto:${BUSINESS.primaryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact Bear Valley Bats"
        title={
          <>
            Talk with the <span className="text-gold-soft">bat-makers.</span>
          </>
        }
        body="Start a custom order, ask about wood, or bring your own wood to the bench. Call, email or send a message below."
      />

      <section className="bg-ivory">
        <Container className="grid gap-16 py-24 lg:grid-cols-12 lg:gap-12 lg:py-32">
          <Reveal className="lg:col-span-4">
            <Eyebrow tone="walnut">Direct contact</Eyebrow>
            <ul className="mt-8 space-y-8">
              <li className="flex gap-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/60 text-walnut-2">
                  <Icon name="phone" className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-muted">Phone</p>
                  <a href={BUSINESS.phoneHref} className="mt-1.5 block font-display text-[2rem] leading-none text-ink hover:text-walnut-2">
                    {BUSINESS.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/60 text-walnut-2">
                  <Icon name="mail" className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-muted">Email</p>
                  <a href={`mailto:${BUSINESS.primaryEmail}`} className="mt-1.5 block font-sans text-[16px] font-semibold text-ink hover:text-walnut-2">
                    {BUSINESS.primaryEmail}
                  </a>
                  <a href={`mailto:${BUSINESS.secondaryEmail}`} className="mt-1 block font-sans text-[16px] text-ink hover:text-walnut-2">
                    {BUSINESS.secondaryEmail}
                  </a>
                </div>
              </li>
              <li className="flex gap-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/60 text-walnut-2">
                  <Icon name="pin" className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-muted">Studio</p>
                  <p className="mt-1.5 font-sans text-[16px] text-ink">{BUSINESS.location}</p>
                </div>
              </li>
              <li className="flex gap-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/60 text-walnut-2">
                  <Icon name="truck" className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-muted">Shipping</p>
                  <p className="mt-1.5 font-sans text-[16px] text-ink">Free shipping on all orders within the Continental US.</p>
                </div>
              </li>
            </ul>
            <p className="mt-10 border-t border-charcoal/12 pt-8 font-sans text-[15px] text-muted">
              <WithPlaceholders text="Business hours: [to be confirmed]" />
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
            <div className="border border-charcoal/12 bg-cream p-7 sm:p-12">
              <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] uppercase text-ink">Send us a message</h2>
              <p className="mt-4 font-sans text-[15px] leading-relaxed text-muted">
                Your message opens in your email app, ready to send to our team. Nothing is stored on this website.
              </p>

              <form onSubmit={onSubmit} className="mt-10 grid gap-6 sm:grid-cols-2" aria-label="Contact form">
                <label className="sm:col-span-1">
                  <span className={labelClass}>Your name</span>
                  <input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={inputClass} placeholder="First and last name" />
                </label>
                <label className="sm:col-span-1">
                  <span className={labelClass}>Email address</span>
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className={inputClass} placeholder="you@example.com" />
                </label>
                <label className="sm:col-span-1">
                  <span className={labelClass}>Phone (optional)</span>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" className={inputClass} placeholder="(000) 000-0000" />
                </label>
                <label className="sm:col-span-1">
                  <span className={labelClass}>Bat type</span>
                  <select value={batType} onChange={(e) => setBatType(e.target.value)} className={inputClass}>
                    <option value="">Select a game</option>
                    {BAT_TYPES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="sm:col-span-2">
                  <span className={labelClass}>Topic</span>
                  <select value={topic} onChange={(e) => setTopic(e.target.value)} className={inputClass}>
                    {TOPICS.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="sm:col-span-2">
                  <span className={labelClass}>Message</span>
                  <textarea
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={inputClass}
                    placeholder={
                      topic === "custom-wood"
                        ? "Tell us the species, the tree and any details you know about the wood."
                        : "Tell us about the bat you have in mind, or the question you have."
                    }
                  />
                </label>

                <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="inline-flex h-14 items-center justify-center gap-3 bg-charcoal px-9 font-sans text-[13px] font-bold uppercase tracking-[0.16em] text-ivory transition-all duration-500 hover:-translate-y-0.5 hover:bg-walnut"
                  >
                    Send Message <Icon name="arrow" className="h-4 w-4" />
                  </button>
                  <p className="font-sans text-[13px] leading-relaxed text-muted" role="status" aria-live="polite">
                    {sent
                      ? `Your email app should open with your message. If it does not, email ${BUSINESS.primaryEmail} or call ${BUSINESS.phone}.`
                      : "We respond to every inquiry by phone or email."}
                  </p>
                </div>
              </form>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
