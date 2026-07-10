import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Services — ATS | Charter, Jet Cards & Government",
  description:
    "On-demand private jet charter, jet charter cards, and government charter operations — three ways to fly privately with ATS.",
};

export default function ServicesPage() {
  return (
    <main>
      <Nav />

      <section className="page-hero">
        <p className="section__eyebrow">Services</p>
        <h1 className="page-hero__title">
          Three ways to travel
          <br />
          <span>privately.</span>
        </h1>
        <p className="page-hero__lead">
          However you fly — a single trip, a season of them, or a government
          mission — it happens at the same standard: the highest safety level
          in the world.
        </p>
      </section>

      <section className="section">
        <div className="services services--stacked">
          <article className="service-card service-card--wide">
            <h2 className="service-card__name">On-Demand Charter</h2>
            <p className="service-card__body">
              Domestic and international flights on your schedule, not a
              timetable. ATS offers on-demand flights to an expansive list of
              global destinations — exclusive, private charters focused on
              safety and comfort, with specialized one-way pricing and
              available in-flight WiFi. For more than 15 years we have flown
              VIPs, celebrities, professional athletes, entertainers, and
              heads of state.
            </p>
          </article>
          <article className="service-card service-card--wide">
            <h2 className="service-card__name">Jet Charter Cards</h2>
            <p className="service-card__body">
              The consistency of a private program without the capital of
              ownership: guaranteed access to the fleet you trust at fixed
              hourly rates. One relationship, one standard, every flight —
              priority scheduling for the people who fly the most.
            </p>
          </article>
          <article className="service-card service-card--wide">
            <h2 className="service-card__name">Government Charters</h2>
            <p className="service-card__body">
              As an FAA Part 135 air carrier, ATS specializes in domestic and
              international charter for government agencies at the federal,
              state, and local levels. Highly-trained aviation professionals
              deliver remarkable attention to safety and security — more than
              five years of U.S. Government flights with a perfect track
              record.
            </p>
          </article>
        </div>
      </section>

      <section className="contact">
        <p className="section__eyebrow">Charter sales</p>
        <h2 className="contact__title">Which way do you fly?</h2>
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
