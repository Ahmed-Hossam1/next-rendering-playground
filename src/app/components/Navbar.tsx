import Link from "next/link";

const navLinks = [
  { href: "/about", label: "About", badge: "SSG", badgeClass: "ssg" },
  { href: "/weather", label: "Weather", badge: "SSR", badgeClass: "ssr" },
  { href: "/posts", label: "Posts", badge: "ISR", badgeClass: "isr" },
  { href: "/dashboard", label: "Dashboard", badge: "CSR", badgeClass: "csr" },
];

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand">
          <div className="navbar-logo">N</div>
          <div>
            <div className="navbar-title">Next Rendering</div>
            <div className="navbar-subtitle">Playground</div>
          </div>
        </Link>

        <ul className="navbar-nav">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="nav-link">
                {link.label}
                <span className={`nav-badge ${link.badgeClass}`}>
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
