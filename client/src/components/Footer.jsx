import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Mail } from "lucide-react";
import "../styles/Footer.css";

const FOOTER_LINKS = {
  Product: [
    { label: "Analyze a message", to: "/analyze" },
    { label: "Learning center", to: "/learn" },
    { label: "Scam quiz", to: "/quiz" },
    { label: "History", to: "/history" },
  ],
  Company: [
    { label: "About", to: "/about" },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-icon">
              <ShieldCheck size={18} />
            </span>
            TrustLens AI
          </Link>
          <p className="footer-tagline">
            AI-powered scam detection — know it's a scam before you click.
          </p>
          <div className="footer-socials">
            <a href="https://github.com/KalaiGuru70" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer-social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.04.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.02 2.89-.02 3.29 0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/kalaiselvi-g-75b053327" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45z"/>
              </svg>
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=kalaig442@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
              className="footer-social-icon"
>
             <Mail size={18} />
            </a>
          </div>
        </div>

        {Object.entries(FOOTER_LINKS).map(([section, links]) => (
          <div className="footer-col" key={section}>
            <h4 className="footer-col-title">{section}</h4>
            {links.map((link) => (
              <Link key={link.to} to={link.to} className="footer-link">
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} TrustLens AI. Built for awareness, not surveillance.</p>
        <p className="footer-note">Powered by Gemini AI</p>
      </div>
    </footer>
  );
}