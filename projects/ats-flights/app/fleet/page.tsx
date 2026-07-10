import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Our Fleet — ATS | Long-Range Gulfstream Aircraft",
  description:
    "ATS operates long-range Gulfstream aircraft worldwide — GV and GIVSP airframes with intercontinental range, sleeping accommodations, WiFi, and in-house maintenance.",
};

export default function FleetPage() {
  return (
    <main>
      <Nav />

      <section className="page-hero">
        <p className="section__eyebrow">The fleet</p>
        <h1 className="page-hero__title">
          Long-range Gulfstreams,
          <br />
          <span>flown worldwide.</span>
        </h1>
        <p className="page-hero__lead">
          ATS operates several large, long-range Gulfstream aircraft with
          worldwide operational authority. Every airframe is kept by our own
          in-house maintenance department to the standard our safety ratings
          demand.
        </p>
      </section>

      {/* Gulfstream V */}
      <section className="fleet">
        <div className="fleet__intro">
          <p className="section__eyebrow">Flagship — Gulfstream V</p>
          <h2 className="section__title">
            The Gulfstream&nbsp;V.
            <br />
            <span>Built for the whole world.</span>
          </h2>
          <p className="fleet__lead">
            With an ultra-long range of up to 6,200 nautical miles, the
            Gulfstream V has been the only choice for business and leisure
            travelers flying around the world. Multiple GVs fly on the ATS
            certificate — including N176SM and N585D — and for flights over
            ten hours, a dedicated crew-rest area keeps the operation as fresh
            at hour twelve as at wheels-up.
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
            <p className="fleet__spec-value">
              6,200<span> nm</span>
            </p>
            <p className="fleet__spec-label">Non-stop range</p>
          </div>
          <div className="fleet__spec">
            <p className="fleet__spec-value">
              10<span> hr+</span>
            </p>
            <p className="fleet__spec-label">With dedicated crew rest</p>
          </div>
        </div>
      </section>

      {/* Gulfstream IVSP */}
      <section className="section">
        <div className="section__head">
          <p className="section__eyebrow">Gulfstream IVSP — N415MA</p>
          <h2 className="section__title">
            The IVSP. <span>Performance, refined.</span>
          </h2>
          <p className="fleet__lead">
            Added to the ATS certificate in under 20 days thanks to our
            ability to self-conform, the Gulfstream IVSP N415MA carries
            entertainment systems, Airshow, and domestic WiFi — with all the
            amenities you would expect on board.
          </p>
        </div>
        <div className="fleet__spec-grid fleet__spec-grid--flush">
          <div className="fleet__spec">
            <p className="fleet__spec-value">
              4,200<span> nm</span>
            </p>
            <p className="fleet__spec-label">Maximum range</p>
          </div>
          <div className="fleet__spec">
            <p className="fleet__spec-value">
              450<span> kts</span>
            </p>
            <p className="fleet__spec-label">Cruising speed</p>
          </div>
          <div className="fleet__spec">
            <p className="fleet__spec-value">
              45,000<span> ft</span>
            </p>
            <p className="fleet__spec-label">Maximum altitude</p>
          </div>
          <div className="fleet__spec">
            <p className="fleet__spec-value">
              13<span> pax</span>
            </p>
            <p className="fleet__spec-label">Seats, sleeping for 6</p>
          </div>
        </div>
      </section>

      {/* Operations behind the fleet */}
      <section className="section">
        <div className="section__head">
          <p className="section__eyebrow">Behind the hangar doors</p>
          <h2 className="section__title">
            An operation, <span>not just airplanes.</span>
          </h2>
        </div>
        <div className="services">
          <article className="service-card">
            <h3 className="service-card__name">In-house maintenance</h3>
            <p className="service-card__body">
              ATS runs its own maintenance department, keeping every airframe
              to ARG/US Platinum and IS-BAO Stage 3 standards — and enabling
              new aircraft to join the certificate in under 20 days.
            </p>
          </article>
          <article className="service-card">
            <h3 className="service-card__name">Worldwide authority</h3>
            <p className="service-card__body">
              Worldwide operational authority and missions flown to more than
              160 countries — the most challenging routes are the ones this
              fleet was assembled for.
            </p>
          </article>
          <article className="service-card">
            <h3 className="service-card__name">Mission-matched</h3>
            <p className="service-card__body">
              Every charter is matched to the right airframe for your route,
              passenger count, and schedule — with specialized one-way pricing
              where it fits, and WiFi available on board.
            </p>
          </article>
        </div>
      </section>

      <section className="contact">
        <p className="section__eyebrow">Ready when you are</p>
        <h2 className="contact__title">Fly the fleet.</h2>
        <div className="contact__actions">
          <a className="contact__primary" href="tel:+16029226769">
            +1 602 922 6769
          </a>
          <Link className="contact__secondary" href="/contact/">
            Request a charter
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
