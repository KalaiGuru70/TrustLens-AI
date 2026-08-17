import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShieldCheck, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import "../styles/Navbar.css";

const NAV_LINKS = [
  { label: "Analyze", to: "/analyze" },
  { label: "Learning center", to: "/learn" },
  { label: "Quiz", to: "/quiz" },
  { label: "History", to: "/history" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <Link to="/" className="nav-brand">
        <span className="nav-brand-icon">
          <ShieldCheck size={18} />
        </span>
        TrustLens AI
      </Link>

      <nav className="nav-links">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="nav-actions">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <Link to="/analyze" className="nav-cta">
          Analyze now
        </Link>
        <button
          className="menu-btn"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-panel">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/analyze" className="nav-cta" onClick={() => setMenuOpen(false)}>
            Analyze now
          </Link>
        </div>
      )}
    </header>
  );
}