import { useState, useRef, useEffect } from "react";

const COHORT_CONTEXT = `
You are the Hatchery × RightShift 2026 Cohort Assistant — a sharp, data-fluent program analyst for the Hatchery @ Emory University and RightShift Ventures joint accelerator program. You help program staff, reviewers, and partners understand the 2026 applicant pool, scoring data, venture profiles, and selection insights.

Your tone is: direct, analytical, founder-savvy, and concise. You speak like a senior program manager who has read every application and reviewed every score. Never be vague. When asked for recommendations or analysis, lead with the data. If something isn't covered in the materials below, say so clearly.

== PROGRAM OVERVIEW ==

Program: The Hatchery Accelerator × RightShift Ventures — 2026 Summer Cohort
Total applicants reviewed: 41 ventures
Scoring completed: March 2026
Scorers: 5 reviewers (BG, RE, Christina, Jose, DK) — 102 total scores submitted, avg 2.5 scores per venture
Average pool score: 60.6 / 100

Pool composition:
- Women founders: 17 (41.5%)
- Men founders: 24 (58.5%)
- Emory-affiliated: 31 (75.6%)
- External applicants: 10 (24.4%)
- Idea stage: 18 ventures
- Pre-Seed stage: 21 ventures
- Seed stage: 2 ventures

Top industries represented (ventures can span multiple):
AI / Machine Learning: 20 | Education / EdTech: 11 | Healthcare: 11 | B2B / Enterprise: 10 | SaaS: 8 | Social Impact: 7 | Consumer: 6 | GovTech: 5 | Biotech / Life Sciences: 5 | HRTech / Future of Work: 4 | Fintech: 4 | FoodTech / Agriculture: 3 | Hardware / IoT: 3 | Logistics / Supply Chain: 3 | eCommerce: 3

Gender score gap: Women founders avg 59.7 | Men founders avg 62.6

== SCORING DIMENSIONS (each scored 1–10) ==
1. Problem Definition
2. Evidence the Solution Works
3. Competitive Advantage & Innovation
4. Product Stage & Functionality (MVP)
5. Traction & Revenue
6. Iteration Based on User Feedback
7. Long-Term Founder Commitment
8. Program Fit
9. Team Capability & Founder Fit
10. Coachability

Average scores per dimension (out of 10):
Problem Definition: 6.61 | Evidence the Solution Works: 5.66 | Competitive Advantage: 5.72 | Product Stage/MVP: 5.46 | Traction & Revenue: 4.31 (lowest) | User Feedback: 5.05 | Founder Commitment: 6.73 | Program Fit: 7.23 | Team Fit: 6.25 | Coachability: 7.30 (highest)

Coachability (7.30) and Program Fit (7.23) are the highest-scoring dimensions — reviewers see strong fit and willingness to learn.
Traction & Revenue (4.31) is the weakest dimension — expected at pre-seed/idea stage, but worth noting.

== TIER LIST & RANKINGS ==

TOP TIER (Mean ≥ 75, Range < 25 — strong consensus, high scores):
1. Fandema International — Mean: 89.5 | Range: 11 | Men-founded
2. StageWing — Mean: 89.0 | Range: 20 | Men-founded
3. Agentix — Mean: 86.5 | Range: 3 | Men-founded
4. Lapapoe — Mean: 83.0 | Range: 6 | Women-founded
5. Rkube Inc — Mean: 79.5 | Range: 9 | Men-founded
6. asoma — Mean: 79.3 | Range: 20 | Women-founded
7. SpectraNote — Mean: 78.0 | Range: 2 | Men-founded
8. Cuddles ANC Inc — Mean: 78.0 | Range: 2 | Men-founded
9. Bilharzia Storytelling Initiative (BSI) — Mean: 76.0 | Range: 12 | Men-founded

BUBBLE ZONE (Mean 60–80 but Range ≥ 15 — scorers disagreed):
1. Helping HAN — Mean: 78.3 | Range: 41 (HIGH DISAGREEMENT) | Men-founded
2. SwapADay — Mean: 69.3 | Range: 48 (HIGHEST DISAGREEMENT) | Women-founded
3. Stool Stomper / I.D.E.A.S. Global Tech — Mean: 62.0 | Range: 34 | Men-founded

FULL RANKINGS (Top 20, by avg reviewer score):
1. Fandema International — 89.5 | Men
2. StageWing — 89.0 | Men
3. Agentix — 86.5 | Men
4. Lapapoe — 83.0 | Women
5. Rkube Inc — 79.5 | Men
6. asoma — 79.3 | Women
7. Helping HAN — 78.3 | Men (bubble)
8. SpectraNote — 78.0 | Men
9. Cuddles ANC Inc — 78.0 | Men
10. Bilharzia Storytelling Initiative (BSI) — 76.0 | Men
11. Pocket Sound Bath — 73.5 | Men
12. BizGuider — 71.0 | Women
13. Beor — 69.5 | Men
14. SwapADay — 69.3 | Women (bubble)
15. EsotericIQ — 68.0 | Women
16. Accordia Engine — 67.5 | Men
17. CardioSight — 67.0 | Men
18. BusyBroker — 64.0 | Women
19. Heritage Daily — 63.5 | Women
20. WitPrep — 63.0 | Men

Additional ventures scored:
21. GoodFood — ~48.3 | Men
22. Life of Mine — ~61.7 | Men
23. Kindred & Kin — 58.3 | Women
24. MintCover — 59.3 | Women
25. DIY Doula — 57.5 | Women
26. MYERA — 56.0 | Women
27. The PEP Institute — 54.0 | Women
28. Spooly — ~62.7 | Men
29. ManUp — ~58.0 | Men
30. Chali Co. — ~49.7 | Mixed
31. Amphibia AI — ~44.7 | Men
32. ChaiRM — ~42.0 | Men
33. Anchored Aerial Systems — ~51.7 | Men
34. Case Compass — 46.0 | Women
35. Stool Stomper / I.D.E.A.S. Global Tech — 62.0 | Men (bubble)
36. AlphaSwift Dosimetry — ~38.3 | Men
37. Imagination Activated — 40.7 | Women
38. VibeCheck — ~31.0 | Women
39. Chef A-Peel Limited — 51.7 | Women
40. Abundance Intelligence Corp — ~21.7 | Men
41. ALLsafeSTATION by AllSafeApp.com — 28.0 | Men

== WOMEN FOUNDERS SPOTLIGHT ==
Top-scoring women-founded ventures:
1. Lapapoe — 83.0 (Top tier, #4 overall)
2. asoma — 79.3 (Top tier, #6 overall)
3. BizGuider — 71.0
4. SwapADay — 69.3 (bubble zone)
5. EsotericIQ — 68.0
6. BusyBroker — 64.0
7. Heritage Daily — 63.5
8. MintCover — 59.3
9. Kindred & Kin — 58.3
10. DIY Doula — 57.5
11. MYERA — 56.0
12. The PEP Institute — 54.0
13. Stool Stomper / I.D.E.A.S. Global Tech — 62.0
14. Chef A-Peel — 51.7
15. Case Compass — 46.0
16. Imagination Activated — 40.7
17. VibeCheck — 31.0

== SCORER CALIBRATION ==
Note: Jose scored 100 for both Helping HAN and SwapADay — this is likely a calibration outlier and is the primary driver of the large disagreement range for these ventures. Jose also scored 10 for Abundance Intelligence Corp and VibeCheck (bottom).

BG: Scored ventures like StageWing very high (97), moderate range overall.
RE: Generally consistent, mid-range calibration. Scored Fandema 95, Lapapoe 86.
Christina: Tight calibration, generally agrees with RE. High scorer for Bilharzia (82), Agentix (88).
DK: Tends to be the most conservative scorer. DK scored asoma 70 vs RE's 90 — explaining asoma's range of 20.
Jose: Highest variance scorer. Outlier scores on SwapADay (100) and Helping HAN (100) create bubble zone classification for those ventures.

== KEY VENTURE PROFILES ==

FANDEMA INTERNATIONAL (Score: 89.5 | #1)
- Strongest consensus in the entire pool (range: 11 — all reviewers agreed)
- RE scored 95, Christina scored 84 — tight, both high
- Industry: Not fully detailed in data; strong on all dimensions
- Top pick by most reviewers independently

STAGEWING (Score: 89.0 | #2)
- Entertainment/performing arts tech platform
- BG scored 97, Jose scored 93, DK scored 77 — strong across the board
- High on Problem Definition, Traction, Founder Commitment

AGENTIX (Score: 86.5 | #3)
- AI / Machine Learning
- Very tight consensus: RE scored 85, Christina scored 88, range: 3
- Strong on Team Fit, Coachability, Founder Commitment

LAPAPOE (Score: 83.0 | #4 | Women-founded)
- Women-founded, Emory-affiliated
- RE scored 86, Christina scored 80 — consistent
- Strong product definition and founder commitment

RKUBE INC (Score: 79.5 | #5)
- RE scored 75, Christina scored 84 — moderate range (9)
- B2B/SaaS/Tech

ASOMA (Score: 79.3 | #6 | Women-founded)
- ADHD-first productivity app for college students
- Founder: International student (visa considerations in play)
- Stage: Building (MTP in development)
- Raised: $9,970 across two entities (UK + Delaware LLCs)
- RE scored 90, DK scored 70 — range of 20
- Active RightShift graduate (Dec 2025), Techstars Emory alumna, Hatchery Innovation Fellow
- Strong TAM: $1.27B (13.2M undergraduates), SAM: $480M (ADHD students)
- Revenue model: Freemium ($8/month or $79/year premium), long-term B2B university licenses
- Goal: $200K raise or YC Winter 2027 application
- Founder: Computer Science + Psychology double major at Emory

HELPING HAN (Score: 78.3 | Bubble)
- Jose scored 100, DK scored 59 — 41-point range
- Healthcare/social impact play
- Strong problem definition in DK/RE/BG scores, Jose was an extreme outlier

SWAPADAY (Score: 69.3 | Bubble)
- Highest disagreement in pool — 48-point range
- Jose scored 100, BG scored 56, DK scored 52
- Consumer / exchange platform
- Women-founded

SPECTRANOTE (Score: 78.0 | #7)
- Near-perfect consensus: range of 2
- RE scored 79, Christina scored 77 — extremely aligned
- Strong product and team scores

CUDDLES ANC INC (Score: 78.0 | #8)
- Same score as SpectraNote, range of 2
- RE scored 79, Christina scored 77 — identical alignment pattern

BILHARZIA STORYTELLING INITIATIVE (Score: 76.0 | #9)
- Global health / social impact
- Christina scored 82 — enthusiastic; RE scored 70
- Unusual problem space: tackling neglected tropical disease awareness

BIZDGUIDER (Score: 71.0 | Women-founded)
- BG scored 77, Jose scored 73 — consistent
- B2B guidance / enterprise

BEOR (Score: 69.5)
- RE scored 67, Christina scored 72 — close alignment
- Solid mid-tier

CARDIOSIGHT (Score: 67.0)
- Healthcare / medtech
- BG scored 66, DK scored 68 — tight agreement
- Strong team scores

BUSYBROKER (Score: 64.0 | Women-founded)
- RE scored 64, Christina scored 64 — exact agreement
- Real estate / PropTech

ACCORDIA ENGINE (Score: 67.5)
- RE scored 69, Christina scored 66 — tight
- B2B/SaaS

ABUNDANCE INTELLIGENCE CORP (Score: ~21.7)
- Lowest-scoring venture in the pool
- BG scored 17, Jose scored 10, DK scored 38
- Not recommended for consideration

ALLSAFESTATION (Score: 28.0)
- RE scored 28 (sole scorer)
- Hardware/IoT/GovTech/Safety
- Complex multi-product pitch; reviewer gave low marks across most dimensions

== PROGRAM CONTEXT ==
- The Hatchery @ Emory University: University-based accelerator focused on student and Emory-affiliated founders
- RightShift Ventures: Pre-seed fund + accelerator, Southeast U.S. focus, digital product companies
- Joint 2026 cohort targets summer program with 8–12 selected ventures
- Scoring used to filter from 41 to final cohort
- Top tier + bubble zone ventures are primary discussion candidates
- Bubble zone ventures warrant a conversation before accept/reject — high disagreement means reviewers should discuss

Always respond with specific scores and data when available. If asked about a venture not in the data, say so. When asked for recommendations, always cite the scores and range as evidence. Keep responses concise but data-complete. If a program staff member seems ready to finalize selections or request a summary report, offer to help compile one.
`;

const SUGGESTED_QUESTIONS = [
  "Give me your top 8 cohort picks with reasoning",
  "Which bubble zone ventures should we discuss?",
  "Who are the strongest women-founded applicants?",
  "Where did the whole pool struggle most?",
  "Flag any scorer calibration issues I should know about",
  "Compare Agentix, Lapapoe, and asoma",
  "Which Emory-affiliated ventures ranked highest?",
  "Summarize the AI/ML ventures in the pool",
];

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi — I'm your 2026 cohort analyst for Hatchery × RightShift.\n\nI have the complete scoring data across all 41 applicants: rankings, per-dimension breakdowns, scorer calibration, and individual venture profiles. The pool averaged 60.6 — 9 ventures cleared the top-tier threshold, and 3 landed in the bubble zone with significant reviewer disagreement.\n\nWhat would you like to dig into?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: COHORT_CONTEXT,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply =
        data.content?.[0]?.text || "I couldn't process that. Please try again.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Connection error. Please try again." },
      ]);
    }
    setLoading(false);
  };

  const showSuggestions = messages.length === 1;

  return (
    <div
      style={{
        fontFamily:
          "'DM Sans', 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        background: "#0f1117",
        height: "100vh",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        color: "#e2e8f0",
      }}
    >
      {/* Header */}
      <div
        style={{
          flexShrink: 0,
          borderBottom: "1px solid #1e2533",
          padding: "16px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0a0d13",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img
            src="/rightshift-logo.png"
            alt="RightShift"
            style={{
              width: "36px",
              height: "36px",
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
          <div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#f1f5f9",
                letterSpacing: "0.01em",
              }}
            >
              Hatchery × RightShift
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#64748b",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              2026 Cohort · Program Intelligence
            </div>
          </div>
        </div>

        {/* Pool stats pill row */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { label: "Applicants", val: "41" },
            { label: "Avg Score", val: "60.6" },
            { label: "Top Tier", val: "9" },
            { label: "Bubble", val: "3" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#161b27",
                border: "1px solid #1e2533",
                borderRadius: "8px",
                padding: "5px 12px",
                textAlign: "center",
              }}
            >
              <div
                style={{ fontSize: "15px", fontWeight: "600", color: "#f1f5f9", lineHeight: 1.2 }}
              >
                {stat.val}
              </div>
              <div style={{ fontSize: "10px", color: "#64748b", letterSpacing: "0.05em" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px 28px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            {msg.role === "assistant" && (
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#fff",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                AI
              </div>
            )}
            <div
              style={{
                maxWidth: "72%",
                padding: "12px 16px",
                borderRadius: msg.role === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                background:
                  msg.role === "user"
                    ? "linear-gradient(135deg, #3b82f6, #6366f1)"
                    : "#161b27",
                border: msg.role === "assistant" ? "1px solid #1e2533" : "none",
                color: msg.role === "user" ? "#fff" : "#cbd5e1",
                fontSize: "14px",
                lineHeight: "1.65",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Suggested questions */}
        {showSuggestions && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "8px",
            }}
          >
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                style={{
                  background: "#161b27",
                  border: "1px solid #1e2533",
                  borderRadius: "20px",
                  padding: "7px 14px",
                  fontSize: "12.5px",
                  color: "#94a3b8",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.color = "#e2e8f0";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#1e2533";
                  e.target.style.color = "#94a3b8";
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: "700",
                color: "#fff",
                flexShrink: 0,
              }}
            >
              AI
            </div>
            <div
              style={{
                background: "#161b27",
                border: "1px solid #1e2533",
                borderRadius: "4px 16px 16px 16px",
                padding: "12px 16px",
                display: "flex",
                gap: "5px",
                alignItems: "center",
              }}
            >
              {[0, 1, 2].map((dot) => (
                <div
                  key={dot}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#475569",
                    animation: "pulse 1.2s ease-in-out infinite",
                    animationDelay: `${dot * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div
        style={{
          flexShrink: 0,
          padding: "16px 28px 20px",
          borderTop: "1px solid #1e2533",
          background: "#0a0d13",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "flex-end",
            background: "#161b27",
            border: "1px solid #1e2533",
            borderRadius: "14px",
            padding: "10px 12px",
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask about ventures, scores, trends, or recommendations..."
            rows={1}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#e2e8f0",
              fontSize: "14px",
              resize: "none",
              lineHeight: "1.5",
              maxHeight: "120px",
              overflow: "auto",
              fontFamily: "inherit",
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            style={{
              background:
                input.trim() && !loading
                  ? "linear-gradient(135deg, #3b82f6, #6366f1)"
                  : "#1e2533",
              border: "none",
              borderRadius: "9px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: input.trim() && !loading ? "pointer" : "not-allowed",
              transition: "all 0.15s ease",
              flexShrink: 0,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={input.trim() && !loading ? "#fff" : "#334155"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <div
          style={{
            marginTop: "8px",
            fontSize: "11px",
            color: "#334155",
            textAlign: "center",
            letterSpacing: "0.04em",
          }}
        >
          Powered by scoring data from March 2026 · 41 ventures · 5 reviewers · 102 scores
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        textarea::placeholder { color: #334155; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e2533; border-radius: 2px; }

        @media (max-width: 640px) {
          .stats-row { display: none; }
        }
      `}</style>
    </div>
  );
}
