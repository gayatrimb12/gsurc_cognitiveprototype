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
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.08)",
        padding: 22,
        ...style
      }}
    >
      {children}
    </div>
  );
}

export default function Page() {
  const [profile, setProfile] = useState("mild");
  const [activeTab, setActiveTab] = useState("adaptive");

  const user = useMemo(() => sampleUsers[profile], [profile]);
  const tone = toneFromScore(user.engagement);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: 28
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* HERO SECTION */}
        <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 20 }}>

          <Card style={{ background: "linear-gradient(135deg,#ffffff,#eef4ff)" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b" }}>
              COGNITIVE-AWARE SYSTEM
            </div>

            <h1 style={{ fontSize: 44, marginTop: 10 }}>
              Adaptive digital interfaces for cognitive aging
            </h1>

            <p style={{ color: "#64748b", fontSize: 18 }}>
              This prototype demonstrates how everyday digital behavior can be translated into
              cognitive signals and used to dynamically adapt user interfaces.
            </p>

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={() => setProfile("mild")} style={buttonStyle(profile==="mild")}>Age 74</button>
              <button onClick={() => setProfile("moderate")} style={buttonStyle(profile==="moderate")}>Age 81</button>
              <button onClick={() => setProfile("strong")} style={buttonStyle(profile==="strong")}>Age 69</button>

              <button
                onClick={() => setProfile("moderate")}
                style={{
                  background: "#dc2626",
                  color: "white",
                  padding: "10px 16px",
                  borderRadius: 12,
                  border: "none",
                  fontWeight: 700
                }}
              >
                Simulate Risk
              </button>
            </div>
          </Card>

          {/* SUMMARY */}
          <Card>
            <h3>Live Cognitive Summary</h3>
            <p>{user.name}, age {user.age}</p>

            <div style={{ fontWeight: 700 }}>{tone} engagement</div>

            <div style={{ marginTop: 10 }}>
              <div style={{ height: 10, background: "#e2e8f0", borderRadius: 999 }}>
                <div style={{
                  width: `${user.engagement}%`,
                  height: "100%",
                  background: "#2563eb"
                }} />
              </div>
            </div>

            <p style={{ marginTop: 10 }}>{user.cognitiveNote}</p>

            <div style={{ marginTop: 12, padding: 12, background: "#f1f5f9", borderRadius: 10 }}>
              <strong>System:</strong> Activate {user.suggestedMode} mode
            </div>
          </Card>
        </div>

        {/* PIPELINE */}
        <Card style={{ marginTop: 20 }}>
          <h2>Research Pipeline</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            <div>📱 Behavior</div>
            <div>🧠 Signals</div>
            <div>⚙️ Adaptation</div>
            <div>🌱 Outcomes</div>
          </div>
        </Card>

        {/* TABS */}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          {["adaptive","monitoring"].map(tab => (
            <button key={tab} onClick={()=>setActiveTab(tab)} style={tabButton(activeTab===tab)}>
              {tab}
            </button>
          ))}
        </div>

        {/* ADAPTIVE UI */}
        {activeTab==="adaptive" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
            
            <Card style={{ border: "1px solid #fecaca" }}>
              <h3 style={{ color: "#dc2626" }}>Before</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {["Messages","Calendar","Maps","Health","Banking","Photos"].map(i => (
                  <div key={i} style={miniTile}>{i}</div>
                ))}
              </div>
            </Card>

            <Card style={{ border: "2px solid #2563eb" }}>
              <h3 style={{ color: "#2563eb" }}>After (Adaptive)</h3>
              <button style={bigBtn}>Call Family</button>
              <button style={bigBtnSecondary}>Reminders</button>
              <button style={bigBtnOutline}>Health</button>
            </Card>

          </div>
        )}

      </div>
    </div>
  );
}

function buttonStyle(active){
  return {
    padding:"10px 16px",
    borderRadius:12,
    background: active ? "#2563eb":"#fff",
    color: active ? "#fff":"#000",
    border:"1px solid #ccc"
  }
}

function tabButton(active){
  return {
    padding:"8px 14px",
    borderRadius:999,
    background: active ? "#2563eb":"#fff",
    color: active ? "#fff":"#000",
    border:"1px solid #ccc"
  }
}

const miniTile = {
  padding:16,
  border:"1px solid #ccc",
  borderRadius:10,
  textAlign:"center"
};

const bigBtn = {
  padding:16,
  background:"#2563eb",
  color:"white",
  border:"none",
  borderRadius:12,
  marginTop:10
};

const bigBtnSecondary = {
  padding:16,
  background:"#e2e8f0",
  border:"none",
  borderRadius:12,
  marginTop:10
};

const bigBtnOutline = {
  padding:16,
  border:"1px solid #ccc",
  borderRadius:12,
  marginTop:10
};
