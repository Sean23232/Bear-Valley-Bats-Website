/**
 * Single source of truth for Bear Valley Bats content.
 * Every fact here is taken from the existing bearvalleybats.com site (chart values, quotes,
 * process, contact details). Anything the site does not state is marked as a placeholder.
 */
import type { BatType } from "@/lib/cart";

export const IMG = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

export const BUSINESS = {
  name: "Bear Valley Bats",
  phone: "(909) 855-1606",
  phoneHref: "tel:+19098551606",
  primaryEmail: "bvbats@yahoo.com",
  secondaryEmail: "Bill@bearvalleybats.com",
  location: "Big Bear City, California",
  elevation: "7,000 feet in the San Bernardino Mountains",
  storeUrl: "http://store.bearvalleybats.com/",
  tagline: "Built by hand. Made for the game.",
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop Bats", to: "/shop" },
  { label: "Wood Options", to: "/wood" },
  { label: "Customization", to: "/customization" },
  { label: "Our Craftsmanship", to: "/craftsmanship" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const ROUTE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Bear Valley Bats | Built by Hand. Made for the Game.",
    description:
      "Premium, fully customized wood baseball, softball and slow pitch bats, handcrafted to order in Big Bear City, California.",
  },
  "/faq": {
    title: "Frequently Asked Questions | Bear Valley Bats",
    description: "Answers about ordering, wood options, customization, production, shipping and customer-supplied wood.",
  },
  "/shop": {
    title: "Shop Custom Bats | Bear Valley Bats",
    description: "Explore Canadian Yellow Birch, Northern White Ash, hickory, European Beech, Pecan Hickory and exotic trophy bats.",
  },
  "/wood": {
    title: "Wood Options & Specifications | Bear Valley Bats",
    description: "Compare hardness, specific gravity and impact strength for every wood we build with.",
  },
  "/customization": {
    title: "The Art of Customization | Bear Valley Bats",
    description: "Handles, knobs, length, weight, custom labels and heartwood barrel upgrades, designed around your game.",
  },
  "/craftsmanship": {
    title: "Our Craftsmanship | Not Mass Produced. Personally Crafted.",
    description: "How every Bear Valley Bat is selected, shaped, sealed and hardened by hand.",
  },
  "/about": {
    title: "About Bear Valley Bats | Family-Owned in Big Bear City, California",
    description: "A family-owned bat maker in the San Bernardino Mountains, hand making every bat to order.",
  },
  "/contact": {
    title: "Contact Bear Valley Bats | Custom Orders & Wood Inquiries",
    description: "Call (909) 855-1606 or email to start a custom order, discuss wood, or ask a question.",
  },
  "/design": {
    title: "Design Your Bat | Bear Valley Bats",
    description: "Build your custom bat specification step by step and send it to our bat-makers for review.",
  },
  "/cart": {
    title: "Order Request & Checkout | Bear Valley Bats",
    description: "Review your custom bat order requests and send them to Bear Valley Bats.",
  },
  "/policies": {
    title: "Shipping & Policies | Bear Valley Bats",
    description: "Free shipping within the continental US, custom order process, and policy details.",
  },
};

/* ------------------------------------------------------------------ */
/* Wood species                                                         */
/* ------------------------------------------------------------------ */

export type GameWood = {
  id: string;
  name: string;
  collection: string;
  janka: number;
  jankaLabel: string;
  specificGravity: number;
  impact: number;
  character: string;
  bestFor: string;
  /** "listed" = marked "Now Available" on bearvalleybats.com; "confirm" = confirm stock before ordering */
  availability: "listed" | "confirm";
};

/** Values from the Bear Valley Bats "Wood Species Comparison Chart". */
export const GAME_WOODS: GameWood[] = [
  {
    id: "pignut-hickory",
    name: "Pignut Hickory",
    collection: "hickory",
    janka: 1980,
    jankaLabel: "1980",
    specificGravity: 0.75,
    impact: 74,
    character: "The hardest true hickory on our chart and the heaviest by specific gravity. Dense and powerful.",
    bestFor: "Heavier game models for players who can handle the weight. Our guide notes it is heavy for most game bats.",
    availability: "confirm",
  },
  {
    id: "shellbark-hickory",
    name: "Shellbark Hickory",
    collection: "hickory",
    janka: 1800,
    jankaLabel: "1800",
    specificGravity: 0.69,
    impact: 88,
    character: "The highest impact bending strength on our chart, paired with 1800 hardness.",
    bestFor: "Players who want the maximum impact strength available in a true hickory build.",
    availability: "confirm",
  },
  {
    id: "shagbark-hickory",
    name: "Shagbark Hickory",
    collection: "hickory",
    janka: 1760,
    jankaLabel: "1760",
    specificGravity: 0.69,
    impact: 67,
    character: "A true hickory with 1760 hardness, 0.69 specific gravity and 67 impact strength.",
    bestFor: "Players who want the hickory feel with a balance of hardness and impact strength.",
    availability: "confirm",
  },
  {
    id: "pecan-hickory",
    name: "Pecan Hickory",
    collection: "pecan-hickory",
    janka: 1610,
    jankaLabel: "1610",
    specificGravity: 0.66,
    impact: 44,
    character: "A true hickory at 1610 hardness and 0.66 specific gravity, lighter in density than pignut or shagbark.",
    bestFor: "Players looking for a hickory option at a more moderate density.",
    availability: "listed",
  },
  {
    id: "canadian-yellow-birch",
    name: "Canadian Yellow Birch",
    collection: "canadian-yellow-birch",
    janka: 1260,
    jankaLabel: "1260",
    specificGravity: 0.62,
    impact: 55,
    character: "1260 hardness is our benchmark minimum, and it is the average for Canadian Yellow Birch.",
    bestFor: "Players who want a well-balanced, classic game-bat wood.",
    availability: "confirm",
  },
  {
    id: "flame-birch",
    name: "Canadian Yellow Flame Birch",
    collection: "canadian-yellow-birch",
    janka: 1260,
    jankaLabel: "1260+",
    specificGravity: 0.62,
    impact: 55,
    character: "The same chart profile as standard Canadian Yellow Birch, with a hardness reading of 1260+.",
    bestFor: "Players who prefer the flame birch look with the Canadian Yellow Birch profile.",
    availability: "confirm",
  },
  {
    id: "european-beech",
    name: "European Beech",
    collection: "european-beech",
    janka: 1440,
    jankaLabel: "1440",
    specificGravity: 0.7,
    impact: 45,
    character: "Hardness 1440 and 0.70 specific gravity, the second-densest wood on our chart after Pignut Hickory.",
    bestFor: "Players who want a dense, substantial feel in a non-hickory game bat.",
    availability: "listed",
  },
  {
    id: "northern-white-ash",
    name: "Northern White Ash",
    collection: "northern-white-ash",
    janka: 1320,
    jankaLabel: "1320",
    specificGravity: 0.6,
    impact: 43,
    character: "The lightest wood on our chart. Its 0.60 density and 43 impact strength set our minimum standards.",
    bestFor: "Lighter-feeling game bats. Our guide points here for lighter models. Straight grain is critical.",
    availability: "confirm",
  },
];

export type ExoticWood = {
  id: string;
  name: string;
  latin?: string;
  image: string;
  character: string;
  use: string;
  hardness?: string;
  weightNote?: string;
  example?: string;
};

export const EXOTIC_WOODS: ExoticWood[] = [
  {
    id: "pistachio",
    name: "Pistachio",
    image: "pistachio.jpg",
    character:
      "Dark brown heartwood contrasts with yellow sapwood, and hues of green and purple can appear. Grafted trees can produce sudden changes in color.",
    use: "Gift, award, trophy and display bats. Not a game bat.",
    hardness: "Janka 3230",
    weightNote: "Over twice the weight of White Ash, per our notes.",
    example: "The pictured bat is 33.25 in. long and weighs 64 oz.",
  },
  {
    id: "mountain-mahogany",
    name: "Mountain Mahogany",
    latin: "Cercocarpus ledifolius",
    image: "mahogany.jpg",
    character:
      "An evergreen shrub or tree of the Southwestern US mountains, growing on dry, windswept slopes. Clients have also supplied this species for custom bats.",
    use: "Trophy and display bats. Also one of the species we have built from customer-supplied wood.",
  },
  {
    id: "lignum-vitae",
    name: "Lignum Vitae",
    image: "lignum.jpg",
    character:
      "Our notes describe it as the hardest, densest and heaviest hardwood on Earth, at Janka 4,500.",
    use: "Not recommended for game use. A trophy for coaches and players, a strength-training bat, or an on-deck warm-up bat.",
    hardness: "Janka 4,500",
    example: "The pictured bat is 34.25 in. long and weighs 65 oz.",
  },
  {
    id: "jatoba",
    name: "Brazilian Cherry (Jatoba)",
    image: "jatoba.jpg",
    character: "A very hard, dense wood with deep reds and golden hues. 30% harder than true hickory and 45% harder than sugar maple.",
    use: "Generally too heavy for a game bat. An ideal mid-range heavy training bat (about +5 to +8 oz) and a one-of-a-kind trophy bat.",
  },
  {
    id: "cocobolo",
    name: "Cocobolo",
    image: "cocobolo.jpg",
    character: "A beautiful wood with red, brown and purple hues, often used as a substitute for Brazilian Rosewood.",
    use: "Unique gift and trophy bats. Our notes describe its prices as relatively stable compared with other exotics.",
  },
];

export const CUSTOM_WOOD_SPECIES = ["Red Mulberry", "White Oak", "Pearwood", "Mountain Mahogany"];

export const STANDARDS = [
  {
    label: "Impact bending strength",
    minimum: "43",
    note: "Our minimum, the strength of true Northern White Ash.",
  },
  {
    label: "Specific gravity (weight/density)",
    minimum: "0.60",
    note: "Our minimum, the average for Northern White Ash.",
  },
  {
    label: "Surface hardness (Janka)",
    minimum: "1260 lb",
    note: "Our minimum, the average surface hardness of Canadian Yellow Birch.",
  },
];

/* ------------------------------------------------------------------ */
/* Collections (shop products)                                          */
/* ------------------------------------------------------------------ */

export type Collection = {
  slug: string;
  title: string;
  kicker: string;
  blurb: string;
  description: string[];
  image: string;
  imageAlt: string;
  woodIds: string[];
  exotic?: boolean;
  availability: "listed" | "confirm";
  highlights: string[];
};

export const COLLECTIONS: Collection[] = [
  {
    slug: "canadian-yellow-birch",
    title: "Canadian Yellow Birch",
    kicker: "Our benchmark game bat",
    blurb: "Hardness of 1260, specific gravity 0.62 and impact strength 55. Flame Birch is also available.",
    description: [
      "Canadian Yellow Birch sets the hardness standard for our game bats. Its 1260 surface hardness is the average for the species and the minimum we accept.",
      "Cody Regis, a former UCLA second baseman and the 2014 European League MVP, used our hand-made Canadian Yellow Birch bats on his way to that award.",
    ],
    image: "birch-hero.jpg",
    imageAlt: "Canadian Yellow Birch bats on a dark studio background",
    woodIds: ["canadian-yellow-birch", "flame-birch"],
    availability: "confirm",
    highlights: [
      "Surface hardness 1260 (our minimum)",
      "Specific gravity 0.62, impact strength 55",
      "Fully customizable handle, knob and label",
      "Heartwood barrel upgrade available",
    ],
  },
  {
    slug: "northern-white-ash",
    title: "Northern White Ash",
    kicker: "Our impact-strength reference",
    blurb: "The lightest wood on our chart. Its 0.60 density and 43 impact strength set our minimum standards.",
    description: [
      "True Northern White Ash is the reference for two of our minimum standards: impact bending strength of 43 and specific gravity of 0.60.",
      "Straight grain matters most in ash. Our standard is grain that runs straight throughout the length of the bat, especially through the barrel.",
    ],
    image: "ash.jpg",
    imageAlt: "Northern White Ash bat with straight, visible grain",
    woodIds: ["northern-white-ash"],
    availability: "confirm",
    highlights: [
      "Specific gravity 0.60 (our minimum)",
      "Impact strength 43 (our minimum)",
      "Surface hardness 1320",
      "Straight grain required from knob to barrel",
    ],
  },
  {
    slug: "hickory",
    title: "True Hickory",
    kicker: "Heavier, harder, powerful",
    blurb: "Pignut, Shellbark and Shagbark: our hardest true hickories, built for players who want more weight and strength.",
    description: [
      "Our guide points to true hickories for heavier models. Pignut Hickory has the highest hardness (1980) and specific gravity (0.75) on our chart.",
      "Shellbark Hickory has the highest impact bending strength on our chart (88). Shagbark Hickory sits between them, with 1760 hardness and 67 impact strength.",
    ],
    image: "pignut.jpg",
    imageAlt: "Pignut Hickory game bat in a dark studio frame",
    woodIds: ["pignut-hickory", "shellbark-hickory", "shagbark-hickory"],
    availability: "confirm",
    highlights: [
      "Pignut: hardness 1980, specific gravity 0.75, impact 74",
      "Shellbark: hardness 1800, specific gravity 0.69, impact 88",
      "Shagbark: hardness 1760, specific gravity 0.69, impact 67",
      "Choose the weight you can comfortably swing",
    ],
  },
  {
    slug: "european-beech",
    title: "European Beech",
    kicker: "Dense, substantial, proven",
    blurb: "Hardness 1440, specific gravity 0.70 and impact strength 45. The wood behind a six-for-seven tryout.",
    description: [
      "European Beech is one of the denser woods on our chart, with a specific gravity of 0.70 and a hardness reading of 1440.",
      "Cody Regis used his fully custom-made, pro-grade European Beech bat for a 6-for-7 hitting display at his Arizona Diamondbacks tryout. He and one of our bat-makers designed the bat for that tryout.",
    ],
    image: "beech.jpg",
    imageAlt: "European Beech game bat in a wide studio frame",
    woodIds: ["european-beech"],
    availability: "listed",
    highlights: [
      "Surface hardness 1440",
      "Specific gravity 0.70 (second-densest on our chart)",
      "Impact strength 45",
      "Listed as available on our site",
    ],
  },
  {
    slug: "pecan-hickory",
    title: "Pecan Hickory",
    kicker: "A true hickory, at a moderate density",
    blurb: "Hardness 1610, specific gravity 0.66 and impact strength 44. Listed as available on our site.",
    description: [
      "Pecan Hickory is a true hickory with 1610 hardness and 0.66 specific gravity. It is lighter in density than Pignut or Shagbark Hickory.",
      "Pecan Hickory is one of the woods we have marked as now available on our site. Confirm current stock with our team before ordering.",
    ],
    image: "pecan.jpg",
    imageAlt: "Pecan Hickory bat shown in a wide studio frame",
    woodIds: ["pecan-hickory"],
    availability: "listed",
    highlights: [
      "Surface hardness 1610",
      "Specific gravity 0.66",
      "Impact strength 44",
      "Listed as available on our site",
    ],
  },
  {
    slug: "exotic-trophy-bats",
    title: "Exotic Wood Trophy Bats",
    kicker: "Heirloom wood, built for display",
    blurb: "Stunning exotic species for trophies, gifts, display bats and team warm-up bats. Not designed for game use.",
    description: [
      "Some exotic species make beautiful bats even though they are unsuitable for game play. Some are too heavy, too light or have poor impact properties. Others have striking color and grain.",
      "Exotic bats are fully custom and personalized to your request. Because exotic wood prices change quickly, please call or email for current pricing.",
    ],
    image: "pistachio.jpg",
    imageAlt: "Exotic wood bat with striking heartwood color",
    woodIds: [],
    exotic: true,
    availability: "confirm",
    highlights: [
      "Pistachio, Mountain Mahogany, Lignum Vitae, Brazilian Cherry (Jatoba), Cocobolo",
      "Trophy, gift, display and warm-up bats",
      "Fully customizable labels and personalization",
      "Call or email for current pricing",
    ],
  },
];

export const getCollection = (slug: string) => COLLECTIONS.find((c) => c.slug === slug);

export const getWood = (id: string) => GAME_WOODS.find((w) => w.id === id);

export const getExotic = (id: string) => EXOTIC_WOODS.find((w) => w.id === id);

/** Impact strength divided by specific gravity: the ratio our guide recommends for choosing wood. */
export const impactRatio = (wood: GameWood) => Math.round(wood.impact / wood.specificGravity);

/* ------------------------------------------------------------------ */
/* Trust, differentiators, process                                       */
/* ------------------------------------------------------------------ */

export const TRUST_ITEMS = [
  {
    key: "handmade",
    title: "Handmade & Made to Order",
    body: "Every bat is handmade to order. We never sell pre-made bats.",
  },
  {
    key: "wood",
    title: "Premium Wood Selection",
    body: "Hand-selected Grade #1 stock, held to our own minimums for strength and density.",
  },
  {
    key: "custom",
    title: "Custom Built to Your Specifications",
    body: "Your handle, knob, length, weight and label, reviewed with our bat-makers before cutting.",
  },
  {
    key: "shipping",
    title: "Free Continental US Shipping",
    body: "Free shipping on all orders within the Continental US.",
  },
];

export const CUSTOM_OPTIONS = [
  {
    n: "01",
    title: "Handles & knobs",
    body: "Handles and knobs are fully customizable. Striped handles, shown throughout our site, are one custom look.",
  },
  {
    n: "02",
    title: "Length & weight",
    body: "Choose the length and weight you can comfortably handle. We confirm both on your design diagram before cutting.",
  },
  {
    n: "03",
    title: "Custom labels",
    body: "Custom labeling is available on all of our bats. Describe your label and we will confirm the layout during design review.",
  },
  {
    n: "04",
    title: "Heartwood barrel upgrade",
    body: "Available now to all clients. It requires an experienced bat-maker and premium wood, and it is completed by hand.",
  },
  {
    n: "05",
    title: "Trophy & exotic builds",
    body: "Exotic trophy bats can be personalized almost any way you want, for gifts, awards and display.",
  },
];

export const WHY_ITEMS = [
  {
    title: "Handmade production",
    body: "Every bat is hand made to order. We never sell pre-made bats, and each one takes several hours of hand work.",
  },
  {
    title: "Premium wood selection",
    body: "We hand select Grade #1 stock and hold every species to our own minimums for impact strength, density and hardness.",
  },
  {
    title: "Individualized customization",
    body: "Your handle, knob, length, weight and label are designed around how you play, with design help at no charge.",
  },
  {
    title: "Hardened barrel construction",
    body: "Our penetrating sealer system becomes part of the wood and hardens the barrel surface. Heartwood barrel upgrades are available.",
  },
  {
    title: "USA manufacturing",
    body: "Family-owned and proudly made in the USA, in Big Bear City, California, at 7,000 feet in the San Bernardino Mountains.",
  },
];

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Choose your wood",
    body: "Review our wood options and choose the species that fits how you play. Not sure? Contact us and we will help you decide.",
  },
  {
    n: "02",
    title: "Place your order",
    body: "Choose the specifications for your basic design on our online store. Choices can still be changed at this stage.",
  },
  {
    n: "03",
    title: "Design your bat",
    body: "We send our Basic Design Form. A bat-maker returns a diagram for your review and changes. There is never a charge for design.",
  },
  {
    n: "04",
    title: "Hand made & shipped",
    body: "Once the design is final, an expert craftsman hand makes your bat to your specifications, then it ships professionally packaged.",
  },
];

/* ------------------------------------------------------------------ */
/* Proof                                                                */
/* ------------------------------------------------------------------ */

export const TESTIMONIALS = [
  {
    quote:
      "Absolutely love, love the bat! Will probably order another for spring. Ball jumps off the bat noticeably when squared up and sounds great. Even a few mis-hits had enough on them to fall. Hit a few in spots that would have broken lesser bats. A few guys on the team asked me about the bat as well. I definitely forwarded them to BVB. Customer for life.",
    attribution: "Customer review, September 2018",
  },
  {
    quote:
      "I was starting to think that wood bats were all the same and all had the same pop. But with your bats, I don't know if it was the hardening or what. It honestly seemed like they had more pop! I've used the 35oz in my game. I went 2 for 3 with a home run and a double. All 3 balls I hit very hard.",
    attribution: "Player review, bearvalleybats.com",
  },
  {
    quote:
      "Well let me tell you, your bats are now my favorite by far! I'll never buy another brand. The pop and sweet spot is similar to the best metal bats!",
    attribution: "Customer review, bearvalleybats.com",
  },
];

export const REGIS_STORY = {
  headline: "Signed with the Arizona Diamondbacks",
  paragraphs: [
    "Regis, a former UCLA Bruin second baseman and the 2014 MVP of the European League, went to Diamondbacks tryouts armed with his Bear Valley Bats.",
    "He ended his tryout with a 6-for-7 hitting display using his fully custom-made, pro-grade European Beech bat, made for him by Bear Valley Bats.",
    "Regis and one of our bat-makers designed his bats just for that tryout. He had earlier used our custom, hand-made Canadian Yellow Birch bats to hit his way to the 2014 European MVP Award.",
  ],
};

export const CRAFT_PILLARS = [
  {
    title: "Hand-selected wood",
    body: "We build only from hand-selected Grade #1 stock. Straight grain is one of our key selection factors.",
  },
  {
    title: "Hand-shaped to your design",
    body: "Each bat is made to the specifications of its owner, by an expert craftsman, after design review with you.",
  },
  {
    title: "Multi-step sealing",
    body: "We do not dip bats in a one-step polyurethane finish. We use a multi-part, multi-step hardwood sealer and finish.",
  },
];

/* ------------------------------------------------------------------ */
/* Ordering                                                             */
/* ------------------------------------------------------------------ */

export const BAT_TYPES: BatType[] = ["Baseball", "Softball", "Slow Pitch"];

export const FAQ_ITEMS: { q: string; a: string; category: string }[] = [
  {
    category: "Ordering",
    q: "Do you sell pre-made bats?",
    a: "No. Every Bear Valley Bat is handmade and made to order. We never sell pre-made bats, and we do not put a custom label on a pre-made bat and call it custom.",
  },
  {
    category: "Ordering",
    q: "How do I place an order?",
    a: "Follow our four-step process: choose your wood, place your order on our online store with the basic design specifications, complete our Basic Design Form, then approve the bat-maker's diagram. You can also start your request here with the Design Your Bat builder.",
  },
  {
    category: "Ordering",
    q: "Is there a charge for designing my bat?",
    a: "No. There is never any charge for designing your bat, no matter how long it takes.",
  },
  {
    category: "Ordering",
    q: "How long does production take?",
    a: "Each bat is hand made and takes several hours of hand work. [Production lead time: to be confirmed by Bear Valley Bats before you order.]",
  },
  {
    category: "Ordering",
    q: "How much does a bat cost?",
    a: "Pricing depends on wood and options, and our team confirms it for each order. Exotic wood prices change quickly, so call or email for current pricing. [Standard price list: to be confirmed.]",
  },
  {
    category: "Wood",
    q: "Which wood should I choose?",
    a: "Start with how you play. Our comparison chart shows hardness, specific gravity and impact strength. Our guide suggests choosing the wood with the highest impact-to-density ratio you can swing comfortably. If you are unsure, contact us and we will explain our recommendation based on your hitting style and the pitching you expect.",
  },
  {
    category: "Wood",
    q: "Are your exotic wood bats for games?",
    a: "Generally no. Our exotic bats are trophy, gift, display and warm-up bats. Lignum Vitae is not recommended for game use, and Brazilian Cherry is generally too heavy for a game bat.",
  },
  {
    category: "Wood",
    q: "What is a hardened barrel?",
    a: "Every Bear Valley Bat has a barrel hardened by our penetrating sealer system. The sealer becomes part of the wood and hardens the barrel surface.",
  },
  {
    category: "Customization",
    q: "What can I customize?",
    a: "Handles and knobs are fully customizable. You can also choose length and weight, add custom labeling to any bat, and order a heartwood barrel upgrade. Our bat-makers help with the design.",
  },
  {
    category: "Customization",
    q: "What lengths and weights are available?",
    a: "Choose the length and weight you can comfortably handle when you place your order. We confirm them on your design diagram. [Available length and weight ranges by model: to be confirmed.]",
  },
  {
    category: "Customization",
    q: "Can I order softball or slow pitch bats?",
    a: "Yes. Our bats are offered as baseball, softball and slow pitch bats. Tell us your game in your order and we will design to match.",
  },
  {
    category: "Customer wood",
    q: "Can I provide my own wood?",
    a: "Yes. We regularly make custom bats from wood our clients provide, including Red Mulberry, White Oak, Pearwood, Mountain Mahogany and other species. Providing wood is not required to buy a custom Bear Valley Bat. All wood must be reviewed for suitability. We will not make a bat from inferior wood unless it is for trophy or display purposes.",
  },
  {
    category: "Customer wood",
    q: "What if I am not sure about my wood or its quality?",
    a: "Email or call us before you commit. We will help you evaluate the wood and the tree species.",
  },
  {
    category: "Shipping",
    q: "Do you offer free shipping?",
    a: "Yes. Shipping is free on all orders within the Continental US. [Shipping outside the Continental US: to be confirmed.]",
  },
  {
    category: "Shipping",
    q: "How are bats packaged?",
    a: "Finished bats are professionally packaged and safely shipped to your home or office.",
  },
  {
    category: "Payment",
    q: "What payment methods do you accept?",
    a: "[Payment methods: to be confirmed by Bear Valley Bats.] The Design Your Bat request on this site does not collect payment. Our team confirms pricing and payment with you before any order is finalized.",
  },
];

export const POLICY_SECTIONS = [
  {
    id: "shipping",
    title: "Shipping",
    body: [
      "Shipping is free on all orders within the Continental US.",
      "Bats are professionally packaged and safely shipped to your home or office.",
      "[Shipping outside the Continental US, carrier and delivery timing: to be confirmed.]",
    ],
  },
  {
    id: "custom-orders",
    title: "Custom orders",
    body: [
      "Every Bear Valley Bat is made to order. We do not sell pre-made bats.",
      "Your design is reviewed with a diagram before the bat is cut. Changes can be made during design review.",
      "[Order cancellation and change deadlines after design approval: to be confirmed.]",
    ],
  },
  {
    id: "customer-wood",
    title: "Customer-supplied wood",
    body: [
      "Wood you provide is reviewed for suitability before we start. We will not make a bat from inferior wood unless it is for trophy or display purposes.",
      "Providing your own wood is optional. You can buy a custom Bear Valley Bat without it.",
    ],
  },
  {
    id: "returns",
    title: "Returns & warranty",
    body: ["[Return policy: to be confirmed by Bear Valley Bats.]", "[Warranty terms: to be confirmed by Bear Valley Bats.]"],
  },
  {
    id: "payment",
    title: "Payment",
    body: ["[Accepted payment methods: to be confirmed by Bear Valley Bats.]", "No payment is collected on the Design Your Bat or order request pages."],
  },
  {
    id: "privacy",
    title: "Privacy",
    body: ["[Privacy policy: to be confirmed by Bear Valley Bats before launch.]", "Information you send through our forms is used only to respond to your request."],
  },
];
