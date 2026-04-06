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
      "Moderate engagement with slight decline in communication frequency. The system recommends gentle prompts and memory reinforcement.",
    riskLevel: "Moderate",
    weeklyEngagement: [79, 77, 76, 74, 73, 72, 72],
    weeklyCommunication: [12, 11, 10, 9, 9, 8, 8],
    weeklyMissed: [0, 0, 1, 0, 1, 1, 1],
    routeStress: "Medium",
    routeMinutes: 18,
    caregiverStatus: "Not needed"
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
      "Reduced activity and increased navigation hesitation suggest the system should simplify choices, strengthen reminders, and provide guided support.",
    riskLevel: "Elevated",
    weeklyEngagement: [71, 68, 65, 62, 60, 57, 54],
    weeklyCommunication: [10, 8, 7, 6, 5, 4, 4],
    weeklyMissed: [0, 1, 1, 2, 2, 3, 3],
    routeStress: "High",
    routeMinutes: 27,
    caregiverStatus: "Recommended if pattern continues"
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
      "Strong digital activity with consistent task completion. The system recommends maintaining social and cognitive enrichment prompts.",
    riskLevel: "Low",
    weeklyEngagement: [81, 82, 83, 84, 83, 84, 84],
    weeklyCommunication: [11, 12, 12, 13, 12, 13, 13],
    weeklyMissed: [0, 0, 0, 0, 0, 0, 0],
    routeStress: "Low",
    routeMinutes: 14,
    caregiverStatus: "Not needed"
  }
};

function toneFromScore(score) {
  if (score >= 80) return "High";
  if (score >= 60) return "Moderate";
  return "Low";
}

function riskColor(level) {
  if (level === "Low") return "#15803d";
  if (level === "Moderate") return "#c2410c";
  return "#b91c1c";
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function Card({ children, style }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 24,
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
        padding: 22,
        ...style
      }}
    >
      {children}
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{ margin: 0, fontSize: 26, lineHeight: 1.1 }}>{title}</h2>
      {subtitle ? (
        <p
          style={{
            margin: "8px 0 0",
            color: "#64748b",
            lineHeight: 1.6,
            fontSize: 15
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function MiniBadge({ children, bg = "#e2e8f0", color = "#0f172a" }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "7px 12px",
        borderRadius: 999,
        background: bg,
        color,
        fontWeight: 700,
        fontSize: 13
      }}
    >
      {children}
    </span>
  );
}

function StatCard({ label, value, helper, accent = "#0f172a" }) {
  return (
    <Card style={{ padding: 18 }}>
      <div style={{ fontSize: 14, color: "#64748b" }}>{label}</div>
      <div
        style={{
          fontSize: 34,
          fontWeight: 800,
          color: accent,
          marginTop: 8
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 14,
          color: "#64748b",
          marginTop: 8,
          lineHeight: 1.5
        }}
      >
        {helper}
      </div>
    </Card>
  );
}

function TrendChart({ title, values, color, max, labels }) {
  const width = 320;
  const height = 140;
  const pad = 20;

  const points = values.map((v, i) => {
    const x = pad + (i * (width - pad * 2)) / (values.length - 1);
    const y = height - pad - (v / max) * (height - pad * 2);
    return `${x},${y}`;
  });

  return (
    <Card style={{ padding: 18 }}>
      <div style={{ fontWeight: 800, marginBottom: 10 }}>{title}</div>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="150">
        {[0.25, 0.5, 0.75].map((r, i) => {
          const y = height - pad - r * (height - pad * 2);
          return (
            <line
              key={i}
              x1={pad}
              x2={width - pad}
              y1={y}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          );
        })}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points.join(" ")}
        />
        {values.map((v, i) => {
          const x = pad + (i * (width - pad * 2)) / (values.length - 1);
          const y = height - pad - (v / max) * (height - pad * 2);
          return <circle key={i} cx={x} cy={y} r="4" fill={color} />;
        })}
      </svg>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${labels.length}, 1fr)`,
          gap: 4,
          marginTop: 6
        }}
      >
        {labels.map((label) => (
          <div
            key={label}
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "#64748b"
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </Card>
  );
}

function RouteSupportMap({ minutes, stress }) {
  const stressBg =
    stress === "High" ? "#fee2e2" : stress === "Medium" ? "#fff7ed" : "#ecfdf5";
  const stressColor =
    stress === "High" ? "#b91c1c" : stress === "Medium" ? "#c2410c" : "#15803d";

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 18 }}>Appointment Route Support</div>
        <MiniBadge bg={stressBg} color={stressColor}>
          {stress} route stress
        </MiniBadge>
      </div>

      <div style={{ color: "#64748b", marginBottom: 12, lineHeight: 1.5 }}>
        2:00 PM doctor appointment • estimated travel {minutes} min • simplified
        navigation mode activated
      </div>

      <svg
        viewBox="0 0 420 220"
        width="100%"
        height="220"
        style={{
          borderRadius: 18,
          border: "1px solid #e2e8f0",
          background: "#f8fafc"
        }}
      >
        <rect x="18" y="18" width="384" height="184" rx="20" fill="#f8fafc" />
        <path
          d="M58 168 C118 128, 136 76, 210 98 S320 158, 360 64"
          fill="none"
          stroke="#bfdbfe"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <path
          d="M58 168 C118 128, 136 76, 210 98 S320 158, 360 64"
          fill="none"
          stroke="#2563eb"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="8 8"
        />
        <circle cx="58" cy="168" r="10" fill="#16a34a" />
        <circle cx="360" cy="64" r="10" fill="#dc2626" />

        <rect
          x="38"
          y="138"
          width="80"
          height="30"
          rx="10"
          fill="#fff"
          stroke="#cbd5e1"
        />
        <text x="78" y="158" textAnchor="middle" fontSize="12" fill="#334155">
          Home
        </text>

        <rect
          x="316"
          y="28"
          width="88"
          height="30"
          rx="10"
          fill="#fff"
          stroke="#cbd5e1"
        />
        <text x="360" y="48" textAnchor="middle" fontSize="12" fill="#334155">
          Clinic
        </text>

        <rect
          x="274"
          y="94"
          width="110"
          height="36"
          rx="12"
          fill="#fff"
          stroke="#cbd5e1"
        />
        <text
          x="329"
          y="116"
          textAnchor="middle"
          fontSize="13"
          fill="#334155"
          fontWeight="700"
        >
          Guided route active
        </text>
      </svg>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
          marginTop: 14
        }}
      >
        <div style={blueInfoCard}>
          <div style={blueInfoTitle}>Turn-by-turn mode</div>
          <div style={blueInfoText}>Reduces confusion during travel</div>
        </div>
        <div style={blueInfoCard}>
          <div style={blueInfoTitle}>Arrival prompts</div>
          <div style={blueInfoText}>Supports time awareness</div>
        </div>
        <div style={blueInfoCard}>
          <div style={blueInfoTitle}>Simplified route</div>
          <div style={blueInfoText}>Lowers cognitive load</div>
        </div>
      </div>
    </Card>
  );
}

export default function Page() {
  const [profile, setProfile] = useState("mild");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [adaptiveMode, setAdaptiveMode] = useState(true);
  const [shareWithCaregiver, setShareWithCaregiver] = useState(false);

  const user = useMemo(() => sampleUsers[profile], [profile]);
  const tone = toneFromScore(user.engagement);

  const systemInsight = useMemo(() => {
    if (user.engagement < 60) {
      return "The integrated support system detected sustained reduction in engagement and elevated navigation difficulty. Stronger adaptive support has been activated.";
    }
    if (user.communicationChange < -20) {
      return "A meaningful drop in communication has been detected. The system is prioritizing connection prompts and routine guidance.";
    }
    return "Daily interaction patterns remain relatively stable. The system is maintaining baseline cognitive support.";
  }, [user]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
        color: "#0f172a",
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: 28
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.65fr 1fr",
            gap: 20,
            marginBottom: 20
          }}
        >
          <Card
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, #f8fbff 55%, #eef4ff 100%)",
              border: "1px solid #dbeafe",
              padding: 28
            }}
          >
            <div
              style={{
                fontSize: 13,
                letterSpacing: 1.4,
                color: "#64748b",
                fontWeight: 800,
                textTransform: "uppercase"
              }}
            >
              Integrated Cognitive Support Software
            </div>

            <h1
              style={{
                marginTop: 14,
                marginBottom: 14,
                fontSize: 48,
                lineHeight: 1.04,
                maxWidth: 840
              }}
            >
              A software-based system for supporting cognitive aging through
              adaptive digital interaction
            </h1>

            <p
              style={{
                color: "#64748b",
                fontSize: 19,
                lineHeight: 1.75,
                maxWidth: 850,
                marginBottom: 22
              }}
            >
              This prototype presents the concept as a software layer built into
              everyday smartphones or tablets. It observes routine digital
              behaviors such as reminders, communication, and navigation, then
              adapts the interface to support memory, independence, and daily
              functioning in older adults.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(140px, 1fr))",
                gap: 12,
                marginBottom: 22
              }}
            >
              <div style={heroStatBox}>
                <div style={heroStatNumber}>{user.engagement}%</div>
                <div style={heroStatLabel}>Engagement</div>
              </div>
              <div style={heroStatBox}>
                <div style={heroStatNumber}>
                  {Math.abs(user.communicationChange)}%
                </div>
                <div style={heroStatLabel}>Communication Shift</div>
              </div>
              <div style={heroStatBox}>
                <div style={heroStatNumber}>{user.navigationDifficulty}%</div>
                <div style={heroStatLabel}>Navigation Difficulty</div>
              </div>
              <div style={heroStatBox}>
                <div style={heroStatNumber}>{user.remindersMissed}</div>
                <div style={heroStatLabel}>Missed Reminders</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                onClick={() => setProfile("mild")}
                style={profileButton(profile === "mild")}
              >
                Age 74
              </button>
              <button
                onClick={() => setProfile("moderate")}
                style={profileButton(profile === "moderate")}
              >
                Age 81
              </button>
              <button
                onClick={() => setProfile("strong")}
                style={profileButton(profile === "strong")}
              >
                Age 69
              </button>

              <button
                onClick={() => {
                  setProfile("moderate");
                  setActiveTab("adaptive");
                }}
                style={dangerButton}
              >
                Simulate Elevated Risk
              </button>
            </div>
          </Card>

          <Card
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 10
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 22,
                    marginBottom: 8
                  }}
                >
                  System Summary
                </div>
                <div style={{ color: "#64748b", fontSize: 16 }}>
                  {user.name}, age {user.age}
                </div>
              </div>
              <MiniBadge>{tone} engagement</MiniBadge>
            </div>

            <div
              style={{
                marginTop: 16,
                marginBottom: 8,
                fontWeight: 700
              }}
            >
              Engagement score: {user.engagement}%
            </div>

            <div
              style={{
                height: 14,
                background: "#e2e8f0",
                borderRadius: 999,
                overflow: "hidden",
                marginBottom: 14
              }}
            >
              <div
                style={{
                  width: `${user.engagement}%`,
                  height: "100%",
                  background:
                    "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)"
                }}
              />
            </div>

            <div
              style={{
                padding: 14,
                borderRadius: 16,
                background: "#fff7ed",
                border: "1px solid #fed7aa",
                marginBottom: 14
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  color: "#9a3412",
                  marginBottom: 6
                }}
              >
                Live system interpretation
              </div>
              <div style={{ color: "#7c2d12", lineHeight: 1.55 }}>
                {systemInsight}
              </div>
            </div>

            <div style={recommendationBox}>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>
                Current recommendation
              </div>
              <div style={{ color: "#334155", lineHeight: 1.55 }}>
                Activate <strong>{user.suggestedMode}</strong> support mode with
                guided prompts, reduced navigation depth, stronger reminder
                reinforcement, and prioritized daily actions.
              </div>
            </div>

            <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
              <div style={summaryRow}>
                <span>Risk level</span>
                <span
                  style={{
                    color: riskColor(user.riskLevel),
                    fontWeight: 800
                  }}
                >
                  {user.riskLevel}
                </span>
              </div>
              <div style={summaryRow}>
                <span>Caregiver share option</span>
                <input
                  type="checkbox"
                  checked={shareWithCaregiver}
                  onChange={() =>
                    setShareWithCaregiver(!shareWithCaregiver)
                  }
                />
              </div>
              <div style={summaryRow}>
                <span>Adaptive mode</span>
                <input
                  type="checkbox"
                  checked={adaptiveMode}
                  onChange={() => setAdaptiveMode(!adaptiveMode)}
                />
              </div>
              <div style={summaryRow}>
                <span>Escalation status</span>
                <span
                  style={{
                    fontWeight: 700,
                    color: "#475569"
                  }}
                >
                  {user.caregiverStatus}
                </span>
              </div>
            </div>
          </Card>
        </div>

        <Card style={{ marginBottom: 20 }}>
          <SectionHeader
            title="Why an integrated software system is needed"
            subtitle="This concept works best as built-in mobile support software because it can observe normal daily behavior continuously, instead of relying on users to remember to open a separate app."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.08fr 1.2fr 0.08fr 1.2fr 0.08fr 1.2fr",
              gap: 12,
              alignItems: "stretch"
            }}
          >
            <div style={pipelineCard}>
              <div style={pipelineEmoji}>📱</div>
              <div style={pipelineTitle}>Daily Digital Behavior</div>
              <div style={pipelineText}>
                Texts, reminders, route checks, missed tasks, communication
                frequency
              </div>
            </div>

            <div style={pipelineArrow}>→</div>

            <div style={pipelineCard}>
              <div style={pipelineEmoji}>🧠</div>
              <div style={pipelineTitle}>Cognitive Signals</div>
              <div style={pipelineText}>
                Memory strain, disengagement, isolation risk, navigation
                hesitation
              </div>
            </div>

            <div style={pipelineArrow}>→</div>

            <div style={pipelineCard}>
              <div style={pipelineEmoji}>⚙️</div>
              <div style={pipelineTitle}>Software Adaptation</div>
              <div style={pipelineText}>
                Simplified layouts, guided routes, stronger prompts,
                prioritized actions
              </div>
            </div>

            <div style={pipelineArrow}>→</div>

            <div style={pipelineCard}>
              <div style={pipelineEmoji}>🌱</div>
              <div style={pipelineTitle}>Better Outcomes</div>
              <div style={pipelineText}>
                Routine stability, reduced overload, stronger independence,
                safer functioning
              </div>
            </div>
          </div>
        </Card>

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 20,
            padding: 14,
            borderRadius: 20,
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)"
          }}
        >
          {["dashboard", "monitoring", "adaptive", "memory", "social"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={tabButton(activeTab === tab)}
              >
                {tab === "adaptive"
                  ? "Adaptive UI"
                  : tab === "memory"
                    ? "Memory Support"
                    : tab === "social"
                      ? "Social + Routine"
                      : capitalize(tab)}
              </button>
            )
          )}
        </div>

        {activeTab === "dashboard" && (
          <>
            <SectionHeader
              title="Behavior Snapshot"
              subtitle="These signals illustrate why a generic phone interface may not be enough for aging users."
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(200px, 1fr))",
                gap: 16
              }}
            >
              <StatCard
                label="Cognitive Engagement"
                value={`${user.engagement}%`}
                helper="Estimated from recent interaction patterns"
                accent="#2563eb"
              />
              <StatCard
                label="Communication Change"
                value={`${user.communicationChange}%`}
                helper="Compared with the previous week"
                accent={
                  user.communicationChange < 0 ? "#dc2626" : "#16a34a"
                }
              />
              <StatCard
                label="Tasks Completed"
                value={`${user.tasksCompleted}`}
                helper="Calendar, reminders, and daily routine actions"
                accent="#0f172a"
              />
              <StatCard
                label="Reminders Missed"
                value={`${user.remindersMissed}`}
                helper="Missed prompts activate stronger support"
                accent={
                  user.remindersMissed > 0 ? "#ea580c" : "#16a34a"
                }
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.05fr 0.95fr",
                gap: 18,
                marginTop: 18
              }}
            >
              <RouteSupportMap
                minutes={user.routeMinutes}
                stress={user.routeStress}
              />

              <Card>
                <SectionHeader
                  title="Daily risk timeline"
                  subtitle="The software is valuable because it catches small issues before they become larger support problems."
                />

                <div style={{ display: "grid", gap: 12 }}>
                  <div style={timelineItem}>
                    <div style={dotOrange} />
                    <div>
                      <div style={timelineTitle}>
                        Medication reminder delayed
                      </div>
                      <div style={timelineText}>
                        Late acknowledgement suggests rising memory load.
                      </div>
                    </div>
                  </div>

                  <div style={timelineItem}>
                    <div style={dotBlue} />
                    <div>
                      <div style={timelineTitle}>
                        Communication activity changed
                      </div>
                      <div style={timelineText}>
                        Lower contact may indicate isolation or disengagement.
                      </div>
                    </div>
                  </div>

                  <div style={timelineItem}>
                    <div style={dotRed} />
                    <div>
                      <div style={timelineTitle}>
                        Navigation hesitation detected
                      </div>
                      <div style={timelineText}>
                        Appointment route support is strengthened
                        automatically.
                      </div>
                    </div>
                  </div>

                  <div style={timelineItem}>
                    <div style={dotGreen} />
                    <div>
                      <div style={timelineTitle}>
                        Adaptive support applied
                      </div>
                      <div style={timelineText}>
                        Large actions, prompts, and route assistance reduce
                        overload.
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {activeTab === "monitoring" && (
          <>
            <SectionHeader
              title="Weekly Pattern Monitoring"
              subtitle="Showing change over time makes the prototype feel like research software, not just a one-screen mockup."
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16
              }}
            >
              <TrendChart
                title="Engagement trend"
                values={user.weeklyEngagement}
                color="#2563eb"
                max={100}
                labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
              />
              <TrendChart
                title="Communication trend"
                values={user.weeklyCommunication}
                color="#7c3aed"
                max={15}
                labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
              />
              <TrendChart
                title="Missed reminder trend"
                values={user.weeklyMissed}
                color="#ea580c"
                max={4}
                labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginTop: 18
              }}
            >
              <Card>
                <SectionHeader
                  title="Behavioral indicators used by the software"
                  subtitle="These are meaningful because they reflect real-world independence, not just abstract scores."
                />
                <ul
                  style={{
                    color: "#475569",
                    lineHeight: 1.9,
                    margin: 0,
                    paddingLeft: 20
                  }}
                >
                  <li>Communication frequency and routine interaction</li>
                  <li>
                    Navigation hesitation and repeated route checking
                  </li>
                  <li>Reminder acknowledgement timing</li>
                  <li>Task completion consistency</li>
                  <li>Pattern stability across the week</li>
                </ul>
              </Card>

              <Card>
                <SectionHeader
                  title="Research relevance"
                  subtitle="This helps your argument because it shows exactly how digital behavior becomes a support signal."
                />
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={reasonBox}>
                    <strong>Missed reminders</strong>
                    <div style={reasonText}>
                      Can affect medication adherence and routine stability.
                    </div>
                  </div>
                  <div style={reasonBox}>
                    <strong>Navigation problems</strong>
                    <div style={reasonText}>
                      Can threaten independence and increase appointment
                      stress.
                    </div>
                  </div>
                  <div style={reasonBox}>
                    <strong>Communication decline</strong>
                    <div style={reasonText}>
                      May signal isolation, disengagement, or need for
                      stronger support.
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {activeTab === "adaptive" && (
          <>
            <SectionHeader
              title="Before vs After Adaptive Interface Support"
              subtitle="This is the clearest visual explanation of the system’s purpose: it changes how the phone behaves when cognitive strain increases."
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 18
              }}
            >
              <Card
                style={{
                  border: "1px solid #fecaca",
                  background: "#fffafa"
                }}
              >
                <div
                  style={{
                    color: "#dc2626",
                    fontWeight: 800,
                    marginBottom: 10,
                    fontSize: 22
                  }}
                >
                  Before: Standard Phone Interface
                </div>
                <div
                  style={{
                    color: "#64748b",
                    marginBottom: 16,
                    lineHeight: 1.6
                  }}
                >
                  A generic interface with more competing options, smaller
                  targets, and a higher decision burden.
                </div>

                <div style={miniGrid}>
                  {[
                    "Messages",
                    "Calendar",
                    "Health",
                    "Banking",
                    "Maps",
                    "Photos"
                  ].map((item) => (
                    <div key={item} style={miniTile}>
                      {item}
                    </div>
                  ))}
                </div>

                <div style={dangerPanel}>
                  Increased decision load may elevate confusion, delay
                  action, and reduce successful task completion.
                </div>
              </Card>

              <Card
                style={{
                  border: "2px solid #2563eb",
                  background: "#f8fbff"
                }}
              >
                <div
                  style={{
                    color: "#2563eb",
                    fontWeight: 800,
                    marginBottom: 10,
                    fontSize: 22
                  }}
                >
                  After: Integrated Adaptive Support
                </div>
                <div
                  style={{
                    color: "#64748b",
                    marginBottom: 16,
                    lineHeight: 1.6
                  }}
                >
                  The software layer prioritizes high-value actions, enlarges
                  controls, simplifies navigation, and reinforces routines.
                </div>

                <div style={{ display: "grid", gap: 12 }}>
                  <button style={primaryAction}>Call Family</button>
                  <button style={secondaryAction}>Today’s Reminders</button>
                  <button style={outlineAction}>
                    Doctor Route Support
                  </button>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 10,
                    marginTop: 18
                  }}
                >
                  <div style={blueInfoCard}>
                    <div style={blueInfoTitle}>Larger controls</div>
                    <div style={blueInfoText}>Improves accessibility</div>
                  </div>
                  <div style={blueInfoCard}>
                    <div style={blueInfoTitle}>Fewer choices</div>
                    <div style={blueInfoText}>Reduces decision load</div>
                  </div>
                  <div style={blueInfoCard}>
                    <div style={blueInfoTitle}>Guided support</div>
                    <div style={blueInfoText}>Supports memory and action</div>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {activeTab === "memory" && (
          <>
            <SectionHeader
              title="Memory Support Features"
              subtitle="These features show how the software helps without fully replacing thinking."
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 18
              }}
            >
              <Card>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 20,
                    marginBottom: 10
                  }}
                >
                  Smart reminders
                </div>
                <div style={infoBox}>
                  <strong>8:00 AM Medication Reminder</strong>
                  <div style={{ color: "#64748b", marginTop: 6 }}>
                    Status:{" "}
                    {user.remindersMissed > 0
                      ? "Missed once — reinforcement active"
                      : "Completed on time"}
                  </div>
                </div>
                <div style={infoBox}>
                  <strong>2:00 PM Doctor Appointment</strong>
                  <div style={{ color: "#64748b", marginTop: 6 }}>
                    Travel time and simplified route prompts are added
                    automatically.
                  </div>
                </div>
                <div style={infoBox}>
                  <strong>Why this helps</strong>
                  <div style={{ color: "#64748b", marginTop: 6 }}>
                    The system intensifies support only when behavior suggests
                    rising memory load.
                  </div>
                </div>
              </Card>

              <Card>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 20,
                    marginBottom: 10
                  }}
                >
                  Cognitive reinforcement
                </div>
                <div style={infoBox}>
                  <strong>Recall prompt</strong>
                  <div style={{ color: "#64748b", marginTop: 6 }}>
                    Can you recall what you completed this morning?
                  </div>
                </div>
                <div style={infoBox}>
                  <strong>Supportive cue</strong>
                  <div style={{ color: "#64748b", marginTop: 6 }}>
                    You acknowledged medication and checked your clinic route
                    before leaving.
                  </div>
                </div>
                <div style={infoBox}>
                  <strong>Research importance</strong>
                  <div style={{ color: "#64748b", marginTop: 6 }}>
                    The goal is support that still preserves meaningful
                    cognitive engagement rather than total automation.
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {activeTab === "social" && (
          <>
            <SectionHeader
              title="Social Connection + Routine Stability"
              subtitle="This shows why the system matters beyond usability: it supports belonging, communication, and everyday functioning."
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 18
              }}
            >
              <Card>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 20,
                    marginBottom: 10
                  }}
                >
                  Connection support
                </div>
                <div style={infoBox}>
                  <strong>You have not contacted anyone today.</strong>
                  <div style={{ color: "#64748b", marginTop: 6 }}>
                    Would you like to call your daughter or send a quick
                    message?
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                  <button style={primaryAction}>Call Family</button>
                  <button style={secondaryAction}>Send Message</button>
                </div>
              </Card>

              <Card>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 20,
                    marginBottom: 10
                  }}
                >
                  Expected impact
                </div>
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={impactRow}>
                    <span>🧠</span>
                    <span>
                      Supports cognition through routine reinforcement
                    </span>
                  </div>
                  <div style={impactRow}>
                    <span>👥</span>
                    <span>
                      Reduces isolation risk through communication prompts
                    </span>
                  </div>
                  <div style={impactRow}>
                    <span>📍</span>
                    <span>
                      Supports independence during appointments and
                      navigation
                    </span>
                  </div>
                  <div style={impactRow}>
                    <span>⚙️</span>
                    <span>
                      Shows how CS and gerontology can work together in one
                      system
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            marginTop: 22
          }}
        >
          <Card>
            <div
              style={{
                fontWeight: 800,
                fontSize: 22,
                marginBottom: 10
              }}
            >
              Prototype rationale
            </div>
            <p
              style={{
                color: "#64748b",
                lineHeight: 1.75,
                fontSize: 16,
                margin: 0
              }}
            >
              This prototype presents the concept as integrated mobile support
              software rather than just a separate app. That framing better fits
              the research question, because the system works by observing normal
              daily interaction patterns and adapting support in the background.
            </p>
          </Card>

          <Card
            style={{
              background: "linear-gradient(180deg, #eff6ff 0%, #ffffff 100%)",
              border: "1px solid #bfdbfe"
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: 22,
                marginBottom: 10
              }}
            >
              Why this strengthens your research demo
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={impactRow}>
                <span>📊</span>
                <span>
                  Shows behavioral change over time, not just static screens
                </span>
              </div>
              <div style={impactRow}>
                <span>🗺️</span>
                <span>
                  Connects cognition to real-life navigation and
                  appointments
                </span>
              </div>
              <div style={impactRow}>
                <span>🔔</span>
                <span>
                  Makes reminders, routines, and communication visibly
                  meaningful
                </span>
              </div>
              <div style={impactRow}>
                <span>🎓</span>
                <span>
                  Looks like a true research software prototype instead of a
                  generic app
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function profileButton(active) {
  return {
    padding: "11px 16px",
    borderRadius: 12,
    border: active ? "1px solid #2563eb" : "1px solid #cbd5e1",
    background: active ? "#2563eb" : "#ffffff",
    color: active ? "#ffffff" : "#0f172a",
    cursor: "pointer",
    fontWeight: 700,
    transition: "all 0.2s ease"
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
    fontWeight: 700,
    transition: "all 0.2s ease"
  };
}

const dangerButton = {
  padding: "11px 16px",
  borderRadius: 12,
  border: "none",
  background: "#dc2626",
  color: "#ffffff",
  cursor: "pointer",
  fontWeight: 700
};

const heroStatBox = {
  background: "#ffffff",
  border: "1px solid #dbeafe",
  borderRadius: 18,
  padding: 16,
  boxShadow: "0 6px 16px rgba(37, 99, 235, 0.06)"
};

const heroStatNumber = {
  fontSize: 30,
  fontWeight: 800,
  color: "#0f172a"
};

const heroStatLabel = {
  marginTop: 6,
  color: "#64748b",
  fontSize: 14
};

const recommendationBox = {
  marginTop: 14,
  background: "#f1f5f9",
  borderRadius: 16,
  padding: 16,
  color: "#334155"
};

const summaryRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: "10px 0",
  borderBottom: "1px solid #e2e8f0"
};

const pipelineCard = {
  padding: 18,
  borderRadius: 18,
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  boxShadow: "0 6px 18px rgba(15, 23, 42, 0.04)"
};

const pipelineEmoji = {
  fontSize: 30,
  marginBottom: 10
};

const pipelineTitle = {
  fontWeight: 800,
  fontSize: 18,
  marginBottom: 8
};

const pipelineText = {
  color: "#64748b",
  lineHeight: 1.6,
  fontSize: 14
};

const pipelineArrow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 28,
  color: "#94a3b8",
  fontWeight: 800
};

const blueInfoCard = {
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  borderRadius: 14,
  padding: 12
};

const blueInfoTitle = {
  fontWeight: 700,
  fontSize: 14,
  marginBottom: 4,
  color: "#1d4ed8"
};

const blueInfoText = {
  fontSize: 13,
  color: "#475569",
  lineHeight: 1.4
};

const dotOrange = {
  width: 12,
  height: 12,
  borderRadius: 999,
  background: "#f97316",
  marginTop: 6
};

const dotBlue = {
  width: 12,
  height: 12,
  borderRadius: 999,
  background: "#2563eb",
  marginTop: 6
};

const dotRed = {
  width: 12,
  height: 12,
  borderRadius: 999,
  background: "#dc2626",
  marginTop: 6
};

const dotGreen = {
  width: 12,
  height: 12,
  borderRadius: 999,
  background: "#16a34a",
  marginTop: 6
};

const timelineItem = {
  display: "grid",
  gridTemplateColumns: "18px 1fr",
  gap: 12,
  alignItems: "start"
};

const timelineTitle = {
  fontWeight: 700,
  marginBottom: 4
};

const timelineText = {
  color: "#64748b",
  lineHeight: 1.5,
  fontSize: 14
};

const reasonBox = {
  background: "#f8fafc",
  borderRadius: 14,
  padding: 14,
  border: "1px solid #e2e8f0"
};

const reasonText = {
  color: "#64748b",
  lineHeight: 1.5,
  marginTop: 4
};

const miniGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 12,
  marginTop: 14
};

const miniTile = {
  padding: 18,
  border: "1px solid #cbd5e1",
  borderRadius: 14,
  textAlign: "center",
  background: "#ffffff",
  fontWeight: 700
};

const dangerPanel = {
  marginTop: 18,
  padding: 14,
  borderRadius: 14,
  background: "#fee2e2",
  color: "#7f1d1d",
  lineHeight: 1.55
};

const primaryAction = {
  width: "100%",
  padding: "17px 18px",
  borderRadius: 16,
  border: "none",
  background: "#2563eb",
  color: "#ffffff",
  fontWeight: 800,
  cursor: "pointer",
  fontSize: 16
};

const secondaryAction = {
  width: "100%",
  padding: "17px 18px",
  borderRadius: 16,
  border: "none",
  background: "#e2e8f0",
  color: "#0f172a",
  fontWeight: 800,
  cursor: "pointer",
  fontSize: 16
};

const outlineAction = {
  width: "100%",
  padding: "17px 18px",
  borderRadius: 16,
  border: "1px solid #cbd5e1",
  background: "#ffffff",
  color: "#0f172a",
  fontWeight: 800,
  cursor: "pointer",
  fontSize: 16
};

const infoBox = {
  background: "#f8fafc",
  borderRadius: 14,
  padding: 14,
  marginTop: 12,
  border: "1px solid #e2e8f0"
};

const impactRow = {
  display: "grid",
  gridTemplateColumns: "28px 1fr",
  gap: 10,
  alignItems: "start",
  color: "#334155",
  lineHeight: 1.6,
  fontSize: 16
};

const mapInfoCard = {
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  borderRadius: 14,
  padding: 12
};

const mapInfoTitle = {
  fontWeight: 700,
  fontSize: 14,
  marginBottom: 4,
  color: "#1d4ed8"
};

const mapInfoText = {
  fontSize: 13,
  color: "#475569",
  lineHeight: 1.4
};
