import React from "react";
import {
  ShieldCheck,
  Target,
  Cpu,
  Sparkles,
  Globe,
  Mail,
} from "lucide-react";
import "../styles/About.css";

const TECH_STACK = [
  "React.js", "React Router DOM", "JavaScript (ES6+)",
  "HTML5", "CSS3", "OpenRouter AI API", "LocalStorage", "lucide-react",
];

export default function About() {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-head">
          <span className="about-eyebrow">
            <ShieldCheck size={14} /> About TrustLens AI
          </span>
          <h1 className="about-title">
            Built to help people spot scams<br />before they fall for one.
          </h1>
          <p className="about-sub">
            TrustLens AI is an AI-powered scam detection tool that reads a
            suspicious message the way a fraud analyst would — and tells you
            exactly what's wrong with it, in seconds.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <div className="about-card-icon" style={{ color: "#22D3EE" }}>
              <Target size={22} />
            </div>
            <h3>Our Purpose</h3>
            <p>
              Scams are getting harder to spot, especially for people who
              aren't familiar with common fraud tactics. TrustLens AI gives
              anyone — regardless of technical background — a fast, clear
              second opinion before they reply, click, or pay.
            </p>
          </div>

          <div className="about-card">
            <div className="about-card-icon" style={{ color: "#6366F1" }}>
              <Cpu size={22} />
            </div>
            <h3>How the AI Works</h3>
            <p>
              Every message is analyzed by an AI model that checks for known
              scam patterns — urgency, unrealistic offers, upfront payment
              requests — and explains its reasoning in plain, simple
              language, in both English and Tamil.
            </p>
          </div>

          <div className="about-card">
            <div className="about-card-icon" style={{ color: "#FBBF24" }}>
              <Sparkles size={22} />
            </div>
            <h3>What's Next</h3>
            <p>
              Future versions aim to add community scam reporting, voice
              scam analysis, image-based scam detection, more Indian
              languages, and real-time scam alerts.
            </p>
          </div>
        </div>

        <div className="tech-section">
          <h3>Built With</h3>
          <div className="tech-tags">
            {TECH_STACK.map((tech) => (
              <span className="tech-tag" key={tech}>{tech}</span>
            ))}
          </div>
        </div>

        <div className="developer-card">
          <div className="dev-avatar">TL</div>
          <div className="dev-info">
            <h3>Developer</h3>
            <p>
              TrustLens AI was built as a project to demonstrate how AI can
              be applied to real-world safety problems — making scam
              detection accessible to everyone, not just the tech-savvy.
            </p>
            <div className="dev-links">
              <a href="#" aria-label="Website"><Globe size={16}/></a>
              <a href="#" aria-label="Email"><Mail size={16} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}