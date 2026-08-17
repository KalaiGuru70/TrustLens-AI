import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, Inbox, ArrowRight } from "lucide-react";
import "../styles/History.css";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const data = JSON.parse(localStorage.getItem("trustlens_history") || "[]");
    setHistory(data);
  };

  const clearHistory = () => {
    if (window.confirm("Delete all analysis history? This cannot be undone.")) {
      localStorage.removeItem("trustlens_history");
      setHistory([]);
    }
  };

  const deleteEntry = (index) => {
    const updated = history.filter((_, i) => i !== index);
    setHistory(updated);
    localStorage.setItem("trustlens_history", JSON.stringify(updated));
  };

  const riskLevel = (score) =>
    score >= 70 ? "high" : score >= 40 ? "medium" : "low";

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="history">
      <div className="history-container">
        <div className="history-head">
          <div>
            <span className="history-eyebrow">Scam History</span>
            <h1 className="history-title">Your past checks</h1>
            <p className="history-sub">
              Every message you've analyzed, saved right on your device.
            </p>
          </div>
          {history.length > 0 && (
            <button className="clear-btn" onClick={clearHistory}>
              <Trash2 size={15} /> Clear all
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="empty-state">
            <Inbox size={40} />
            <h3>No history yet</h3>
            <p>Messages you analyze will show up here.</p>
            <Link to="/analyze" className="empty-cta">
              Analyze a message <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="history-list">
            {history.map((entry, i) => (
              <div className={`history-item risk-${riskLevel(entry.riskScore)}`} key={i}>
                <div className="history-item-score">
                  <span className="score-num">{entry.riskScore}</span>
                  <span className="score-label">Risk</span>
                </div>
                <div className="history-item-body">
                  <div className="history-item-top">
                    <span className="history-category">{entry.category}</span>
                    <span className="history-date">{formatDate(entry.date)}</span>
                  </div>
                  <p className="history-summary">{entry.summary}...</p>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => deleteEntry(i)}
                  aria-label="Delete entry"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}