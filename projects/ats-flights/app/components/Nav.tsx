import Link from "next/link";

export default function Nav() {
  return (
    <header className="nav">
      <Link
        className="nav__brand"
        href="/"
        aria-label="ATS — Aircraft Transport Service"
      >
        <span className="nav__logo">ATS</span>
        <span className="nav__brand-sub">Aircraft Transport Service</span>
      </Link>
      <nav className="nav__links">
        <Link href="/about/">About</Link>
        <Link href="/fleet/">Fleet</Link>
        <Link href="/services/">Services</Link>
        <Link href="/safety/">Safety</Link>
        <Link href="/contact/">Contact</Link>
        <a className="nav__cta" href="tel:+16029226769">
          +1 602 922 6769
        </a>
      </nav>
    </header>
  );
}
