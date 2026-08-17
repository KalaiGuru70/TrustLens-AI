import React, { useState } from "react";
import {
  Briefcase,
  Landmark,
  QrCode,
  MailWarning,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";
import "../styles/LearningCenter.css";

const LESSONS = [
  {
    id: "fake-job",
    icon: Briefcase,
    title: "Fake Job Scams",
    tint: "#22D3EE",
    summary: "How scammers lure job seekers with fake offers.",
    points: [
      "Genuine employers never ask you to pay a 'registration' or 'processing' fee to get hired.",
      "Be suspicious of job offers that arrive with no application, resume, or interview.",
      "Unrealistically high salaries (like ₹70,000/week) for simple work are a major red flag.",
      "Scammers often pressure you to 'join immediately' so you don't have time to research the company.",
    ],
    doThis: [
      "Search the company name + 'scam' or 'reviews' before responding.",
      "Verify the job posting exists on the company's official careers page.",
      "Never pay money upfront for any job, ever.",
    ],
  },
  {
    id: "otp-banking",
    icon: Landmark,
    title: "OTP / Banking Scams",
    tint: "#6366F1",
    summary: "Why banks never ask for your OTP or PIN.",
    points: [
      "No bank, ever, will call or message you asking for your OTP, PIN, or CVV.",
      "Messages that threaten 'your account will be blocked in 24 hours' are designed to create panic.",
      "Fake 'KYC update' requests are one of the most common banking scam tactics in India.",
      "Scammers often spoof caller IDs to look like they're calling from your actual bank.",
    ],
    doThis: [
      "Never share your OTP with anyone, including someone claiming to be from your bank.",
      "If in doubt, hang up and call your bank's official number directly.",
      "Report suspicious SMS to your bank and to cybercrime.gov.in.",
    ],
  },
  {
    id: "upi-payment",
    icon: QrCode,
    title: "UPI / Payment Scams",
    tint: "#34D399",
    summary: "Scanning a QR code can send money, not just receive it.",
    points: [
      "A common myth: 'scanning a QR code only receives money.' This is false — QR/UPI collect requests can authorize a payment FROM your account.",
      "Fake 'refund' or 'cashback' messages often ask you to enter your UPI PIN to 'receive' money — you never need a PIN to receive money.",
      "Scammers impersonate delivery agents, buyers on OLX/Facebook Marketplace, or government schemes.",
    ],
    doThis: [
      "You only ever enter your UPI PIN to SEND money — never to receive it.",
      "Don't scan QR codes from strangers, even if they claim it's for a refund.",
      "Verify unknown payment requests directly with the person or company before acting.",
    ],
  },
  {
    id: "phishing",
    icon: MailWarning,
    title: "Phishing Emails",
    tint: "#FBBF24",
    summary: "Spotting fake emails designed to steal your login.",
    points: [
      "Phishing emails create urgency: 'verify now or your account will be deleted in 12 hours.'",
      "Check the sender's actual email address, not just the display name — scammers often use lookalike domains.",
      "Legitimate companies rarely ask you to 'confirm your password' via email link.",
      "Hovering over a link (without clicking) shows the real destination URL — mismatched domains are a red flag.",
    ],
    doThis: [
      "Never click links in unexpected 'urgent' emails — go to the site directly by typing the URL yourself.",
      "Check for spelling errors and generic greetings ('Dear Customer' instead of your name).",
      "Enable two-factor authentication so a stolen password alone isn't enough to break in.",
    ],
  },
  {
    id: "shopping",
    icon: ShoppingBag,
    title: "Online Shopping Scams",
    tint: "#FB7171",
    summary: "When a deal is too good to be true, it usually is.",
    points: [
      "Extreme discounts (like an iPhone for ₹4,999) on unfamiliar websites are almost always scams.",
      "Fake urgency — 'only 3 left', 'offer ends in 1 hour' — pressures you into paying before thinking.",
      "Scam sites often only accept advance payment via UPI/bank transfer, with no cash-on-delivery option.",
      "Missing or fake reviews, no proper 'About Us'/contact page, and poor website design are warning signs.",
    ],
    doThis: [
      "Stick to well-known, established shopping platforms for big discounts.",
      "Prefer Cash on Delivery when buying from a new/unfamiliar site.",
      "Check the website's reviews on Google and social media before paying anything.",
    ],
  },
];

export default function LearningCenter() {
  const [openId, setOpenId] = useState(LESSONS[0].id);

  return (
    <section className="learning">
      <div className="learning-container">
        <div className="learning-head">
          <span className="learning-eyebrow">Learning Center</span>
          <h1 className="learning-title">Know the patterns. Spot them faster.</h1>
          <p className="learning-sub">
            The more you understand how scams work, the harder they are to fall for.
          </p>
        </div>

        <div className="lesson-list">
          {LESSONS.map((lesson) => {
            const Icon = lesson.icon;
            const isOpen = openId === lesson.id;
            return (
              <div
                className={`lesson-card ${isOpen ? "open" : ""}`}
                key={lesson.id}
                style={{ "--tint-color": lesson.tint }}
              >
                <button
                  className="lesson-header"
                  onClick={() => setOpenId(isOpen ? null : lesson.id)}
                >
                  <div className="lesson-header-left">
                    <div className="lesson-icon" style={{ background: `${lesson.tint}1A`, color: lesson.tint }}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3>{lesson.title}</h3>
                      <p>{lesson.summary}</p>
                    </div>
                  </div>
                  <ChevronDown size={18} className="chevron" />
                </button>

                {isOpen && (
                  <div className="lesson-body">
                    <div className="lesson-section">
                      <h4>What to know</h4>
                      <ul>
                        {lesson.points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="lesson-section">
                      <h4>What to do</h4>
                      <ul>
                        {lesson.doThis.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}