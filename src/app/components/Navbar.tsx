import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home", badge: "Root", badgeClass: "ssg" },
  { href: "/rendering-strategies", label: "Rendering Strategies", badge: "SSG/SSR/ISR/CSR", badgeClass: "ssr" },
  { href: "/route-handlers", label: "Route Handlers", badge: "REST CRUD", badgeClass: "csr" },
];

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand">
          <div className="navbar-logo">N</div>
          <div>
            <div className="navbar-title">Next Rendering</div>
            <div className="navbar-subtitle">Practice Playground</div>
          </div>
        </Link>

        <ul className="navbar-nav">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="nav-link">
                {link.label}
                <span className={`nav-badge ${link.badgeClass}`} style={{ fontSize: "0.55rem" }}>
                  {link.badge}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
