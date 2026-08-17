import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, ScanLine, ArrowRight, AlertTriangle } from "lucide-react";
import "../styles/HeroSection.css";

const SAMPLE_MESSAGE = [
  { text: "Congratulations! You are selected for a ", flag: false },
  { text: "Work From Home job", flag: false },
  { text: " with ", flag: false },
  { text: "70,000/week salary", flag: true },
  { text: ". No interview needed, ", flag: false },
  { text: "pay 499 registration fee", flag: true },
  { text: " to confirm your seat today.", flag: false },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [scanDone, setScanDone] = useState(false);
  const [score, setScore] = useState(0);

  const scrollToHowItWorks = () => {
    const section = document.getElementById("how-it-works");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const scanTimer = setTimeout(() => setScanDone(true), 1800);
    return () => clearTimeout(scanTimer);
  }, []);

  useEffect(() => {
    if (!scanDone) return;
    let current = 0;
    const target = 92;
    const interval = setInterval(() => {
      current += 3;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setScore(current);
    }, 25);
    return () => clearInterval(interval);
  }, [scanDone]);

  return (
    <section className="hero">
      <div className="hero-grid-bg" />

      <div className="hero-inner">
        <div>
          <div className="eyebrow">
            <ShieldCheck size={15} />
            AI-powered scam detection
          </div>
          <h1 className="headline">
            Know it's a scam <span>before you click.</span>
          </h1>
          <p className="subhead">
            Paste any suspicious job offer, bank message, or payment request.
            TrustLens AI reads it like a fraud analyst would — and tells you
            exactly what's wrong, in seconds.
          </p>
          <div className="cta-row">
            <button className="btn-primary" onClick={() => navigate("/analyze")}>
              Analyze a message <ArrowRight size={17} />
            </button>
            <button className="btn-secondary" onClick={scrollToHowItWorks}>
              See how it works
            </button>
          </div>
        </div>

        <div className="scan-card-wrap">
          <div className="scan-card">
            <div className="scan-card-header">
              <div className="scan-tag">
                <ScanLine size={14} /> Incoming message
              </div>
              <div className="scan-tag">Live analysis</div>
            </div>

            <p className="msg-text">
              {SAMPLE_MESSAGE.map((part, i) =>
                part.flag ? (
                  <span key={i} className={`flag-word ${scanDone ? "active" : ""}`}>
                    {part.text}
                  </span>
                ) : (
                  <span key={i}>{part.text}</span>
                )
              )}
            </p>

            {!scanDone && <div className="scan-line" />}

            <div className="result-row">
              <div>
                <div className="risk-label">Risk score</div>
                <div className="risk-score">{score}</div>
              </div>
              {scanDone && (
                <div className="risk-badge">
                  <AlertTriangle size={13} /> High risk · Fake job scam
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}