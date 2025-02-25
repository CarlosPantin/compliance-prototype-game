import React, { useState, useEffect } from "react";
import "./CaseReport.css";

import { casesData } from "./casesData";

interface Person {
  name: string;
  role: string;
  department: string;
}

interface Evidence {
  type: string;
  details: string;
}

interface Violation {
  regulation: string;
  violation: string;
}

interface Recommendation {
  action: string;
  department: string;
}

interface CaseReport {
  title: string;
  description: string;
  people_involved: Person[];
  evidence: Evidence[];
  compliance_violations: Violation[];
  recommendations: Recommendation[];
  correct_answer: string;
}

interface CompletedCase extends CaseReport {
  playerVerdict: string;
  isCorrect: boolean;
}

const HRInvestigator: React.FC = () => {
  const [caseReport, setCaseReport] = useState<CaseReport | null>(null);
  const [verdict, setVerdict] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [remainingCases, setRemainingCases] = useState<CaseReport[]>([]);
  const [completedCases, setCompletedCases] = useState<CompletedCase[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = (): void => {
    setRemainingCases([...casesData]);
    setCompletedCases([]);
    setScore(0);
    setCaseReport(null);
    setVerdict("");
    setFeedback("");
    setAiAnalysis("");
  };

  const fetchCaseReport = (): void => {
    if (remainingCases.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingCases.length);
    const selectedCase = remainingCases[randomIndex];

    setCaseReport(selectedCase);
    setRemainingCases(remainingCases.filter((_, i) => i !== randomIndex));
    setVerdict("");
    setFeedback("");
    setAiAnalysis("");
  };

  const submitVerdict = async (selectedVerdict: string): Promise<void> => {
    if (!caseReport) return;
    setIsLoading(true);

    setVerdict(selectedVerdict);

    const isCorrect = selectedVerdict === caseReport.correct_answer;

    if (isCorrect) {
      setScore(score + 1);
      setFeedback("✅ Correct! Your verdict matches the correct answer.");
    } else {
      setFeedback(
        "❌ Incorrect! Your verdict does not match the correct answer."
      );
    }

    setCompletedCases([
      ...completedCases,
      { ...caseReport, playerVerdict: selectedVerdict, isCorrect },
    ]);

    await fetchAiFeedback(caseReport, selectedVerdict);
    setIsLoading(false);
  };

  const fetchAiFeedback = async (caseData: CaseReport, playerVerdict: string): Promise<void> => {
    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemma",
          prompt: `Analyze this HR case and the player's verdict. Provide expert feedback on how HR should handle similar situations in the workplace.  

### Case Details:
- **Title:** ${caseData.title}
- **Description:** ${caseData.description}
- **People Involved:** ${caseData.people_involved
            .map((p) => `${p.name} (${p.role}, ${p.department})`)
            .join(", ")}
- **Evidence:** ${caseData.evidence
            .map((e) => `${e.type}: ${e.details}`)
            .join(", ")}
- **Compliance Violations:** ${
            caseData.compliance_violations.length > 0
              ? caseData.compliance_violations
                  .map((v) => `${v.regulation}: ${v.violation}`)
                  .join(", ")
              : "None"
          }
- **Recommendations:** ${caseData.recommendations
            .map((r) => `${r.action} (Dept: ${r.department})`)
            .join(", ")}

### Player's Verdict: ${playerVerdict}  
### Correct Verdict: ${caseData.correct_answer}  

🔹 If the player's verdict is **correct**, provide **reinforcement on why it was correct** and how to apply that knowledge in real life.  
🔹 If the player's verdict is **incorrect**, explain **why** and offer guidance on how to properly evaluate similar cases.  
🔹 Give HR best practices for handling these types of issues.  

Keep the response short and practical, as if it were **HR training advice**.  
Return ONLY text, with NO Markdown, explanations, or formatting.`,
          stream: false,
        }),
      });

      const data = await response.json();
      setAiAnalysis(data.response);
    } catch (error) {
      console.error("Error fetching AI feedback:", error);
      setAiAnalysis("Unable to retrieve AI analysis. Please try again later.");
    }
  };

  return (
    <div className="hr-investigator">
      <div className="game-header">
        <h1>HR Investigator</h1>
        <div className="game-stats">
          <div className="stat-item">
            <span className="stat-label">Score:</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Cases Left:</span>
            <span className="stat-value">{remainingCases.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Cases Completed:</span>
            <span className="stat-value">{completedCases.length}</span>
          </div>
        </div>
      </div>

      {caseReport ? (
        <div className="game-content">
          <div className="paper-report">
            <div className="case-header">
              <div className="case-title">{caseReport.title}</div>
              <div className="case-controls">
                <button className="action-button" onClick={fetchCaseReport}>
                  Next Case
                </button>
                <button className="reset-button" onClick={initializeGame}>
                  Reset Game
                </button>
              </div>
            </div>

            <div className="report-section">
              <h3>Description</h3>
              <p>{caseReport.description}</p>
            </div>

            <div className="report-grid">
              <div className="report-section">
                <h3>People Involved</h3>
                <ul className="report-list">
                  {caseReport.people_involved.map((person, index) => (
                    <li key={index}>
                      <span className="person-name">{person.name}</span>
                      <span className="person-details">
                        {person.role} ({person.department})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="report-section">
                <h3>Evidence</h3>
                <ul className="report-list">
                  {caseReport.evidence.map((item, index) => (
                    <li key={index}>
                      <span className="evidence-type">{item.type}</span>
                      <p className="evidence-details">{item.details}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="report-section">
              <h3>Compliance Violations</h3>
              {caseReport.compliance_violations.length > 0 ? (
                <ul className="report-list violations-list">
                  {caseReport.compliance_violations.map((violation, index) => (
                    <li key={index}>
                      <span className="violation-regulation">
                        {violation.regulation}
                      </span>
                      <p className="violation-details">{violation.violation}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-violations">
                  No compliance violations identified
                </p>
              )}
            </div>

            <div className="report-section">
              <h3>Recommendations</h3>
              <ul className="report-list recommendations-list">
                {caseReport.recommendations.map((rec, index) => (
                  <li key={index}>
                    <span className="recommendation-action">{rec.action}</span>
                    <span className="recommendation-dept">
                      Department: {rec.department}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {!verdict && (
              <div className="verdict-section">
                <h3>Your Verdict</h3>
                <div className="verdict-buttons">
                  <button
                    className="verdict-button guilty"
                    onClick={() => submitVerdict("Guilty")}
                    disabled={isLoading}
                  >
                    Guilty
                  </button>
                  <button
                    className="verdict-button not-guilty"
                    onClick={() => submitVerdict("Not Guilty")}
                    disabled={isLoading}
                  >
                    Not Guilty
                  </button>
                </div>
              </div>
            )}

            {verdict && (
              <div
                className={`results-section ${
                  verdict === caseReport.correct_answer
                    ? "correct"
                    : "incorrect"
                }`}
              >
                <div className="verdict-result">
                  <div className="result-header">
                    <h3>Verdict Result</h3>
                    <div className="result-badge">
                      {verdict === caseReport.correct_answer
                        ? "Correct ✓"
                        : "Incorrect ✗"}
                    </div>
                  </div>
                  <div className="result-details">
                    <div className="result-item">
                      <span className="result-label">Your Verdict:</span>
                      <span className="result-value">{verdict}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Correct Verdict:</span>
                      <span className="result-value">
                        {caseReport.correct_answer}
                      </span>
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <div className="loading-feedback">
                    <div className="loading-spinner"></div>
                    <p>Getting expert analysis...</p>
                  </div>
                ) : (
                  <div className="ai-analysis">
                    <h3>HR Expert Analysis</h3>
                    <div className="analysis-content">{aiAnalysis}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="no-case-container">
          {remainingCases.length === 0 && completedCases.length > 0 ? (
            <div className="game-summary">
              <div className="summary-header">
                <h2>Game Complete!</h2>
                <div className="final-score">
                  Final Score: {score} / {completedCases.length}
                </div>
              </div>

              <div className="case-history">
                <h3>Case History</h3>
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Case</th>
                      <th>Your Verdict</th>
                      <th>Correct</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedCases.map((c, index) => (
                      <tr
                        key={index}
                        className={
                          c.isCorrect ? "correct-case" : "incorrect-case"
                        }
                      >
                        <td>{c.title}</td>
                        <td>{c.playerVerdict}</td>
                        <td>{c.isCorrect ? "✓" : "✗"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button className="restart-button" onClick={initializeGame}>
                Play Again
              </button>
            </div>
          ) : (
            <div className="welcome-screen">
              <div className="welcome-message">
                <h2>Welcome to HR Investigator</h2>
                <p>
                  In this game, you'll review HR cases and determine if the
                  subject is guilty or not guilty of compliance violations. Test
                  your HR judgment and learn best practices for workplace
                  situations.
                </p>
              </div>
              <button className="start-button" onClick={fetchCaseReport}>
                Start Investigation
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HRInvestigator;