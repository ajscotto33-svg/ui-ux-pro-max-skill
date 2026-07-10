import Link from "next/link";
import ScrollHero from "./components/ScrollHero";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

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

const EXPLORE = [
  {
    href: "/fleet/",
    name: "The Fleet",
    body: "Long-range Gulfstream aircraft engineered for the whole world — 14 seats, 5 berths, 6,200 nautical miles non-stop.",
    cta: "Explore the fleet",
  },
  {
    href: "/services/",
    name: "Services",
    body: "On-demand charter, jet charter cards, and government operations — three ways to fly privately, all at the same standard.",
    cta: "See all services",
  },
  {
    href: "/safety/",
    name: "Safety",
    body: "One of the rare few operators to clear every bar: ARG/US Platinum, Wyvern, IS-BAO Stage 3, and FAA Part 5 SMS.",
    cta: "Our safety record",
  },
];

export default function Home() {
  return (
    <main>
      <Nav />

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

      {/* Explore the site */}
      <section className="section">
        <div className="section__head">
          <p className="section__eyebrow">Aircraft Transport Service</p>
          <h2 className="section__title">
            Private aviation, <span>properly done.</span>
          </h2>
        </div>
        <div className="services">
          {EXPLORE.map((e) => (
            <Link key={e.name} href={e.href} className="service-card service-card--link">
              <h3 className="service-card__name">{e.name}</h3>
              <p className="service-card__body">{e.body}</p>
              <span className="service-card__cta">{e.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="contact">
        <p className="section__eyebrow">Charter sales</p>
        <h2 className="contact__title">Tell us where you need to be.</h2>
        <div className="contact__actions">
          <a className="contact__primary" href="tel:+16029226769">
            +1 602 922 6769
          </a>
          <Link className="contact__secondary" href="/contact/">
            Contact us
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
