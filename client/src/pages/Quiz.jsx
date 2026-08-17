import React, { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";
import "../styles/Quiz.css";

const QUESTIONS = [
  {
    question: "A message says you won a job with no interview, and asks for a ₹499 registration fee. What should you do?",
    options: [
      "Pay the fee to secure the job quickly",
      "Ignore it — real jobs never ask you to pay upfront",
      "Share your bank details to verify identity",
      "Forward it to friends so they can join too",
    ],
    correct: 1,
    explanation: "Legitimate employers never charge you money to get hired. This is a classic advance-fee job scam.",
  },
  {
    question: "Your bank sends an SMS asking you to share the OTP to 'unblock your account'. What's the safest action?",
    options: [
      "Share the OTP immediately to avoid blocking",
      "Call the number in the SMS to confirm",
      "Never share the OTP — banks never ask for it",
      "Reply 'STOP' to the SMS",
    ],
    correct: 2,
    explanation: "No bank will ever call or message asking for your OTP. This is always a scam attempt.",
  },
  {
    question: "You get a 'refund' message asking you to scan a QR code and enter your UPI PIN to receive ₹2000. What's true?",
    options: [
      "You need a PIN to receive money, so it's safe",
      "Scanning QR + entering PIN can actually SEND money, not receive it",
      "QR codes are always safe to scan",
      "This is a legitimate bank process",
    ],
    correct: 1,
    explanation: "You never need to enter a UPI PIN to receive money. Entering it after scanning a QR can authorize a payment FROM your account.",
  },
  {
    question: "An email says 'Verify your account within 12 hours or it will be deleted' with a login link. This is:",
    options: [
      "A normal security check from your email provider",
      "A phishing attempt using urgency to steal your password",
      "Something to ignore since nothing bad will happen",
      "A message you should forward to your bank",
    ],
    correct: 1,
    explanation: "Urgency + a login link is the classic phishing pattern designed to steal your password before you think it through.",
  },
  {
    question: "A website sells an iPhone for ₹4,999 with 'only 3 left' and asks for advance payment only. What should you do?",
    options: [
      "Buy immediately before stock runs out",
      "Pay the advance since the discount is genuine",
      "Be very suspicious — extreme discounts + urgency + advance-only payment are scam signs",
      "Share your card details to lock in the price",
    ],
    correct: 2,
    explanation: "Unrealistic discounts, fake urgency, and advance-only payment (no COD) are the three biggest online shopping scam red flags.",
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[current];

  const handleSelect = (index) => {
    if (selected !== null) return;
    setSelected(index);
    const isCorrect = index === question.correct;
    if (isCorrect) setScore((s) => s + 1);
    setAnswers((a) => [...a, { question: question.question, isCorrect, selected: index }]);
  };

  const handleNext = () => {
    if (current + 1 < QUESTIONS.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswers([]);
    setFinished(false);
  };

  if (finished) {
    return (
      <section className="quiz">
        <div className="quiz-container">
          <div className="quiz-result">
            <Trophy size={40} className="trophy-icon" />
            <h1>Quiz Complete!</h1>
            <div className="final-score">
              {score} / {QUESTIONS.length}
            </div>
            <p className="score-message">
              {score === QUESTIONS.length
                ? "Perfect! You can spot scams like a pro."
                : score >= QUESTIONS.length / 2
                ? "Good job! A bit more awareness and you'll be scam-proof."
                : "Keep learning — check the Learning Center to sharpen your scam-spotting skills."}
            </p>

            <div className="answer-review">
              {answers.map((a, i) => (
                <div key={i} className={`review-item ${a.isCorrect ? "correct" : "wrong"}`}>
                  {a.isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                  <span>Q{i + 1}: {a.isCorrect ? "Correct" : "Incorrect"}</span>
                </div>
              ))}
            </div>

            <button className="restart-btn" onClick={handleRestart}>
              <RotateCcw size={16} /> Try again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="quiz">
      <div className="quiz-container">
        <div className="quiz-head">
          <span className="quiz-eyebrow">Scam Awareness Quiz</span>
          <h1 className="quiz-title">Test what you've learned</h1>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
          <p className="progress-label">
            Question {current + 1} of {QUESTIONS.length}
          </p>
        </div>

        <div className="question-card">
          <h2 className="question-text">{question.question}</h2>

          <div className="options-list">
            {question.options.map((option, i) => {
              let stateClass = "";
              if (selected !== null) {
                if (i === question.correct) stateClass = "correct";
                else if (i === selected) stateClass = "wrong";
              }
              return (
                <button
                  key={i}
                  className={`option-btn ${stateClass}`}
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                >
                  {option}
                  {stateClass === "correct" && <CheckCircle2 size={17} />}
                  {stateClass === "wrong" && <XCircle size={17} />}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <div className="explanation-box">
              <p>{question.explanation}</p>
              <button className="next-btn" onClick={handleNext}>
                {current + 1 < QUESTIONS.length ? "Next question" : "See results"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}