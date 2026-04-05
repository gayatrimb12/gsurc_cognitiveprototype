"use client";

import { useMemo, useState } from "react";

const sampleUsers = {
  mild: {
    name: "Evelyn Carter",
    age: 74,
    engagement: 72,
    communicationChange: -18,
    tasksCompleted: 5,
    remindersMissed: 1,
    navigationDifficulty: 12,
    suggestedMode: "Supportive",
    cognitiveNote:
      "Moderate engagement with slight decline in communication frequency. Recommend gentle prompts and memory reinforcement."
  },
  moderate: {
    name: "Martha Lee",
    age: 81,
    engagement: 54,
    communicationChange: -34,
    tasksCompleted: 3,
    remindersMissed: 3,
    navigationDifficulty: 31,
    suggestedMode: "Adaptive",
    cognitiveNote:
      "Reduced activity and increased navigation hesitation suggest the interface should simplify choices and increase guidance."
  },
  strong: {
    name: "Helen Brooks",
    age: 69,
    engagement: 84,
    communicationChange: 6,
    tasksCompleted: 7,
    remindersMissed: 0,
    navigationDifficulty: 7,
    suggestedMode: "Active",
    cognitiveNote:
      "Strong digital activity with consistent task completion. Recommend maintaining social and cognitive enrichment prompts."
  }
};

function toneFromScore(score) {
  if (score >= 80) return "High";
  if (score >= 60) return "Moderate";
  return "Low";
}

function Card({ children, style }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 20,
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
        padding: 20,
        ...style
      }}
    >
      {children}
    </div>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <Card>
      <div style={{ fontSize: 14, color: "#64748b" }}>{title}</div>
      <div style={{ fontSize: 30, fontWeight: 700, marginTop: 10 }}>{value}</div>
      <div style={{ fontSize: 14, color: "#64748b", marginTop: 8 }}>{subtitle}</div>
    </Card>
  );
}

export default function Page() {
  const [profile, setProfile] = useState("mild");
  const [adaptiveMode, setAdaptiveMode] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const user = useMemo(() => sampleUsers[profile], [profile]);
  const tone = toneFromScore(user.engagement);

  const bg = highContrast ? "#000000" : "#f8fafc";
  const text = highContrast ? "#ffffff" : "#0f172a";
  const muted = highContrast ? "#cbd5e1" : "#64748b";

  const fontSize = largeText ? 18 : 16;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bg,
        color: text,
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: 24,
        fontSize
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 20,
            marginBottom: 24
          }}
        >
          <Card style={{ padding: 28 }}>
            <div style={{ fontSize: 13, letterSpacing: 1.2, color: muted, fontWeight: 700 }}>
              COGNITIVE-AWARE ADAPTIVE INTERFACE
            </div>
            <h1 style={{ marginTop: 12, marginBottom: 12, fontSize: 40, lineHeight: 1.15 }}>
              A research prototype for supporting cognitive aging through adaptive digital interaction
            </h1>
            <p style={{ color: muted, lineHeight: 1.6 }}>
              This prototype demonstrates how interaction patterns such as communication frequency,
              reminder completion, and navigation difficulty can guide interface adaptation for older adults.
            </p>

            <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={() => setProfile("mild")} style={buttonStyle(profile === "mild")}>
                Age 74
              </button>
              <button onClick={() => setProfile("moderate")} style={buttonStyle(profile === "moderate")}>
                Age 81
              </button>
              <button onClick={() => setProfile("strong")} style={buttonStyle(profile === "strong")}>
                Age 69
              </button>
            </div>
          </Card>

          <Card>
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Live Cognitive Summary</div>
            <div style={{ color: muted, marginBottom: 8 }}>
              {user.name}, age {user.age}
            </div>
            <div
              style={{
                display: "inline-block",
                padding: "6px 12px",
                borderRadius: 999,
                background: "#e2e8f0",
                color: "#0f172a",
                fontWeight: 600,
                marginBottom: 16
              }}
            >
              {tone} engagement
            </div>

            <div style={{ marginBottom: 10 }}>Engagement score: {user.engagement}%</div>
            <div
              style={{
                height: 12,
                background: "#e2e8f0",
                borderRadius: 999,
                overflow: "hidden",
                marginBottom: 16
              }}
            >
              <div
                style={{
                  width: `${user.engagement}%`,
                  height: "100%",
                  background: "#2563eb"
                }}
              />
            </div>

            <p style={{ color: muted, lineHeight: 1.6 }}>{user.cognitiveNote}</p>

            <div style={{ marginTop: 18, background: "#f1f5f9", borderRadius: 14, padding: 14, color: "#334155" }}>
              <strong>System recommendation:</strong> Activate {user.suggestedMode} mode with guided prompts,
              reduced navigation depth, and stronger memory support.
            </div>

            <div style={{ marginTop: 20 }}>
              <label style={switchRow}>
                <span>Adaptive mode</span>
                <input type="checkbox" checked={adaptiveMode} onChange={() => setAdaptiveMode(!adaptiveMode)} />
              </label>
              <label style={switchRow}>
                <span>High contrast</span>
                <input type="checkbox" checked={highContrast} onChange={() => setHighContrast(!highContrast)} />
              </label>
              <label style={switchRow}>
                <span>Large text</span>
                <input type="checkbox" checked={largeText} onChange={() => setLargeText(!largeText)} />
              </label>
            </div>
          </Card>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
          {["dashboard", "monitoring", "adaptive", "memory", "social"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={tabButton(activeTab === tab)}>
              {tab === "adaptive" ? "Adaptive UI" : tab === "memory" ? "Memory Support" : tab === "social" ? "Social + Boost" : capitalize(tab)}
            </button>
          ))}
        </div>

        {activeTab === "dashboard" && (
          <>
            <div style={sectionHeaderStyle}>
              <h2 style={{ margin: 0 }}>Home Dashboard</h2>
              <p style={{ margin: "6px 0 0", color: muted }}>
                A high-level overview of digital behavior and cognitive engagement.
              </p>
            </div>

            <div style={grid4}>
              <StatCard title="Cognitive Engagement" value={`${user.engagement}%`} subtitle="Estimated from recent digital interaction patterns" />
              <StatCard title="Communication Change" value={`${user.communicationChange}%`} subtitle="Compared with previous week" />
              <StatCard title="Tasks Completed" value={`${user.tasksCompleted}`} subtitle="Medication, calendar, and routine tasks" />
              <StatCard title="Reminders Missed" value={`${user.remindersMissed}`} subtitle="Missed prompts trigger adaptive reinforcement" />
            </div>
          </>
        )}

        {activeTab === "monitoring" && (
          <>
            <div style={sectionHeaderStyle}>
              <h2 style={{ margin: 0 }}>Interaction Monitoring</h2>
              <p style={{ margin: "6px 0 0", color: muted }}>
                Behavioral signals used to estimate cognitive engagement over time.
              </p>
            </div>

            <div style={grid2}>
              <Card>
                <h3>Behavioral Indicators</h3>
                <ul style={{ lineHeight: 1.8, color: muted }}>
                  <li>Communication frequency</li>
                  <li>Navigation difficulty</li>
                  <li>Task completion</li>
                  <li>Engagement stability</li>
                </ul>
              </Card>
              <Card>
                <h3>Current Risk Signal</h3>
                <div style={{ fontSize: 34, fontWeight: 700, marginTop: 10 }}>
                  {user.navigationDifficulty}%
                </div>
                <p style={{ color: muted, marginTop: 10 }}>
                  If multiple risk signals rise together, the system activates more guided support.
                </p>
              </Card>
            </div>
          </>
        )}

        {activeTab === "adaptive" && (
          <>
            <div style={sectionHeaderStyle}>
              <h2 style={{ margin: 0 }}>Adaptive Interface</h2>
              <p style={{ margin: "6px 0 0", color: muted }}>
                The UI changes when the system detects increased cognitive effort or reduced engagement.
              </p>
            </div>

            <div style={grid2}>
              <Card>
                <h3>Standard View</h3>
                <div style={miniGrid}>
                  {["Messages", "Calendar", "Health", "Banking", "Maps", "Photos"].map((item) => (
                    <div key={item} style={miniTile}>{item}</div>
                  ))}
                </div>
                <p style={{ color: muted, marginTop: 14 }}>
                  A typical interface with more choices and higher navigation load.
                </p>
              </Card>

              <Card style={{ border: "2px solid #2563eb" }}>
                <h3>Adaptive View</h3>
                <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
                  <button style={bigAction}>Call Family</button>
                  <button style={bigActionSecondary}>Today’s Reminders</button>
                  <button style={bigActionOutline}>Health Check-In</button>
                </div>
                <p style={{ color: muted, marginTop: 16 }}>
                  The interface reduces decision load, enlarges buttons, and prioritizes the most relevant tasks.
                </p>
              </Card>
            </div>
          </>
        )}

        {activeTab === "memory" && (
          <>
            <div style={sectionHeaderStyle}>
              <h2 style={{ margin: 0 }}>Memory Support</h2>
              <p style={{ margin: "6px 0 0", color: muted }}>
                Reminder scaffolding intensifies when patterns suggest reduced recall or incomplete routines.
              </p>
            </div>

            <div style={grid2}>
              <Card>
                <h3>Smart Reminders</h3>
                <div style={infoBox}>
                  <strong>8:00 AM Medication Reminder</strong>
                  <div style={{ color: muted, marginTop: 6 }}>
                    Status: {user.remindersMissed > 0 ? "Missed once — escalation active" : "Completed on time"}
                  </div>
                </div>
                <div style={infoBox}>
                  <strong>2:00 PM Doctor Appointment</strong>
                  <div style={{ color: muted, marginTop: 6 }}>
                    Adaptive cue adds travel time and simplified directions.
                  </div>
                </div>
              </Card>

              <Card>
                <h3>Memory Reinforcement</h3>
                <div style={infoBox}>
                  <strong>Prompt</strong>
                  <div style={{ color: muted, marginTop: 6 }}>
                    Can you recall what you completed this morning?
                  </div>
                </div>
                <div style={infoBox}>
                  <strong>Supportive cue</strong>
                  <div style={{ color: muted, marginTop: 6 }}>
                    You took medication at 8:15 AM and called your daughter at 9:10 AM.
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {activeTab === "social" && (
          <>
            <div style={sectionHeaderStyle}>
              <h2 style={{ margin: 0 }}>Social Connection + Cognitive Boost</h2>
              <p style={{ margin: "6px 0 0", color: muted }}>
                The system responds to reduced communication by supporting both connection and mental engagement.
              </p>
            </div>

            <div style={grid2}>
              <Card>
                <h3>Connection Prompt</h3>
                <div style={infoBox}>
                  <strong>You have not contacted anyone today.</strong>
                  <div style={{ color: muted, marginTop: 6 }}>
                    Would you like to call your daughter or send a quick message?
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                  <button style={bigAction}>Call Family</button>
                  <button style={bigActionSecondary}>Send Message</button>
                </div>
              </Card>

              <Card>
                <h3>Cognitive Boost</h3>
                <div style={infoBox}>
                  <strong>Recall exercise</strong>
                  <div style={{ color: muted, marginTop: 6 }}>
                    Name three people you spoke with this week.
                  </div>
                </div>
                <div style={infoBox}>
                  <strong>Routine reflection</strong>
                  <div style={{ color: muted, marginTop: 6 }}>
                    What was the first task you completed this morning?
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        <div style={{ ...grid2, marginTop: 24 }}>
          <Card>
            <h3>Prototype Rationale</h3>
            <p style={{ color: muted, lineHeight: 1.7 }}>
              This concept prototype frames digital interaction as a behavioral signal that can inform adaptive system design.
              Rather than replacing thought entirely, the interface supports memory, social connection, and routine participation
              while preserving meaningful cognitive engagement.
            </p>
          </Card>
          <Card>
            <h3>Design Principles</h3>
            <ul style={{ color: muted, lineHeight: 1.8 }}>
              <li>Large touch targets</li>
              <li>Reduced navigation depth</li>
              <li>Supportive rather than intrusive prompts</li>
              <li>Cognitive scaffolding over full automation</li>
              <li>Accessibility-first interface design</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function buttonStyle(active) {
  return {
    padding: "10px 16px",
    borderRadius: 12,
    border: active ? "1px solid #2563eb" : "1px solid #cbd5e1",
    background: active ? "#2563eb" : "#ffffff",
    color: active ? "#ffffff" : "#0f172a",
    cursor: "pointer",
    fontWeight: 600
  };
}

function tabButton(active) {
  return {
    padding: "10px 16px",
    borderRadius: 999,
    border: active ? "1px solid #2563eb" : "1px solid #cbd5e1",
    background: active ? "#2563eb" : "#ffffff",
    color: active ? "#ffffff" : "#0f172a",
    cursor: "pointer",
    fontWeight: 600
  };
}

const switchRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 12,
  gap: 12
};

const sectionHeaderStyle = {
  marginBottom: 16
};

const grid4 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16
};

const grid2 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 16
};

const miniGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 10,
  marginTop: 14
};

const miniTile = {
  padding: 18,
  border: "1px solid #cbd5e1",
  borderRadius: 14,
  textAlign: "center",
  background: "#ffffff"
};

const bigAction = {
  width: "100%",
  padding: "16px 18px",
  borderRadius: 16,
  border: "none",
  background: "#2563eb",
  color: "#ffffff",
  fontWeight: 700,
  cursor: "pointer"
};

const bigActionSecondary = {
  width: "100%",
  padding: "16px 18px",
  borderRadius: 16,
  border: "none",
  background: "#e2e8f0",
  color: "#0f172a",
  fontWeight: 700,
  cursor: "pointer"
};

const bigActionOutline = {
  width: "100%",
  padding: "16px 18px",
  borderRadius: 16,
  border: "1px solid #cbd5e1",
  background: "#ffffff",
  color: "#0f172a",
  fontWeight: 700,
  cursor: "pointer"
};

const infoBox = {
  background: "#f8fafc",
  borderRadius: 14,
  padding: 14,
  marginTop: 12
};
