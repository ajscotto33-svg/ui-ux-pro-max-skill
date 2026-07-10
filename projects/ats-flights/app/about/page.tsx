import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "About — ATS | Aircraft Transport Service",
  description:
    "For more than 15 years ATS has flown VIPs, executives, and heads of state to over 160 countries — a premier Part 135 charter and management company with worldwide operational authority.",
};

const PILLARS = [
  {
    name: "Government heritage",
    body: "ATS spent years as the premier operator for the U.S. Government before bringing that same discipline to the VIP charter market — and still serves federal, state, and local agencies through its GSA contract.",
  },
  {
    name: "Worldwide authority",
    body: "One of the premier Part 135 Aircraft Charter and Management companies in the United States, with worldwide operational authority and missions flown to more than 160 countries.",
  },
  {
    name: "In-house maintenance",
    body: "ATS runs its own maintenance department, keeping every airframe to the standard our ARG/US Platinum and IS-BAO Stage 3 certifications demand — and letting us add conforming aircraft to the certificate in under 20 days.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <Nav />

      <section className="page-hero">
        <p className="section__eyebrow">About ATS</p>
        <h1 className="page-hero__title">
          Safety is the cornerstone
          <br />
          <span>of our operations.</span>
        </h1>
        <p className="page-hero__lead">
          For more than 15 years, Aircraft Transport Service has delivered
          reliable, safe VIP transportation — flying the most challenging
          missions to more than 160 countries around the world.
        </p>
      </section>

      <section className="stats" aria-label="ATS by the numbers">
        <div className="stats__grid">
          <div className="stat">
            <p className="stat__value">
              15<span className="stat__unit"> + years</span>
            </p>
            <p className="stat__label">Delivering VIP transportation</p>
          </div>
          <div className="stat">
            <p className="stat__value">
              160<span className="stat__unit"> + countries</span>
            </p>
            <p className="stat__label">Flown around the world</p>
          </div>
          <div className="stat">
            <p className="stat__value">
              20<span className="stat__unit"> days</span>
            </p>
            <p className="stat__label">To conform a new aircraft</p>
          </div>
          <div className="stat">
            <p className="stat__value">
              5<span className="stat__unit"> + years</span>
            </p>
            <p className="stat__label">U.S. Government flights, perfect record</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <p className="section__eyebrow">Who we are</p>
          <h2 className="section__title">
            Government-grade discipline, <span>VIP delivery.</span>
          </h2>
        </div>
        <div className="services">
          {PILLARS.map((p) => (
            <article key={p.name} className="service-card">
              <h3 className="service-card__name">{p.name}</h3>
              <p className="service-card__body">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section safety">
        <p className="safety__body">
          At ATS, safety is not a department — it is the operation. Unlike
          most Part 135 operators, we are certified to the highest safety
          standards available: a Platinum rating from ARG/US, recognition by
          Wyvern&rsquo;s safety team, IS-BAO Stage 3, and a completed FAA
          Part 5 Safety Management System. That is why VIPs, celebrities,
          professional athletes, entertainers, and heads of state fly ATS.
        </p>
        <p className="safety__clientele">
          VIPs · Celebrities · Professional Athletes · Entertainers · Heads of State
        </p>
      </section>

      <section className="contact">
        <p className="section__eyebrow">Fly with us</p>
        <h2 className="contact__title">Experience the ATS standard.</h2>
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
