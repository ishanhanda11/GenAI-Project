import { useInterview } from '../hooks/useInterview';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import '../style/interview.scss';

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
      color: '#10b981',
      description: 'Strong match for this role'
    };
  }

  if (score >= 50) {
    return {
      color: '#f59e0b',
      description: 'Decent match with a few areas to strengthen'
    };
  }

  return {
    color: '#ef4444',
    description: 'Lower match right now, focus on the main skill gaps'
  };
};

const Interview = () => {
  const { interviewId } = useParams();
  const { report, loading, getReportById } = useInterview();
  const [activeSection, setActiveSection] = useState('technical');
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  // Debug logging
  useEffect(() => {
    console.log("Report state updated:", report);
    if (report) {
      console.log("Full report object:", JSON.stringify(report, null, 2));
      console.log("Report keys:", Object.keys(report));
      console.log("Technical Questions:", report.technicalQuestions);
      console.log("Behavioral Questions:", report.behavioralQuestions);
      console.log("Skill Gaps:", report.skillGaps);
      console.log("Preparation Plan:", report.preparationPlan);
    }
  }, [report]);

  if (loading) {
    return <div className="interview-container"><p>Loading...</p></div>;
  }

  if (!report) {
    return <div className="interview-container"><p>No report available</p></div>;
  }

  const technicalQuestions = report.technicalQuestions || [];
  const behavioralQuestions = report.behavioralQuestions || [];
  const skillGaps = report.skillGaps || [];
  const preparationPlan = report.preparationPlan || [];
  const matchScore = normalizeScore(report.typeScore);
  const scoreTheme = getScoreTheme(matchScore);
  const scoreCircleStyle = {
    '--score-progress': `${matchScore * 3.6}deg`,
    '--score-color': scoreTheme.color
  };

  const getQuestionsForSection = () => {
    if (activeSection === 'technical') return technicalQuestions;
    if (activeSection === 'behavioral') return behavioralQuestions;
    if (activeSection === 'roadmap') return preparationPlan;
    return [];
  };

  const questions = getQuestionsForSection();
  const getSeverityColor = (severity) => {
    const colors = {
      low: '#4ade80',
      medium: '#fbbf24',
      high: '#ef4444'
    };
    return colors[severity] || '#6b7280';
  };

  return (
    <div className="interview-container">
      <div className="interview-layout">
        {/* Left Sidebar - Sections */}
        <div className="interview-sidebar">
          <div className="sidebar-header">SECTIONS</div>

          <div
            className="section-item"
            onClick={() => setActiveSection('technical')}
          >
            <span className={`section-icon ${activeSection === 'technical' ? 'active' : ''}`}>
              {'<>'}
            </span>
            <span className={`section-text ${activeSection === 'technical' ? 'active' : ''}`}>
              Technical Questions
            </span>
          </div>

          <div
            className="section-item"
            onClick={() => setActiveSection('behavioral')}
          >
            <span className={`section-icon ${activeSection === 'behavioral' ? 'active' : ''}`}>
              []
            </span>
            <span className={`section-text ${activeSection === 'behavioral' ? 'active' : ''}`}>
              Behavioral Questions
            </span>
          </div>

          <div
            className="section-item"
            onClick={() => setActiveSection('roadmap')}
          >
            <span className={`section-icon ${activeSection === 'roadmap' ? 'active' : ''}`}>
              {'=>'}
            </span>
            <span className={`section-text ${activeSection === 'roadmap' ? 'active' : ''}`}>
              Road Map
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="interview-main">
          <div className="report-title-section">
            <h1 className="report-title">{report.title}</h1>
            <p className="report-subtitle">Match Score: <span className="score-highlight" style={{ color: scoreTheme.color }}>{matchScore}%</span></p>
          </div>

          <div className="questions-header">
            <h2>
              {activeSection === 'technical' && 'Technical Questions'}
              {activeSection === 'behavioral' && 'Behavioral Questions'}
              {activeSection === 'roadmap' && 'Preparation Road Map'}
            </h2>
            <span className="question-count">
              {activeSection === 'roadmap'
                ? `${preparationPlan.length} days`
                : `${questions.length} questions`
              }
            </span>
          </div>

          <div className="questions-list">
            {activeSection === 'roadmap' ? (
              // Roadmap View
              preparationPlan.map((plan, index) => (
                <div key={plan.id || index} className="roadmap-card">
                  <div className="roadmap-day">
                    <span className="day-number">Day {plan.day}</span>
                  </div>
                  <div className="roadmap-content">
                    <h3>{plan.focus}</h3>
                    <ul className="tasks-list">
                      {Array.isArray(plan.tasks) && plan.tasks.map((task, taskIndex) => (
                        <li key={taskIndex}>{task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              // Questions View
              questions.map((q, index) => (
                <div key={q.id || index} className="question-card">
                  <div
                    className="question-header"
                    onClick={() => setExpandedQuestionId(expandedQuestionId === (q.id || index) ? null : (q.id || index))}
                  >
                    <span className="question-number">Q{index + 1}</span>
                    <p className="question-text">{q.question}</p>
                    <span className={`expand-icon ${expandedQuestionId === (q.id || index) ? 'expanded' : ''}`}>
                      ^
                    </span>
                  </div>

                  {expandedQuestionId === (q.id || index) && (
                    <div className="question-details">
                      <div className="detail-section">
                        <h4>INTENTION</h4>
                        <p>{q.intention}</p>
                      </div>
                      <div className="detail-section">
                        <h4>MODEL ANSWER</h4>
                        <p>{q.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Sidebar - Score and Skill Gaps */}
        <div className="interview-sidebar-right">
          <div className="match-score-section">
            <p className="score-label">MATCH SCORE</p>
            <div className="score-circle" style={scoreCircleStyle}>
              <span className="score-value">{matchScore}</span>
              <span className="score-percent">%</span>
            </div>
            <p className="score-description" style={{ color: scoreTheme.color }}>{scoreTheme.description}</p>
          </div>

          {skillGaps.length > 0 && (
            <div className="skill-gaps-section">
              <p className="section-label">SKILL GAPS</p>
              <div className="skills-list">
                {skillGaps.map((skill, index) => (
                  <div key={skill.id || index} className="skill-item">
                    <span
                      className="severity-indicator"
                      style={{ backgroundColor: getSeverityColor(skill.severity) }}
                    ></span>
                    <span className="skill-text">{skill.skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interview;
