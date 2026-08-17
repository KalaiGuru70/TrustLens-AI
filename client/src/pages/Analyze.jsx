import React, { useState } from "react";
import {
  Briefcase,
  Landmark,
  QrCode,
  MailWarning,
  ShoppingBag,
  Loader2,
  ShieldCheck,
  ShieldAlert,
  Share2,
} from "lucide-react";
import { analyzeMessage } from "../services/geminiService";
import "../styles/Analyze.css";

const CATEGORIES = [
  { id: "fake-job", label: "Fake Job", icon: Briefcase },
  { id: "otp-banking", label: "OTP / Banking", icon: Landmark },
  { id: "upi-payment", label: "UPI / Payment", icon: QrCode },
  { id: "phishing", label: "Phishing Email", icon: MailWarning },
  { id: "shopping", label: "Online Shopping", icon: ShoppingBag },
];

export default function Analyze() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const [language, setLanguage] = useState("english");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!message.trim()) {
      setError("Please paste a message to analyze.");
      return;
    }
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const categoryLabel =
        CATEGORIES.find((c) => c.id === selectedCategory)?.label || "scam";
      const analysis = await analyzeMessage(categoryLabel, message, language);
      setResult(analysis);

      const history = JSON.parse(localStorage.getItem("trustlens_history") || "[]");
      history.unshift({
        date: new Date().toISOString(),
        category: analysis.category || categoryLabel,
        riskScore: analysis.riskScore,
        summary: message.slice(0, 80),
      });
      localStorage.setItem("trustlens_history", JSON.stringify(history.slice(0, 50)));
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const riskLevel =
    result?.riskScore >= 70 ? "high" : result?.riskScore >= 40 ? "medium" : "low";

  const riskLabel = (score) => {
    if (score >= 85) return "Very High Risk — Almost certainly a scam";
    if (score >= 70) return "High Risk — Likely a scam";
    if (score >= 40) return "Medium Risk — Be cautious";
    if (score >= 20) return "Low Risk — Probably safe";
    return "Very Low Risk — Looks safe";
  };

  const handleShare = async () => {
    if (!result) return;

    const verdictLine = result.isScam ? "HIGH RISK - Likely a SCAM" : "Looks safe";
    const flagsLine = result.redFlags?.length
      ? `\n\nRed flags:\n${result.redFlags.map((f) => `- ${f}`).join("\n")}`
      : "";
    const tipsLine = result.safetyTips?.length
      ? `\n\nSafety tips:\n${result.safetyTips.map((t) => `- ${t}`).join("\n")}`
      : "";

    const shareText =
      `TrustLens AI Scam Check\n\n` +
      `Risk Score: ${result.riskScore}/100\n` +
      `Verdict: ${verdictLine}\n\n` +
      `${result.explanation}` +
      `${flagsLine}` +
      `${tipsLine}` +
      `\n\nChecked with TrustLens AI`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "TrustLens AI Scam Check", text: shareText });
        return;
      } catch {
        // User cancelled - fall through to WhatsApp link.
      }
    }

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="analyze">
      <div className="analyze-container">
        <div className="analyze-head">
          <span className="analyze-eyebrow">AI Message Analyzer</span>
          <h1 className="analyze-title">Paste it. Scan it. Know it.</h1>
          <p className="analyze-sub">
            Pick a category, paste the suspicious message, and let AI break it down.
          </p>
        </div>

        <div className="category-row">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                className={`category-chip ${selectedCategory === cat.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <Icon size={16} />
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="language-toggle">
          <button
            className={`lang-btn ${language === "english" ? "active" : ""}`}
            onClick={() => setLanguage("english")}
          >
            English
          </button>
          <button
            className={`lang-btn ${language === "tamil" ? "active" : ""}`}
            onClick={() => setLanguage("tamil")}
          >
            தமிழ்
          </button>
        </div>

        <div className="input-card">
          <textarea
            className="message-input"
            placeholder="Paste the suspicious message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={7}
          />
          <div className="input-footer">
            <span className="char-count">{message.length} characters</span>
            <button className="analyze-btn" onClick={handleAnalyze} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={18} className="spin" /> Analyzing...
                </>
              ) : (
                "Analyze message"
              )}
            </button>
          </div>
        </div>

        {error && <div className="error-box">{error}</div>}

        {result && (
          <div className={`result-card risk-${riskLevel}`}>
            <div className="big-verdict">
              {result.isScam ? (
                <>
                  <ShieldAlert size={36} />
                  <h2>THIS IS FAKE</h2>
                  <p>This message is a scam. Do not trust it.</p>
                </>
              ) : (
                <>
                  <ShieldCheck size={36} />
                  <h2>THIS LOOKS GENUINE</h2>
                  <p>No major scam signs found in this message.</p>
                </>
              )}
            </div>

            <div className="result-top">
              <div>
                <span className="result-label">Risk Score</span>
                <div className="result-score">{result.riskScore}</div>
                <div className="risk-label-text">{riskLabel(result.riskScore)}</div>
              </div>
            </div>

            <p className="result-explanation">{result.explanation}</p>

            {result.redFlags?.length > 0 && (
              <div className="result-section">
                <h4>Red flags found</h4>
                <ul>
                  {result.redFlags.map((flag, i) => (
                    <li key={i}>{flag}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.safetyTips?.length > 0 && (
              <div className="result-section">
                <h4>Safety tips</h4>
                <ul>
                  {result.safetyTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            <button className="share-btn" onClick={handleShare}>
              <Share2 size={16} /> Share this result
            </button>
          </div>
        )}
      </div>
    </section>
  );
}