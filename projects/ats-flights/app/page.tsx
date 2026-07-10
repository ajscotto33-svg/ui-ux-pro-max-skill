import ScrollHero from "./components/ScrollHero";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const CERTIFICATIONS = [
  "ARG/US Platinum",
  "Wyvern Recognized",
  "IS-BAO Stage 3",
  "FAA Part 5 SMS",
];

const STATS = [
  { value: "15+", unit: "years", label: "Trusted in private aviation" },
  { value: "6,200", unit: "nm", label: "Ultra-long Gulfstream range" },
  { value: "5+", unit: "years", label: "U.S. Government flights, perfect record" },
  { value: "24 / 7", unit: "", label: "On-demand, worldwide" },
];

const SERVICES = [
  {
    name: "On-Demand Charter",
    body: "Domestic and international charter on your schedule. Long-range Gulfstream aircraft, specialized one-way pricing, and in-flight WiFi — booked around you, not a timetable.",
  },
  {
    name: "Jet Charter Cards",
    body: "Guaranteed access and fixed hourly rates without the capital of ownership. Fly the fleet you trust, with the consistency and priority of a private program.",
  },
  {
    name: "Government Charters",
    body: "An FAA Part 135 air carrier serving federal, state, and local agencies — over five years of government operations with a perfect safety and security track record.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="nav">
        <a className="nav__brand" href="#top" aria-label="ATS — Aircraft Transport Service">
          <span className="nav__logo">ATS</span>
          <span className="nav__brand-sub">Aircraft Transport Service</span>
        </a>
        <nav className="nav__links">
          <a href="#fleet">Fleet</a>
          <a href="#services">Services</a>
          <a href="#safety">Safety</a>
          <a className="nav__cta" href="tel:+16029226769">
            +1 602 922 6769
          </a>
        </nav>
      </header>

      <span id="top" />
      <ScrollHero src={`${basePath}/hero.mp4`} scrollLengthVh={4} />

      {/* Certification / trust bar */}
      <section className="trust" aria-label="Safety certifications">
        <p className="trust__lead">
          Certified to the highest safety standards in the world.
        </p>
        <ul className="trust__badges">
          {CERTIFICATIONS.map((c) => (
            <li key={c} className="trust__badge">
              {c}
            </li>
          ))}
        </ul>
      </section>

      {/* Stats */}
      <section className="stats" aria-label="ATS at a glance">
        <div className="stats__grid">
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <p className="stat__value">
                {s.value}
                {s.unit && <span className="stat__unit"> {s.unit}</span>}
              </p>
              <p className="stat__label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="section" id="services">
        <div className="section__head">
          <p className="section__eyebrow">What we fly for you</p>
          <h2 className="section__title">
            Three ways to travel <span>privately.</span>
          </h2>
        </div>
        <div className="services">
          {SERVICES.map((s) => (
            <article key={s.name} className="service-card">
              <h3 className="service-card__name">{s.name}</h3>
              <p className="service-card__body">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Fleet — Gulfstream V feature */}
      <section className="fleet" id="fleet">
        <div className="fleet__intro">
          <p className="section__eyebrow">The fleet</p>
          <h2 className="section__title">
            The Gulfstream&nbsp;V.
            <br />
            <span>Built for the whole world.</span>
          </h2>
          <p className="fleet__lead">
            For flights over ten hours, the ultra-long-range Gulfstream V has
            been the only choice for travelers crossing the globe — cabin, crew,
            and range engineered for the distance.
          </p>
        </div>
        <div className="fleet__spec-grid">
          <div className="fleet__spec">
            <p className="fleet__spec-value">14</p>
            <p className="fleet__spec-label">Passenger seats</p>
          </div>
          <div className="fleet__spec">
            <p className="fleet__spec-value">5</p>
            <p className="fleet__spec-label">Berths for sleeping</p>
          </div>
          <div className="fleet__spec">
            <p className="fleet__spec-value">6,200<span> nm</span></p>
            <p className="fleet__spec-label">Non-stop range</p>
          </div>
          <div className="fleet__spec">
            <p className="fleet__spec-value">10<span> hr+</span></p>
            <p className="fleet__spec-label">With dedicated crew rest</p>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="section safety" id="safety">
        <div className="section__head">
          <p className="section__eyebrow">Safety without compromise</p>
          <h2 className="section__title">
            The rare few who clear <span>every bar.</span>
          </h2>
        </div>
        <p className="safety__body">
          Unlike most Part&nbsp;135 operators, ATS carries the top safety
          rating from every authority that grants one — a Platinum rating from
          ARG/US, recognition by Wyvern, IS-BAO Stage&nbsp;3 registration, and a
          completed FAA Part&nbsp;5 Safety Management System. For more than
          fifteen years that discipline has carried VIPs, executives, athletes,
          entertainers, and heads of state without incident.
        </p>
        <p className="safety__clientele">
          VIPs · Executives · Professional Athletes · Entertainers · Heads of State
        </p>
      </section>

      {/* Contact CTA */}
      <section className="contact" id="contact">
        <p className="section__eyebrow">Charter sales</p>
        <h2 className="contact__title">Tell us where you need to be.</h2>
        <div className="contact__actions">
          <a className="contact__primary" href="tel:+16029226769">
            +1 602 922 6769
          </a>
          <a className="contact__secondary" href="mailto:charter@atsflights.com">
            charter@atsflights.com
          </a>
        </div>
        <p className="contact__address">
          Aircraft Transport Service · 5615 S. Sossaman Rd, Mesa, Arizona 85212
        </p>
      </section>

      <footer className="footer">
        <span className="footer__logo">ATS</span>
        <span>Aircraft Transport Service</span>
        <span>Site by Andrew Scotto</span>
      </footer>
    </main>
  );
}
