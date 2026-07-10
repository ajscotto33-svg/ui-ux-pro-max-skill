import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Our Fleet — ATS | Long-Range Gulfstream Aircraft",
  description:
    "ATS operates long-range Gulfstream aircraft worldwide — the ultra-long-range Gulfstream V with 14 seats, 5 berths, and 6,200 nm of non-stop range.",
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
          ATS operates long-range Gulfstream aircraft across the globe. Every
          airframe in the fleet is maintained, crewed, and operated to the same
          standard that earned our safety ratings.
        </p>
      </section>

      <section className="fleet">
        <div className="fleet__intro">
          <p className="section__eyebrow">Flagship</p>
          <h2 className="section__title">
            The Gulfstream&nbsp;V.
            <br />
            <span>Built for the whole world.</span>
          </h2>
          <p className="fleet__lead">
            With an ultra-long range of up to 6,200 nautical miles, the
            Gulfstream V has been the only choice for business and leisure
            travelers flying around the world. For flights over ten hours, a
            dedicated crew-rest area keeps the operation as fresh at hour
            twelve as at wheels-up.
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

      <section className="section">
        <div className="section__head">
          <p className="section__eyebrow">In the hangar</p>
          <h2 className="section__title">
            A growing <span>Gulfstream family.</span>
          </h2>
        </div>
        <div className="services">
          <article className="service-card">
            <h3 className="service-card__name">Gulfstream V</h3>
            <p className="service-card__body">
              Multiple GVs in the fleet — including N176SM and N585D — with
              full sleeping accommodations for intercontinental flights. WiFi
              available on board.
            </p>
          </article>
          <article className="service-card">
            <h3 className="service-card__name">Gulfstream IV</h3>
            <p className="service-card__body">
              The proven workhorse of executive aviation: transcontinental
              range with the cabin comfort the Gulfstream line is known for.
            </p>
          </article>
          <article className="service-card">
            <h3 className="service-card__name">Mission-matched</h3>
            <p className="service-card__body">
              Every charter is matched to the right airframe for your route,
              passenger count, and schedule — with specialized one-way pricing
              where it fits.
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
