import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import mascot from "@/assets/tearex-mascot.png";
import { MENU, SIGNATURES, PLACE, TOTAL_ITEMS, filterMenu, findCategoryOf } from "@/lib/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tea Rex Café — Good Food. Extinct Boring Vibes. | Habra" },
      { name: "description", content: "Tea Rex Café in Hijalpukuria, Habra: tea, coffee, burgers, ramen, kimbap and shakes. Full menu, location and directions." },
      { property: "og:title", content: "Tea Rex Café — Habra, West Bengal" },
      { property: "og:description", content: "Tea, coffee, burgers, ramen and more. See the full menu and find us in Hijalpukuria, Habra." },
    ],
  }),
  component: Index,
});

const NAV = [
  ["#house", "The House"],
  ["#favourites", "Favourites"],
  ["#menu", "Menu"],
  ["#vibe", "Vibe"],
  ["#visit", "Visit"],
  ["#reviews", "Reviews"],
] as const;

function Eyebrow({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-widest text-primary">
      <span>{n}</span>
      <span className="h-px w-8 bg-primary" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={`${label} — photo coming soon`}
      className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-ink/30 bg-secondary p-6 text-center"
    >
      <span className="font-mono text-[10px] tracking-widest text-muted-foreground">PHOTO PLACEHOLDER</span>
      <span className="font-display text-lg uppercase">{label}</span>
      <span className="text-sm text-muted-foreground">Real Tea Rex imagery goes here</span>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-ink/15 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-2 font-display text-2xl font-bold uppercase text-primary">
          <img src={mascot} alt="" className="h-9 w-9 rounded-full" width={36} height={36} />
          Tea Rex
        </a>
        <nav aria-label="Main" className="hidden gap-6 md:flex">
          {NAV.map(([h, l]) => (
            <a key={h} href={h} className="font-mono text-xs tracking-widest uppercase hover:text-primary">{l}</a>
          ))}
        </nav>
        <a href={PLACE.directionsUrl} target="_blank" rel="noopener noreferrer" className="hidden rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:opacity-90 md:inline-block">
          Get directions
        </a>
        <button
          className="rounded-md border border-ink/30 px-3 py-2 font-mono text-xs md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-ink/15 px-5 pb-4 md:hidden">
          {NAV.map(([h, l]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-ink/10 py-3 font-display text-xl uppercase">{l}</a>
          ))}
          <a href={PLACE.directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 block rounded-full bg-primary py-3 text-center font-bold text-primary-foreground">Get directions</a>
        </nav>
      )}
    </header>
  );
}

function Marquee() {
  const t = "YOUR NEW FAVOURITE HANGOUT HAS ARRIVED. ✦ GOOD FOOD. EXTINCT BORING VIBES. ✦ ";
  return (
    <div className="overflow-hidden bg-primary py-2 text-primary-foreground" aria-hidden>
      <div className="marquee flex w-max whitespace-nowrap font-mono text-xs tracking-widest">
        <span>{t.repeat(4)}</span><span>{t.repeat(4)}</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-24">
      <div>
        <Eyebrow n="01">EST. FOR YOUR NEXT GOOD TIME</Eyebrow>
        <h1 className="text-6xl leading-[0.9] font-bold sm:text-7xl lg:text-8xl">
          Good food. <span className="text-primary">Extinct</span> boring vibes.
        </h1>
        <p className="mt-6 max-w-md text-lg text-muted-foreground">
          Good food, good sips, good times — slow mornings, long chats and serious cravings, all under one roof.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#menu" className="rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground hover:opacity-90">Explore the menu</a>
          <a href="#visit" className="rounded-full border-2 border-ink px-6 py-3 font-bold hover:bg-ink hover:text-cream">Find our café ↓</a>
        </div>
      </div>
      <div className="relative">
        <img src={mascot} alt="Tea Rex dinosaur mascot riding a skateboard with a mug" width={1254} height={1254} className="w-full rotate-2 rounded-lg border-4 border-ink shadow-[8px_8px_0_var(--ink)]" />
      </div>
    </section>
  );
}

function House() {
  return (
    <section id="house" className="bg-ink py-20 text-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[1.4fr_1fr]">
        <div>
          <Eyebrow n="02">THE HOUSE</Eyebrow>
          <p className="font-mono text-xs tracking-widest opacity-70">A LITTLE WILD. A LOT DELICIOUS.</p>
          <h2 className="mt-3 text-5xl font-bold md:text-6xl">Come hungry. <em className="font-sans font-normal normal-case text-primary">Leave happier.</em></h2>
          <p className="mt-6 max-w-xl text-lg opacity-80">
            Comfort classics, bold flavours, proper cups of tea and drinks with a twist. Bring your people, grab a table and take your time.
          </p>
        </div>
        <figure className="mx-auto max-w-xs">
          <img src={mascot} alt="The original Tea Rex mascot" loading="lazy" className="rounded-full border-4 border-cream" />
          <figcaption className="mt-3 text-center font-mono text-xs tracking-widest">THE ORIGINAL TEA REX</figcaption>
        </figure>
      </div>
    </section>
  );
}

function Favourites({ onPick }: { onPick: (name: string) => void }) {
  return (
    <section id="favourites" className="mx-auto max-w-6xl px-5 py-20">
      <Eyebrow n="03">THE SHORTLIST</Eyebrow>
      <h2 className="text-5xl font-bold md:text-6xl">Signature <em className="font-sans font-normal normal-case text-primary">favourites.</em></h2>
      <p className="mt-3 text-muted-foreground">Six reasons to pull up a chair. Tap one to find it on the menu.</p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SIGNATURES.map((s, i) => (
          <li key={s.name}>
            <button
              onClick={() => onPick(s.name)}
              className="group flex w-full items-start justify-between rounded-lg border-2 border-ink bg-card p-6 text-left transition hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground"
            >
              <span>
                <span className="font-mono text-xs text-primary group-hover:text-primary-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-2 block font-display text-2xl uppercase">{s.name}</span>
                <span className="text-sm opacity-75">{s.note}</span>
              </span>
              <span className="font-mono font-bold">₹{s.price}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Menu({ active, setActive, highlight }: { active: string; setActive: (v: string) => void; highlight: string | null }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => filterMenu(active, q), [active, q]);
  return (
    <section id="menu" className="border-t border-ink/15 py-20">
      <div className="mx-auto max-w-5xl px-5">
        <Eyebrow n="04">THE BIG LIST</Eyebrow>
        <h2 className="text-5xl font-bold md:text-6xl">The complete <em className="font-sans font-normal normal-case text-primary">menu.</em></h2>
        <p className="mt-3 text-muted-foreground">Find your usual, discover a new favourite, or just follow the cravings.</p>

        <label className="mt-8 block">
          <span className="sr-only">Search the menu</span>
          <input
            type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the menu…"
            className="w-full rounded-full border-2 border-ink bg-card px-5 py-3 outline-none focus:border-primary"
          />
        </label>
        <div role="tablist" aria-label="Menu categories" className="sticky top-[61px] z-30 -mx-5 mt-4 flex gap-2 overflow-x-auto bg-background px-5 py-3">
          {[{ id: "all", title: `All ${TOTAL_ITEMS}` }, ...MENU].map((c) => (
            <button
              key={c.id} role="tab" aria-selected={active === c.id} onClick={() => setActive(c.id)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium ${active === c.id ? "border-primary bg-primary text-primary-foreground" : "border-ink/30 hover:border-ink"}`}
            >
              {c.title}
            </button>
          ))}
        </div>

        {results.length === 0 ? (
          <div className="mt-10 rounded-lg border-2 border-dashed border-ink/30 p-10 text-center">
            <p className="font-display text-2xl uppercase">Nothing matches “{q}”</p>
            <button onClick={() => { setQ(""); setActive("all"); }} className="mt-4 rounded-full bg-primary px-5 py-2 font-bold text-primary-foreground">Clear search</button>
          </div>
        ) : (
          results.map((cat) => {
            const idx = MENU.findIndex((m) => m.id === cat.id) + 1;
            return (
              <div key={cat.id} id={`cat-${cat.id}`} className="mt-12 scroll-mt-40">
                <div className="flex items-center gap-4 border-b border-ink pb-3">
                  <span className="font-mono text-xs text-primary">{String(idx).padStart(2, "0")}</span>
                  <h3 className="text-3xl font-bold md:text-4xl">{cat.title}</h3>
                  <span className="h-px flex-1 bg-border" aria-hidden />
                </div>
                <ul>
                  {cat.items.map((it) => (
                    <li key={it.name} className={`flex justify-between gap-4 border-b border-border py-4 transition-colors ${highlight === it.name ? "bg-primary/15 px-3" : ""}`}>
                      <span>{it.name}</span>
                      <span className="font-mono font-medium text-primary">₹{it.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

function Vibe() {
  return (
    <section id="vibe" className="bg-primary py-20 text-primary-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
        <div className="text-foreground"><PhotoPlaceholder label="Café interior" /></div>
        <div>
          <Eyebrow n="05"><span className="text-primary-foreground">THE VIBE</span></Eyebrow>
          <p className="font-mono text-xs tracking-widest opacity-80">A PLACE TO STAY AWHILE · MORE THAN A PIT STOP</p>
          <h2 className="mt-3 text-5xl font-bold md:text-6xl">Pull up a chair. <em className="font-sans font-normal normal-case">Make a day of it.</em></h2>
          <p className="mt-6 text-lg opacity-90">Coffee, conversation, a board game or a good book — come make an ordinary day a bit better.</p>
          <p className="mt-6 font-mono text-xs tracking-widest">✦ GOOD PEOPLE / GOOD PLATES / GOOD ENERGY</p>
        </div>
      </div>
    </section>
  );
}

function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border-2 border-ink bg-secondary md:aspect-auto md:min-h-[380px]">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center font-mono text-xs tracking-widest text-muted-foreground" aria-live="polite">
          LOADING MAP…
        </div>
      )}
      <iframe
        title="Map showing Tea Rex Café in Hijalpukuria, Habra"
        src={PLACE.embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
        className="absolute inset-0 h-full w-full"
      />
      <noscript><a href={PLACE.mapsUrl}>Open the map on Google Maps</a></noscript>
    </div>
  );
}

function Visit() {
  return (
    <section id="visit" className="mx-auto max-w-6xl px-5 py-20">
      <Eyebrow n="06">COME SAY HI</Eyebrow>
      <h2 className="text-5xl font-bold md:text-6xl">Find us <em className="font-sans font-normal normal-case text-primary">in the wild.</em></h2>
      <div className="mt-10 grid gap-6 md:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col justify-between rounded-lg border-2 border-ink bg-card p-6">
          <div>
            <p className="font-mono text-xs tracking-widest text-primary">YOUR NEXT GOOD STOP</p>
            <h3 className="mt-2 text-3xl font-bold">{PLACE.name}</h3>
            <address className="mt-3 not-italic text-muted-foreground">{PLACE.address}</address>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={PLACE.directionsUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-primary px-5 py-2.5 font-bold text-primary-foreground hover:opacity-90">Get directions</a>
            <a href={PLACE.mapsUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-ink px-5 py-2.5 font-bold hover:bg-ink hover:text-cream">View on Google Maps</a>
          </div>
        </div>
        <MapEmbed />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <PhotoPlaceholder label="Signature plates" />
        <PhotoPlaceholder label="Drinks bar" />
        <PhotoPlaceholder label="Storefront" />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Want to see real photos now? <a className="text-primary underline" href={PLACE.mapsUrl} target="_blank" rel="noopener noreferrer">Browse photos on Google Maps</a>.
      </p>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="bg-ink py-20 text-cream">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <Eyebrow n="07">REAL WORDS</Eyebrow>
        <h2 className="text-5xl font-bold md:text-6xl">Don't just take <em className="font-sans font-normal normal-case text-primary">our word for it.</em></h2>
        <div className="mx-auto mt-10 max-w-lg rounded-lg border-2 border-cream/30 p-8">
          <p className="text-6xl" aria-hidden>★</p>
          <p className="mt-4 text-lg">
            Our rating and reviews live on Google. We don't copy them here, so you always see the real, up-to-date picture.
          </p>
          <a href={PLACE.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground hover:opacity-90">
            Read reviews on Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink/15 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm md:flex-row">
        <p className="font-display text-xl uppercase text-primary">Tea Rex Café</p>
        <p className="text-muted-foreground">Hijalpukuria, Habra · West Bengal</p>
        <a href="#top" className="font-mono text-xs tracking-widest hover:text-primary">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}

function Index() {
  const [active, setActive] = useState("all");
  const [highlight, setHighlight] = useState<string | null>(null);
  const pick = (name: string) => {
    const id = findCategoryOf(name);
    if (!id) return;
    setActive(id);
    setHighlight(name);
    requestAnimationFrame(() => document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: "smooth" }));
    setTimeout(() => setHighlight(null), 2500);
  };
  return (
    <>
      <a href="#menu" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-primary focus:p-3 focus:text-primary-foreground">Skip to menu</a>
      <Marquee />
      <Header />
      <main>
        <Hero />
        <House />
        <Favourites onPick={pick} />
        <Menu active={active} setActive={setActive} highlight={highlight} />
        <Vibe />
        <Visit />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
