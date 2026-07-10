import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Contact — ATS | Charter Sales",
  description:
    "Reach ATS charter sales at +1-602-922-6769 or charter@atsflights.com. Offices at 5615 S. Sossaman Rd, Mesa, Arizona 85212.",
};

export default function ContactPage() {
  return (
    <main>
      <Nav />

      <section className="page-hero">
        <p className="section__eyebrow">Charter sales</p>
        <h1 className="page-hero__title">
          Tell us where you
          <br />
          <span>need to be.</span>
        </h1>
        <p className="page-hero__lead">
          A charter specialist — not a call center — answers around the clock.
          Tell us the route, the date, and the passenger count; we&rsquo;ll
          handle everything else.
        </p>
      </section>

      <section className="section">
        <div className="services">
          <article className="service-card">
            <h2 className="service-card__name">Call</h2>
            <p className="service-card__body">
              Fastest for near-term trips and quotes.
            </p>
            <a className="service-card__cta" href="tel:+16029226769">
              +1 602 922 6769 →
            </a>
          </article>
          <article className="service-card">
            <h2 className="service-card__name">Email</h2>
            <p className="service-card__body">
              Send your itinerary and we&rsquo;ll come back with options and
              one-way pricing where it fits.
            </p>
            <a className="service-card__cta" href="mailto:charter@atsflights.com">
              charter@atsflights.com →
            </a>
          </article>
          <article className="service-card">
            <h2 className="service-card__name">Visit</h2>
            <p className="service-card__body">
              Aircraft Transport Service
              <br />
              5615 S. Sossaman Rd
              <br />
              Mesa, Arizona 85212
            </p>
          </article>
        </div>
      </section>

      <section className="contact">
        <p className="section__eyebrow">On-demand, worldwide</p>
        <h2 className="contact__title">Wheels-up starts with a call.</h2>
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

      <Footer />
    </main>
  );
}
