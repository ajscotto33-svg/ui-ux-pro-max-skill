import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__row footer__row--links">
        <Link href="/">Home</Link>
        <Link href="/about/">About</Link>
        <Link href="/fleet/">Fleet</Link>
        <Link href="/services/">Services</Link>
        <Link href="/safety/">Safety</Link>
        <Link href="/contact/">Contact</Link>
      </div>
      <div className="footer__row">
        <span className="footer__logo">ATS</span>
        <span>Aircraft Transport Service</span>
        <span>Site by Andrew Scotto</span>
      </div>
    </footer>
  );
}
