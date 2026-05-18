import React, { useEffect } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const normalizeScore = (score) => {
  const parsedScore = Number(score);

  if (Number.isNaN(parsedScore)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(parsedScore)));
};

const getScoreTheme = (score) => {
  if (score >= 75) {
    return {
      label: "Strong",
      primary: "#10b981",
      secondary: "#059669",
      shadow: "rgba(16, 185, 129, 0.3)",
    };
  }

  if (score >= 50) {
    return {
      label: "Moderate",
      primary: "#f59e0b",
      secondary: "#d97706",
      shadow: "rgba(245, 158, 11, 0.3)",
    };
  }

  return {
    label: "Low",
    primary: "#ef4444",
    secondary: "#dc2626",
    shadow: "rgba(239, 68, 68, 0.3)",
  };
};

const Home = () => {
  const { loading, generateReport, reports, getAllReport } = useInterview();
  const interviewRef = useRef();
  const focusRef = useRef();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all reports when component mounts
    getAllReport();
    focusRef.current.focus();
  }, []);

  const handleGenerateReport = async () => {
    try {
      const resumeFile = interviewRef.current.files[0];
      if (!resumeFile) {
        return setMessage("Please upload the file.");
      }
      if (resumeFile.type != "application/pdf") {
        return setMessage("Please select only pdf file");
        
      }
      if(!jobDescription){
        return toast.error("please write job description")
        
      }
      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      if (data?.id) {
        // Reset form
        setJobDescription("");
        setSelfDescription("");
        interviewRef.current.value = "";
        setMessage("");
        // Refresh reports list
        await getAllReport();
        navigate(`/interview/${data.id}`);
      }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text, maxLength = 100) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <main className="home">
      <div className="interview-input-group">
        <div className="left">
          <textarea
            ref={focusRef}
            onChange={(e) => {
              setJobDescription(e.target.value);
            }}
            value={jobDescription}
            name="jobDescription"
            id="jobDescription"
            placeholder="Enter job description"
          >
            {" "}
          </textarea>
        </div>

        <div className="right">
          <div className="input-group">
            <p>
              Resume{" "}
              <small className="highlight">
                (Use Resume and self description together for better results)
              </small>
            </p>
            <label className="file-label" htmlFor="resume">
              Upload Resume
            </label>
            <input
              ref={interviewRef}
              hidden
              type="file"
              name="resume"
              id="resume"
              accept=".pdf"
            />
            {!message == "" && <p>{message}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="selfDescription">Self Description</label>
            <textarea
              onChange={(e) => {
                setSelfDescription(e.target.value);
              }}
              value={selfDescription}
              name="selfDescription"
              id="selfDescription"
              placeholder="Enter Self Description"
            ></textarea>
          </div>
          <button
            onClick={handleGenerateReport}
            disabled={loading}
            className="button button-primary"
          >
            {loading ? "Generating..." : "Generate Interview Report"}
          </button>
        </div>
      </div>

      {/* Recent Reports Section */}
      {reports && reports.length > 0 && (
        <section className="recent-reports">
          <div className="section-header">
            <h2>Recent Reports</h2>
            <p className="report-count">
              {reports.length} {reports.length === 1 ? "report" : "reports"}
            </p>
          </div>

          <div className="reports-grid">
            {reports.map((report, index) => {
              const score = normalizeScore(report.typeScore);
              const scoreTheme = getScoreTheme(score);

              return (
                <div
                  key={report.id || index}
                  className="report-card"
                  onClick={() => navigate(`/interview/${report.id}`)}
                >
                  <div className="report-header">
                    <h3 className="report-title">
                      {report.title || "Untitled Report"}
                    </h3>
                    <div
                      className="score-badge"
                      style={{
                        background: `linear-gradient(135deg, ${scoreTheme.primary} 0%, ${scoreTheme.secondary} 100%)`,
                        boxShadow: `0 4px 12px ${scoreTheme.shadow}`,
                      }}
                    >
                      {score}%
                    </div>
                  </div>

                  <p className="report-description">
                    {truncateText(report.jobDescription)}
                  </p>

                  <div className="report-meta">
                    <span className="meta-item">
                      <span className="meta-label">Created:</span>
                      <span className="meta-value">
                        {formatDate(report.createdAt)}
                      </span>
                    </span>
                    <span className="meta-item">
                      <span className="meta-label">Match:</span>
                      <span
                        className="meta-value"
                        style={{ color: scoreTheme.primary }}
                      >
                        {scoreTheme.label}
                      </span>
                    </span>
                  </div>

                  <div className="report-questions-info">
                    <span>
                      {report.technicalQuestions?.length || 0} Technical
                    </span>
                    <span>&bull;</span>
                    <span>
                      {report.behavioralQuestions?.length || 0} Behavioral
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
