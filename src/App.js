import { useState, useRef, useEffect } from "react";

const COHORT_CONTEXT = `
You are the Hatchery × RightShift 2026 Cohort Assistant — a sharp, data-fluent program analyst for the joint Hatchery @ Emory University and RightShift Ventures accelerator program. You help program staff make selection decisions, understand the applicant pool, and assess each venture's fit, fundability, and revenue readiness.

Your tone is: direct, analytical, decisive. You speak like a senior program manager who has read every application, reviewed every score, and built a clear point of view on each venture. Never be vague. Lead with data, follow with judgment.

== PROGRAM OVERVIEW ==
Program: The Hatchery Accelerator × RightShift Ventures — 2026 Summer Cohort
Total applicants reviewed: 41 ventures
Scoring completed: March 2026
Scorers: 5 reviewers (BG, RE, Christina, Jose, DK) — 102 total scores, avg 2.5 per venture
Average pool score: 60.6 / 100

Pool composition:
- Women founders: 17 (41.5%) | Men founders: 24 (58.5%)
- Emory-affiliated: 31 (75.6%) | External: 10 (24.4%)
- Idea stage: 18 | Pre-Seed stage: 21 | Seed stage: 2

Top industries (ventures can span multiple):
AI/ML: 20 | EdTech: 11 | Healthcare: 11 | B2B/Enterprise: 10 | SaaS: 8 | Social Impact: 7 | Consumer: 6 | GovTech: 5 | Biotech: 5 | HRTech: 4 | Fintech: 4 | FoodTech: 3 | Hardware/IoT: 3 | Logistics: 3 | eCommerce: 3

Gender score gap: Women avg 59.7 | Men avg 62.6

== SCORING DIMENSIONS (each 1–10) ==
1. Problem Definition | 2. Evidence Solution Works | 3. Competitive Advantage | 4. Product Stage/MVP
5. Traction & Revenue | 6. User Feedback Iteration | 7. Founder Commitment | 8. Program Fit
9. Team & Founder Fit | 10. Coachability

Dimension averages: Problem Defn 6.61 | Evidence 5.66 | Competitive Adv 5.72 | Product MVP 5.46 | Traction 4.31 (lowest) | User Feedback 5.05 | Founder Commitment 6.73 | Program Fit 7.23 | Team Fit 6.25 | Coachability 7.30 (highest)

== QUADRANT FRAMEWORK ==
Two axes used across all analyses:
- Fundability Attractiveness (FA / ICM): How investable is this venture to VCs? Based on sector momentum, TAM, pitch clarity, team credibility. Scale 1–10.
- Revenue Readiness (RR): How likely is this venture to generate revenue within the 8-week accelerator window? Based on GTM specificity, customer proximity, existing traction. Scale 1–10.

Quadrant definitions:
Q1 · Best Candidates: High FA + High RR — fundable AND can generate revenue during the program
Q2 · Raise-First Risk: High FA + Low RR — strong investor story but revenue requires longer timeline (regulatory, enterprise cycles, hardware)
Q3 · Commercial, Hard to Fund: Lower FA + High RR — will generate revenue but not a traditional VC story; needs alternative capital path
Q4 · Hardest Path: Lower FA + Lower RR — needs more development before accelerator entry

== NORMALIZED SCORES & FULL RANKINGS ==
(norm = normalized composite score, raw = raw mean, rng = score range between reviewers, t = tier)
Tier 1 = Recommended | Tier 2 = Secondary | Tier 3 = Discuss | Tier 4 = Remove/Decline

Rank | Venture | Norm | Raw | Range | FA | RR | Tier | Gender | Quadrant
1  | StageWing | 95.9 | 89.0 | 20 | 6.5 | 7.5 | 1 | M | Q3
2  | Fandema International | 88.1 | 89.5 | 11 | 5.5 | 4.0 | 1 | M | Q4
3  | Agentix | 84.5 | 86.5 | 3 | 8.8 | 8.0 | 1 | M | Q1
4  | asoma | 83.2 | 79.3 | 20 | 8.5 | 7.5 | 1 | F | Q1
5  | Lapapoe | 79.4 | 83.0 | 6 | 7.0 | 8.0 | 1 | F | Q1
6  | BizGuider | 76.4 | 71.0 | 14 | 6.9 | 7.5 | 1 | F | Q3
7  | Rkube Inc | 75.2 | 79.5 | 9 | 8.8 | 8.5 | 1 | M | Q1
8  | Helping HAN | 80.4 | 78.3 | 41 | 7.2 | 5.0 | 3 | M | Q2 (BUBBLE — high disagreement)
9  | Stool Stomper/I.D.E.A.S. | 70.3 | 62.0 | 34 | 6.5 | 4.5 | 3 | M | Q3 (BUBBLE)
10 | SwapADay | 69.6 | 69.3 | 48 | 7.9 | 6.0 | 3 | F | Q1 (BUBBLE — highest disagreement)
11 | CardioSight | 73.8 | 67.0 | 2 | 8.8 | 3.0 | 2 | M | Q2
12 | Cuddles ANC Inc | 72.8 | 78.0 | 2 | 8.2 | 5.0 | 2 | M | Q2
13 | SpectraNote | 72.8 | 78.0 | 2 | 8.8 | 8.0 | 2 | M | Q1
14 | Bilharzia BSI | 70.6 | 76.0 | 12 | 5.5 | 4.0 | 2 | M | Q4
15 | Chef A-Peel | 60.4 | 51.7 | 27 | 6.5 | 7.5 | 3 | F | Q3
16 | The PEP Institute | 59.8 | 54.0 | 35 | 8.4 | 6.5 | 3 | F | Q1
17 | MYERA | 58.8 | 56.0 | 35 | 8.0 | 5.5 | 3 | F | Q2
18 | Kindred & Kin | 55.6 | 58.3 | 26 | 5.5 | 6.5 | 3 | F | Q3
19 | GoodFood | 54.4 | 48.3 | 48 | 7.5 | 6.5 | 3 | M | Q1
20 | Pocket Sound Bath | 66.6 | 73.5 | 1 | 8.2 | 6.0 | 2 | M | Q1
21 | MintCover | 66.5 | 59.3 | 9 | 6.5 | 6.5 | 2 | F | Q3
22 | Life of Mine | 66.1 | 61.7 | 12 | 9.0 | 4.5 | 2 | M | Q2
23 | Beor | 61.4 | 69.5 | 5 | 8.9 | 2.5 | 2 | M | Q2
24 | AlphaSwift Dosimetry | 48.4 | 38.8 | 32 | 8.8 | 4.5 | 3 | M | Q2
25 | Imagination Activated | 43.6 | 40.7 | 36 | 3.4 | 4.0 | 3 | F | Q4
26 | VibeCheck | 36.9 | 31.0 | 32 | 8.4 | 4.5 | 3 | F | Q2
27 | Abundance Intelligence Corp | 26.7 | 21.7 | 28 | 8.8 | 3.0 | 3 | M | Q2
28 | EsotericIQ | 59.2 | 68.0 | 0 | 7.2 | 8.0 | 4 | F | Q1
29 | Accordia Engine | 58.4 | 67.5 | 3 | 9.1 | 5.5 | 4 | M | Q1
30 | DIY Doula | 58.2 | 57.5 | 15 | 4.5 | 5.5 | 4 | F | Q4
31 | Anchored Aerial Systems | 56.4 | 51.7 | 23 | 7.1 | 3.5 | 4 | M | Q2
32 | BusyBroker | 53.8 | 64.0 | 0 | 5.5 | 5.5 | 4 | F | Q3
33 | Heritage Daily | 53.0 | 63.5 | 3 | 5.0 | 7.0 | 4 | F | Q3
34 | WitPrep | 51.9 | 63.0 | 14 | 5.5 | 6.5 | 4 | M | Q3
35 | Spooly | 51.2 | 62.5 | 13 | 7.1 | 6.5 | 4 | M | Q1
36 | Amphibia AI | 51.0 | 44.7 | 20 | 8.6 | 7.0 | 4 | M | Q1
37 | ChaiRM | 46.8 | 42.0 | 17 | 6.9 | 6.5 | 4 | M | Q3
38 | ManUp | 45.2 | 58.0 | 12 | 8.9 | 4.0 | 4 | F | Q2
39 | Chali Co. | 32.8 | 49.0 | 16 | 6.9 | 3.5 | 4 | M | Q4
40 | Case Compass | 29.5 | 46.0 | 6 | 8.7 | 3.5 | 4 | F | Q2
41 | ALLsafeSTATION | 6.2 | 28.0 | 0 | 8.2 | 4.0 | 4 | M | Q2

== INDIVIDUAL SCORER SCORES ==
Format: BG | Christina | DK | Jose | RE

StageWing: 97 | - | 77 | 93 | -
Fandema International: - | 84 | - | - | 95
Agentix: - | 88 | - | - | 85
asoma: 78 | - | 70 | - | 90
Lapapoe: - | 80 | - | - | 86
BizGuider: 77 | - | 63 | 73 | -
Rkube Inc: - | 84 | - | - | 75
Helping HAN: 76 | - | 59 | 100 | - (Jose outlier drives range of 41)
SwapADay: 56 | - | 52 | 100 | - (Jose outlier drives range of 48)
Stool Stomper: 78 | - | 64 | 44 | -
CardioSight: 66 | - | 68 | - | -
Cuddles ANC Inc: - | 77 | - | - | 79
SpectraNote: - | 77 | - | - | 79
Bilharzia BSI: - | 82 | - | - | 70
Pocket Sound Bath: - | 73 | - | - | 74
MintCover: 59 | - | 64 | 55 | -
Life of Mine: 67 | - | 55 | 63 | -
Beor: - | 72 | - | - | 67
EsotericIQ: - | 68 | - | - | 68
Accordia Engine: - | 66 | - | - | 69
Chef A-Peel: 41 | - | 68 | 46 | -
The PEP Institute: 73 | - | 51 | 38 | -
MYERA: 77 | - | 42 | 49 | -
Kindred & Kin: - | 57 | - | 46 | 72
GoodFood: 73 | - | 47 | 25 | -
AlphaSwift Dosimetry: 35 | - | 56 | 24 | -
Imagination Activated: 62 | - | 34 | 26 | -
VibeCheck: 42 | - | 41 | 10 | -
Abundance Intelligence Corp: 17 | - | 38 | 10 | -
DIY Doula: 65 | - | 50 | - | -
Anchored Aerial Systems: 65 | - | 48 | 42 | -
BusyBroker: - | 64 | - | - | 64
Heritage Daily: - | 62 | - | - | 65
WitPrep: - | 56 | - | - | 70
Spooly: - | 56 | - | - | 69
Amphibia AI: 36 | - | 56 | 42 | -
ChaiRM: 49 | - | 45 | 32 | -
ManUp: - | 52 | - | - | 64
Chali Co.: - | 41 | - | - | 57
Case Compass: - | 49 | - | - | 43
ALLsafeSTATION: - | - | - | - | 28

== SCORER CALIBRATION ==
- Jose: Highest-variance scorer. Scored SwapADay and Helping HAN both at 100 — clear outliers that drive the bubble zone classification for both ventures. Also scored VibeCheck and Abundance Intelligence 10 (minimum). Scores should be treated as directional signals, not face value.
- DK: Most conservative scorer overall. DK scored asoma 70 vs RE's 90 — explains asoma's range of 20.
- BG: Generally calibrated, mid-high range. Scored StageWing 97 (highest in pool).
- RE: Consistent, mid-range. Scored Fandema 95.
- Christina: Tight calibration, consistent with RE. Strongest scorer for Bilharzia (82) and Agentix (88).
- Note: EsotericIQ, BusyBroker, and Accordia Engine have range of 0–3 — extremely tight agreement, but only 2 scorers. Treat as directional, not definitive.

== DETAILED VENTURE PROFILES ==

--- AGENTIX ---
Founder: Hussain Punjani | Industry: AI/ML · B2B · Fintech | Norm: 84.5 | FA: 8.8 | RR: 8.0 | Q1
Quadrant rationale: ICM 8.8 — AI/ML + B2B + Fintech, three high-momentum sectors. Payments infrastructure AI is actively funded.
GTM: Advisor-led introductions to ISVs. Senior advisors from ex-Mastercard/FIS/Worldpay. One partnership = distribution to 10K+ merchants — non-linear revenue potential.
Emory/Atlanta advantage: Atlanta is top-3 US FinTech hub. NCR, Global Payments, Worldpay, Fiserv all HQ'd nearby. Goizueta finance alumni unlock warm ISV introductions.
RightShift advantage: AI agents for financial workflows is IntuitioLabs' core. High product development gap. Ship-to-revenue is very fast once product is ready.
Strategy: Priority accept. Accelerator goal: convert one advisor introduction to a signed pilot in 8 weeks. Strong Demo Day closer.
Revenue milestone: 1 signed ISV pilot by Demo Day.

--- ASOMA ---
Founder: Malia Wakesho-Ajwang | Industry: AI/ML · B2B · Consumer · SaaS | Norm: 83.2 | FA: 8.5 | RR: 7.5 | Q1
ADHD-first productivity app for college students. Founder is a full-time Emory student with ADHD — embedded in the exact customer community.
Stage: Building MTP. Raised $9,970. Two entities: Asoma Digital LTD (UK) + Asoma Digital LLC (Delaware). Active Hatchery Innovation Fellow, RightShift graduate (Dec 2025), Techstars Emory alumna.
Visa note: International student; OPT constraints being resolved spring 2026, full launch planned summer 2026.
TAM: $1.27B (13.2M undergraduates), SAM: $480M (ADHD/executive dysfunction students).
Revenue model: Freemium ($8/month or $79/year). Long-term B2B university licenses ($15–75K/year).
Goals: $200K raise or YC Winter 2027. Needs 35%+ 7-day retention by Demo Day.
Emory advantage: Founder IS the customer community — zero CAC for first 500 users across 9 Emory schools. Unique and time-sensitive.
RightShift advantage: AI/ML ADHD SaaS is direct IntuitioLabs match. High product gap. Ship-to-revenue is fast once built.
Strategy: Priority accept. Focus B2C campus launch first. Revenue milestone: 50 paying users on campus by Demo Day. B2B institutional sales is post-program.
Scorer split: RE 90, DK 70 (range 20). DK's conservatism drives the range.

--- RKUBE INC ---
Founder: Ananda Murugan Nagarajan | Industry: AI/ML · B2B Enterprise · Fintech · SaaS | Norm: 75.2 | FA: 8.8 | RR: 8.5 | Q1
AI-powered CFO/bookkeeping for SMBs. Clearest replacement-of-existing-spend story in the cohort (replaces bookkeeper or outsourced CFO).
GTM: Direct executive outreach to SMBs 10–200 employees — the most operationally specific GTM in the cohort.
Emory advantage: Goizueta finance and accounting alumni are the warm referral channel to SMBs seeking bookkeeper replacement.
RightShift advantage: AI SMB CFO SaaS is direct IntuitioLabs match. High product gap. Once shipped, warm customer base pays fast.
Strategy: Top priority accept. Single strongest Q1 candidate in cohort. Revenue milestone: 5 paying SMB clients at $500–$2,000/month by Demo Day.
Comparable: Pilot.com, Ramp — strong investor pattern-match.

--- LAPAPOE ---
Founder: Anike Mlemchukwu | Industry: Healthcare (Disability Care) | Norm: 79.4 | FA: 7.0 | RR: 8.0 | Q1 | Women-founded
Caregiver matching platform for children with disabilities. 7M+ children with disabilities TAM. 384 hrs/year per family is compelling unit economics anchor.
Traction: Organic word-of-mouth through Facebook, ARCH, preschool networks — zero marketing spend. Best early organic traction in the cohort.
Revenue note: Revenue is one pricing decision away. Customers are already transacting.
Emory advantage: Emory Healthcare disability care coordinators and therapists. Goizueta healthcare alumni support distribution.
RightShift advantage: Platform formalization is exactly RightShift's model. No AI/ML component but high product gap. Speed-to-revenue is maximum — ship it, revenue is immediate.
Strategy: Priority accept. Revenue milestone: $10,000 in gross transaction value by Demo Day. Very achievable.

--- SPECTRANOTE ---
Founder: Lechen Dong | Industry: AI/ML · Biotech · SaaS | Norm: 72.8 | FA: 8.8 | RR: 8.0 | Tier 2 | Q1
AI-powered electronic lab notebook (ELN) for research labs. Lab automation AI is one of the most actively funded sub-sectors in 2024–2025.
Emory advantage: Emory chemistry, biochemistry, and pharmacology departments are the first 10 paying customers — accessible today. The Hatchery makes those introductions in Week 1 with zero cold outreach.
RightShift advantage: AI/ML ELN is squarely IntuitioLabs territory. High product gap. Once platform ships, Emory lab subscriptions follow immediately.
Strategy: Priority accept. Revenue milestone: 5 paying lab researcher subscriptions from Emory departments by Demo Day.
Scorer note: RE 79, Christina 77 — tight agreement (range 2). Strong consensus.

--- STAGEWING ---
Founder: Sed Joseph | Industry: eCommerce · Logistics · SaaS · Consumer | Norm: 95.9 | FA: 6.5 | RR: 7.5 | Tier 1 | Q3
Equipment rental marketplace for events. Seed stage with actual traction. Highest normalized score in the cohort.
Existing traction: One of the strongest revenue stories in the pool alongside Spooly.
GTM: Meeting event professionals "where they already are" — trade shows, Facebook groups, Reddit. Event professionals are a concentrated, accessible community.
Quadrant note: Q3 = strong commercial company but not a traditional VC story. Revenue IS the investor story.
Emory advantage: Atlanta's event ecosystem (world's busiest airport) provides dense event planner access through Goizueta alumni.
RightShift advantage: Low product gap — platform exists with traction. RightShift adds refinement and scale.
Strategy: Accept as strong Q3 commercial company. Goal: $50,000 GMV by Demo Day. Position for revenue-based financing or marketplace angels.

--- ESOTERICIQ ---
Founder: Keomaria Camon | Industry: Healthcare · HR Tech · B2B · SaaS | Norm: 59.2 | FA: 7.2 | RR: 8.0 | Tier 4 | Q1
LTC (long-term care) workforce retention SaaS. 350+ licensed nursing homes in Georgia.
Note: Scored only by RE and Christina (both 68) — range of 0. Very tight but limited scorer coverage.
GTM: Direct outreach to Atlanta-area LTC facility administrators. These operators are already spending on turnover solutions RIGHT NOW.
Emory advantage: Atlanta LTC administrators reachable through Emory Healthcare referral network and Goizueta healthcare alumni.
RightShift advantage: HR retention SaaS is standard IntuitioLabs delivery. Speed-to-revenue is very direct.
Strategy: Priority accept despite Tier 4 placement (limited scorers). One of the strongest Q1 opportunities. Revenue milestone: 3 paid pilots with Atlanta LTC facilities at $500–$2,000/month by Demo Day.

--- FANDEMA INTERNATIONAL ---
Founder: Jonathan Hamilton | Industry: FoodTech · Social Impact | Norm: 88.1 | FA: 5.5 | RR: 4.0 | Tier 1 | Q4
Highest raw mean score (89.5) but strong consensus to DECLINE from quadrant analysis.
Quadrant rationale: This is a Gambian microfinance/social enterprise model, not a product company. No B2B or B2C product sale generates near-term operating revenue. Revenue model is personal network impact investments at $1,591 per investor — this is a fund structure.
Strategy: DECLINE. Excellent social enterprise but structurally misaligned with a product accelerator. Refer to Acumen Academy, Echoing Green, MIT D-Lab.
Note: High raw score reflects reviewers' admiration for the mission, not program fit.

--- BIZDGUIDER ---
Founder: Ornella Adekoye | Industry: Fintech · SaaS | Norm: 76.4 | FA: 6.9 | RR: 7.5 | Tier 1 | Q3 | Women-founded
Systematizing a proven manual service — $50M+ in capital already deployed manually for minority-owned SMBs. The hardest revenue objection ("does this work?") is already answered.
GTM: CPA/bookkeeper channel partner model — most specific and credible in the cohort. Partners already have the customer relationships.
Emory advantage: Goizueta MBA alumni ARE the CPA/bookkeeper distribution channel. Start:ME SMB alumni community is a ready customer pool.
Strategy: Accept with capital path clarity. This generates revenue. Reframe investor pitch toward CDFIs, impact investors, OFN — not traditional VC. Revenue milestone: 5 CPA channel partners onboarded, 20 paying SMB subscribers.

--- HELPING HAN ---
Founder: Hamraj Sanghera | Industry: HealthTech · SaaS · B2B | Norm: 80.4 | FA: 7.2 | RR: 5.0 | Tier 3 (BUBBLE) | Q2
Digital cancer survivorship platform. 35-user pilot with Winship Cancer Institute.
BUBBLE NOTE: Jose scored 100, DK scored 59 — 41-point range. Jose's score is a clear calibration outlier. True score likely closer to 65–75 range.
Emory advantage: Winship Cancer Institute is 10 minutes from The Hatchery. Emory oncology relationships compress institutional partnership timelines.
Strategy: Accept with clinical timeline expectations. Add patient-direct revenue track (small monthly subscription) as parallel path to institutional B2B. Demo Day metric: 50 paying patient subscribers + 1 MOU with cancer center.

--- SWAPADAY ---
Founder: Claire Liu Yang | Industry: AI/ML · Consumer · EdTech · HR Tech | Norm: 69.6 | FA: 7.9 | RR: 6.0 | Tier 3 (BUBBLE) | Q1 | Women-founded
Career transition platform using actual job shadowing. Highest disagreement in pool — 48-point range.
BUBBLE NOTE: Jose scored 100, BG scored 56, DK scored 52. Jose is clearly an outlier. True score likely 55–65 range.
Strategy: Conditional accept. Run 10 SwapADay experiences manually first before building the platform. Each experience = market validation AND potential revenue ($50–200 per participant). Revenue milestone: $1,000 from facilitated swap experiences by Demo Day.

--- ACCORDIA ENGINE ---
Founder: Ravi Gona | Industry: AI/ML · B2B Enterprise | Norm: 58.4 | FA: 9.1 (highest in cohort) | RR: 5.5 | Tier 4 | Q1
Highest FA score in the entire cohort (9.1). AI infrastructure enforcement for operators. Clean pitch: "AI infrastructure enforcement for operators." Strong pattern-match to current investor themes.
Gap: GTM ICP ("capital-disciplined operator") is philosophically clear but not operationally specific. No named first customer. No existing spend category being replaced.
Strategy: Accept conditionally. Require founder to name 10 specific companies they will call in week 1. Revenue milestone: 1 signed design partner by Demo Day.

--- LIFE OF MINE ---
Founder: Sushil Bohara | Industry: AI/ML · Healthcare (Behavioral) | Norm: 66.1 | FA: 9.0 | RR: 4.5 | Tier 2 | Q2
AI-powered mental health/habit app for students. FA 9.0 = second-highest in cohort. AI + mental health/wellness is one of the hottest investment categories.
Gap: Freemium to "any student who struggles with habits" is too broad. No named university, no geography.
Emory advantage: Emory's 16,000 students are the named beachhead at zero marketing cost.
Strategy: Accept with freemium-to-revenue plan. Name ONE campus. Set conversion target. Revenue milestone: 100 paying subscribers at $8–10/month by Demo Day.

--- MANUP ---
Founder: Dabney Evans | Industry: AI/ML · HealthTech · SaaS | Norm: 45.2 | FA: 8.9 | RR: 4.0 | Tier 4 | Q2
IPV prevention digital health platform. FA 8.9 — strong sectors. 10+ years public health experience.
Critical issue: 25 hours/week founder commitment. Zero revenue despite 40 users.
GTM: Nonprofits and healthcare systems — 6–18 month procurement cycles.
Strategy: Conditional accept ONLY with 40-hour/week commitment requirement. Revenue milestone: 2 paying organizational clients (even nominal fees) by Demo Day. Target Kapor Capital, MITRE Engenuity — not traditional VC.

--- CARDIOSIGHT ---
Founder: Mendy Lebowitz | Industry: AI/ML · Healthcare · Biotech | Norm: 73.8 | FA: 8.8 | RR: 3.0 | Tier 2 | Q2
AI cardiac risk assessment from existing CT scans. Emory/VA connection for clinical credibility.
Revenue constraint: FDA clearance or de-novo pathway required before clinical revenue. $0 raised, $0 revenue, 0 users.
Emory advantage: Emory cardiology and on-campus VA hospital are clinical validation partners accessible today.
Strategy: Accept if prepared for biotech/medtech path. Demo Day success metric: clinical MOU signed + SBIR submitted + $100K raised. Do NOT measure on commercial revenue.

--- BEOR ---
Founder: George Allen | Industry: AI/ML · GovTech/Defense | Norm: 61.4 | FA: 8.9 | RR: 2.5 | Tier 2 | Q2
AI defense intelligence. One of the hottest sectors (2024–2025). $30B annual defense data/intel tech market.
Revenue constraint: SBIR and DoD procurement cycles = 12–24 months. Revenue before Demo Day is structurally impossible.
Emory advantage: None applicable — no campus, clinical, or Atlanta network pillar maps to DoD procurement.
Strategy: Accept for the right reasons — fundraising story, not revenue story. Goals: SBIR Phase I submitted, 2 DoD program office meetings, $50K–$100K from defense-aligned angels. Don't measure on commercial revenue.

--- CUDDLES ANC INC ---
Founder: Hyunbae Jeon | Industry: AI/ML · EdTech · Consumer · Hardware/IoT | Norm: 72.8 | FA: 8.2 | RR: 5.0 | Tier 2 | Q2
Zero-touch AI child companion. $25.5B Smart Toy market by 2030.
Hardware constraint: Manufacturing lead times dominate the timeline. Revenue in accelerator window requires pre-orders, not shipped units.
Strategy: Accept if hardware is further along than application suggests. Accelerator milestone: launch pre-order campaign targeting Korean diaspora parents. Get 100 pre-orders and a signed manufacturing partnership. Don't start manufacturing without market validation.

--- ALPHASWIFT DOSIMETRY ---
Founder: Mingzhe Hu | Industry: AI/ML · Healthcare · SaaS | Norm: 48.4 | FA: 8.8 | RR: 4.5 | Tier 3 | Q2
AI for radiopharmaceutical dosimetry. Emory/Winship Cancer Institute connection.
Revenue constraint: Clinical validation requires 12–24 months minimum. Revenue before Demo Day is near-impossible.
Emory advantage: Winship Cancer Institute is 10 minutes from The Hatchery. Emory OTT provides SBIR support.
Strategy: Accept as Q2 company. Prepare for medtech/biotech path (NIH SBIR, Emory spinout). Demo Day metric: clinical pilot signed. Don't measure on revenue.

--- BILHARZIA STORYTELLING INITIATIVE ---
Founder: Bertrand BYISHIMO | Industry: Social Impact · Healthcare · EdTech | Norm: 70.6 | FA: 5.5 | RR: 4.0 | Tier 2 | Q4
Global health education focused on neglected tropical diseases, Rwanda NTD Division partnership.
Capital path: Grant and philanthropic capital — not VC. GTM requires government school system procurement.
Strategy: DECLINE or redirect. Excellent social enterprise but structurally misaligned with a product accelerator seeking fundable, revenue-generating ventures. Refer to Echoing Green, Skoll Foundation, USAID DIV.

--- POCKET SOUND BATH ---
Founder: Joel Myers | Industry: B2B · AI/ML · SaaS · Wellness | Norm: 66.6 | FA: 8.2 | RR: 6.0 | Tier 2 | Q1
Interactive AI wellness hardware device. Differentiated from passive listening platforms (Calm, Headspace).
Revenue path: Micro-influencer GTM (10K–50K follower wellness/maternal health/sports performance) — specific and reachable. Pre-orders are the revenue path. Hardware constrains timing.
Strategy: Accept. Get 50 physical units to micro-influencers for content. Revenue milestone: $5,000 in pre-orders by Demo Day.

--- STAGEWING (already covered above) ---

--- THE PEP INSTITUTE ---
Founder: Chloe Taylor Brown | Industry: SaaS · HR Tech · EdTech · B2B · AI/ML | Norm: 59.8 | FA: 8.4 | RR: 6.5 | Tier 3 | Q1 | Women-founded
Leadership development platform. $98B global leadership development market. "Market is crowded but not deep" investor positioning is sharp.
GTM: Three channels (thought leadership, strategic partnerships, direct enterprise sales) — all take >8 weeks to close.
Emory advantage: Atlanta Fortune 500 C-suites (18 HQ'd locally) are the $2–5K/month L&D buyer. Goizueta MBA alumni with HR relationships.
Strategy: Accept. Founder has public credibility — convert existing platform attention to paying contracts. Revenue milestone: 2 mid-market corporate clients ($2–5K/month) from founder's existing network by Demo Day.

--- MINTCOVER ---
Founder: Sonja Kuhn | Industry: InsurTech | Norm: 66.5 | FA: 6.5 | RR: 6.5 | Tier 2 | Q3
AI-powered insurance coverage literacy for life-event triggers. Coverage literacy angle differentiated from price comparison.
GTM: Life event triggers (buying home, having child) through insurance affinity groups, OBGYNs, real estate agents, mortgage brokers.
Emory advantage: Atlanta insurance players (Aflac, State Farm SE, UnitedHealth). Atlanta real estate market concentrates mortgage broker/realtor targets.
Strategy: Accept. Revenue milestone: 10 paid consultations or first commission through a real estate agent/mortgage broker referral partnership by Demo Day.

--- GOODFOOD ---
Founder: Saeed Tamboli | Industry: Climate/Clean Energy · Consumer · FoodTech | Norm: 54.4 | FA: 7.5 | RR: 6.5 | Tier 3 | Q1
Food waste reduction with gas detection differentiation. $2.5B TAM. Strong climate/food waste tailwinds.
Strategy: Accept. Choose between B2C pre-order campaign or B2B pilot with a grocery retailer. B2B path generates first revenue faster. Revenue milestone: B2B pilot signed or $3,000 in pre-orders by Demo Day.

--- MYERA ---
Founder: Aliyah Patterson | Industry: Consumer · eCommerce · AI/ML | Norm: 58.8 | FA: 8.0 | RR: 5.5 | Tier 3 | Q2 | Women-founded
Gen Z AI wellness brand. $40B+ global self-improvement market.
Key question: What does MYERA actually sell — physical product, subscription app, or digital content?
Emory advantage: Emory's 16,000 Gen Z students are the exact ICP — free test market.
Strategy: Accept. Define the product precisely. Run one paid acquisition test ($200–$500) to measure CAC. Revenue milestone: $2,000 in sales with documented CAC by Demo Day.

--- HERITAGE DAILY ---
Founder: Tamara Gordon | Industry: EdTech | Norm: 53.0 | FA: 5.0 | RR: 7.0 | Tier 4 | Q3 | Women-founded
AI-powered homeschool curriculum. $3.5B → $7.2B homeschool market by 2033.
GTM: Direct sales to microschools and homeschool co-ops — most specific and credible of any EdTech venture in the cohort. One co-op director = 30–200 families and immediate revenue.
Strategy: Accept as Q3 commercial bet. Revenue milestone: 3 paying homeschool co-ops or microschool directors by Demo Day. EdTech-focused angels (NewSchools Venture Fund).

--- WITPREP ---
Founder: Fatih Can Yildirim | Industry: EdTech · AI/ML | Norm: 51.9 | FA: 5.5 | RR: 6.5 | Tier 4 | Q3
AI-powered exam prep. "Performance engine vs. digital library" positioning is sharp.
Emory advantage: Emory premed students are the exact customer — MCAT/USMLE demand concentrated on campus with high WTP.
Strategy: Accept. Choose ONE exam (MCAT recommended given Emory Medical). Deploy diagnostic lead magnet to Emory premed students. Revenue milestone: $1,000 MRR from defined exam niche by Demo Day.

--- SPOOLY ---
Founder: Steve Bransford | Industry: Manufacturing/Hardware · IoT · Climate/Cleantech | Norm: 51.2 | FA: 7.1 | RR: 6.5 | Tier 4 | Q1
Commercial HVAC optimization. Already has 2 paying customers and $6,500 in revenue — strongest existing traction alongside Chef A-Peel and StageWing.
Case studies showing 15–25% energy reduction are proof points. "Plug-and-play for mid-market commercial properties" differentiated from enterprise-only competitors.
Strategy: Strong accept. This company already has revenue. Goal: 5 paying customers, $20,000 ARR by Demo Day. Use existing case studies as the sales deck.

--- AMPHIBIA AI ---
Founder: Maxwell Danquah | Industry: AI/ML · HR Tech · B2B Enterprise | Norm: 51.0 | FA: 8.6 | RR: 7.0 | Tier 4 | Q1
HR workforce analytics AI. 40+ customer discovery interviews already completed.
GTM: Design partner program targeting mid-market HR leaders — founder already has the contacts from interviews.
Emory advantage: Atlanta 18+ Fortune 500 HQs. Goizueta MBA alumni convert interviews to design partners.
Strategy: Strong accept despite Tier 4 placement. The gap between 40 conversations and 1 signed design partner is purely execution. Revenue milestone: 3 design partners signed by Demo Day.

--- CHAIRM ---
Founder: Justin Jang | Industry: B2B · SaaS · EdTech | Norm: 46.8 | FA: 6.9 | RR: 6.5 | Tier 4 | Q3
Campus networking platform for business schools. Chicken-and-egg network problem without early traction data.
Emory advantage: Goizueta Business School IS the first customer — Hatchery makes department-level introduction on Day 1.
Strategy: Conditional accept. Revenue milestone: charge Emory business school students $5–10/month OR negotiate department deal with Goizueta by Demo Day. Institutional B2B is faster than consumer conversion.

--- BUSYBROKER ---
Founder: Pamika McWhorter | Industry: EdTech · Real Estate/PropTech | Norm: 53.8 | FA: 5.5 | RR: 5.5 | Tier 4 | Q3 | Women-founded
First-time homebuyer education via TikTok content. B2B mortgage broker/realtor wedge is the faster revenue path.
Strategy: Conditional. Identify one mortgage broker or realtor willing to pay for referrals or co-branded content. That B2B wedge generates revenue faster than consumer subscription.

--- KINDRED & KIN ---
Founder: Juliette Joseph | Industry: eCommerce | Norm: 55.6 | FA: 5.5 | RR: 6.5 | Tier 3 | Q3 | Women-founded
Curated luxury eCommerce for diaspora consumers. Website exists (kindredandkin.com). Product can sell immediately.
Strategy: Conditional. Define the specific curation niche precisely. Revenue milestone: $5,000 in GMV by Demo Day. Position for revenue-based financing or consumer brand angels.

--- CHEF A-PEEL ---
Founder: Thausha Martin | Industry: FoodTech · Manufacturing · Consumer | Norm: 60.4 | FA: 6.5 | RR: 7.5 | Tier 3 | Q3 | Women-founded
Caribbean diaspora food product. Seed stage with actual traction. Most immediately commercializable physical product in cohort. Revenue doesn't require building anything — requires distribution.
Strategy: Accept as Q3 commercial bet. Goal: define the retail distribution wedge. Identify 3 specific retail locations or distribution partners by Demo Day. Strategic investor or food-focused angel, not traditional VC.

--- DIY DOULA ---
Founder: Kayla Thomas | Industry: EdTech · Social Impact | Norm: 58.2 | FA: 4.5 | RR: 5.5 | Tier 4 | Q4 | Women-founded
Maternal health education resource. Key question: B2C subscription, B2B OB/GYN partnership, or grant-funded resource? These are three different businesses.
Emory advantage: Emory Nursing School (#1 MSN) and OB/GYN (#14 nationally) are natural validators.
Strategy: Conditional. Test one specific monetization path: if B2B, get 3 OBGYN practices paying $50/month by Demo Day.

--- VIBECHECK ---
Founder: Vidhi Tiwary | Industry: AI/ML · Consumer | Norm: 36.9 | FA: 8.4 | RR: 4.5 | Tier 3 | Q2 | Women-founded
Real-time local social discovery AI app. 10 users, $500 raised. Very early.
Strategy: Conditional. Launch in ONE venue as a case study. Get that venue to pay $200/month for analytics/promoted placement. Revenue milestone: 3 paying venue clients by Demo Day.

--- CASE COMPASS ---
Founder: Linh Le | Industry: AI/ML · LegalTech | Norm: 29.5 | FA: 8.7 | RR: 3.5 | Tier 4 | Q2 | Women-founded
AI legal screening tool. Strong sector (AI LegalTech actively funded in 2024). But: no quantified TAM, ad-based revenue model requires massive scale, no WTP signal.
Emory advantage: Emory Law School (top-25) — 1,000+ students and faculty as potential beta users.
Strategy: DECLINE for this cycle. Homework: test whether users will pay $19–29/month (vs. ad-based), find 5 paying users, quantify the market, reapply.

--- ABUNDANCE INTELLIGENCE CORP ---
Founder: Anvith Anand | Industry: AI/ML · B2B · GovTech · SaaS | Norm: 26.7 | FA: 8.8 | RR: 3.0 | Tier 3 | Q2
Government proposal writing AI. FA 8.8 — excellent sector. But GTM is "conferences and cold outreach" with 1 total user. Most generic GTM in the cohort.
Strategy: DECLINE for this cycle. Sector is right, motivation is clear. Needs 2–3 more months of customer discovery. Homework: 20 customer interviews, define specific ICP, reapply.

--- ALLSAFESTATION ---
Founder: Kyle Roedler | Industry: GovTech · Transportation · IoT · Climate · AI/ML | Norm: 6.2 | FA: 8.2 | RR: 4.0 | Tier 4 | Q2
Lowest normalized score in the pool. Multi-product pitch spanning 8 industry categories — very difficult to construct a coherent investor pitch. School board GTM via social media/radio is structurally misaligned.
Strategy: Conditional at best. Demands narrative focus — define ONE customer type and ONE value proposition. Complete GTM restructuring required.

--- IMAGINATION ACTIVATED ---
Founder: Tamiia Quinn | Industry: EdTech · Social Impact | Norm: 43.6 | FA: 3.4 (lowest in cohort) | RR: 4.0 | Tier 3 | Q4 | Women-founded
Lowest FA score in cohort. Founder working 15 hours/week. No named first customer, no beachhead, no specific GTM.
Strategy: DECLINE for this cycle. Needs 3–6 more months: identify ONE organization willing to pay anything, build specific curriculum around that contract, then apply to social enterprise program.

--- STOOL STOMPER / I.D.E.A.S. GLOBAL TECH ---
Founder: Mariana Stephens | Industry: Biotech · Social Impact · Healthcare · GovTech | Norm: 70.3 | FA: 6.5 | RR: 4.5 | Tier 3 (BUBBLE) | Q3
Global health diagnostics for bilharzia/NTD. Founder explicitly frames commercialization as 5–10 year path through WHO partnerships.
BUBBLE NOTE: BG 78, DK 64, Jose 44 — 34-point range.
Strategy: DECLINE for this accelerator. Belongs in global health innovation programs (PATH, Grand Challenges Canada, Wellcome Trust, NIH Fogarty).

--- ANCHORED AERIAL SYSTEMS ---
Founder: Jacob Beldick | Industry: Manufacturing/Hardware · Climate/Cleantech · B2B | Norm: 56.4 | FA: 7.1 | RR: 3.5 | Tier 4 | Q2
Hardware aerial systems. Idea stage, zero revenue, zero users. Part-time founder (20 hrs/week).
Strategy: DECLINE or defer. Hardware at idea stage is a structural mismatch with an 8-week software accelerator. Recommend HAX, Y Combinator hardware track.

--- CHALI CO. ---
Founder: Chadwick Medeiros | Industry: Healthcare · GovTech | Norm: 32.8 | FA: 6.9 | RR: 3.5 | Tier 4 | Q4
Global health dashboard for NGOs. 10 hours/week founder commitment — disqualifying.
Strategy: DECLINE. 10 hours/week is disqualifying for an accelerator. Invite reapplication when 40+ hours/week and one paying public health client.

== EMORY × RIGHTSHIFT ADVANTAGE SCORING ==
Each venture rated 0–2 on six pillars:
Emory pillars: Campus Access | Clinical/Research | Alumni Network
RightShift pillars: AI/ML Capability | Product Build Gap | Speed to Revenue

Top Emory + RightShift combined advantages:
SpectraNote: Campus 2 | Clinical 2 | Network 1 | AI/ML 2 | Product 2 | Speed 2 → Maximum fit
asoma: Campus 2 | Clinical 0 | Network 1 | AI/ML 2 | Product 2 | Speed 2 → Maximum fit
Agentix: Campus 0 | Clinical 0 | Network 2 | AI/ML 2 | Product 2 | Speed 2 → Maximum fit
Rkube Inc: Campus 0 | Clinical 0 | Network 2 | AI/ML 2 | Product 2 | Speed 2 → Maximum fit
Amphibia AI: Campus 0 | Clinical 0 | Network 2 | AI/ML 2 | Product 2 | Speed 2 → Maximum fit
WitPrep: Campus 2 | Clinical 2 | Network 0 | AI/ML 2 | Product 2 | Speed 2 → Maximum fit
ChaiRM: Campus 2 | Clinical 0 | Network 2 | AI/ML 1 | Product 2 | Speed 2 → High fit
Lapapoe: Campus 0 | Clinical 1 | Network 1 | AI/ML 0 | Product 2 | Speed 2 → High fit
EsotericIQ: Campus 0 | Clinical 1 | Network 2 | AI/ML 1 | Product 2 | Speed 2 → High fit
BizGuider: Campus 1 | Clinical 0 | Network 2 | AI/ML 1 | Product 2 | Speed 2 → High fit

Ventures with low Emory/RightShift advantage: Beor, ALLsafeSTATION, Anchored Aerial Systems, Abundance Intelligence Corp (no campus, clinical, or network pillar applies)

== RECOMMENDED SELECTIONS — SUMMARY ==
PRIORITY ACCEPTS (Q1 + Strong fit): Rkube Inc, Agentix, asoma, Lapapoe, SpectraNote, Amphibia AI, EsotericIQ
STRONG ACCEPTS (Q1 or Q3 commercial): StageWing, Spooly, BizGuider, Heritage Daily, WitPrep
CONDITIONAL ACCEPTS (require specific commitments): Accordia Engine, SwapADay, ChaiRM, GoodFood, ManUp (with full-time commitment), The PEP Institute
ACCEPT WITH ADJUSTED METRICS (Q2 — no revenue expectation): CardioSight, Beor, Helping HAN, AlphaSwift Dosimetry, Life of Mine
DECLINE: Fandema International, Bilharzia BSI, Stool Stomper/I.D.E.A.S., Anchored Aerial Systems, Imagination Activated, Abundance Intelligence Corp (reapply), Case Compass (reapply), ALLsafeSTATION, Chali Co.

Always respond with specific scores, quadrant data, and strategy recommendations when available. Cite FA, RR, norm score, and range when discussing a venture. If someone asks for a decision recommendation, give one — don't hedge. Keep responses concise but data-complete.
`;

const SUGGESTED_QUESTIONS = [
  "Give me your full recommended cohort with reasoning",
  "Which Q1 ventures should be priority accepts?",
  "Walk me through the bubble zone ventures",
  "Which ventures should we decline and why?",
  "Compare Rkube, Agentix, and asoma",
  "Which women-founded ventures are strongest?",
  "Flag scorer calibration issues I should know about",
  "Which ventures have the strongest Emory advantage?",
];

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi — I'm your 2026 cohort analyst for Hatchery × RightShift.\n\nI have the complete picture: normalized scores, raw scores, quadrant analysis (Fundability × Revenue Readiness), per-venture strategy recommendations, Emory/RightShift advantage ratings, and scorer calibration notes across all 41 applicants.\n\nWhat would you like to dig into?",
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

        {/* Pool stats pills */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { label: "Applicants", val: "41" },
            { label: "Avg Score", val: "60.6" },
            { label: "Priority", val: "7" },
            { label: "Decline", val: "9" },
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
            placeholder="Ask about ventures, scores, quadrant placement, or selection decisions..."
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
          Powered by scoring, quadrant, and advantage analysis · March 2026 · 41 ventures
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
