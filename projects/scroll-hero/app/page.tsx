import ScrollHero from "./components/ScrollHero";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Home() {
  return (
    <main>
      <ScrollHero src={`${basePath}/hero.mp4`} scrollLengthVh={4} />

      <section className="specs" id="specs">
        <p className="specs__label">X6 M Performance — Vitals</p>
        <div className="specs__grid">
          <div className="spec-card">
            <p className="spec-card__value">
              3.8<span> s</span>
            </p>
            <p className="spec-card__name">0–100 km/h</p>
          </div>
          <div className="spec-card">
            <p className="spec-card__value">
              200<span> km/h+</span>
            </p>
            <p className="spec-card__name">In one straight</p>
          </div>
          <div className="spec-card">
            <p className="spec-card__value">
              530<span> hp</span>
            </p>
            <p className="spec-card__name">M TwinPower Turbo</p>
          </div>
          <div className="spec-card">
            <p className="spec-card__value">
              750<span> Nm</span>
            </p>
            <p className="spec-card__name">Peak torque</p>
          </div>
        </div>
      </section>

      <section className="statement">
        <p>
          Every frame of the film above is bound to your scroll wheel —
          <strong> you drive the launch</strong>. Ease in, and the X6 holds at
          the apex; commit, and it fires through the wing into the
          <strong> Miami golden hour</strong>.
        </p>
      </section>

      <footer className="footer">
        <span>X6 · Scroll Study</span>
        <span>Designed by Andrew Scotto</span>
        <span>Built with UI UX Pro Max</span>
      </footer>
    </main>
  );
}
