import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Services — ATS | Charter, Jet Cards, Government & Management",
  description:
    "On-demand private jet charter, jet charter cards, government charter operations, and aircraft management — four ways to fly privately with ATS.",
};

export default function ServicesPage() {
  return (
    <main>
      <Nav />

      <section className="page-hero">
        <p className="section__eyebrow">Services</p>
        <h1 className="page-hero__title">
          Four ways to travel
          <br />
          <span>privately.</span>
        </h1>
        <p className="page-hero__lead">
          However you fly — a single trip, a season of them, a government
          mission, or your own aircraft — it happens at the same standard: the
          highest safety level in the world.
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
              safety and comfort, with specialized one-way pricing that
              strives to be competitive, and available in-flight WiFi. With
              trip support, highly personalized flights, and unwavering safety
              at the forefront, a dedicated team of professionals connects you
              with international and regional destinations while ensuring your
              on-time arrival in absolute comfort.
            </p>
          </article>
          <article className="service-card service-card--wide">
            <h2 className="service-card__name">Jet Charter Cards</h2>
            <p className="service-card__body">
              A charter card with Aircraft Transport Service saves you time
              and money, with a range of options built for the most demanding
              traveler — and a program tailored to fit your schedule. One
              relationship, one standard, every flight: guaranteed access to
              the fleet you trust, with priority for the people who fly the
              most. Speak with our dedicated sales staff to shape the program
              around your year.
            </p>
          </article>
          <article className="service-card service-card--wide">
            <h2 className="service-card__name">Government Charters</h2>
            <p className="service-card__body">
              As an FAA Part 135 air carrier, ATS specializes in domestic and
              international charter for government agencies at the federal,
              state, and local levels — with reliable, safe operations
              delivered through its GSA contract. Highly trained aviation
              professionals bring remarkable attention to safety and security:
              more than five years of U.S. Government flights with a perfect
              track record, after years as the government&rsquo;s premier
              operator.
            </p>
          </article>
          <article className="service-card service-card--wide">
            <h2 className="service-card__name">Aircraft Management</h2>
            <p className="service-card__body">
              As one of the premier Part 135 Aircraft Charter and Management
              companies in the United States, ATS offers management programs
              with a full range of operational and concierge services —
              scheduling, dispatch, flight-trip monitoring, ground
              transportation, and lodging reservations. Offset ownership costs
              by letting ATS charter your aircraft when you&rsquo;re not using
              it: your access always comes first, and outside those times it
              flies only with our exceptionally qualified crews and VIP
              clientele on board — all supported by our in-house maintenance
              department.
            </p>
          </article>
        </div>
        <p className="safety__clientele">
          United States · Canada · Central &amp; South America · Europe · Middle East · Asia · Africa
        </p>
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
