# Hatchery × RightShift — 2026 Cohort Analysis Assistant

An AI-powered internal tool for program staff to query, analyze, and make selection decisions across the 41-venture 2026 Summer Cohort applicant pool.

> **This is an internal staff tool — not a public-facing LP or founder interface.**  
> It contains full scoring data, reviewer calibration notes, and selection-tier recommendations.

---

## What This Does

The chatbot loads the complete 2026 cohort dataset as context and lets program staff ask natural language questions like:

- *"Who are the top Tier 1 candidates in Q1?"*
- *"Show me all women-founded ventures with a norm score above 70."*
- *"Which ventures had the most scorer disagreement?"*
- *"Compare Agentix and Rkube Inc on fundability and revenue readiness."*
- *"Which Q2 ventures have the strongest VC story but need more runway before revenue?"*

The assistant is calibrated to speak like a senior program analyst — direct, data-first, with clear point of view on each venture's fit, fundability, and revenue readiness.

---

## Dataset Inside

| Attribute | Value |
|---|---|
| Total applicants | 41 ventures |
| Scoring completed | March 2026 |
| Scorers | BG, RE, Christina, Jose, DK |
| Total scores logged | 102 (avg 2.5 per venture) |
| Average pool score | 60.6 / 100 |
| Emory-affiliated | 31 (75.6%) |
| Women founders | 17 (41.5%) |

**Scoring dimensions (1–10 each):** Problem Definition, Evidence Solution Works, Competitive Advantage, Product Stage/MVP, Traction & Revenue, User Feedback Iteration, Founder Commitment, Program Fit, Team & Founder Fit, Coachability.

**Quadrant Framework:** Each venture is placed on a 2×2 of Fundability Attractiveness (FA) vs. Revenue Readiness (RR):
- **Q1** — High FA + High RR: Best Candidates
- **Q2** — High FA + Low RR: Raise-First Risk
- **Q3** — Low FA + High RR: Commercial, Hard to Fund
- **Q4** — Low FA + Low RR: Hardest Path

Tier designations (1–4) and "bubble zone" flags for high-disagreement ventures are also embedded.

---

## Deploy to Vercel (5 minutes)

### Option A: GitHub → Vercel (recommended)

1. **Push this folder to a new GitHub repo**
   - Go to github.com → New repository → name it `cohort-analysis`
   - Upload all files or use `git push`

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your GitHub repo
   - Framework: **Create React App** (auto-detected)
   - Click "Deploy" — first deploy may fail without the API key, that's fine

3. **Add your Anthropic API key**
   - In your Vercel project → Settings → Environment Variables
   - Add: `ANTHROPIC_API_KEY` = `sk-ant-...` (from [console.anthropic.com](https://console.anthropic.com))
   - Click Save

4. **Redeploy**
   - Go to Deployments tab → three dots on latest → Redeploy
   - Your tool is now live at your Vercel URL

---

### Option B: Vercel CLI

```bash
npm install -g vercel
cd cohort-analysis
npm install
vercel
# Follow prompts, then:
vercel env add ANTHROPIC_API_KEY
vercel --prod
```

---

## Local Development

```bash
npm install
# Create a .env.local file with:
# ANTHROPIC_API_KEY=sk-ant-...
npm start
# Opens at http://localhost:3000
```

---

## Optional: Restrict Access to Staff Only

To password-protect the tool so only program staff can access it:

1. Open `api/chat.js`
2. Uncomment the password check block (lines 5–8)
3. Add `LP_PASSWORD=yourpassword` to Vercel environment variables
4. Add a password prompt UI in `src/App.js` before the chat renders

---

## File Structure

```
cohort-analysis/
├── api/
│   └── chat.js          ← Vercel serverless function (Anthropic API proxy)
├── public/
│   └── index.html       ← HTML shell
├── src/
│   ├── index.js         ← React entry point
│   └── App.js           ← Chatbot UI + full cohort knowledge base (COHORT_CONTEXT)
├── package.json         ← Dependencies (React 18, react-scripts)
└── README.md
```

All cohort data — venture rankings, normalized scores, individual reviewer scores, quadrant placements, scorer calibration notes, and detailed venture profiles — lives in the `COHORT_CONTEXT` constant at the top of `src/App.js`. To update scores or add ventures, edit that constant and redeploy.

---

## Getting Your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign in or create an account
3. API Keys → Create Key
4. Copy the `sk-ant-...` key and add it to Vercel

Estimated cost: ~$0.003–0.005 per staff query session (Claude Sonnet). For 200 queries = ~$0.60–1.00.

---

## Important Notes

- **Do not share the Vercel URL publicly.** This tool contains confidential applicant scoring data and reviewer commentary.
- Scorer calibration notes (Jose outliers, DK conservatism, etc.) are embedded in the context — the assistant is aware of them and will factor them into analysis.
- The `package.json` name field still reads `rsv-lp-chatbot` — this is a legacy artifact and does not affect functionality. You can rename it to `cohort-analysis` if desired.
