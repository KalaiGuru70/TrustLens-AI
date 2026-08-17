import React from "react";
import { ClipboardPaste, ScanSearch, ShieldAlert } from "lucide-react";
import "../styles/HowItWorks.css";

const STEPS = [
  {
    number: "01",
    icon: ClipboardPaste,
    title: "Paste the message",
    desc: "Pick a category — job offer, bank SMS, UPI request, email, or shopping deal — and paste the suspicious text.",
  },
  {
    number: "02",
    icon: ScanSearch,
    title: "AI scans for patterns",
    desc: "Gemini AI reads the message like a fraud analyst, checking it against known scam patterns and red flags.",
  },
  {
    number: "03",
    icon: ShieldAlert,
    title: "Get your verdict",
    desc: "Instantly see a Risk Score, the exact red flags found, and clear safety tips on what to do next.",
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="hiw-head">
        <span className="hiw-eyebrow">How it works</span>
        <h2 className="hiw-title">From suspicious message to clear verdict.</h2>
        <p className="hiw-sub">
          No sign-up needed to check a message. Three steps, a few seconds,
          one clear answer.
        </p>
      </div>

      <div className="hiw-track">
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <div className="hiw-step" key={step.number}>
              <div className="hiw-step-top">
                <div className="hiw-icon-circle">
                  <span className="hiw-number">{step.number}</span>
                  <Icon size={22} />
                </div>
              </div>
              <h3 className="hiw-step-title">{step.title}</h3>
              <p className="hiw-step-desc">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}