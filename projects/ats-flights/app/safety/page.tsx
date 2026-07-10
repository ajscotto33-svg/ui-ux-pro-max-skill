import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Safety — ATS | Certified to the Highest Standards",
  description:
    "ATS holds ARG/US Platinum, Wyvern recognition, IS-BAO Stage 3, and FAA Part 5 SMS — one of the rare few Part 135 operators to clear every bar.",
};

const CERTS = [
  {
    name: "ARG/US Platinum",
    body: "The highest rating ARG/US grants a charter operator — an on-site audit of operations, maintenance, and safety culture that most Part 135 operators never attempt.",
  },
  {
    name: "Wyvern Recognized",
    body: "Recognized by Wyvern's safety team, whose standards are relied on by flight departments and brokers vetting operators worldwide.",
  },
  {
    name: "IS-BAO Stage 3",
    body: "The International Standard for Business Aircraft Operations at its final stage: a safety management system proven to be fully integrated into the operation.",
  },
  {
    name: "FAA Part 5 SMS",
    body: "A completed FAA Part 5 Safety Management System — the same regulatory framework the airlines run — voluntarily adopted years ahead of most of the charter industry.",
  },
];

export default function SafetyPage() {
  return (
    <main>
      <Nav />

      <section className="page-hero">
        <p className="section__eyebrow">Safety without compromise</p>
        <h1 className="page-hero__title">
          The rare few who clear
          <br />
          <span>every bar.</span>
        </h1>
        <p className="page-hero__lead">
          Unlike most Part 135 operators, ATS is certified to the highest
          safety standards available — every rating, from every authority that
          grants one.
        </p>
      </section>

      <section className="section">
        <div className="services">
          {CERTS.map((c) => (
            <article key={c.name} className="service-card">
              <h2 className="service-card__name">{c.name}</h2>
              <p className="service-card__body">{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section safety">
        <div className="section__head">
          <p className="section__eyebrow">Fifteen years, zero shortcuts</p>
          <h2 className="section__title">
            Trusted with the people <span>the world watches.</span>
          </h2>
        </div>
        <p className="safety__body">
          ATS spent years as the premier operator for the U.S. Government —
          and still flies for federal, state, and local agencies through its
          GSA contract, with more than five years of government operations at
          a perfect safety and security record. For over fifteen years that
          same discipline has carried VIPs, executives, professional
          athletes, entertainers, and heads of state to more than 160
          countries. Safety isn&rsquo;t a department at ATS; it is the
          operation.
        </p>
        <p className="safety__clientele">
          VIPs · Executives · Professional Athletes · Entertainers · Heads of State
        </p>
      </section>

      <section className="contact">
        <p className="section__eyebrow">Fly with the rare few</p>
        <h2 className="contact__title">Safety you can book.</h2>
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
