import React from "react";
import {
  Briefcase,
  Landmark,
  QrCode,
  MailWarning,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";
import "../styles/FeaturesSection.css";

const CATEGORIES = [
  {
    icon: Briefcase,
    title: "Fake job scams",
    desc: "Registration fees, fake HR messages, unrealistic salaries, instant joining offers.",
    tint: "#22D3EE",
  },
  {
    icon: Landmark,
    title: "OTP / banking scams",
    desc: "OTP sharing requests, fake KYC updates, account-blocked threats, card expiry traps.",
    tint: "#6366F1",
  },
  {
    icon: QrCode,
    title: "UPI / payment scams",
    desc: "QR code traps, fake collect requests, refund scams designed to drain your wallet.",
    tint: "#34D399",
  },
  {
    icon: MailWarning,
    title: "Phishing emails",
    desc: "Fake bank mails, password reset lures, account verification traps.",
    tint: "#FBBF24",
  },
  {
    icon: ShoppingBag,
    title: "Online shopping scams",
    desc: "Unrealistic discounts, fake stores, advance payment demands, too-good offers.",
    tint: "#FB7171",
  },
];

export default function FeaturesSection() {
  return (
    <section className="features">
      <div className="features-head">
        <span className="features-eyebrow">5 scam categories, one analyzer</span>
        <h2 className="features-title">Every scam has a pattern. We know them.</h2>
        <p className="features-sub">
          Pick a category, paste the message, and TrustLens AI breaks down
          exactly what makes it dangerous — before you reply or pay.
        </p>
      </div>

      <div className="cards-grid">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              className="cat-card"
              key={cat.title}
              style={{ "--tint-color": cat.tint }}
            >
              <div
                className="cat-icon"
                style={{
                  background: `${cat.tint}1A`,
                  color: cat.tint,
                }}
              >
                <Icon size={22} />
              </div>
              <h3 className="cat-title">{cat.title}</h3>
              <p className="cat-desc">{cat.desc}</p>
              <a className="cat-link" href="/analyze">
                Analyze this type <ArrowUpRight size={14} />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}