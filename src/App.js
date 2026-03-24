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

== APPLICATION DATA (Raw Submissions) ==

Full application details for all 42 ventures. Use this section to answer questions about founders, team background, GTM, revenue models, product stage, and self-stated goals.


--- ALLsafeSTATION by AllSafeApp.com ---
Founder: Kyle Roedler | Email: AllSafeAppPublic@gmail.com
Role: Inventor / Founder | Emory: Yes | School: Other | Degree: N/A
Location: 2477 n decatur rd c5 north decatur ga 30033 | Industry: Government / GovTech,Transportation / Mobility,Social Impact / Non-profit,Hardware / IoT,Fintech,Climate / Clean Energy,Artificial Intelligence / Machine Learning,B2B / Enterprise Software
Stage: Testing,Product/Market Fit,Sustainability and Scale,Building | Team: 15 | Co-founder: Yes
Co-founders: Vivek Tangudu
Costa Avirilopous
Michael Lawson
Torian Reed
Roberto Velarde
Patrick Reed
Reginal Drummer
Dwayne Richards
Nick Suppiah
DeMario Mcclain
Ann Roedler
Scott Wise
Co-founder skills: Mental Health Specialists
Technology Business 
Data Analysis 
Cyber Security
Coding Architecture 
UI/ UX design
Graphics
Marketing Branding
Weekly hours: 65 | Started: 6/15/2022
Overview: ALLsafeSTATION by ALLsafeAPP.com, Peace of Mind + Smart Safety (Mental Health video access in privacy) combine, Verizon Frontline Wifi, & ParkEnt “LOCKING” Micro Mobility chargers, into GA Power Green-hybrid tech solution.

Our GA Grown & ELITE technology Innovation Development Team at ALLsafeApp.com, empowers every U.S. student, teacher, parent, & local citizen to enjoy accessible, enhanced safety, mental health screening, for FREE! (15min), helping to improve accessible help in critical crisis
Problem: Mental Health Lonliness & Isolation that Manifests to violence & Public Social Media threats to society & schools & churches
Evidence: Intense research & discovery 
Ga State University 
Kennesaw State University
Apalachee School Parents
Differentiation: We Only respond with Licensed Mental Health counselors or DeEscalation peer support specialists (no police or swat)
Target audience: Students 
Teachers
Parents
School Boards
Churches / Places of Worship
City Govt
State Govt
Federal Govt
University 
Colleges
Daycares
Malls
Parks
Stadiums
Concert Venues
GTM: MASSIVE marketing campaigns via social media & radio / podcasts for School Board registration links to sign up
Revenue model: '-$10-20 per student per semester (govt)
- upgrades & extra features for users (parents)
Pay Station Parking Fee
WIFI ANTENNA FREE or pay
ALLPOINT ATM
CHARGER PLUGS
5G+ antennas
ELEVATED CAM
TETHERED DRONES
BIRD scooters
LIME scooters
CITYBIKE hub
UB
TAM/SAM/SOM: 400 million americans & US visiting people
Users: 10 | Paying: 10 | Revenue to date: $0.00
Largest customer: State of GA $8million
Incorporated: Yes | Entity: ALLsafeApp USA llc dba ALLsafeSTATION  Georgia
Investment raised: $0.00 | Fundraising: Yes | Monthly burn: $1500.00
Prior accelerators: Atl Tech Village
ATDC Ga Tech
GA State ENI
KSU hackathon
Summer goals: BE IN APP STORE & live testing @ pilots with schoold & at world cup FIFA
Why right founder: yes GOD chose me
Achievement: Ive won SEMA national USA auto design awards 

Ive helped raise 2 incredibly amazing daughters

--- WitPrep ---
Founder: Fatih Can YILDIRIM | Email: fatih.yildirim@emory.edu
Role: Founder | Emory: Yes | School: Goizueta Business School | Degree: FT MBA
Location: St.Petersburg, FL | Industry: Education / EdTech
Stage: Product/Market Fit,Sustainability and Scale | Team: 1 | Co-founder: No
Weekly hours: 70 | Started: 12/15/2025
Overview: Witprep is an AI-powered learning platform that makes preparing for high-stakes exams like the GRE, SAT, and IELTS simpler, accessible and more effective for students everywhere. Our technology creates personalized study paths and real-time practice simulations that adapt to each user's unique strengths, ensuring they are fully confident by test day. By replacing outdated, one-size-fits-all study guides with a scalable and intelligent ecosystem, we deliver a premium experience for learners and a
Problem: The Problem: The "Execution Gap"
For many students, the obstacle isn't a lack of knowledge (IQ); it's a breakdown in cognitive execution under pressure.

The ADHD Barrier: Traditional prep is linear and repetitive, which often leads to "cognitive fatigue" or "zoning out" for neurodivergent students. They may know the material but struggle with the 
Evidence: 1. Bridging the "Execution Gap" (Clinical Validation)
Standard test prep assumes that if a student knows the material, they will perform. However, research into test-taking behavior shows a massive "execution gap" caused by neurodiversity and stress.

The Evidence: Clinical data confirms that studen
Differentiation: 1. From "What You Know" to "How You Perform"
Most competitors are essentially digital libraries—they provide videos and practice questions. Witprep is a performance engine.

The Difference: While a book tells you the answer is "B," Witprep’s AI analyzes the way you arrived at "B." If you hovered ove
Target audience: Global Graduate Program Applicants
High School Students (US & International)
Non-Native English Speakers

Market Volume Data: Global testing trends show that millions of students take the GRE and IELTS annually. In regions like India, the volume of test-takers is consistently high, creating a massiv
GTM: 1. The "Diagnostic" Lead Magnet (The Hook)
Instead of just asking for an email for a newsletter, we use the free tools to provide immediate self-discovery.

The Anxiety Scorecard: A 2-minute "Exam Stress Audit" that tells a student exactly where they fall on the test-anxiety spectrum.

The ADHD Focu
Revenue model: We utilize a Hybrid-SaaS Model that combines steady recurring revenue with consumption-based upside:

Tiered Subscription (The "Path to Success"):

Essential ($9/mo): Access to the core question bank and basic AI-adaptive study paths.

Performance Pr
TAM/SAM/SOM: The market for Witprep is massive, fragmented, and rapidly shifting toward AI-native solutions like ours.

Global Exam Prep & Tutoring: As of 2026, the global market for exam preparation and tutoring 
Users: 25 | Paying: 0 | Revenue to date: $0.00
Incorporated: Yes | Entity: Limited Liability Company (LLC) Florida, USA
Investment raised: $0.00 | Fundraising: No | Monthly burn: $1500.00
Prior accelerators: No
Summer goals: Focusing on growth of WitPrep
Why right founder: I believe I am the right founder because I personally experienced the problem while preparing for the GRE and IELTS — spending significant time and money navigating fragmented resources, one-size-fits-all study methods, and a lack of personalized guidance that led to inefficiencies and lost time. As
Achievement: I founded the “Hayaller Kuruyoruz” association to help reduce educational inequality, leading the successful establishment of 12 libraries across 11 different cities in Turkey and mobilizing volunteers and resources to expand access to learning oppor

--- Cuddles ANC Inc ---
Founder: Hyunbae Jeon | Email: harry.jeon@emory.edu
Role: CEO | Emory: Yes | School: Laney Graduate School | Degree: MS Computer Science, 2026
Location: 120 West Trinity Place, Decatur, GA 30030 | Industry: Artificial Intelligence / Machine Learning,Education / EdTech,Consumer,SaaS,Hardware / IoT,B2B / Enterprise Software
Stage: Product/Market Fit | Team: 1 | Co-founder: No
Weekly hours: 40 | Started: 3/3/2025
Overview: Cuddles is a screen‑free AI companion doll and parent analytics platform that strengthens children’s language development, emotional expression, and daily communication. Our hardware + SaaS ecosystem combines a personalized conversational plushie with a parent app that visualizes mood trends, language growth, and safety signals, validated through real‑family pilots and supported by an angel investment. We are now entering a paid pilot and first production run, positioning Cuddles to scale into b
Problem: Parents face a major daily dilemma: they desperately want to reduce their children's screen time but lack viable, highly engaging educational alternatives. Furthermore, modern parents' busy schedules create a "blind spot" where they miss out on fully understanding their child's rapidly evolving emotions, vocabulary, and interests.

We know this is 
Evidence: Our strongest evidence comes from the success of our initial pilot with 20 families, which validated both user engagement and commercial viability.

Child Engagement: Kids loved the deep immersion of the AI, whispering secrets to the doll, and utilizing the AI's ability to endlessly answer their "Wh
Differentiation: Cuddles is the market's first truly autonomous, zero-touch AI companion.

Hardware Superiority: Unlike competitors (e.g., Curio, Catius) that require manual button presses to interact or use wired charging, our hardware uses a "zero-touch" wake-up base that listens as soon as it's lifted and feature
Target audience: Our primary target audience is parents of children aged 3 to 10, often referred to as the "Pre-Smartphone" demographic. Specifically, we target millennial and Gen Z parents who are highly invested in early childhood EdTech, language development, and screen-free educational alternatives.

We know thi
GTM: Our Go-To-Market strategy is phased to ensure scalable customer acquisition:

Phase 1 (Initial Launch): We will initially launch in the South Korean market via dominant local e-commerce platforms like Naver Smart Store and Coupang to capture early adopters and establish our direct-to-consumer (D2C) 
Revenue model: We operate on a highly scalable Hardware + Subscription (SaaS) business model.

Hardware Entry: The Cuddles plushie device retails for $150 USD. We achieve an approximate 81% gross margin on a production basis.

Recurring Revenue (SaaS): To unlock th
TAM/SAM/SOM: We are targeting the rapidly expanding Smart Toy market, which is projected to reach $25.5 Billion by 2030, driven by the integration of Generative AI.

TAM (Total Addressable Market): The broader Glo
Users: 20 | Paying: 0 | Revenue to date: $0.00
Incorporated: Yes | Entity: Georgia C‑Corporation
Investment raised: $150000.00 | Fundraising: Yes | Monthly burn: $500.00
Prior accelerators: no
Summer goals: This summer, my primary goals are to complete a paid pilot with 50-100 families, refine our parent reporting features based on real usage data, and prepare for our first consumer launch. In parallel, I aim to validate our education-facing use cases by partnering with early childhood centers and speech‑language professionals. By the end of the summe
Why right founder: I built the entire Cuddles prototype myself—including the cloud‑based STT‑LLM‑TTS conversational system—and validated the need through an unpaid pilot with real families. My background in NLP and speech processing gives me the technical foundation to build safe, reliable conversational AI for childr
Achievement: I led the development of multiple real‑world AI systems, including a dementia‑survey conversational agent used in clinical research settings and an on‑premise LLM stack for financial institutions that significantly improved domain accuracy. These pro

--- Rkube Inc ---
Founder: Ananda Murugan Nagarajan | Email: anandamurugan.nagarajan@emory.edu
Role: Co-founder | Emory: Yes | School: Goizueta Business School | Degree: 2026
Location: Raleigh, NC | Industry: Artificial Intelligence / Machine Learning,B2B / Enterprise Software,Fintech,SaaS
Stage: Building,Idea | Team: 10 | Co-founder: Yes
Co-founders: https://www.linkedin.com/in/rathnaramalingam/
Co-founder skills: Co-Founder 1 – Delivery & Client Leadership
	•	Delivery Governance & Quality Assurance
	•	Client Acquisition & Executive Relationship Management
	•	Ensuring SLA adherence and service excellence
	•	Cus
Weekly hours: 25 | Started: 5/1/2023
Overview: RKube’s project focuses on delivering AI-powered bookkeeping and tax filing solutions tailored for growing small and mid-sized businesses. By integrating intelligent automation, data analytics, and machine learning-driven insights, we ensure accurate financial reconciliation, compliance readiness, and optimized tax strategies. Our goal is to reduce operational overhead, improve financial clarity, and enable business owners to make faster, data-driven decisions with confidence.
Problem: Our target audience  - small to mid-sized and fast-growing companies - faces a critical challenge, finance operations become expensive, inefficient, and difficult to scale as the company grows. Maintaining an in-house accounting team requires high fixed salaries, benefits, software subscriptions, and management overhead. At the same time, many team
Evidence: We have early validation through direct client conversations, pilot discussions, and real cost comparisons with companies currently maintaining in-house accounting teams. In multiple cases, we’ve identified 25–35% potential cost savings while simultaneously improving reporting speed and automation l
Differentiation: Our solution is superior because it combines AI-powered automation, human-verified accuracy, and executive-level financial intelligence into a single, integrated model. Most competitors fall into one of two categories- traditional accounting firms that rely heavily on manual processes, or low-cost o
Target audience: Our target customers are small to mid-sized businesses (10–200 employees), startups, and fast-growing companies that need professional finance and accounting operations but want to avoid the high fixed cost of maintaining a full in-house team. These companies typically spend between $300K–$1M annual
GTM: Our go-to-market strategy focuses on direct executive outreach, strategic referrals, and industry positioning as a finance modernization partner rather than a traditional bookkeeping vendor.

We primarily target founders, CEOs, and CFOs of small-to-mid-sized companies through:
	1.	Warm Introductions
Revenue model: We generate revenue through a recurring subscription-based model for finance and accounting operations. Clients pay a fixed monthly retainer based on the scope of services (bookkeeping, payroll, AP/AR, reporting, compliance, etc.) and transaction vol
TAM/SAM/SOM: Our primary market consists of small to mid-sized businesses (10–200 employees) in the U.S. and globally that require professional finance operations but want to avoid the high fixed cost of maintaini
Users: 4 | Paying: 2 | Revenue to date: $26000.00
Largest customer: 18000
Incorporated: Yes | Entity: RKUBE INC
Investment raised: $0.00 | Fundraising: No | Monthly burn: $3000.00
Prior accelerators: no
Summer goals: Our primary goal for the summer is to secure 2–3 pilot clients and validate our 30% cost-reduction model in live environments. This will allow us to refine our onboarding process, document measurable savings, and build strong case studies demonstrating both financial impact and operational improvements.

We also aim to standardize our delivery play
Why right founder: We believe we are uniquely positioned to solve this problem because we combine deep operational experience, executive-level strategy, and technology-driven transformation expertise within our founding team.

My co-founder brings strong expertise in delivery governance, quality assurance, and executi
Achievement: I lead AI-enabled digital transformation at IBM for Elevance Health, managing a mission-critical API portfolio that supports 7+ billion documents across healthcare operations. With 22+ years of enterprise experience, I have delivered multimillion-dol

--- Lapapoe ---
Founder: Anike Mlemchukwu | Email: anike@lapapoe.com
Role: Founder | Emory: No | School: N/A | Degree: N/A
Location: Atlanta, Georgia | Industry: Healthcare
Stage: Product/Market Fit | Team: 3 | Co-founder: No
Weekly hours: 40 | Started: 6/2/2022
Overview: Lapapoe is a digital health company improving access to respite care for families raising children with disabilities. We connect families with providers who understand their child’s developmental, behavioral, and communication needs; with a focus on compatibility supporting care continuity. Our next phase includes building AI-enabled matching and care coordination tools to strengthen long-term family stability.
Problem: Families raising children with disabilities face overwhelming caregiving demands alongside work and daily life. Research shows that 40% of parents of children with intellectual and developmental disabilities leave the workforce due to these responsibilities, and often experience burnout and chronic stress. The care system is fragmented, hard to nav
Evidence: This solution was developed in response to challenges that were observed through conversations with customers. Additionally,  early traction shows that this is an area of focus. This includes:
•	$17,000 in revenue generated in the first-year 
•	5 active paying families
•	100% of customers acquired t
Differentiation: Platforms such as Care.com operate as broad caregiving marketplaces across childcare, senior care, and household services.
Papa primarily partners with health plans and focuses on companionship and light support.
Lapapoe is purpose-built for families navigating disability, trauma, and behavioral hea
Target audience: Lapapoe currently serves families raising children with disabilities who need respite care.
Future expansion includes employer-sponsored caregiver benefits, healthcare insurance partnerships, and government contracts.
GTM: Initial traction has come through no marketing spend. Specifically through word of mouth referrals, including recommendations from local communities on Facebook, listing sites like ARCH, and preschool teachers. Currently, 56% of our traffic is direct, 27% is organic, 10% comes from referrals, and 7%
Revenue model: Families pay a minimum of $25 per hour for respite care. Lapapoe retains a 22% commission.
The current average hours of care booked by a family are 32 a month, with the current lifetime value per family at approximately $6,400.
The long-term model ex
TAM/SAM/SOM: Over 7 million children in the United States live with a disability.
Families require an average of 384 hours of respite care annually. Under the current commission model it provides a potential marke
Users: 5 | Paying: 5 | Revenue to date: $17000.00
Largest customer: Revenue is currently generated through direct family payments based on hours of care used.
Incorporated: Yes | Entity: LLC, Also recently registered for Delaware C Corp
Investment raised: $0.00 | Fundraising: Yes | Monthly burn: $135.00
Prior accelerators: •	NIH Entrepreneurship Bootcamp
•	HatchBridge
•	Women Entrepreneurship Initiative
•	Zane Venture Readiness
Summer goals: Increase Active Paying Families
Reach more families through marketing and outreach.
Make it easier for new families to get started and stay engaged.
Listen to families’ feedback to improve our services.

Build More Referral Partnerships
Connect with schools, clinics, and community programs to get referrals.
Create clear referral programs with incen
Why right founder: Over 15 years I have worked with children with disabilities and their families in the UK and US. Observing the challenges that they experience. This has given me insight into their needs, how they adopt and trust technology, and the gaps in care coordination. 
I hold a BSc in Psychology from Brunel 
Achievement: Lapapoe was originally launched in London as a product marketplace, generating sales across the U.S., Australia, and Denmark. Without a technical background, I built a platform on WordPress, established vendor agreements, generated revenue and achiev

--- Heritage Daily ---
Founder: Tamara Gordon | Email: tamara428@gmail.com
Role: Co-Founder | Emory: No | School: N/A | Degree: N/A
Location: Atlanta, Georgia | Industry: Education / EdTech
Stage: Building | Team: 2 | Co-founder: Yes
Co-founders: Dr. Tasha Ellis - https://www.linkedin.com/in/tasha-ellis-39aa76b7/
Co-founder skills: Dr. Tasha Ellis, Co-Founder / Chief Content Officer. Dr. Ellis is an active microschool founder with deep expertise in curriculum development, culturally affirming pedagogy, and African American histo
Weekly hours: 20 | Started: 8/15/2025
Overview: Heritage Daily is a daily African American history education app that teaches students the full story, from ancient African civilizations through the modern era, with each lesson building progressively on the last. Designed like Duolingo, the app uses AI to adapt content for elementary, middle, and high school learners, making it accessible for homeschool families, microschools, and independent learners. At a time when DEI curricula are being stripped from public education, Heritage Daily ensure
Problem: African American history is systematically undertaught in public schools, and recent federal rollbacks of DEI initiatives have accelerated that gap. Families who care deeply about cultural education are forced to cobble together resources from multiple disconnected platforms, none of which offer a daily, progressive, AI-adapted learning experience.
Evidence: We have built a landing page (daily-heritage-scribe.lovable.app) and have a co-founder who is an active microschool operator, meaning we have immediate access to our target customer for validation. The daily habit model is proven by Duolingo's 500M+ user base, and applying that structure to cultural
Differentiation: Existing Black history apps like Blackfacts.com and Black Excellence Daily deliver isolated daily facts with no progressive curriculum and no AI personalization. Heritage Daily is the only solution combining a structured, cumulative curriculum spanning African civilizations through modern America wi
Target audience: Our primary customers are homeschool families and microschool operators serving African American children, followed by individual families seeking supplemental education outside traditional school systems. We know this is the right audience because co-founder Dr. Tasha Ellis runs a microschool and w
GTM: We will launch by selling directly to microschools and homeschool co-ops using Dr. Ellis's existing network as our first channel. Each institutional sale reaches multiple families at once, compressing customer acquisition cost and generating early revenue. From there, word-of-mouth within tight-knit
Revenue model: Two revenue streams: (1) Institutional subscriptions for microschools and homeschool co-ops at approximately $200 to $500 per year per organization. (2) Individual family subscriptions at approximately $8 to $10 per month. The B2B channel comes first
TAM/SAM/SOM: The U.S. homeschool market is valued at $3.5 billion and projected to reach $7.2 billion by 2033. There are approximately 3.1 million homeschooled K-12 students in the U.S., with 41% identifying as no
Users: 0 | Paying: 0 | Revenue to date: $0.00
Incorporated: No | Entity: Delaware C Corp
Investment raised: $0.00 | Fundraising: No | Monthly burn: $0.00
Prior accelerators: Tamara Gordon completed the Outskill AI Generalist Fellowship with distinction, including an in-person graduation cohort in India. This experience directly informed the development of Heritage Daily a
Summer goals: By the end of the program, we want to have a functional MVP with at least one institutional pilot customer, a validated pricing model, and a clear 90-day post-program roadmap to 10 paying organizations. We also want to finalize our content architecture and the AI personalization layer that adapts lessons by grade level, complete our LLC incorporati
Why right founder: Tamara Gordon spent 15 years as a social studies educator before transitioning into AI strategy, giving her a rare combination of deep curriculum expertise and technical implementation skills. She completed an AI Generalist Fellowship with distinction, has spent the past several years helping large 
Achievement: My two children are my greatest achievement. Beyond that, as a culminating project for my AI Generalist Fellowship, I built an AI-powered application from scratch, earning the fellowship distinction and a Chatroom Cheerleader award for community impa

--- Agentix ---
Founder: Hussain Punjani | Email: hussain.punjani@alumni.emory.edu
Role: Founder & CEO | Emory: Yes | School: Goizueta Business School | Degree: N/A
Location: Atlanta | Industry: Artificial Intelligence / Machine Learning,B2B / Enterprise Software,Fintech
Stage: Building,Testing | Team: 3 | Co-founder: Yes
Co-founders: https://www.linkedin.com/in/karimissa1?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAAbLMEBEus9vDfGncFBHsCux2ziBsUZhu0&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B23bQkBeBQXeF9z2sUKealQ%3D%
Co-founder skills: CTO, MIT background, Deep expertise and background as a leader at oracle, amex, mastercard and has launched multiple startups in a CTO role
Weekly hours: 80 | Started: 12/8/2025
Overview: Agentix is an agentic managed service payments orchestrator that turns existing ecommerce and payment platforms into AI-ready commerce networks with one low-code integration, enabling instant checkout in ChatGPT and Gemini, agent-to-agent commerce, and direct sales through AI assistants, so merchants can sell without rebuilding systems or hiring AI teams.
Problem: Ecommerce ISVs need to make their merchants buyable by AI agents (ChatGPT, Gemini, retail agents) without rebuilding their entire payments stack or losing control to Stripe/Google. Today their merchants are invisible to AI protocols like ACP/UCP, so every agent-initiated purchase is a missed sale and a churn risk.

This is a real, urgent problem be
Evidence: Early evidence of product-market fit:

Customer validation: Multiple mid-market ISVs (10M–250M GMV) validating the "locked out" problem in discovery calls; LOIs in progress for pilot integrations—budget confirmed at $10K–15K/mo tier.
​

Technical feasibility: Dual-plugin architecture proven in proto
Differentiation: Agentix stands out by being the neutral, ISV-first protocol adapter—enabling mid-market ecommerce platforms to connect their merchants to all AI agents (ChatGPT, Gemini, etc.) via universal ACP/UCP support in days, not the 1M/12-18 months of DIY builds. Unlike Stripe/Google's proprietary walled gard
Target audience: Mid tier ISV's and e commerce platforms, major merchants. They are the direct bene
GTM: GTM: Advisors (ex-Mastercard/FIS/Worldpay) drive direct ISV referrals; payfac partnerships distribute to 10K+ merchants/ISVs at once.

Advisor-led sales: Senior advisors (Wave CEO, FIS CGO) open doors to mid-tier ISVs—multiple discussions/LOIs already.
​
Payfac distribution: Partner with networks/ma
Revenue model: Revenue Model
Agentix has a dual revenue model combining recurring SaaS with usage-based revenue share:

SaaS Tiers (recurring): Foundation ($5K/mo), Growth ($15K/mo), Enterprise (custom)—paid by ISVs for platform access, analytics, and protocol enab
TAM/SAM/SOM: Target customers: Mid-tier ISVs (5-10K merchants) and regional acquirers/processors (50-500K merchants) in retail, hospitality, D2C apparel, luxury goods, specialty food, omnichannel retail.
​
Market 
Users: 5 | Paying: 3 | Revenue to date: $2000.00
Largest customer: Multiple shopify merchants, they are onboarding and ramping up sales, avg 1-2K
Incorporated: Yes | Entity: Delaware C Corp
Investment raised: $0.00 | Fundraising: Yes | Monthly burn: $20000.00
Prior accelerators: have been recruited by Antler, techstars, ignite and other but they weren't the right fit
Summer goals: Finalize enterprise-grade MVP: Live dual-plugin core (ACP/UCP) with Shopify integration; validate 2-week rollout, security/compliance, and Control Center dashboard with 1 anchor ISV pilot (5K merchants).
​

Drive distribution: Secure 3–5 live ISVs generating first agentic GMV (~5K total); kick off payfac partnerships for 10x merchant reach; hit $35
Why right founder: As Agentix founder, Hussain brings unmatched founder-market fit with proven skillsets in product strategy, commercialization, and scaling fintech infrastructure from leadership roles at AIG, Visa, FIS, and Worldpay, where I generated over $500M in new revenue by taking ideas from concept to market d
Achievement: Commercialized and directly generated over 500M in revenue in my leadership roles at Visa, FIS, AIG. 

Created an AI executive coaching platform, which is live and is generating revenue, it was a side project after meeting with colleagues and friends

--- Case Compass ---
Founder: Linh Le | Email: linh.le@alumni.emory.edu
Role: founder | Emory: Yes | School: Other,School of Law | Degree: N/A
Location: Atlanta | Industry: Artificial Intelligence / Machine Learning,LegalTech
Stage: Testing | Team: 1 | Co-founder: No
Weekly hours: 20 | Started: 12/15/2026
Overview: Case Compass is a legal AI agent named that allows users to input basic case information, identify comparable past cases, and receive a preliminary assessment of potential outcomes.  Current AI assistants such as Chat GPT, Microsoft Copilot can answer any legal questions, but the problem is that their answers could mislead the public due to AI hallucination and lacking legal professionals’ evaluation. As I study in law school, I can train the legal AI agent, evaluates its output and increases le
Problem: People tested my prototype have asked questions about parking ticket citation, pattern their ideas, legal ground to sue family member, etc. People who think they might have a legal issue but they are not sure and don't have enough conviction to hire an attorney for few hundred dollars per hour to answer their questions. They would use the internet 
Evidence: I have tested my own prototype by pretending to be defendants and plaintiffs in existing cases that I know the outcome such as the lawsuit among the Facebook co-founder, law suit between Johnny Depp and Amber Hart. I ask Case Compass questions about my fictional situation and comparing that answers 
Differentiation: Current AI assistants such as Chat GPT, Microsoft Copilot can answer any legal questions, but the problem is that their answers could mislead the public due to AI hallucination and lacking legal professionals’ evaluation. My solution is to have an AI trained to answer legal questions and are evaluat
Target audience: People without legal training and have legal questions.
GTM: So far, my prototype are featured on the Hatchery Newsletter in January 2026. I asked friends and family members to try the prototype and give me feedback. I usually come to the Hatchery on Friday and talk to open minded individuals that are willing to try my prototype.
Revenue model: If the legal AI are widely used, I could monetize the project by advertising for law firms that offer services relating to the users' questions.
TAM/SAM/SOM: The market size could be similar to the market for assistant AI such as Claude, ChatGPT, and Google Gemini.
Users: 20 | Paying: 0 | Revenue to date: $0.00
Incorporated: In Progress | Entity: LLC, Georgia
Investment raised: $0.00 | Fundraising: No | Monthly burn: $0.00
Summer goals: I want to determine product market fit by having more people testing the prototype and have a business model.
Why right founder: I will continue to have legal training to become an attorney and have experience with building 2 startups. I understand the challenges and the process of working on innovative idea.
Achievement: I have 2 ventures that went through the Emory Hatchery and present at the Hatchery Founder Showcase 2 times. The ventures are a task marketplace called Hospitalities and an app called Meet&Eat that connect people to eat at ethnic restaurant

--- SpectraNote ---
Founder: Lechen Dong | Email: nxtloveev3@gmail.com
Role: Cofunder | Emory: Yes | School: Laney Graduate School | Degree: PhD Chemistry, 2028
Location: Atlanta | Industry: Artificial Intelligence / Machine Learning,Biotech / Life Sciences,SaaS,B2B / Enterprise Software
Stage: Building | Team: 2 | Co-founder: Yes
Co-founders: Andrew Tran
Linkedin: https://www.linkedin.com/in/andrew-tran-chemistry/
Co-founder skills: My co-founder serves as our Chief Scientific Officer and primary domain expert since he is a Ph.D. candidate in a high-throughput chemistry lab. While I am focusing on developing the AI model, he leve
Weekly hours: 20 | Started: 2/20/2026
Overview: We are building an autonomous, vision-augmented Electronic Lab Notebook to eliminate the "dark data" problem in scientific R&D. Using edge-capture hardware and domain-specific Vision-Language Models, our system passively monitors physical benchwork and translates live experimental actions into structured, timestamped digital logs. By replacing tedious manual data entry with AI-driven documentation, we drastically improve scientist productivity, minimize human error, and establish a new standard 
Problem: The highly manual, fragmented nature of lab documentation creates a massive "dark data" problem that uniquely hurts both key stakeholders in academic research:

The End-User (Researchers): Scientists rely on a chaotic mix of paper notebooks, Excel, and legacy software, wasting an average of 5 hours per week strictly on data entry. In our discovery 
Evidence: The strongest evidence is our immediate beta-testing demand. After demonstrating our prototype workflow to our end-user interviewees (bench researchers), they uniformly expressed extreme interest and requested to be the first to pilot the product. Capturing this intense user adoption is the critical
Differentiation: Current industry-standard ELNs only solve data storage, not data capture; they still require tedious, manual human data entry, completely failing to eliminate the friction and human error at the bench. Our solution is fundamentally superior because it provides passive, walk-away automation. By pairi
Target audience: Our initial target audience consists of two distinct stakeholders: academic research scientists (the end-users) and principal investigators (the economic buyers) at top-tier research universities and national laboratories. I validated the end-user market through rigorous customer discovery interview
GTM: We will utilize a land and expand academic beachhead strategy. Because our IP will be filed through Emory University, our initial rollout will secure pilot programs within Emory's chemistry departments. We will then use local Atlanta biotech organizations and university R&D networks to drive grassro
Revenue model: We operate on a B2B Hardware-enabled SaaS model. Customers pay a one-time upfront cost for the edge-capture camera hardware, which serves as the physical entry point to the lab. Our primary, recurring revenue is driven by an annual software subscript
TAM/SAM/SOM: We are addressing a bottleneck across all experimental sciences, but we are entering the market with a highly focused beachhead.

TAM: Hundreds of thousands of experimental bench scientists globally a
Users: 0 | Paying: 0 | Revenue to date: $0.00
Incorporated: No | Entity: Delaware C-Corporation
Investment raised: $0.00 | Fundraising: No | Monthly burn: $0.00
Prior accelerators: No
Summer goals: Our overarching goal is to leverage the accelerator’s structured environment and technical resources to significantly scale our execution speed. Thus, we have three core milestones for the summer:
1.	Product Execution: Evolve our current demo prototype into a robust, deployable MVP that successfully integrates AI backend with the edge-capture hardw
Why right founder: We possess the perfect founder-market fit because we bridge the gap where this problem lives: the intersection of AI and physical benchwork. With my expertise in computational chemistry and backend AI architecture, combined with my co-founder's frontline experience in high-throughput lab automation,
Achievement: After identifying a critical workflow gap through interviews with five experimental labs, I conceptualized and co-developed a chemistry chatbot. My insight and core architectural contributions helped the team publish a peer-reviewed tool that allows 

--- Pocket Sound Bath ---
Founder: Joel Myers | Email: pocketsoundbath@gmail.com
Role: CTO | Emory: No | School: N/A | Degree: N/A
Location: Atlanta, Georgia | Industry: B2B / Enterprise Software,Artificial Intelligence / Machine Learning,SaaS,Social Impact / Non-profit,Other
Stage: Product/Market Fit | Team: 3 | Co-founder: Yes
Co-founders: Jessica Myers https://www.linkedin.com/in/jessicatipton/
Co-founder skills: Jessica Myers (CEO & Co-Founder) drives business strategy, community activation, investor relations, and partnerships — she has built the brand, led live in-person sound bath events producing measurab
Weekly hours: 40 | Started: 8/20/2025
Overview: Pocket Sound Bath is an interactive iOS wellness app that transforms any smartphone into a personalized sound healing instrument — letting users physically play seven crystal singing bowls through tap and swirl gestures, activating chakra-aligned frequencies with haptic feedback for measurable stress relief in minutes. Unlike passive listening apps like Calm and Headspace, our interactive model has already driven 400+ organic downloads across 12 countries with zero paid marketing, validated thro
Problem: New mothers face chronic stress, sleep deprivation, and postpartum anxiety with no time or space for traditional meditation — which requires quiet focus they simply cannot access. Competitive athletes need mental performance tools for pre-game focus, visualization, and post-game nervous system recovery, yet no interactive technology exists specific
Evidence: 400+ downloads across 12 countries with zero paid advertising, driven entirely by micro-influencer partnerships and in-person community activations. Live event participants consistently report relaxation scores jumping from a 3/10 average before sessions to 9/10 after — validated across multiple eve
Differentiation: Every major competitor — Calm, Headspace, Insight Timer — is a passive listening platform. Users press play and sit still. Pocket Sound Bath is interactive: users physically play seven crystal singing bowls using tap and swirl gestures, activating chakra-aligned frequencies with haptic feedback. Thi
Target audience: Our two primary customer segments are prenatal and postpartum mothers managing chronic stress and sensory overwhelm, and competitive athletes seeking interactive mental performance and recovery tools. We know this because we validated both segments through live Pocket Sound Bath events — collecting 
GTM: We lead with micro-influencer marketing — partnering with wellness, maternal health, and sports performance creators in the 10K–50K follower range who carry high trust within our target segments. This strategy already produced 400+ downloads across 12 countries organically. We layer on Micro Pause M
Revenue model: Pocket Sound Bath operates a freemium subscription model. In March 2026 we are launching Monetization March — a 7-day free trial converting to $9.99/month or $42.99/year, managed through RevenueCat. The free tier creates a low-friction entry point an
TAM/SAM/SOM: The global wellness app market is valued at over $6B and growing at 17% CAGR, projected to reach $12B by 2028. Our two target segments represent focused, high-value slices of that market. The prenatal
Users: 476 | Paying: 0 | Revenue to date: $0.00
Incorporated: Yes | Entity: I intend to file a C Corp, we currently have an LLC
Investment raised: $100000.00 | Fundraising: Yes | Monthly burn: $5600.00
Prior accelerators: Yes, Tie University, WEI CoHort with Invest Atlanta.
Summer goals: Our goals for the summer align directly with the most critical phase of Pocket Sound Bath's growth. By the end of the program on July 30, 2026, we aim to have validated our paid subscription model with clear conversion data from Monetization March, closed our first B2B enterprise pilot with either a sports organization or hospital wellness program,
Why right founder: Jessica Myers built the community that proved this problem is real before a single line of code was written. She ran live Healing Heart Sounds sound bath events, collected feedback showing participants' relaxation scores rise from 3/10 to 9/10, and converted that community energy into 400+ app downl
Achievement: As employee #3 at inBrain.ai, I helped architect and build the AI-driven survey monetization platform from the ground up — scaling the engineering from zero to a 12-person team and a successful acquisition by Dynata, one of the world's largest data a

--- Spooly ---
Founder: Steve Bransford | Email: steve.bransford@emory.edu
Role: Co-founder, Chief Technology Officer | Emory: Yes | School: Staff/Faculty | Degree: N/A
Location: Atlanta | Industry: Artificial Intelligence / Machine Learning,Consumer,Education / EdTech
Stage: Testing,Building | Team: 2 | Co-founder: Yes
Co-founders: Mike Kane
https://www.linkedin.com/in/mikekanecreative/
Co-founder skills: Steve Bransford, Chief Technology Officer. Adept at agentic engineering and building infrastructure for web applications. Documentary filmmaker, director of the award winning film The Well-Placed Weed
Weekly hours: 20 | Started: 10/28/2025
Overview: Spooly is a memory app where browsable histories are built through group chat— every message, photo, video, and link that your friends post is automatically organized onto a timeline. Unlike iMessage or WhatsApp, where memories disappear into infinite scroll, Spooly chats are structured around specific shared experiences, creating a searchable archive organized by time and place. Every friend group has memories scattered across old text threads and messy camera rolls —Spooly brings them together
Problem: We love our group chats. Some of us have been in the same chats since smartphones first came out, and there are thousands of messages in them. But as a useful record of shared experiences, group chats are terrible. Search is ineffective, and there’s no real way to anchor recollections in space and time. Spooly provides structure to the group chat e
Evidence: How many times have you heard “hang on! let me find that link or photo” and watched that person fruitlessly scrolling and searching through a bloated camera roll or thousands of emails or text messages before giving up.

Current user testing confirms that Spooly can solve this problem by combining t
Differentiation: We are not aware of any product like Spooly. The closest competitors are either scrapbooks without chat (Mementix, Momento) or chat without memory organization (WhatsApp, iMessage groups). We believe that our memory app is a genuinely novel way to bring order to our chaotic digital footprint.  It is
Target audience: One key audience is people who actively use group chats but aren't drawn to social media. They have no interest in performing for an online audience — they just want to reminisce with their friends but do it in a way that provides some structure and meaning to their shared experiences, on a private 
GTM: We're starting with live music fans, where concerts and festivals create intense shared moments that people want to preserve and relive together. We’ll begin by marketing the web and native Spooly apps in the most popular online platforms for fans of live music. Later, fans will experience Spooly as
Revenue model: In the short term, our goal is to license Spooly to music festivals, leveraging existing relationships with the Mempho and Riverbeat festivals in Memphis.
TAM/SAM/SOM: We believe this could have viability across multiple generations of users around the world.
Users: 40 | Paying: 0 | Revenue to date: $0.00
Incorporated: In Progress | Entity: Multi-member LLC
Investment raised: $0.00 | Fundraising: No | Monthly burn: $0.00
Prior accelerators: No
Summer goals: We will continue to iterate and user test our prototype through the summer with the hope that the Hatchery program will improve our product and accelerate our timeline.  We aim to release both an Android and iOS app by Q3 of 2026.  Our current plan is to market Spooly to a small but very specific base of music fans who are highly engaged with each 
Why right founder: Mike and I have complementary skills. I have the technical expertise to push the product forward. Mike has a big picture awareness of what's useful and engaging for users and what’s not. We’re both passionate and curious. We’re also great friends that enjoy working together.
Achievement: With a team at Emory, we developed the Georgia Coast Atlas, a digital atlas focused on the environmental and historical dimensions of the Georgia Coast (site available here: https://georgiacoastatlas.org). It’s built entirely on open source technolog

--- EsotericIQ ---
Founder: Keomaria Camon | Email: keomariacamon@gmail.com
Role: Founder & CEO | Emory: No | School: N/A | Degree: N/A
Location: Atlanta, Georgia | Industry: Healthcare,HR Tech / Future of Work,B2B / Enterprise Software,SaaS
Stage: Idea,Building,Testing | Team: 0 | Co-founder: No
Weekly hours: 42 | Started: 1/1/2026
Overview: EsotericIQ is a workforce stability consulting company that helps long-term care facilities identify and eliminate the scheduling inefficiencies, overtime patterns, and retention risks that cost them $100,000+ annually. We deliver a 60-day Workforce Stability Program — including scheduling audits, retention risk mapping, and labor cost exposure reports — built into actionable dashboards. Our roadmap transforms validated consulting insights into an automated SaaS platform purpose-built for the LT
Problem: Long-term care facilities face a chronic and costly workforce crisis. Industry turnover rates in LTC regularly exceed 50–75% annually, with some facilities exceeding 100% turnover in direct care roles. The financial impact is staggering — replacing a single certified nursing assistant costs an estimated $3,000–$5,000 in recruiting, onboarding, and 
Evidence: My evidence is experiential and structural. Seven facilities, consistent patterns, consistent pain points, and consistent absence of any formal retention diagnostic process. Every administrator I have spoken with acknowledges turnover as their top operational challenge yet none have a dedicated syst
Differentiation: Most LTC facilities currently address turnover reactively — exit interviews after the fact, generic employee satisfaction surveys, or expensive HR consultants with no clinical background. Existing HR software platforms like Paylocity or Workday are built for corporate environments and do not account
Target audience: EsotericIQ's primary customers are long-term care facility administrators, Directors of Nursing, and HR leads at small to mid-size LTC facilities — typically 50 to 200 bed operations that lack dedicated workforce analytics infrastructure. I know this customer deeply because I am a licensed nurse who
GTM: EsotericIQ will go to market through a direct relationship-driven outreach strategy targeting LTC facility administrators and Directors of Nursing in the Atlanta metro area initially, then expanding regionally. As a licensed nurse with experience across seven LTC facilities, I have existing professi
Revenue model: EsotericIQ charges $2,500–$5,000 per facility for a 60-day Workforce Stability Program depending on bed size, with an optional $500/month ongoing support retainer following the initial engagement. At 5 facilities in Year 1 that generates $12,500–$25,
TAM/SAM/SOM: There are approximately 15,600 nursing homes and over 28,500 assisted living facilities in the United States, employing roughly 3 million direct care workers. Georgia alone has over 350 licensed nursi
Users: 2 | Paying: 0 | Revenue to date: $0.00
Largest customer: N/A — pre-revenue. First customer engagements in progress.
Incorporated: In Progress | Entity: Intended structure is Georgia LLC (EsotericIQ, LLC)
Investment raised: $5000.00 | Fundraising: No | Monthly burn: $0.00
Prior accelerators: Competed in TiE University Atlanta 2026 pitch competition — a globally recognized entrepreneurship program affiliated with Georgia State University and TiE Global, the world's largest entrepreneur net
Summer goals: My goals for the summer are specific and aggressive. By the end of the program I want to have completed paid assessments with at least three LTC facilities, converted at least one into a monthly dashboard subscriber, built a repeatable sales process I can hand off or replicate without my direct involvement, validated my pricing model based on real 
Why right founder: I am the right founder because I have lived inside this problem for years. I am a licensed nurse who has worked in seven different long-term care facilities across different ownership models, staffing structures, and management cultures. I have watched the same turnover patterns repeat themselves ev
Achievement: At 16 years old, during the height of COVID-19 when high school students were sent home indefinitely, I taught myself social media marketing and e-commerce strategy and built a company that generated over $100,000 in revenue within three months. Over

--- ManUp ---
Founder: Dabney Evans | Email: dabney.evans@emory.edu
Role: Co-Founder | Emory: Yes | School: Rollins School of Public Health | Degree: N/A
Location: Atlanta, Ga | Industry: Artificial Intelligence / Machine Learning,Education / EdTech,Healthcare,LegalTech,Social Impact / Non-profit,Government / GovTech
Stage: Idea,Building | Team: 2 | Co-founder: Yes
Co-founders: Lee Giordano https://www.linkedin.com/in/lee-giordano-bb338b83/
Co-founder skills: Lee brings extensive knowledge working with the target audience and the subject matter of the tool. For over 25 years he has taught Abusive Partner Intervention Programs (APIPs) and has co-developed m
Weekly hours: 20 | Started: 2/1/2026
Overview: ManUp is an AI chatbot that can provide educational content, skills-building exercises and referrals to supportive community-based resources for men and boys at risk of using violence in their intimate relationships. ManUp draws on: (1) the Men at Work curriculum focused critical dialogue and reflection on gender, harm, and community accountability among men who use violence (2) trauma-informed care; (3) and is grounded in social support theory and intersectional power analysis. The design of Ma
Problem: According to the World Health Organization, one in three women experiences intimate partner violence in their lifetimes. Over 48,800 women and girls die each year at the hands of an intimate partner or family member, accounting for one such death every ten minutes. Women and girls are most often the victims or survivors of such violence while men a
Evidence: Technological innovations, economic changes, and shifting gender norms are leading many men and boys to question their social value. Stigmas against men and boys seeking help limit their options for coping with their changing social realities. In this uncertainty, many are turning to digital spaces 
Differentiation: Current AI chatbots focused on men fall into a few broad categories: AI companions and those providing relationship advice. Tools in the first category operate as “girlfriends” or romantic partners that can be used for conversation, image generation, and sexual gratification absent emotional intimac
Target audience: The target audience are men and boys at risk of using violence in their intimate relationships. The target customers are state governments seeking to prevent/reduce intimate partner violence. Additional customers may include schools, employers, faith and community-based organizations seeking to prev
GTM: The primary users of ManUp are men and boys at risk of using violence in intimate or dating relationships. The primary paying customers are state and local governments (criminal justice, public health, violence prevention, and family services agencies) seeking to prevent and/or respond to teen datin
Revenue model: Given our early stage of development, we are currently pursuing pilot funding from public and private sources. At the outset, we anticipate utilizing a “freemium” model to encourage individual user adoption. We expect that Institutional Licensing wil
TAM/SAM/SOM: ManUp’s total addressable market (TAM) includes men and boys at risk of using violence in intimate or dating relationships, as well as the public and institutional systems responsible for prevention a
Users: 0 | Paying: 0 | Revenue to date: $0.00
Incorporated: No | Entity: Limited Liability Corporation
Investment raised: $0.00 | Fundraising: Yes | Monthly burn: $0.00
Prior accelerators: No
Summer goals: · develop and validate our business plan;
· build a ManUp prototype; and 
· develop and refine our final go-to-market strategy.
Why right founder: We are the right founders to solve this problem because we bring a rare and complementary combination of deep subject matter expertise, real world implementation experience, and applied technology and research leadership focused specifically on preventing intimate partner violence by engaging men an
Achievement: I am the co-designer of Eu-Decido (I-Decide), web and app-based safety decision aid for women experiencing intimate partner violence in Brazil. This tool includes modules on risk assessment, priority setting and safety planning alongside tailored map

--- BusyBroker ---
Founder: Pamika McWhorter | Email: thebusybroker@gmail.com
Role: Founder | Emory: No | School: N/A | Degree: N/A
Location: Atlanta, GA | Industry: Education / EdTech,Real Estate / PropTech
Stage: Building | Team: 1 | Co-founder: No
Weekly hours: 12 | Started: 4/15/2017
Overview: BusyBroker is a mobile platform designed to guide first‑time buyers and generational renters through the homeownership journey with clarity, confidence, and emotional support. By combining step‑by‑step education, affordability tools, and connections to trusted professionals, BusyBroker simplifies a process that has historically felt overwhelming and inaccessible. Built with over 20 years of real estate and mortgage expertise, BusyBroker empowers users to move from uncertainty to the confident pu
Problem: Generational renters and first‑time buyers want to become homeowners, but they lack clear, trustworthy, step‑by‑step guidance on how to start, how much they can afford, and how to navigate credit, budgeting, and the mortgage process. This is a real and widespread problem that I’ve seen repeatedly over 20+ years in real estate and mortgage lending, 
Evidence: I have strong evidence that BusyBroker is the right solution based on 20+ years of guiding first‑time buyers in real estate and mortgage lending, where I repeatedly saw the same confusion, fear, and lack of clear guidance. In addition, hundreds of conversations with riders while driving Lyft reveale
Differentiation: BusyBroker is different because it focuses on the emotional and educational gaps that current real estate tools ignore. While competitors center on listings or mortgage products, BusyBroker provides simple, judgment‑free, step‑by‑step guidance for first‑time buyers and generational renters who often
Target audience: BusyBroker's target audience is first-time homebuyers, especially generational renters who have little knowledge of the homebuying process and often feel overwhelmed, intimidated or excluded from traditional real estate pathways. I know this because I've spent over 20 years in real estate and mortga
GTM: BusyBroker reaches first‑time buyers and generational renters through a community‑first, content‑driven strategy. I’ve already built an engaged following on social media (especially TikTok) where people ask questions about credit, budgeting, and how to begin the homebuying process. This early tracti
Revenue model: BusyBroker generates revenue through a mix of education, partnerships, and value‑aligned services that support first‑time buyers without overwhelming or exploiting them. The primary revenue streams include referral partnerships with trusted real esta
TAM/SAM/SOM: The U.S. market for first‑time homebuyers is large and growing. Millennials and Gen Z together represent the biggest share of new buyers, with Millennials alone making up 29% of recent homebuyers and 
Users: 0 | Paying: 0 | Revenue to date: $0.00
Incorporated: No | Entity: LLC
Investment raised: $0.00 | Fundraising: Yes | Monthly burn: $30.00
Prior accelerators: Not yet
Summer goals: My primary goal for the summer is to build and launch the first version of the BusyBroker MVP. To support that, I’ll be focused on refining my core features through user research, expanding my early adopter community through my existing social media following and preparing for a small pilot group to test the product. By the end of the summer, I aim
Why right founder: My 20+ years in real estate and mortgage lending give me a deep, practical understanding of the exact fears, misconceptions, and barriers first‑time buyers face. I’ve spent years having raw, unfiltered conversations with everyday people including hundreds of Lyft riders, who shared their confusion, 
Achievement: One of the most meaningful things I’ve built is a career guiding hundreds of families through real estate and mortgage decisions over more than 20 years, often helping first‑time buyers who never believed homeownership was possible for them. I’ve als

--- Beor ---
Founder: George Allen | Email: george.allen2@emory.edu
Role: Co-founder/CEO | Emory: Yes | School: Goizueta Business School | Degree: Evening MBA 2027
Location: Atlanta | Industry: Artificial Intelligence / Machine Learning,Government / GovTech
Stage: Product/Market Fit | Team: 2 | Co-founder: Yes
Co-founders: https://www.linkedin.com/in/rishimagiawala/

Rishi Magiawala
Co-founder skills: Rishi is our CTO and leads our work across computer vision and data systems.
Weekly hours: 40 | Started: 12/17/2024
Overview: We create custom data sources for defense customers. Users enter the specifications they need, and our agents automatically build datasets tailored to that requirement. These datasets can then be pushed into existing systems such as cameras, bodycams, or drones to make those systems more useful and informed.
Problem: Defense customers need access to highly specific on short notice. Most traditional data providers focus on broad datasets designed to serve many different customers. That model does not align with high stakes environments where teams require targeted data sources built around a specific mission, region, or threat.

I know this is a real problem fro
Evidence: We currently have five initial customers who are working with us and providing positive feedback about our ability to deliver the specific information they need. Their continued engagement gives us early proof that the solution is addressing a real gap.

In addition, mentors from the APEX government
Differentiation: Our solution is different because many competitors go through long planning processes to create broad data products meant to serve many customers. We focus on creating data sources directly in response to specific customer demand.

We also do more than deliver the data. We can push it into the syste
Target audience: Our target customers are defense and national security clients who need the ability to quickly create data sources to support their operations.

I know this because I was on the procurement side and directly experienced the need for this capability. In addition, we have started onboarding private in
GTM: Our primary go to market strategy is pursuing SBIRs and government contract procurements. Innovative technologies can be fast tracked through these pathways, allowing us to secure pilot opportunities and early adoption within defense environments.

In addition, I have started attending government fo
Revenue model: We currently make money through small monthly payments from intelligence companies. This allows us to improve the software, refine our process, and validate demand while generating early revenue.

Our longer term revenue strategy is to pursue Small B
TAM/SAM/SOM: Approximately $30 billion of annual defense spending is allocated to data and intelligence technology in the United States. We estimate that 20 percent of that spend is tied to high accuracy, rapidly 
Users: 5 | Paying: 5 | Revenue to date: $2000.00
Largest customer: A small private intelligence firm paying 125 monthly.
Incorporated: Yes | Entity: LLC
Investment raised: $0.00 | Fundraising: No | Monthly burn: $200.00
Prior accelerators: Yes. We are currently participating in the Techstars x Emory Founders Catalyst and Georgia Tech CREATE X programs.
Summer goals: Our goal for the summer is to land several meaningful pilot programs with larger institutions that we are currently in discussions with. These pilots will help validate the product in real environments and create a path toward longer term contracts.

We also plan to begin pursuing Small Business Innovation Research (SBIR) opportunities as new solic
Why right founder: I spent a decade as an intelligence analyst and directly experienced this problem firsthand. I understand the urgency, the gaps in current data solutions, and how delays or generic datasets impact real decision making. That experience allows us to build from the user’s perspective rather than guessi
Achievement: As the Team Lead for Data Integrity at Special Operations Command, I built the methodology and system used to evaluate every intelligence tool procured across the command.

--- Accordia Engine ---
Founder: Ravi Gona | Email: ravi.k.gona@gmail.com
Role: Founder | Emory: Yes | School: Goizueta Business School | Degree: 2024
Location: Atlanta, GA | Industry: Artificial Intelligence / Machine Learning,B2B / Enterprise Software
Stage: Building | Team: 1 | Co-founder: No
Weekly hours: 80 | Started: 9/1/2025
Overview: Accordia is a managed automation backbone for growth-stage SMBs (50–150 employees) that need reliable workflows across multiple SaaS systems but can’t justify building an internal platform team. We provide infrastructure-grade orchestration—contracts, idempotent execution, replay controls, and end-to-end traceability—so cross-system workflows stay stable as tools and processes change. The result is faster deployment of new workflows over time (reuse), less manual reconciliation, and a foundation
Problem: Problem / goal for the audience

My target audience is growth-stage SMB operators (roughly 50–150 employees) who run core operations across multiple SaaS systems (e.g., CRM, billing, support, finance, analytics) and have 1–3 workflows that materially impact revenue, cash flow, or customer experience.

Their goal is straightforward: run cross-system
Evidence: At this stage (POC), my evidence is less about revenue traction and more about repeatable problem validation, prototype artifacts, and a falsifiable plan to prove (or disprove) that the approach is correct.

1) Evidence the problem is real and recurring (not a one-off)
Across ~20 years building and 
Differentiation: Accordia is different from typical automation options because it is designed as managed infrastructure with enforcement and operational truth, not as a DIY tool, a pile of point-to-point integrations, or a services-heavy project.

How it’s superior / different

* Infrastructure vs. tooling: Most com
Target audience: Target audience / customers

My target customers are growth-stage small and mid-sized businesses (typically ~50–150 employees) that:

* operate across multiple SaaS systems (CRM, billing, support, finance, analytics),
* have 1–3 cross-system workflows that directly impact revenue, cash flow, or cust
GTM: My go-to-market is a focused wedge: acquire a small number of capital-disciplined operators who already feel cross-system workflow pain and are actively trying to operationalize AI, then expand via workflow reuse and referrals.

1) Beachhead acquisition (first 3–5 customers)

* Warm network + founde
Revenue model: Accordia is a managed automation backbone, so revenue is based on ongoing operation of the infrastructure, not one-time project work.

Revenue model

* Monthly subscription (core): A recurring fee for the managed backbone—connector operations, workfl
TAM/SAM/SOM: The U.S. market is large and well-defined. There are ~6.27M employer firms in the U.S. (companies with paid employees), and a practical proxy for my target segment (growth-stage SMBs) is the ~241,552 
Users: 0 | Paying: 0 | Revenue to date: $0.00
Incorporated: In Progress | Entity: C Corp
Investment raised: $0.00 | Fundraising: No | Monthly burn: $0.00
Summer goals: For the summer, my goals are to use the accelerator to move from “credible concept + POC” to validated, repeatable go-to-market with measurable proof:

1. Validate the ICP + wedge
   Confirm the best beachhead (50–150 employee operators with 1–3 cross-system workflows that are revenue/cash-flow/customer-critical) and lock the problem framing that c
Why right founder: I’m the right founder for this problem because my background is specifically in building and operating the kind of “invisible infrastructure” that makes cross-system workflows reliable, and I’m approaching it with the discipline required to keep it infrastructure (not bespoke services).

* Deep syst
Achievement: Led enterprise cloud architecture strategy at Kaiser Permanente, driving $1.9M in annual savings and achieving a 19.5% IRR by aligning optimization initiatives with business goals and implementing scalable governance models.

--- Bilharzia Storytelling Initiative (BSI) ---
Founder: Bertrand BYISHIMO | Email: bertrand.byishimo@emory.edu
Role: Founder and Director. | Emory: Yes | School: Rollins School of Public Health | Degree: MPH 27
Location: Kigali, Rwanda; Operating in Ruhango, Bugesera, and Gatsibo Districts. | Industry: Social Impact / Non-profit,Healthcare,Education / EdTech
Stage: Sustainability and Scale | Team: 5 | Co-founder: No
Weekly hours: 40 | Started: 6/12/2023
Overview: The Bilharzia Storytelling Initiative is a health communication venture that uses human-centered design to help eliminate the spread of schistosomiasis. By distributing board games for children and specially designed notebooks and organizing storytelling contests. we turn children into "health ambassadors" to drive behavioral change where clinical treatments alone fall short. Our mission is to bridge the gap between medical intervention and community-led prevention to achieve national NTDs elimi
Problem: Our target audience, primarily school-aged children and rural families in high-risk districts currently faces the persistent threat of schistosomiasis reinfection due to daily water-contact behaviors. Their primary goal is to break the cycle of disease while maintaining their livelihoods, but they lack the engaging, culturally relevant education ne
Evidence: Our evidence demonstrates that storytelling-driven awareness translates directly into the biological interruption of disease transmission: in our Bugesera pilot, we achieved an 80% reduction in high-risk water contact, dropping from 35.8% to 7.3%. Because the Schistosoma parasite requires human-to-w
Differentiation: Our solution is superior because it begins with engaging board games and gamified learning tools that transform complex health data into an interactive, memorable community experience. Unlike traditional "top-down" medical lecturing and generic public health posters, we utilize Human-Centered Design
Target audience: Primary Beneficiaries: School-Aged Children
Our primary beneficiaries are school-aged children in high-risk districts such as Ruhango, Bugesera, and Gatsibo, where exposure to infected water sources remains common. Children are both highly vulnerable to infection and highly responsive to habit forma
GTM: Our go-to-market strategy is built on institutional alignment and community-level activation. At the institutional level, we operate in coordination with representatives from the NTD Division under RBC and through district and sector-level education offices. This enables integration into existing pu
Revenue model: Our revenue model is an active B2B/B2G (Business to Government/NGO) social impact model that balances immediate operational funding with long-term scalability. Our current financial status is a mix of ongoing contracts and strategic future planning:

TAM/SAM/SOM: While the global addressable market for schistosomiasis education exceeds 240 million people, our strategic focus for the next 12 to 18 months is our Serviceable Obtainable Market (SOM) of 250,000 sch
Users: 11000 | Paying: 2 | Revenue to date: $41200.00
Largest customer: Merck Group, which has provided a total of €20,000 (approximately $21,200) across two funding cycles
Incorporated: No | Entity: N/A
Investment raised: $41200.00 | Fundraising: Yes | Monthly burn: $800.00
Prior accelerators: No, I haven’t participated in any.
Summer goals: I am truly excited about the possibility of joining this summer session of the Hatchery Accelerator, as I see it as a vital opportunity to "add a stone" to the foundation of what the Bilharzia Storytelling Initiative is building. My primary goal for the summer is to transition BSI from a project-based initiative into a self-sustaining social enterp
Why right founder: I believe I am the right founder because I combine deep technical expertise in public health with the professional communication skills needed to bridge the "knowledge-action" gap. As an Emory MPH student and former Health Reporter for The New Times Rwanda, I have the unique ability to translate com
Achievement: I helped lead a cardiac surgery support program that facilitated life-saving surgical care for hundreds of vulnerable patients suffering from cardiovascular disease. As part of the initiative, I contributed to securing $15,000 in funding to help cove

--- Fandema International ---
Founder: Jonathan Hamilton | Email: jonathan.hamilton3@emory.edu
Role: Chief Executive Officer | Emory: Yes | School: Laney Graduate School | Degree: Master's in Development Practice (MDP), 2027
Location: N/A | Industry: FoodTech / Agriculture,Social Impact / Non-profit
Stage: Testing,Product/Market Fit | Team: 2 | Co-founder: Yes
Co-founders: Haruna Jallow, linkedin.com/in/haruna-jallow-924527126
Co-founder skills: Haruna's role is Chief Operating Officer, as he is currently in charge of Gambian operations, including hosting a trusted bank account, dispersing money to and collecting money from other farmers, and
Weekly hours: 10 | Started: 6/12/2024
Overview: Fandema International is a non-profit organization based in the United States and operating in The Gambia that uses a recoverable grant model to advance small-scale, rural development projects that solve three major challenges: a lack of economic opportunities, the degradation of natural capital, and the lack of sustainable revenue streams. The organization works by acquiring funds from small-scale investors/grantors, providing them to rural farmers in The Gambia at no risk (unlike banks or typi
Problem: Many individuals living in rural Gambia, especially young men, lack economic opportunities, and many natural resources, including fertile farmland, are dwindling due to a variety of factors, such as desertification and unsustainable farmland expansions. At the same time, many current development practices prioritize one-time aid structures that are
Evidence: We believe that this solution is the correct one due to proven traction in both livestock and garden pilot projects, as well as having conducted interviews with Gambian farmers who have found success in these types of income-generating initiatives. Since joining the Incubator, our total investment h
Differentiation: In the Gambian context, Fandema International’s model is superior to existing development solutions because it effectively provides seed money to exceptional individuals without risk for them (beyond the opportunity cost of their labor and any further investment money they might provide themselves),
Target audience: The target audience is twofold: (1) small-scale investors who want to see a social impact in their investments beyond simply accruing interest and (2) individuals in The Gambia who have the capacity to build and manage small-scale development projects for economic gain. These audiences have been tar
GTM: For now, investors come from close personal networks and are reached out to directly. In the future, we may try to find wealthier impact investors/philanthropists who would be willing to shoulder a higher risk-burden while we fine-tune our model. From there, we will expand our outreach to include ma
Revenue model: We make money in three main ways. First, we allow investors to donate part of or all their investment into the organization. Roughly 30% of investors we surveyed, for instance, suggested that if they received their principal back from a farmer, they 
TAM/SAM/SOM: Of the 17 investors surveyed through my personal network, 13 expressed interest in making this type of investment in the future. If each person invested the average amount ($1,591, see below), that pu
Users: 11 | Paying: 9 | Revenue to date: $2349.00
Largest customer: On average, investors have contributed about $1,591 each. I have paid the most at $2,973, or roughly 31% of the total. For Gambians producing revenue,
Incorporated: No | Entity: Intended incorporation: 501(c)(3)
Investment raised: $9545.00 | Fundraising: No | Monthly burn: $647.00
Prior accelerators: The Hatchery's Incubator program through Emory University.
Summer goals: My major goal for the summer is to build all the necessary infrastructure to be able to start an expanded cohort of livestock projects in the fall and cohorts of both tree nursery and garden projects in the spring. To that end, during the summer, I want to focus on three categories of operations: (1) basic infrastructure, including understanding th
Why right founder: I believe that we (myself and Haruna) are the right founders to solve this problem because we have a shared vision of Gambian development and the passion to match it. We work well together as a team, and we have generated considerable traction toward sustainability. We both have connections to agric
Achievement: The most impressive thing I’ve achieved is successfully serving for a full 25 months as a Peace Corps Volunteer in an up-country, rural village in The Gambia. During that time, I faced countless challenges, from near-monthly illnesses and 115ºF heat 

--- Chali Co. ---
Founder: Chadwick Medeiros | Email: joseph.ali@emory.edu
Role: Founder | Emory: Yes | School: Rollins School of Public Health | Degree: MPH 2027
Location: Atlanta | Industry: Healthcare,Government / GovTech
Stage: Building,Testing | Team: 2 | Co-founder: Yes
Co-founders: Chad Medeiros
Co-founder skills: Developing and working on projects. Government experience to use toward applying for government projects. Skills in quantitative and qualitative analysis.
Weekly hours: 10 | Started: 1/7/2026
Overview: Our project is about public health monitoring systems for policy makers and organizations. The system collects data from public health programs in real time. It integrates program specific datasets, such as HIV, social determinants of health or WASH.
Problem: The problem is to build a robust institutional and national level public health system. There is a need to track data from multiple sources. It is a problem from several evaluation reports from national to international level, such as sources from WHO and USAID.
Evidence: In public health programs and coursework, we have seen that many organizations struggle with fragmented data systems and limited tools for visualization. Often data exists but is difficult to interpret or combine across sources. Our prototype shows how a simple, visual dashboard can help translate d
Differentiation: Many existing data tools are designed for large institutions and require significant technical expertise to build or maintain. Smaller public health organizations and NGOs may not have the resources or technical teams needed to create these systems. We also use a lot of machine learning and AI to de
Target audience: Our target customers are public health organizations, health departments, NGOs, and community health programs that need clear and accessible data to make decisions. Many of these groups collect data but do not always have easy ways to visualize or analyze it in real time. We know this is a need beca
GTM: Our initial strategy is to start with relationships in the public health and academic communities. As students in public health programs, we have access to networks of researchers, practitioners, and organizations that work directly with population health data.
Revenue model: We plan to apply for grants at different organizations requesting tools to support different health programs. Our primary model would be a service model for organizations that want customized dashboards or data visualization tools. Public health depa
TAM/SAM/SOM: Our potential market includes public health organizations, government health departments, NGOs, and global health programs that rely on data to make decisions. This includes thousands of organizations
Users: 2 | Paying: 0 | Revenue to date: $4999.00
Incorporated: In Progress | Entity: LLC Georgia
Investment raised: $4999.00 | Fundraising: No | Monthly burn: $20.00
Summer goals: Our goal for the summer is to submit business proposals to our target clients and develop the business further. We also want to build out market capacity and use ai tools to apply into our business model.
Why right founder: As public health students at Emory, we understand how important data is for making health decisions, but we have also seen how difficult it can be for communities to access and use that data. We have already started building solutions, including a dashboard that maps health data so decision makers c
Achievement: Managing the African peacekeeping rapid response partnership, a multinational level program between Ghana, the State Department, and Department of Defense for the USA.

--- Kindred & Kin ---
Founder: Juliette Joseph | Email: juliette@kindredandkin.com
Role: Founder & Principal Curator | Emory: Yes | School: Goizueta Business School | Degree: Executive MBA, 2026
Location: Atlanta, GA | Industry: eCommerce
Stage: Testing | Team: 3 | Co-founder: No
Weekly hours: 40 | Started: 9/1/2025
Overview: "We Curate Dope Sh*t From People With Great Stories."
Kindred & Kin sources high-quality home and body goods from heritage brands and independent artisans around the world. These products are designed to help people create everyday rituals that elevate the joy of living.
Problem: Burnt-out millennials want small ways to make everyday life feel calmer, more intentional, and less transactional, yet most retail options focus on either mass-produced convenience or niche ethical marketplaces. I validated this through early traction within my network and through intimate pop-ups, where customers consistently resonated with the id
Evidence: The business is only three months old, so we are still testing and learning. Early on, our messaging focused heavily on the stories behind the products, but feedback from customers and social engagement showed that people resonated more with the idea of surrounding themselves with products that help
Differentiation: Most retailers focus on mass-produced convenience, while ethical marketplaces focus strictly on handmade or fair-trade products. Kindred & Kin takes a different approach by being taste-led rather than mission-led, curating high-quality ritual goods for home and body from heritage brands, independent
Target audience: Our core customers are burnt-out millennial women (28–45) seeking small rituals that make daily life feel better. Early traction came from my network and from intimate pop-ups. Customers resonated with the brand’s focus on self-care rituals and the stories behind the heritage brands and independent 
GTM: Our early traction has come through word of mouth, social media, and intimate pop-ups that allow customers to experience the ritual concept and products in person. These events have been effective for building community and turning first-time customers into repeat buyers, and we have even seen early
Revenue model: Kindred & Kin generates revenue through retail sales of curated home and body products on our Shopify e-commerce platform. We source products at wholesale from heritage brands, independent artisans, and premium lifestyle makers and sell them at retai
TAM/SAM/SOM: Kindred & Kin operates within the premium segment of the U.S. beauty/personal care and home goods markets. 
- The U.S. prestige beauty market is approximately $33B
- Premium home decor and lifestyle g
Users: 53 | Paying: 38 | Revenue to date: $2246.00
Largest customer: My largest customer has spent $271.22 across 4 purchases.
Incorporated: Yes | Entity: Kindred & Kin LLC, Georgia
Investment raised: $1500.00 | Fundraising: No | Monthly burn: $460.00
Prior accelerators: No
Summer goals: Our goal for the summer is to validate Kindred & Kin’s business model through continued customer discovery, refining our ritual-driven positioning, and testing scalable acquisition channels such as social content, pop-ups, and local Atlanta partnerships. We plan to launch version 2.0 of our website to improve SEO and conversion while also testing n
Why right founder: YES! I’m building the company I wish existed when I was a burnt-out corporate leader looking for small ways to slow down and reset. After 20+ years leading complex programs at companies like Ford, Twitter, and Kumon, I know how to turn ideas into systems that actually work. I wouldn’t be building th
Achievement: I built Kumon North America’s first Program Management Office from the ground up, aligning U.S. and Canadian operations, and later helped launch Twitter’s first Engineering Learning & Development team in a Strategy & Operations role.

--- Abundance Intelligence Corp ---
Founder: anvith anand | Email: anvith@getscribr.com
Role: Founder | Emory: No | School: N/A | Degree: N/A
Location: Atlanta | Industry: Artificial Intelligence / Machine Learning,B2B / Enterprise Software,Government / GovTech,SaaS
Stage: Product/Market Fit | Team: 1 | Co-founder: No
Weekly hours: 80 | Started: 8/15/2025
Overview: I am building an all-in-one workplace for business proposal writers. Currently, the bottleneck in proposal writing is collaboration and reviewing. I am solving that.
Problem: I know this is a real problem because I actually had a pilot customer.
Evidence: Said pilot customer won the project using the proposal created using scribr
Differentiation: Current Solutions AI Text Generation feature is their worst-rated feature. You can check it out in the G2 marketing doc.
Target audience: Target audience is SMB Gov vendors. I know because through customer discoveries I I learned that they are acutely facing this problem
GTM: By going to conferences and cold outreach
Revenue model: SAAS
TAM/SAM/SOM: $5 billion
Users: 1 | Paying: 0 | Revenue to date: $0.00
Incorporated: Yes | Entity: Delaware C Corp
Investment raised: $0.00 | Fundraising: No | Monthly burn: $300.00
Prior accelerators: Georgia Tech Create X
Summer goals: Scale the product to get five customers.
Why right founder: I possess a unique insight in both AI and user experience, as those were my primary areas of focus in undergrad.
Achievement: Me along with another intern scale on of the Cybertruck production lines

--- CardioSight ---
Founder: Mendy Lebowitz | Email: mendy.lebowitz@emory.edu
Role: Co-Founder | Emory: Yes | School: School of Medicine,Laney Graduate School | Degree: MD/PhD 2029
Location: Atlanta, GA | Industry: Artificial Intelligence / Machine Learning,Healthcare,Biotech / Life Sciences
Stage: Testing,Building | Team: 4 | Co-founder: Yes
Co-founders: Anant Madabhushi: https://www.linkedin.com/in/anant-madabhushi-9a75a21/ 
Gourav Modanwal: https://www.linkedin.com/in/gourav-modanwal/
Sanjay Rajagopalan: https://www.linkedin.com/in/sanjay-rajagopala
Co-founder skills: Our co-founding team brings together leading expertise in artificial intelligence, biomedical engineering, and cardiovascular medicine. Dr. Anant Madabhushi is a world-renowned biomedical engineer and
Weekly hours: 40 | Started: 8/15/2024
Overview: CardioSight AI is an opportunistic cardiovascular risk detection platform that uses AI to extract hidden biological information from routine and widely performed CT scans. Our technology segments and analyzes various cardiometabolic fats present throughout the entire chest to accurately predict 10-year risk of having a major adverse cardiovascular events, such as heart attack, stroke, heart failure, and even death, often outperforming traditional clinical risk calculators. Trained and validated 
Problem: Cardiovascular disease is the leading cause of death worldwide, and earlier identification of high-risk individuals is critical for effective prevention. At the same time, millions of CT scans are performed every year, yet almost all of the biological information contained in these images remains unmeasured and unused for risk prediction. This crea
Evidence: We have trained and evaluated our models on more than 75,000 CT scans across multiple large imaging cohorts. These include the National Lung Screening Trial (NLST), a landmark U.S. lung cancer screening study with tens of thousands of chest CT scans, and imaging datasets from the U.S. Department of 
Differentiation: Most existing AI tools for CT analysis focus on narrow measurements such as coronary artery calcium scoring, plaque quantification, or detection of acute conditions like pulmonary embolism or aortic dissection. While these tools automate specific measurements or triage tasks, they typically do not c
Target audience: Our primary customers are large health systems and radiology groups that perform high volumes of CT imaging, including coronary artery calcium (CAC) scans and chest CTs such as lung cancer screening. These scans are performed millions of times each year, creating a major opportunity to extract addit
GTM: Our initial go-to-market strategy focuses on early deployment through health systems where our team already has strong clinical and research collaborations. This includes Emory Healthcare and the Veterans Affairs (VA) health system through our team at Emory, University Hospitals Cleveland through Dr
Revenue model: CardioSight will be commercialized as a software platform sold to health systems and imaging networks that perform large volumes of CT scans. The product can be deployed as a software layer integrated into existing radiology workflows, generating a c
TAM/SAM/SOM: CT imaging is one of the most widely performed diagnostic modalities in medicine. In the United States alone, almost 100 million CT scans are performed each year, including millions of coronary artery
Users: 0 | Paying: 0 | Revenue to date: $0.00
Incorporated: No | Entity: Delaware C Corp
Investment raised: $0.00 | Fundraising: No | Monthly burn: $25000.00
Summer goals: My main goal for the summer is to start turning CardioSight from a promising research project into the foundation of a real company that can eventually reach patients. Specifically, I want to develop a clear path for commercialization, including learning how to build the right management and operational team around the technology. Our group has str
Why right founder: Our team brings a combination of world-leading expertise in artificial intelligence for medical imaging, cardiovascular medicine, and clinical translation. Dr. Anant Madabhushi is a pioneer in AI for healthcare with more than 200 patents, two FDA-cleared AI technologies, and a proven track record of
Achievement: I founded the Jewish Medical Society of Georgia, the first statewide organization of its kind connecting Jewish physicians, medical students, and healthcare leaders. In the past year, we organized large-scale professional and community programming th

--- DIY Doula ---
Founder: Kayla Thomas | Email: kayla.thomas3@emory.edu
Role: Founder | Emory: Yes | School: Goizueta Business School,Rollins School of Public Health | Degree: MBA/MPH, 2026
Location: Atlanta, GA, USA | Industry: Education / EdTech,Social Impact / Non-profit
Stage: Building,Testing | Team: 4 | Co-founder: No
Weekly hours: 5 | Started: 5/10/2022
Overview: DIY Doula is more than an app - it is a response to the lack of culturally-specific pregnancy support available to Black women and families. Leveraging the power of technology and already-existent relationships, DIY Doula equips everyday people with the knowledge and techniques needed to be a quality source of support for their pregnant loved ones. Interactive and digestible educational content, symptom tracking and reporting features, contraction trackers, and referral tools are the main offeri
Problem: The saying often goes, “It takes a village to raise a child.” What is typically not mentioned, however, is that a mother needs a village for herself too, specifically during pregnancy and postpartum. This is especially true for Black mothers, who are 2-4 times more likely to experience a pregnancy-related death than white women. Conversations with 
Evidence: DIY Doula is nothing less than a reflection of the needs and unsolved problems faced by many Black families. Through interviewing, surveying, consuming relevant media (documentaries, op-eds), and immersing myself in spaces dedicated to sharing birth stories, I have been able to take inventory of wha
Differentiation: DIY Doula is far from being the first venture to attempt solving this problem. However, our venture is equipped with value propositions that separate us from competitors. Firstly, it’s no surprise that there are other pregnancy care apps on the market. However, in my competitive landscaping research
Target audience: The app's main audience is the loved ones of pregnant people. In my conversations with pregnant women/mothers, their loved ones, and doulas (pregnancy support professionals), it has become clear that loved ones have an untapped potential in terms of improving the perinatal experience. Loved ones, na
GTM: Our go-to-market strategy is a mixture of standard digital marketing and leveraging community and organizational networks. As far as digital marketing is concerned, we plan to utilize social media, specifically apps like Instagram and TikTok, by posting content that gives viewers a preview of what w
Revenue model: Our primary means of making money will be through subscriptions for the premium version of the app. The app will charge individual users on a monthly basis. While the price of the subscription is still to be determined, we will be strategically prici
TAM/SAM/SOM: TAM: There are approximately 1.5 billion English-speakers globally. According to Johns Hopkins, approximately 1.6% of a country's population gives birth in a given year, on average. This means there a
Users: 0 | Paying: 0 | Revenue to date: $0.00
Incorporated: No | Entity: LLC, Washington, DC (where I lived before Emory)
Investment raised: $35000.00 | Fundraising: Yes | Monthly burn: $400.00
Prior accelerators: OptiMize Social Impact Incubator at the University of Michigan (2022)
The Hatchery Innovation Incubator (2024-2025)
Summer goals: User Testing: My primary goal for the summer is to continue the development and testing of our prototype. For the past year, I have been working with the Hatchery and Emory computer science students to complete the front-end and back-end development for the app. We are on our way to having a prototype/demo ready by the time this accelerator starts 
Why right founder: Personal Passion: Black maternal health has been a cause dear to my heart for the past eight years. With me being a Black woman who has always been immersed in Black communities, the issues of Black women’s health and the stability of Black families are ones that I feel a personal sense of responsib
Achievement: Rather than being a single accomplishment, my most impressive achievement is that my academic, professional, and personal journey thus far has been nothing short of a labor of love for my community. In pursuit of my goal of closing racial health and 

--- Anchored Aerial Systems ---
Founder: Jacob Beldick | Email: jbeldick3@gatech.edu
Role: Founder (Technical) | Emory: No | School: N/A | Degree: N/A
Location: Atlanta, Georgia, United States | Industry: B2B / Enterprise Software,Hardware / IoT,Logistics / Supply Chain,Real Estate / PropTech
Stage: Building | Team: 1 | Co-founder: No
Weekly hours: 15 | Started: 8/17/2024
Overview: On March 16, the Federal Aviation Administration (FAA) is expected to pass legislation vital to the drone delivery revolution (FAA Part 108), a major step towards solving the last-mile delivery problem. This advance, however, creates a new problem, because the necessary infrastructure  to support drone delivery to multistory buildings, such as apartment complexes and office buildings, doesn't exist yet. Anchored Aerial Systems is developing a device that will allow any building to integrate dron
Problem: The audience wants to increase/maintain their property value, which involves catering to consumer preferences in a cost effective manner. Consumer preferences are prone to change dramatically with technological advances.
 
Before Amazon Prime, for example, consumers were satisfied with 2 week delivery for products purchased online. Today, over 35% 
Evidence: In a broader sense, it is apparent that if drone delivery is to become widespread and desired by tenants, then property owners/managers will need to incorporate infrastructure that supports this into their buildings. 
In China, where drone delivery is more prevalent, package vending machines are com
Differentiation: The most popular proposed solution is an external drone vending machine/external mailbox system, which isn't great for placement in major cities, since it takes up valuable real estate and could even lower surrounding property value by making the area by making it more cluttered. It also makes acces
Target audience: The target customers are commercial and residential real estate developers and property managers/owners, specifically for multistory buildings. This is supported by they are the ones with both the authority and incentive to integrate drone delivery into their buildings, with the aim of raising prope
GTM: Marketing will likely be a combination of paid advertising online and cold outreach to potential customers, both of which I have experience with from a previous sales role.
Revenue model: I will make money by selling drone delivery integration units (and possibly the related software) to building owners/managers or real estate developers.
TAM/SAM/SOM: Every single multistory building in the United States, specifically those with more than three floors that regularly are used as delivery addresses. According to numbers from the Department of Housing
Users: 0 | Paying: 0 | Revenue to date: $0.00
Incorporated: Yes | Entity: Georgia LLC
Investment raised: $0.00 | Fundraising: No | Monthly burn: $50.00
Prior accelerators: Yes, the Hatchery Incubator at Emory University.
Summer goals: My goal is to finish building an MVP and get at least 3 LOIs from customers. I plan on doing this through rapid prototyping and testing combined with customer validation.
Why right founder: I believe I’m not only the right founder, but the right founder at the right time.
My biggest advantage is that I spent over a year in the same position as my customers. My venture originally focused on rapid drone delivery of AEDs and other emergency medical supplies to patients in critical conditi
Achievement: I was the youngest person ever to finish Ultraman Florida (a 3-day, 320-mile ultra-triathlon) at age 19. In terms of technical ability, I developed a novel method for post-processing and imaging the airways of 3D printed hydrogel lung scaffolds, with

--- StageWing ---
Founder: Sed Joseph | Email: sed@stagewing.com
Role: Founder & CEO | Emory: No | School: N/A | Degree: N/A
Location: Atlanta, GA | Industry: eCommerce,Logistics / Supply Chain,Other,SaaS,Consumer
Stage: Product/Market Fit | Team: 2 | Co-founder: No
Weekly hours: 70 | Started: 1/20/2019
Overview: Mobile DJs and A/V providers have valuable live audio and lighting equipment sitting idle between gigs, while other event professionals constantly need gear they don't own — StageWing was built to close that gap. We're an equipment-sharing community that connects event professionals like DJs, event planners, and A/V techs with local equipment providers, we call Wingmates, currently across 14 states. Our mission is to make professional event equipment accessible, affordable, and community-driven 
Problem: Our customers face two interconnected problems: renters struggle to access affordable, reliable professional live audio and lighting equipment without committing to ownership, while equipment owners like mobile DJs and A/V providers have valuable gear generating zero revenue between gigs. Beyond my own personal lived experience, we've been doing cu
Evidence: The most compelling evidence that StageWing is on the right track is that our community keeps growing — organically and across markets we haven't even formally launched in. We have active Wingmates across 14 states and renters actively booking equipment through the platform. That traction came not j
Differentiation: Most equipment rental solutions fall into one of two categories: big-box rental companies or informal peer arrangements. Neither serves the event professional community well, and that's exactly where StageWing is different.

Big-box rental companies like Guitar Center or local A/V houses are expensi
Target audience: StageWing serves two sides of a marketplace: renters — DJs, event planners, and event hosts who need professional live audio and lighting equipment — and Wingmates, which are mobile DJs and A/V providers looking to monetize gear that would otherwise sit idle between gigs. I know this audience intima
GTM: StageWing's go-to-market strategy is built around meeting event professionals where they already are — online, at industry events, and within the communities they trust.

Community and word of mouth. Our earliest and most organic growth has come from within the event professional community itself. D
Revenue model: StageWing generates revenue through three primary streams:
Transaction-based take rate. Our core revenue model is a percentage-based take rate on every rental transaction facilitated through the StageWing platform. When a renter books equipment from 
TAM/SAM/SOM: The market opportunity for StageWing is substantial and well-documented. The U.S. audio-visual equipment rental market is valued at approximately 6.5 to 10.6 billion dollars and is growing at a compou
Users: 569 | Paying: 70 | Revenue to date: $248920.19
Largest customer: A mobile DJ who does corporate and private events.  She pays on average $800- $1000 for a rental package and add-on services like delivery and setup
Incorporated: Yes | Entity: Delaware C Corp
Investment raised: $20000.00 | Fundraising: No | Monthly burn: $879.00
Prior accelerators: Yes, I have participated in the following programs:
Atlanta Tech Village's It takes a Village pre-accelerator
Streetcode Academy Entreprenuerial Pre-acelerator
Techstars Atlanta Cox Accelerator 
Pixel
Summer goals: My goals for the summer accelerator are focused on three primary areas: product development, brand positioning, and capitalizing on a unique moment for StageWing.

On the product side, we have excellent product-market fit — our community is real, our bookings are happening, and both Wingmates and renters are actively using the platform. However, th
Why right founder: I am the right founder to build StageWing because I have lived every side of this problem — and I have been living it for over two decades.

I am currently in my twenty-first year as an active working DJ. As a working DJ for 21 years — starting at a local roller rink and growing into weddings, netwo
Achievement: As a working DJ for 21 years - starting at a local roller rink and growing into large-scale festivals, conventions, movie wrap events, and corporate and government-sponsored events nationwide and internationally - I built my career entirely through r

--- Helping HAN ---
Founder: Hamraj Sanghera | Email: hamrajssanghera@gmail.com
Role: Co-founder | Emory: Yes | School: Emory College | Degree: BS Computer Science and Math, 2027
Location: Atlanta, GA | Industry: Artificial Intelligence / Machine Learning,Healthcare,Biotech / Life Sciences
Stage: Testing | Team: 2 | Co-founder: Yes
Co-founders: Sia Vij
https://www.linkedin.com/in/sia-vij-423735214/
Co-founder skills: Sia leads our research and partnership work. She has lab experience and a background in experiment design and research ethics, which has shaped how we approach developing our solution from the ground 
Weekly hours: 20 | Started: 7/16/2025
Overview: Helping HAN is building the first AI-supported digital health platform designed specifically for head and neck cancer (HNC) survivors. Our core tool uses a throat microphone to automatically analyze swallowing audio, detecting acoustic patterns that indicate dysphagia and scoring swallowing quality without manual clinical review. Using those scores, the platform delivers personalized swallowing exercises, closing the loop between monitoring and rehabilitation in one integrated app experience.
Problem: Head and neck cancer survivors do not have a way to keep tabs on their swallowing health between clinical appointments. Over 49% of long-term HNC survivors experience moderate to severe dysphagia, and 27% have not received any swallow therapy since completing cancer treatment. Patients are sent home with a sheet of exercises without much guidance a
Evidence: We have a working prototype and are already analyzing swallowing audio by inspecting sound waves. This has confirmed that throat microphone recordings pick up meaningful swallowing signals and that differences in quality are detectable. Published research supports using acoustic signals for dysphagi
Differentiation: The options that exist today are invasive, expensive in-clinic procedures like videofluoroscopic swallowing studies and fiberoptic endoscopic evaluations of swallowing, or generic exercise programs that give every patient the same plan regardless of what they are experiencing. There is no solution t
Target audience: Our customers are oncology clinics and speech language pathology (SLP) practices that treat head and neck cancer survivors, with the survivors themselves as the end users. We came to this through talking directly to survivors and clinicians early on, which shaped our understanding of both who the re
GTM: Our focus is on direct outreach to oncology clinics and speech language pathology (SLP) practices that work with head and neck cancer patients. Clinicians are our key channel because a provider adopting the tool allows for all their current patients to utilize it. We have developed a partnership wit
Revenue model: We will be billing a per-patient subscription through the clinic. This allows us to grow with usage and ties our revenue directly to how many people the tool is actually serving. This lowers the barrier to adoption for clinics, as it does not involve
TAM/SAM/SOM: There are an estimated 452,000 people living with head and neck cancer in the United States. The National Cancer Institute estimated approximately 72,680 new diagnoses of oral cavity, pharynx, and lar
Users: 0 | Paying: 0 | Revenue to date: $0.00
Incorporated: No | Entity: Delaware C Corp
Investment raised: $0.00 | Fundraising: No | Monthly burn: $0.00
Prior accelerators: We are participating in the Hatchery Incubator at Emory University. This experience has helped us establish our clinical partnerships, develop our working prototype, and move forward with IRB approval
Summer goals: We plan to finish and validate our audio analysis algorithm to automate the scoring of swallowing and personalization of exercises. Additionally, we are in the process of setting up our pilot study, with the goal of enrolling our first patients and collecting data to validate clinical efficacy.
Why right founder: My cofounder watched her teacher quit their career because of difficulty swallowing following head and neck cancer, and it made clear just how little support exists for survivors after treatment ends. Clinicians are already overwhelmed managing the cancer itself, and survivorship care like swallowin
Achievement: I co-built ParserPro, a tool that gives developers instant AI-powered explanations and live data visualizations for any selected code snippet, adding context for unfamiliar codebases while seamlessly integrating into their workflow. My co-founder, Si

--- Stool Stomper (transitioning to I.D.E.A.S. Global Tech). I am rebranding from the research-stage title "Stool Stomper" t ---
Founder: Mariana Stephens | Email: mariana.stephens@emory.edu
Role: Founder and CEO | Emory: Yes | School: Goizueta Business School | Degree: MBA, 2026
Location: Atlanta, Georgia USA | Industry: Biotech / Life Sciences,Logistics / Supply Chain,Social Impact / Non-profit,Healthcare,Government / GovTech,Manufacturing,SaaS
Stage: Product/Market Fit | Team: 7 | Co-founder: No
Weekly hours: 20 | Started: 9/15/2023
Overview: The Stool Stomper is a low-cost, 3D-printable handheld mechanical device that upgrades the WHO-standard Kato-Katz technique for diagnosing soil-transmitted helminths (STHs) and schistosomiasis by delivering uniform 20 N pressure for consistent thick smears. The Tanzania STH pilot with diverse lab techs showed ~5s faster prep (68s vs. 73s), 14s faster egg counting (183s vs. 198s), 31% higher accuracy, and superior light-infection detection compared with manual methods, addressing field survey var
Problem: The central problem our primary audience faces is diagnostic decay at precisely the moment when high-quality data are most needed to achieve elimination targets. The World Health Organization tasks National Ministries of Health and implementing partners with reducing heavy-intensity soil-transmitted helminth and schistosomiasis infections to below 
Evidence: The strongest evidence that our solution is the correct one comes from a rigorous, blinded pilot study in Tanzania, the peer-reviewed publication of those results, and alignment of the observed performance gains with what global experts have been calling for in the literature. In the Tanzania pilot,
Differentiation: The Stool Stomper is fundamentally different from most competing diagnostic innovations because it does not seek to replace the World Health Organization–standard Kato-Katz technique with a new platform; instead, it strengthens and standardizes the existing technique in a way that is realistic for e
Target audience: Our primary target audience in Phase 1 is the network of National Ministries of Health in soil-transmitted helminths and schistosomiasis endemic countries, alongside the non-governmental organizations that implement soil-transmitted helminths and schistosomiasis programs and mass drug administration
GTM: The go-to-market strategy is intentionally grounded in the realities of global health procurement and the timelines imposed by the WHO 2030 Neglected Tropical Diseases Roadmap. It unfolds in two overlapping phases that mirror how Ministries of Health, NGOs, and pharmaceutical partners typically disc
Revenue model: The revenue model is deliberately structured to reconcile two objectives that are often in tension in global health: ensuring affordability for Ministries of Health in low- and middle-income countries while building a financially sustainable company 
TAM/SAM/SOM: The immediate market for Stool Stomper is the soil-transmitted helminths and schistosomiasis diagnostics segment, which sits within the broader neglected tropical diseases diagnosis market. According 
Users: 7 | Paying: 0 | Revenue to date: $0.00
Incorporated: In Progress | Entity: The intended entity is a Georgia LLC, chosen for its simplicity, low administrative burden, and flex
Investment raised: $0.00 | Fundraising: Yes | Monthly burn: $0.00
Prior accelerators: No, this is my first formal accelerator application; prior support has come organically through Emory Goizueta Business School's Executive MBA track (Class of 2026), where my capstone focused on Stool
Summer goals: My three core goals for the Hatchery summer of 2026 center on technical scaling with an AI-imaging add-on, brand positioning, and market strategy to propel I.D.E.A.S. Global Tech from validated prototype to investment-ready venture. First, achieve technical scaling with AI-imaging integration: leverage RightShift's AI-powered tools and engineering 
Why right founder: I am the right founder to solve the core problem that the WHO standard Kato-Katz diagnostic for soil-transmitted helminths and schistosomiasis demands enhancements for accuracy and speed at minimal cost for endemic countries, because I have lived these parasites' impact, co-authored and led the enti
Achievement: Delivering my TEDxAtlantaWomen talk, "Why We All Have a Role in Eradicating Intestinal Worms," to thousands showcased my ability to distill complex global health challenges into compelling, actionable narratives. The talk gave me the platform to shar

--- SwapADay ---
Founder: Claire Liu Yang | Email: claire@swapday.com
Role: Founder and CEO | Emory: Yes | School: Emory College | Degree: N/A
Location: NYC | Industry: Artificial Intelligence / Machine Learning,Consumer,Education / EdTech,HR Tech / Future of Work
Stage: Testing,Building | Team: 4 | Co-founder: Yes
Co-founders: Ken Amarit: https://www.linkedin.com/in/ken-amarit/
Aravind Veerappan: https://www.linkedin.com/in/aravind-veerappan-499b13358/
We have have an advisor - Dean Maye: https://www.linkedin.com/in/odeanma
Co-founder skills: Ken Amarit, former startup CTO with a background in product, gaming, and UX (including work featured at the Smithsonian) is our product and design lead. He brings an intuitive grasp of what makes digi
Weekly hours: 15 | Started: 12/1/2025
Overview: SwapADay is building an AI-powered platform that helps mid-career professionals explore new career paths through immersive, real-world “day-in-the-life” swaps with curated hosts. It's built for mid-career professionals facing AI disruption and personal unfulfillment. We’re reimagining career change as an immersive AI-powered identity transformation journey.
Problem: Many mid-career professionals want to explore new career directions but lack safe, practical ways to do so before making major life decisions.

Students have internships that allow them to experience different professions before committing to a career path. However, mid-career professionals rarely have equivalent opportunities. Once someone has spe
Evidence: We’ve seen strong early resonance: dozens of mid-career professionals have interacted with our prototypes and joined the waitlist. 55+ hosts across sectors from AI and fashion to journalism and real estate, are eager to share their world. Many say they wish something like this had existed during the
Differentiation: Our competitors include career discovery platforms (e.g. PathMatch, The Grand, ), upskilling platforms (e.g. Springboard, Reforge), and coaching or cohort-based programs (e.g. Chief, ADPList, Maven). Most focus on skills, credentials, or peer networking, not the emotional and experiential side of ca
Target audience: SwapADay’s primary target users are mid-career knowledge professionals (typically 5–20 years into their careers) who feel devalued, displaced, or directionless in the age of AI and want to explore meaningful new paths without starting from zero.

These are professionals in fields such as tech, consu
GTM: SwapADay’s go-to-market strategy focuses on high-trust professional communities where career experimentation and knowledge sharing are already common. Our early adopters are mid-career professionals in startup, tech, and innovation ecosystems, which are highly networked and conducive to early market
Revenue model: We plan to monetize through a hybrid model combining subscription and transactional revenue:

- Monthly membership ($20–50/month) unlocks access to curated host calendars, AI identity agent features, early access to swap opportunities, and identity-d
TAM/SAM/SOM: SwapADay focuses on the growing market of mid-career professionals exploring career transitions and reinvention.

In the United States alone, there are over 60 million knowledge workers in fields such
Users: 55 | Paying: 0 | Revenue to date: $0.00
Incorporated: Yes | Entity: Delaware C Corp (Public Benefit Corporation designation)
Investment raised: $1000.00 | Fundraising: No | Monthly burn: $2000.00
Prior accelerators: We haven’t participated in any accelerators yet. We’ve applied to a few programs, but have not committed to or joined any.
Summer goals: SwapADay enables professionals to explore possible career paths through curated “day-in-life” experiences hosted by other professionals. Over the summer, we aim to focus on three key milestones:

1. Launch and refine the MVP platform
We plan to complete the initial version of the SwapADay platform, including member profiles, host listings, booking 
Why right founder: We’re the right team to solve this problem because we’ve lived it and we’ve built for it.

SwapADay is rooted in a question I first asked during an identity crisis in college at Emory: Who am I outside the roles I play?

I’ve spent my career at the intersection of urban innovation, workforce develop
Achievement: After a $160M broadband budget was clawed back by the NYC mayor, I secured a partnership with Facebook Connectivity and Siklu to deploy mmWave Terragraph internet in 15 NYC buildings. The network is still live today, serving residents who previously 

--- The PEP Institute ---
Founder: Chloe Taylor Brown | Email: chloe@thepepinstitute.com
Role: Founder and CEO | Emory: No | School: N/A | Degree: N/A
Location: Atlanta, GA | Industry: SaaS,HR Tech / Future of Work,Education / EdTech,Developer Tools / Infrastructure,B2B / Enterprise Software,Artificial Intelligence / Machine Learning
Stage: Testing,Product/Market Fit | Team: 2 | Co-founder: No
Weekly hours: 60 | Started: 2/24/2024
Overview: Most leadership and organizational failures begin not as strategy problems, but as perception problems — invisible distortions in how leaders see themselves, others, and reality. The PEP Institute is a wisdom-tech company at the intersection of identity architecture, human development, and AI-powered diagnostics, building the perception infrastructure that modern leadership is missing. Founded by executive coach, author, and systems innovator Chloé Taylor Brown, we are translating over two decad
Problem: The leaders and organizations The PEP Institute serves are not failing for lack of strategy, information, or ambition. They are failing — quietly, expensively, and often invisibly — because of distorted perception.

Distorted perception shows up as chronic indecision in capable leaders. As communication breakdowns that derail otherwise aligned team
Evidence: The evidence that The PEP Institute's solution is correct is not theoretical. It is demonstrated through the outcomes produced at the highest levels of executive leadership.

Marvin Ellison, CEO of Lowe's Companies — one of the largest retailers in the United States — is among the leaders whose work
Differentiation: The leadership development market is crowded. It is not, however, deep.
Most existing solutions — from personality assessments and 360 feedback tools to executive coaching platforms and organizational culture software — operate at the level of behavior, competency, and output. They measure what a le
Target audience: The PEP Institute's primary customers are individual executives and senior leaders, HR and People leaders, and the corporations and enterprise teams they serve. These are not aspirational targets — they are the audience I have worked with directly for over two decades as an executive coach, author, 
GTM: The PEP Institute's go-to-market strategy is built on three mutually reinforcing channels — not paid acquisition or cold volume, but compounding authority.

The first is thought leadership. Chloé Taylor Brown has spent over two decades building a public presence and body of work that speaks directly
Revenue model: The PEP Institute is designed as a multi-stream revenue company with a clear progression from high-touch, high-value engagements to scalable platform infrastructure.

Near-Term Revenue: High-Touch Entry Points
The immediate revenue model is built on 
TAM/SAM/SOM: The PEP Institute operates at the intersection of several large and rapidly expanding markets. The global leadership development market is currently valued at over $98 billion and is projected to reac
Users: 13 | Paying: 7 | Revenue to date: $30000.00
Largest customer: 1:1 Clients $13,000 over 6 months
Incorporated: Yes | Entity: LLC
Investment raised: $10.00 | Fundraising: No | Monthly burn: $1000.00
Prior accelerators: No
Summer goals: This summer represents a precise and consequential inflection point for The PEP Institute — and I am entering this accelerator with clarity about exactly what I need to accomplish in the ten weeks we have together.

First: Platform Architecture and Product Validation
My primary goal is to move from methodology to deployable product. The intellectua
Why right founder: The problem The PEP Institute exists to solve is not one I identified from the outside. I lived it, navigated it, and eventually named it — from the inside of some of the most consequential human transitions a person can move through.

I know what it is to build an identity under public scrutiny, to
Achievement: Over 17 years, I developed My Mantra Creation — a proprietary wisdom-tech experience that guides individuals to the precise language of their own truth, producing not an affirmation but a personal frequency they can lead from. It is the first intelli

--- MintCover ---
Founder: Sonja Kuhn | Email: sonja@mintcover.net
Role: CEO & Founder | Emory: No | School: N/A | Degree: N/A
Location: Alpharetta, GA | Industry: InsurTech
Stage: Building | Team: 3 | Co-founder: No
Weekly hours: 140 | Started: 6/1/2025
Overview: MintCover is building the decision layer for insurance, a market where consumers are asked to compare policies before they understand what they actually cover. Our platform combines AI-driven education with a personalized Coverage Protection Score to help people evaluate coverage before purchasing a policy. The result is better insurance decisions for consumers and higher-intent customers for agents and carriers.
Problem: The core problem is that consumers want to easily purchase an insurance policy they actually understand — one that includes the coverage they genuinely need — but the current buying experience makes this nearly impossible.

I lived this problem firsthand. When I moved to the United States two years ago, I needed to find insurance for the first time
Evidence: In a quantitative study of 300 U.S. consumers, 84% said they would likely use a marketplace that explains insurance in plain language, and 75% said transparency would significantly increase their trust in an insurance decision. These signals indicate strong demand for a product that prioritizes educ
Differentiation: Most existing marketplaces in the insurance market focus on price comparison. They collect a few data points from the user, display quotes, and leave the consumer to figure out how policies differ in terms of actual coverage and risk protection. Worse, many of these platforms are fundamentally desig
Target audience: MintCover's primary target audience is young professionals and first-time renters in the United States (ages 22–35) who are purchasing insurance independently for the first time.

This audience researches insurance online but struggles to understand coverage differences between policies. Many feel o
GTM: MintCover's go-to-market strategy is built around the consumer life events that trigger the insurance purchasing process. Moving into a new apartment, browsing listings on Zillow, shopping for home decor or furniture, buying plants for a new space — these are the moments when consumers first realize
Revenue model: Consumers use the platform for free to understand their insurance needs and evaluate policy options through MintCover's education tools, guided assessment, and Coverage Protection Score. When they are ready to purchase coverage, they can connect with
TAM/SAM/SOM: The U.S. personal insurance market represents over $700 billion in annual premiums across renters, auto, homeowners, and life insurance.

MintCover initially targets renters and young professionals en
Users: 1 | Paying: 1 | Revenue to date: $0.00
Largest customer: Our first carrier partner, Lemonade, is currently our largest paying customer under a signed contract. As MintCover has not launched yet, revenue gene
Incorporated: Yes | Entity: Delaware C Corp
Investment raised: $50000.00 | Fundraising: No | Monthly burn: $500.00
Prior accelerators: Yes. MintCover was selected for the Global Insurance Accelerator (GIA), one of the leading accelerator programs focused exclusively on the insurance industry backed by 10 insurance carrier investors a
Summer goals: During the accelerator, my goal is to move MintCover from validated concept to a testable product with early marketplace traction.
We have already established early signals of demand. MintCover currently has 200 people on the waitlist, has secured a first carrier partner, signed one additional NDA with another carrier, and has three additional carr
Why right founder: I am uniquely positioned to solve this problem because I have built, sold, and optimized insurance products across every side of the market.

I began my career as an insurance agent in Germany at a Munich Re company, where I learned how to understand consumer needs and help customers make informed i
Achievement: I have traveled solo through 57 countries, including self-driven road trips across remote regions of Africa where I navigated unexpected challenges from vehicle breakdowns to a close encounter with a wild gorilla in Uganda. Those experiences taught m

--- BizGuider ---
Founder: Ornella Adekoye | Email: oyovo@emory.edu
Role: CEO | Emory: Yes | School: Goizueta Business School | Degree: MBA 2027
Location: Atlanta, GA | Industry: Fintech,SaaS
Stage: Testing | Team: 2 | Co-founder: Yes
Co-founders: Jefferson Akpona - https://www.linkedin.com/in/jeffersonakpona/
Co-founder skills: Jefferson serves as our CTO and leads all technology development for BizGuider. He is a Computer Engineering graduate from Northeastern University, AWS Certified Solutions Architect, and brings hands-
Weekly hours: 30 | Started: 9/1/2025
Overview: BizGuider is a capital readiness platform that prepares small businesses for funding through fundability scoring and personalized action plans, then connects them with lenders that fit their needs. We partner with CDFIs and community lenders who use the platform to streamline their borrower pipelines and deploy capital more efficiently. Our goal is to close the gap between underserved entrepreneurs and the capital they need to grow.
Problem: Small business owners need access to capital to grow but most don't know what lenders are looking for or how to position themselves to get approved, leaving them vulnerable to predatory lending products. On the lender side, CDFIs and community lenders have funds that must be deployed but consistently struggle to find a pipeline of qualified applica
Evidence: The most direct evidence is that we have already been delivering a manual version of this solution through my personal consulting services. By providing pre-screening and documentation packaging as a service, our clients have successfully secured funding that they were previously unable to access on
Differentiation: Most platforms either match businesses to lenders without addressing readiness, or provide technical assistance without a focus on capital access. BizGuider combines both, guiding businesses through the readiness process first and then connecting them with the right lenders.
Target audience: BizGuider serves two primary customers: small business owners who need help getting loan-ready, and CDFIs/community lenders who need a more efficient way to source deals and deploy capital.
We know from firsthand experience. I spent 5 years underwriting small business loans for CDFIs and personally 
GTM: We plan to reach small business owners through the CPAs, bookkeepers, and financial service providers they already trust as our primary channel partners, as well as technical assistance organizations that work directly with small businesses. These professionals are a natural fit because their client
Revenue model: BizGuider is a SaaS platform with two revenue streams. Small business owners pay a monthly subscription (testing $49/month) to access their fundability score, action plan, and lender matching. Service providers such as CPAs and bookkeepers pay a mont
TAM/SAM/SOM: Our most immediate addressable market is roughly 9.7 million minority-owned and underserved small businesses in the United States that lack access to traditional financing. On the service provider sid
Users: 12 | Paying: 0 | Revenue to date: $0.00
Incorporated: Yes | Entity: Delaware C Corp
Investment raised: $0.00 | Fundraising: No | Monthly burn: $150.00
Prior accelerators: The Hatchery Incubator & Techstars Emory Founder Catalyst
Summer goals: Our primary goals for the summer are to:
1. Launch our paid pilots with CPA and service provider channel partners and use that experience to validate our go-to-market strategy. 
2. Finalize our pricing model based on what we learn from these pilots. 
3. Establish 2 to 3 formal partnerships with CDFIs or technical assistance organizations that can s
Why right founder: I have spent the last 5 years underwriting small business loans for CDFIs and helped deploy over $50M in capital to underserved small businesses, which allows me to understand intimately how both sides of this problem work. Beyond my experience, this is personal. I am deeply committed to closing the
Achievement: I've helped deploy over $60M in small business capital through CDFI partnerships and built a technical assistance program for the New York Empire State Development.

--- Imagination Activated ---
Founder: Tamiia Quinn | Email: tnquinn@alumni.emory.edu
Role: CEO | Emory: Yes | School: Other,Emory College | Degree: BA Interdisciplinary Studies & Visual Arts, 2025
Location: New York (but anywhere) | Industry: Education / EdTech,Social Impact / Non-profit
Stage: Testing | Team: 1 | Co-founder: No
Weekly hours: 2 | Started: 8/27/2024
Overview: My project develops an interdisciplinary curriculum that integrates mindfulness, creative practice, and reflective learning to support students’ emotional well-being and creative development. Drawing on holistic education and the practice of Active Imagination developed by Carl Jung, the program combines artistic exploration with mindfulness-based exercises that foster self-awareness, imagination, and personal growth. By partnering with schools and youth organizations, the project aims to expand
Problem: Modern education systems often prioritize standardized testing and quantitative outcomes, leaving little space for creative exploration, mindfulness, and introspective learning. As a result, many students, particularly students of color, lack opportunities to develop the creative confidence, emotional awareness, and cultural understanding necessary
Evidence: Research in education increasingly demonstrates the benefits of mindfulness practices in academic settings, with studies showing improvements in attention, emotional regulation, stress reduction, and overall well-being. These findings support the integration of reflective and mindfulness-based pract
Differentiation: While many educational programs incorporate mindfulness or creative expression independently, few offer an integrated framework that combines art, psychology, philosophy, and personal transformation. This curriculum uniquely centers the practice of Active Imagination, developed by Carl Jung, as both
Target audience: The primary audience for this curriculum is students between the ages of 8 and 18, particularly those in upper elementary, middle school, and high school. These developmental stages are critical periods for cultivating creativity, self-awareness, and emotional resilience, yet students often have lim
GTM: The initial growth of this curriculum will rely on direct partnerships, community engagement, and educational networks. The program will first be introduced through partnerships with schools, youth programs, and community organizations that are already seeking innovative approaches to social-emotion
Revenue model: The program will operate using a mixed funding model designed to support accessibility while ensuring long-term sustainability. Funding sources may include grants from educational foundations, philanthropic donations, and partnerships with schools or
TAM/SAM/SOM: While the long-term market includes millions of students nationwide, the initial focus will be on local and regional partnerships with schools and youth programs, allowing the curriculum to be piloted
Users: 1 | Paying: 0 | Revenue to date: $0.00
Incorporated: In Progress | Entity: 501(c)(3)
Investment raised: $1200.00 | Fundraising: No | Monthly burn: $25.00
Prior accelerators: no
Summer goals: During the summer, I hope to strengthen and expand the development of my curriculum by connecting with mentors, educators, and community partners who can contribute their expertise and perspectives. While I have already developed lesson plans and piloted elements of the course, I am eager to refine the curriculum through collaboration with professi
Why right founder: My curriculum is a culmination of my life experiences, the obstacles I have navigated, the people I have encountered—friends, foes, and mentors alike—and the media that has shaped my worldview. Ultimately, I view Active Imagination as the unification of my passion for understanding the world I inhab
Achievement: In high school I became a swim instructor and lifeguard, which allowed me to gain a lot of valuable skills that ultimately helped a great deal when applying to college and building my financial responsibility. Now, I am working with Morehouse to begi

--- VibeCheck ---
Founder: Vidhi Tiwary | Email: vidhi.tiwary@emory.edu
Role: CEO and Founder | Emory: Yes | School: Goizueta Business School | Degree: BBA - 2027
Location: Atlanta | Industry: Artificial Intelligence / Machine Learning,Consumer
Stage: Building,Idea | Team: 1 | Co-founder: No
Weekly hours: 10 | Started: 1/3/2026
Overview: VibeCheck is a real-time nightlife intelligence platform that lets users see the crowd level, line wait times, cover fees, atmosphere, and safety conditions at bars and clubs before they arrive. By crowdsourcing live reports and location-verified content from people currently at venues, the app removes the uncertainty of going out and helps users make smarter decisions about where to spend their night. VibeCheck monetizes through venue partnerships, promoter event listings, and future premium us
Problem: The target audience wants to know what a nightlife venue is actually like before they arrive, including how long the line is, how crowded it is, the cover fee, and the overall vibe, so they can plan their night more efficiently and avoid wasting time and money.

I realized this was a real problem from personal experience. One night I waited outside
Evidence: Early customer discovery suggests strong demand for a solution like VibeCheck. In informal surveys and conversations with more than 50 nightlife attendees in Atlanta, 78% said they have left a venue because the line, crowd, or atmosphere was different than they expected, and many said they would be 
Differentiation: Current platforms like Yelp, Google Maps, and Eventbrite provide static information about venues or upcoming events, but they do not show what the experience is like in real time. VibeCheck is designed specifically for live nightlife decision-making, allowing users who are physically at a venue to s
Target audience: The primary target customers are college students (18–24) and young professionals (24–32) who regularly go out to bars, clubs, and nightlife events and want to know the crowd level, line wait times, cover fees, and overall atmosphere before arriving. Secondary customers include nightclubs, bars, and
GTM: The initial go-to-market strategy focuses on grassroots growth within concentrated nightlife communities. The platform will launch through a guerrilla marketing approach, building awareness through word-of-mouth, social media engagement, and direct networking with nightlife attendees while going out
Revenue model: VibeCheck will generate revenue primarily through B2B nightlife partnerships by charging clubs, bars, and promoters a listing or promotion fee to appear in the event and discovery feed. Venues can purchase premium visibility slots to increase exposur
TAM/SAM/SOM: The market for VibeCheck is large and growing, spanning the nightlife, social entertainment, and real-time experience discovery sectors. In the United States alone, there are over 60,000 nightclubs an
Users: 10 | Paying: 0 | Revenue to date: $0.00
Incorporated: In Progress | Entity: Deleware C Corp
Investment raised: $500.00 | Fundraising: Yes | Monthly burn: $250.00
Summer goals: My primary goal for the summer is to refine and finalize the VibeCheck product so it is ready for real-world use by focusing on functionality, user experience, and reliability of the real-time vibe reporting system. I plan to spend the summer improving the app’s core features and conducting on-the-ground testing by getting the product into nightlif
Why right founder: This problem feels personal to me because I understand what it’s like to plan a night out and not really know what you’re walking into. I want people to be able to enjoy nightlife without the constant uncertainty about crowd energy, safety, or pricing. VibeCheck came from thinking about how I would 
Achievement: I independently built the initial prototype of VibeCheck and began validating the concept by directly networking with nightclub owners and potential users to understand the operational side of nightlife. This process allowed me to translate an idea i

--- GoodFood ---
Founder: Saeed Tamboli | Email: stambo2@emory.edu
Role: Founder | Emory: Yes | School: Emory College | Degree: Econ-Math, 2029
Location: N/A | Industry: Climate / Clean Energy,Consumer,FoodTech / Agriculture
Stage: Testing | Team: 1 | Co-founder: No
Weekly hours: 5 | Started: 12/19/2022
Overview: GoodFood is a smart, stretchable food container lid that helps households reduce food waste by detecting when stored meat is about to spoil. The lid uses a gas sensor to measure Total Volatile Basic Nitrogen (TVB-N) emitted by bacteria during spoilage and alerts users through LED signals and a companion app when food should be eaten soon or thrown away. By giving real-time feedback on food freshness, GoodFood helps families save money, protect their health, and reduce unnecessary food waste.
Problem: The audience we target struggles with food waste and uncertainty about whether stored food is still safe to eat. Many households throw away leftovers because they forget about them or are unsure if the food has spoiled, which leads to unnecessary financial loss and wasted food. GoodFood solves this by providing real-time information about food fres
Evidence: We have several pieces of evidence suggesting our solution is effective. First, we built a functional prototype that can measure the gases released by spoiled meat, specifically Total Volatile Basic Nitrogen (TVB-N), which is a scientifically recognized indicator of meat spoilage. This shows that th
Differentiation: GoodFood is superior to current solutions because it uses scientifically measured gas detection rather than estimates or timers to determine when food has spoiled. Our lid measures Total Volatile Basic Nitrogen (TVB-N) allowing it to give real-time, accurate information about the safety of stored fo
Target audience: The primary target customers for GoodFood are U.S. families earning over $200,000 per year, with dual incomes and four or more members. These households tend to be busy, cook larger meals, and store more leftovers, which increases the likelihood that food will be forgotten and eventually thrown away
GTM: Our audience will find out about GoodFood through a go-to-market strategy focused on digital channels and social media. We plan to market the product through short-form content on platforms like TikTok and Instagram, as well as partnerships with food content creators who can demonstrate how the lid 
Revenue model: GoodFood will make money through a direct-to-consumer (D2C) product sales model. We sell the smart food container lids directly to consumers through our website, allowing us to build a brand and maintain higher profit margins without relying on retai
TAM/SAM/SOM: The Total Addressable Market (TAM) for GoodFood is $2.5 billion, representing approximately 70.7 million U.S. families that are food secure and consume meat. These households comprise the entire group
Users: 0 | Paying: 0 | Revenue to date: $0.00
Incorporated: No | Entity: Limited Liability Company
Investment raised: $3500.00 | Fundraising: Yes | Monthly burn: $0.00
Prior accelerators: Emory Entrepreneurship & Venture Management 2025 Fall Excellerator
Summer goals: Our main goal for the summer is to advance GoodFood from a working prototype to a validated product ready for early production. We plan to conduct testing to validate the accuracy of our spoilage detection system and refine the hardware design of the lid. 

We also aim to file a provisional patent and continue improving the product’s design, includ
Why right founder: What makes me well-suited to tackle this problem is my ability to learn quickly. I started this project with little knowledge of food microbiology, but through research and conversations with experts in meat science and sensor engineering, I was able to quickly learn the science behind spoilage dete
Achievement: I co-founded The Speaking Solution, a nonprofit that has provided free public speaking education to 300+ students across New Jersey, primarily in underserved communities. I built the curriculum in collaboration with organizations such as Citizens Uni

--- Chef A-Peel Limited ---
Founder: Thausha Martin | Email: tmartin@chefapeel.com
Role: Founder & CEO. I lead strategy, product development, partnerships, fundraising and U.S. market entry. | Emory: Yes | School: Other | Degree: N/A
Location: Currently incorporated in Jamaica, with operations transitioning to the United States. The founder is based in the U.S. and the company is preparing for U.S. incorporation as part of its strategy. | Industry: FoodTech / Agriculture,Manufacturing,Consumer,Logistics / Supply Chain
Stage: Product/Market Fit,Testing | Team: 4 | Co-founder: No
Weekly hours: 60 | Started: 3/1/2023
Overview: Chef A-Peel Limited is a food innovation company bringing authentic Caribbean cuisine to global markets through scalable food technology and product development. In our first phase, we are focused on producing consumer-ready frozen meals that deliver chef-crafted Caribbean flavors with consistency, quality and convenience. Our long-term model expands into sauces, spice blends and institutional food solutions, enabling retailers, cruise lines, hotels and food service providers to offer authentic 
Problem: Consumers increasingly want convenient, globally inspired meals but have limited access to authentic Caribbean options in mainstream frozen retail. While demand for ethnic and ready-to-eat foods continues to grow in North America, Caribbean cuisine is still largely confined to restaurants or small ethnic grocery sections, leaving few convenient pro
Evidence: Our solution has been validated through real operating environments and direct consumer engagement. Through our restaurant operations, we generated approximately US$475,000 in revenue within the first 11 months, serving over 14,000 customers, which demonstrated strong demand for authentic Caribbean 
Differentiation: Our solution combines authentic Caribbean culinary flavors with scalable production designed for mainstream convenience foods. While Caribbean cuisine is widely loved, it is often limited to restaurants or small ethnic grocery categories. Chef A-Peel aims to bridge this gap by translating Caribbean 
Target audience: Caribbean diaspora consumers and mainstream North American customers seeking authentic, convenient global cuisine. We validated this demand through our restaurant operations, which generated over US$475,000 in dining and catering revenue within the first 11 months, as well as through direct consumer
GTM: Our go-to-market strategy begins with focused validation and builds toward broader retail distribution.
Phase 1 – Diaspora-Focused Market Validation: We will introduce the products in markets with strong Caribbean diaspora populations through targeted retail pilots, farmers markets and sampling even
Revenue model: We are transitioning from a food service model to a consumer packaged goods retail model and will generate revenue through three primary channels. First, through retail frozen meals sold in grocery stores and specialty retailers, targeting both Carib
TAM/SAM/SOM: Our addressable market sits within the North American convenience and frozen food market, which is estimated at approximately $90 billion, with the ethnic food segment representing about $49 billion. 
Users: 0 | Paying: 0 | Revenue to date: $750000.00
Largest customer: Local arm of a multinational beverage manufacturing brand (U.S. $275,000 USD over 7 months).
Incorporated: Yes | Entity: Private Limited Company (Jamaica); U.S. incorporation planned (Delaware C-Corporation)
Investment raised: $2500.00 | Fundraising: Yes | Monthly burn: $38000.00
Prior accelerators: The Caribbean Entrepreneurship & Innovation Exchange (CEI) Jamaica program initiative by Nobellum, in partnership with the Development Bank of Jamaica (DBJ) and Jamaica Technology and Digital Alliance
Summer goals: Complete U.S. incorporation and regulatory setup
Conduct structured U.S. market validation with target consumers
Refine product formulations to meet U.S. food regulatory standards and optimize shelf life for retail distribution
Secure pilot retail placements to test product performance and gather market data
Prepare the company for a seed investmen
Why right founder: I combine culinary execution, manufacturing scale-up, institutional contracting and cross-border commercialization experience. I have built revenue-generating operations and negotiated complex partnerships, positioning Chef A-Peel for disciplined U.S. entry.
Achievement: I have led multi-million-dollar manufacturing and infrastructure initiatives across regulated industries, structuring cross-border supply agreements and presenting capital proposals to multinational corporations and Boards.

--- ChaiRM ---
Founder: Justin Jang | Email: justin.jang@emory.edu
Role: Founder | Emory: Yes | School: Emory College,Goizueta Business School | Degree: BBA Finance & ISOM, 2029
Location: Atlanta, GA | Industry: B2B / Enterprise Software,SaaS,Education / EdTech
Stage: Building,Testing,Product/Market Fit | Team: 1 | Co-founder: No
Weekly hours: 6 | Started: 2/20/2026
Overview: ChaiRM is a user-friendly CRM designed for students navigating coffee chats and recruiting. It helps users track contacts, debrief and log conversations, manage follow-ups, and generate personalized outreach drafts in one place. The goal is to alleviate the chaos of networking so university students can focus on building genuine relationships rather than feeling paralyzed by the stress of scheduling chats and managing spreadsheets.
Problem: I faced these challenges firsthand as a first-year business student, managing networking tasks across multiple, unintuitive tools. Networking for internships and clubs felt inefficient and inconsistent. I observed similar struggles among peers, and market data confirms this trend: Handshake found the Class of 2025 applied to 21% more jobs than the 
Evidence: The strongest evidence is that students are already attempting to address this issue without a dedicated product. Career centers at schools such as Yale and Rochester recommend using spreadsheets or trackers to manage applications, contacts, follow-ups, deadlines, and notes, validating the workflow 
Differentiation: Our solution is better than current options because students today have to piece together their workflow using tools made for other purposes, not for managing coffee chats. Notion, for example, has 472 job application tracking templates, which shows there’s demand for organization, but these templat
Target audience: ChaiRM’s target customers are college students actively engaged in career preparation and networking, with an emphasis on business students and those in majors that require extensive recruiting. This includes students seeking internships or first jobs in fields like business, finance, and consulting
GTM: Our go-to-market starts with friends and classmates in the business school because this is a peer-driven product for a highly social workflow. That is a strong first channel because students are often most influenced by people who are close to their own experience, and peer-to-peer interactions have
Revenue model: We would likely monetize through a freemium subscription model. Students can use the product for free up to a set number of contacts or AI-generated drafts, then upgrade to a paid tier for higher or unlimited usage, mirroring how existing SaaS produc
TAM/SAM/SOM: Our market is large at the top and much narrower in the segment that matters first. NCES reports about 20.1 million students in U.S. postsecondary education overall, which is the broadest market for a
Users: 0 | Paying: 0 | Revenue to date: $0.00
Largest customer: We do not yet have users because my MVP was finished on the due date of this application. Looking to soft launch and track user metrics immediately.
Incorporated: No | Entity: Delaware C Corp
Investment raised: $0.00 | Fundraising: No | Monthly burn: $20.00
Prior accelerators: I have not participated in an accelerator as a founder but I run Excellerator at EEVM as an executive director and I've provided feedback and done outreach for participants of Start:ME Atlanta's accel
Summer goals: My goals for the summer are to move ChaiRM from MVP to a product that real students are actively using. I want to run several soft launches, learn from user behavior and feedback, and then do a broader launch once the product is more refined. I also want to track key user metrics, figure out what actually drives traffic and retention, and test how 
Why right founder: I am the right founder to solve this problem because I have personally experienced it and understand how draining it can be. As a first-year business student, I reached a point where trying to keep up with coffee chats, contacts, follow-ups, and relationship details across different tools felt menta
Achievement: One of the most impressive things I’ve achieved is leading Excellerator, Emory’s only student-run startup accelerator, as Executive Director. I manage the 7-week program, supervise associate-founder relationships, and mentor six early-stage student f

--- Amphibia AI ---
Founder: Maxwell Danquah | Email: madanqu@emory.edu
Role: Founder | Emory: Yes | School: Goizueta Business School | Degree: May 2026
Location: Atlanta | Industry: Artificial Intelligence / Machine Learning,HR Tech / Future of Work
Stage: Building,Idea | Team: 2 | Co-founder: Yes
Co-founders: Sam Liu (https://www.linkedin.com/in/zhiyusamliu/)
Co-founder skills: AI/ML researcher and project management
Weekly hours: 20 | Started: 10/10/2025
Overview: Amphibia AI is an enterprise intelligence layer that helps mid-market organizations make strategic workforce decisions in hours, not weeks. Unlike Workday or Visier, which are locked to their own ecosystems, Amphibia sits across all systems — answering the question no single vendor can: is our workforce actually creating value, or just busy? We serve the 500–5,000 employee segment with SaaS pricing starting at $4 per employee per month.
Problem: Organizational leaders are drowning in data but starved of insight — the average enterprise runs 9+ disconnected ERP systems with 50% overlapping functions, yet only 24% of organizations report maximizing value from their ERP technology (Gartner). The result is reactive firefighting: attrition spikes, engagement drops, and AI investments that nobod
Evidence: Our strongest evidence is what customers told us without being asked: across 40 discovery interviews, Organizational leaders consistently described the cross-system visibility gap and inability to measure AI ROI as their most pressing unsolved problem — not a nice-to-have. No existing vendor was nam
Differentiation: Every major competitor is ecosystem-locked by design: Workday AI only sees Workday data, Visier excels at retrospective reporting within its own environment, and Agentforce optimizes Salesforce. Amphibia sits across all systems simultaneously — connecting HR, productivity, and AI adoption signals th
Target audience: Our primary buyers are VP-level organizational leaders and CFOs at mid-market companies (500–5,000 employees) in data-intensive industries — organizations large enough to feel acute pain from fragmented ERP systems, but too small to justify $500K+ enterprise implementations from Workday or SAP. We k
GTM: Our initial go-to-market is a design partner program targeting mid-market HR leaders directly — converting discovery interview relationships into paying early customers who co-develop the product and generate referenceable case studies. Simultaneously, we are pursuing Workday and SAP partnership cha
Revenue model: Amphibia operates on a per-employee-per-month (PEPM) SaaS model with two tiers: an Essentials tier at $4 PEPM for unified dashboards and basic analytics, and an Intelligence tier at $8–10 PEPM for predictive models, AI Workflow Intelligence, and work
TAM/SAM/SOM: The AI-in-HR market stands at $3.25B today and is projected to reach $15.24B by 2030, growing at 24.8% annually — sitting inside a broader HR technology TAM of $40.45B. Our immediate focus is the mid-
Users: 0 | Paying: 0 | Revenue to date: $0.00
Incorporated: No | Entity: Delaware C Corp
Investment raised: $0.00 | Fundraising: No | Monthly burn: $1500.00
Prior accelerators: The Pitch Summit -  Emory University
Summer goals: By the end of the summer, we have three concrete goals: close 2–3 design partner agreements with paying mid-market customers, produce a validated unit economics model stress-tested against real sales conversations, and complete the technical architecture required to demonstrate a working MVP to investors. Beyond the deliverables, we want to use the
Why right founder: I have lived this problem from both sides. At Google Cloud, I worked inside the AI infrastructure that enterprises are now scaling rapidly — giving me direct visibility into how AI investments get made and how rarely anyone measures whether they're working. While working in banking, I designed and e
Achievement: At Google Cloud, I built and scaled AI infrastructure solutions deployed across enterprise clients, giving me firsthand visibility into the gap between AI investment and measurable business outcomes — the exact problem Amphibia solves.

--- Life of Mine ---
Founder: Sushil Bohara | Email: sushil.bohara@emory.edu
Role: Co-founder | Emory: Yes | School: School of Medicine,Laney Graduate School | Degree: BME, 2029
Location: Atlanta, Georgia | Industry: Artificial Intelligence / Machine Learning,Healthcare
Stage: Building,Testing | Team: 2 | Co-founder: Yes
Co-founders: linkedin.com/in/nelson-jurado-eit-b350541b1
Co-founder skills: Nelson and Sushil are the technical co-founders of the project and work closely together on overall product development and system design.

Nelson focuses primarily on AI systems, backend architecture
Weekly hours: 20 | Started: 1/15/2025
Overview: Our project helps people move away from unhealthy habits by reflecting their progress in a virtual “village” that improves as they do. Inside our mobile app, users care for a village that develops alongside their characters, giving them both accountability and a real sense of reward as they stay consistent with their goals. With the help of Large Language Models (LLMs), our secure platform offers personalized support through conversations, while tracking activities and interactions to keep users
Problem: Our target users often struggle with sustaining motivation and visualizing long-term personal progress. Modern digital environments heavily reward immediate gratification through mechanisms such as infinite scrolling, notifications, and short-form content. These systems reinforce short-term dopamine rewards while making longer-term goals such as im
Evidence: Our approach is supported by several forms of early validation. We have conducted structured interviews with potential users to better understand how they approach goal setting, motivation, and digital tools for self-improvement. These discussions confirmed that many individuals struggle to maintain
Differentiation: Our solution differs from existing habit change tools because it focuses on the psychological moments when people struggle most to stay consistent. Many current solutions fall into two categories: simple tracking apps that log streaks and behaviors, or gamified systems that rely on points and reward
Target audience: Our initial market is university students who are navigating a major transition in independence, workload, and social structure, which makes them particularly vulnerable to stress, anxiety, and mental health challenges. National health data shows elevated levels of anxiety, depression, stress, and l
GTM: Our initial go-to-market strategy focuses on direct adoption by students through a freemium model that lowers the barrier to entry. Early users will be able to access the core experience for free, allowing them to explore the platform while we gather feedback and refine the product. We plan to reach
Revenue model: Our business model consists of three complementary revenue pathways designed to support both individual users and institutional partners. The first pathway is a freemium subscription model that allows users to access the core functionality of the pla
TAM/SAM/SOM: Our initial market focuses on students seeking support with building healthier routines and maintaining consistent habits. Globally, there are approximately 262 million students enrolled in higher edu
Users: 20 | Paying: 0 | Revenue to date: $0.00
Incorporated: Yes | Entity: Neural Horizons LLC , Georgia
Investment raised: $1600.00 | Fundraising: No | Monthly burn: $300.00
Prior accelerators: The Hatchery Incubator program
Summer goals: Our primary goal for the summer program is to validate the core assumptions underlying our MVP, specifically that gamified environments increase user engagement, that visualizing progress can positively influence real-world behavior, and that users are willing to interact with AI-driven agents for support. Over the course of the program, we plan to
Why right founder: Our team consists of Sushil Bohara and Nelson Jurado, two engineers and researchers with complementary backgrounds in machine learning, data analysis, and systems design. Nelson is currently pursuing a Ph.D. in Structural Engineering at UC San Diego and holds a B.S. in Civil Engineering from UC Berk
Achievement: As an undergraduate, I helped develop and patent a device to detect complications from diabetic neuropathy, a condition where nerve damage can lead to unnoticed injuries and leg amputations. I designed and 3D printed the hardware, built the circuit s

--- AlphaSwift Dosimetry ---
Founder: Mingzhe Hu | Email: mhu58@emory.edu
Role: Co-founder & CTO (or Lead AI Architect) I lead the technical development of the AI models, focusing on the architecture for accelerating Monte Carlo simulations and integrating informatics workflows. | Emory: Yes | School: Laney Graduate School | Degree: PhD Computer Science and Informatics 2027
Location: Atlanta | Industry: Artificial Intelligence / Machine Learning,Healthcare,SaaS
Stage: Idea,Building | Team: 3 | Co-founder: Yes
Co-founders: https://www.linkedin.com/in/rljqiu/
Co-founder skills: Co-founder & Chief Clinical Scientist
Dr. Richard Qiu is an Associate Professor in the Department of Radiation Oncology at Emory University. He brings deep expertise in Medical Physics, Dosimetry, and
Weekly hours: 20 | Started: 2/20/2026
Overview: We are developing an AI-powered software platform that provides near-instant dosimetry for alpha particle radiopharmaceutical therapy. By replacing traditional, time-consuming Monte Carlo simulations with deep learning acceleration, we enable clinicians to perform high-precision dose calculations in seconds rather than hours. This tool bridges the gap between complex physics and real-time clinical decision-making in targeted cancer treatment.
Problem: Alpha particle therapy requires extreme precision, but the gold-standard calculation method (Monte Carlo simulation) is computationally "expensive" and slow, making it impractical for routine clinical workflow. This leads to clinicians using less accurate approximations or facing significant delays in patient care.
Evidence: The market demand is validated by existing players like Hermes Medical, yet their solutions still struggle with the speed-accuracy trade-off. Discussions with researchers in nuclear medicine confirm that "skipping" or accelerating the simulation process is the industry's "holy grail."
Differentiation: Current competitors rely on traditional voxel-based dosimetry or slow Monte Carlo kernels. Our solution uses a proprietary AI architecture to predict dose distribution directly from imaging data. This "AI-skip" approach offers a $100x$ speedup, enabling real-time treatment optimization that was prev
Target audience: Medical physicists, radiation oncologists, and radiopharmaceutical R&D teams at cancer centers and biotech companies. We know this audience needs our solution because current dosimetry standards delay treatment planning due to massive computational requirements.
GTM: Our go-to-market strategy leverages a "Research-to-Clinical" funnel, focusing on three key pillars:

Academic & Clinical Validation: We will first deploy our platform within Emory Healthcare and Winship Cancer Institute. By collaborating with internal clinical teams, we will generate real-world vali
Revenue model: B2B SaaS model. We will offer annual licensing tiers to hospitals and research institutions, as well as per-scan processing fees for clinical trials.
TAM/SAM/SOM: The global radiopharmaceutical market is projected to reach $13+ billion by 2030, with Alpha-particle therapy being the fastest-growing segment. Our serviceable addressable market (SAM) includes over 
Users: 0 | Paying: 0 | Revenue to date: $0.00
Incorporated: No | Entity: Delaware C Corp (Intended)
Investment raised: $0.00 | Fundraising: No | Monthly burn: $0.00
Summer goals: Complete a functional MVP that demonstrates a 100x speedup over standard Monte Carlo simulations.

Validate our AI model accuracy against at least two clinical datasets from Winship Cancer Institute.

Refine our regulatory roadmap (FDA 510(k) strategy) and initiate discussions with two potential pilot partners.
Why right founder: We bridge the gap between AI and clinical reality. As a CS PhD candidate, I have the expertise to build high-performance AI architectures. Dr. Richard Qiu is a clinical leader at Winship Cancer Institute with direct authority over the dosimetry workflows we aim to disrupt. This synergy allows us to 
Achievement: I developed and deployed advanced machine learning frameworks for medical imaging that significantly improved the precision of target volume segmentation in radiation therapy. This work resulted in multiple high-impact publications and demonstrated t

--- MYERA ---
Founder: aliyah patterson | Email: adpatt3@emory.edu
Role: Founder & CEO | Emory: Yes | School: Goizueta Business School,Emory College | Degree: My intended major is a Bachelor of Business Administration with a concentration in Accounting, and a double major in Political Science.
Location: Atlanta, Georgia | Industry: Consumer,eCommerce,Artificial Intelligence / Machine Learning
Stage: Building,Testing | Team: 1 | Co-founder: No
Weekly hours: 30 | Started: 12/28/2025
Overview: MyEra is a self development platform for Gen Z that helps users turn their goals into clear, actionable plans through physical products and a digital app. The company currently sells customizable vision boards and guided tools, and is expanding into an interactive platform where users can set goals, track progress, receive personalized support, and stay motivated through community and engagement features. MyEra is designed to make self improvement more interactive, social, and achievable.
Problem: Gen Z wants to improve their lives by becoming more disciplined, mentally stable, and financially secure, but many struggle to turn that desire for self improvement into consistent daily habits. Because of this, they often look for tools that help them organize their goals, improve their mindset, and stay consistent with positive habits. Gen Z is 8
Evidence: I have already seen early evidence that this idea resonates with users through both customer behavior and broader market trends. I have generated revenue through sales of customizable vision boards, which shows that people are actively interested in tools that help them think about their goals and v
Differentiation: Most existing wellness apps and self improvement brands focus on tools like planners, habit trackers, or meditation. However, they are often designed in a very general way and are not built for how Gen Z interacts with technology. Many self improvement products function like digital planners where u
Target audience: The primary target customers for MyEra are Gen Z young adults between the ages of about 18 and 30 who are interested in self improvement, personal growth, and building better habits. Gen Z shows strong interest in wellness and personal development. According to McKinsey’s Future of Wellness report, 
GTM: MyEra’s primary audience discovers the brand through Instagram and TikTok, supported by targeted Facebook and Instagram ads that direct users to both the MyEra website and the MyEra app. Our marketing strategy focuses on relatable lifestyle content rather than traditional advertisements. On TikTok w
Revenue model: MyEra makes money in two main ways. First, we currently generate revenue through our online storefront where we sell self development products such as customizable vision boards and guided journals that help people clarify their goals and start desig
TAM/SAM/SOM: MyEra operates in the large and growing self development and wellness app market. The global self improvement industry is estimated to be worth over 40 billion dollars, with millions of people activel
Users: 32 | Paying: 32 | Revenue to date: $670.00
Largest customer: Currently, my largest paying customer purchased one product bundles from the MyEra shop. As the business is still in its early stage, most sales have 
Incorporated: In Progress | Entity: Delaware C Corp
Investment raised: $0.00 | Fundraising: No | Monthly burn: $421.00
Summer goals: This summer my goals are to focus on personal growth, business development, and building strong habits that support my long term vision. I plan to dedicate significant time to growing my business and working toward a full launch of the MyEra app while learning more about how AI can be integrated into businesses and exploring investment strategies. 
Why right founder: I believe I am the right founder to build MyEra because I have already shown dedication and early traction. I have spoken extensively with potential users, gathered feedback, and already generated early sales, which has confirmed that there is real interest in this type of platform. Through these co
Achievement: As a voter registration intern at NextGen America, I helped register over 400 people to vote by approaching individuals and speaking with individuals who otherwise would not have participated in the election. Through thousands of conversations, I lea

--- asoma ---
Founder: Malia Wakesho-Ajwang | Email: malia.wakesho-ajwang@emory.edu
Role: Founder, CEO, and Full-Stack Developer | Emory: Yes | School: Emory College | Degree: BA Computer Science and Psychology, 2026
Location: Atlanta, Georgia | Industry: Artificial Intelligence / Machine Learning,B2B / Enterprise Software,Consumer,SaaS
Stage: Building | Team: 2 | Co-founder: No
Weekly hours: 25 | Started: 1/17/2025
Overview: asoma is an all-in-one productivity platform built for college students with ADHD. Instead of requiring students to plan ahead and remember to check apps, asoma does the cognitive work for them with AI task breakdown, smart scheduling, Canvas integration, and non-punitive progress tracking. We have validated three customer segments and are preparing for our Q2 2026 closed beta and Q3 paid launch.
Problem: ADHD college students face four core challenges that existing tools fail to address:

- Time blindness — inability to accurately estimate how long tasks take
- Task initiation paralysis — knowing what to do but being physically unable to start
- Working memory gaps — forgetting plans minutes after making them
- Tool abandonment cycles — download ap
Evidence: Research Validation: Across our 33 sessions, participants validated every core feature. When we described our Just Start AI task breakdown, the response was "I would pay for this right now." 100% of Crisis Compensators confirmed needing features that don't exist in any competing product.

Demand Val
Differentiation: asoma combines ADHD-first design with deep college integration in a way no current tool offers as a full platform.

- Notion / Todoist / Google Calendar — Powerful but generic. They require the exact planning and organizing skills ADHD brains struggle with most.
- Tiimo — ADHD-optimized scheduling b
Target audience: Our primary customer is college students with ADHD — specifically those we call Crisis Compensators: students who experience high urgency around deadlines, struggle with task initiation, and are actively seeking solutions beyond tools like Notion or Todoist.

We validated this through 33 research se
GTM: Our GTM is phased around my timeline as a full-time student through December 2026, with organic B2C first and institutional B2B later. Following the RightShift accelerator, navigating visa requirements as an international student founder required working with immigration lawyers to confirm asoma can
Revenue model: asoma uses a freemium B2C model with long-term institutional B2B revenue.

B2C (Primary, 2026–2027):
- Free tier: Basic task management, Canvas sync, limited features
- Premium tier: $8/month or $79/year — AI task breakdown, smart scheduling, focus t
TAM/SAM/SOM: TAM: $1.27B — 13.2M undergraduates who report struggling with procrastination × $96/year ARPU (NCES 2023, [ADD PROCRASTINATION SOURCE])
SAM: $480M — 5.0M students with ADHD or executive dysfunction × 
Users: 0 | Paying: 0 | Revenue to date: $0.00
Incorporated: Yes | Entity: '- Asoma Digital LTD (United Kingdom) — founded June 23, 2025 - Asoma Digital LLC (Delaware) — U.S. 
Investment raised: $9970.00 | Fundraising: Yes | Monthly burn: $250.00
Prior accelerators: 1. Techstars Emory Founder Catalyst (January 2025) — Completed. Mentorship, investor network, foundational business development.
2. The Hatchery @ Emory University (Fall 2025 — current) — Active. $1,4
Summer goals: My goal for Summer 2026 is to go from a working product to a launched product with paying customers, real retention data, and a university case study. The summer targets one of two outcomes: raising $200K before September to resolve visa constraints that would allow me to work on asoma legally for the next three years without OPT limitations, or bu
Why right founder: 1. Founder-Market Fit: I Live This Problem Daily
I'm an ADHD college student building for ADHD college students. I spent years achieving top results while working twice as hard as my peers — planning in detail, then forgetting the plan existed by Monday afternoon. After my diagnosis, I didn't find s
Achievement: At 17, I juggled near-perfect A-Levels and ACTs, a Fulbright Sutton Trust program, a pro club and Sunday league football team, tutoring, and a seat on the London FA Youth Council, while also becoming a national cybersecurity finalist with no prior ex

--- YARD (Your Approved Residential Directory) / YARD Campus ---
Founder: Kharma Wilson | Email: kharmawilson@spelman.edu
Role: Founder/CEO | Emory: No | School: N/A | Degree: N/A
Location: Atlanta, GA | Industry: eCommerce,Real Estate / PropTech
Stage: Building,Testing,Product/Market Fit | Team: 2 | Co-founder: No
Weekly hours: 10 | Started: 1/1/2026
Overview: YARD (Your Approved Residential Directory) is a student-verified housing and essentials marketplace designed to make off-campus living safer, more transparent, and easier to navigate. Students currently rely on fragmented platforms like GroupMe, Facebook Marketplace, and word-of-mouth to find housing, which creates significant safety risks and inefficiencies in high-cost decisions. YARD centralizes listings, subleases, roommate coordination, and peer-verified reviews within a campus-based networ
Problem: Current methods create both financial and personal safety risks. Scams, misleading listings, and unsafe housing conditions are increasingly common in college cities where demand is high and oversight is limited. For example, my brother was scammed out of an entire month’s rent through a listing on a university housing board, and similar experiences
Evidence: Students are already attempting to solve this problem using fragmented tools such as GroupMe, Instagram, and word of mouth. They post “ISO housing,” coordinate subleases, and exchange essentials through informal networks. YARD does not introduce a new behavior. It centralizes and structures what stu
Differentiation: YARD is an all-in-one platform that replaces fragmented tools with a single, structured system, creating a lasting, recorded housing memory for each campus as students move in and out.
Target audience: YARD’s primary target users are college students actively searching for off-campus housing, subleases, and roommates, particularly those in urban campuses where on-campus housing is limited and demand exceeds supply. We are initially focused on students within the Atlanta University Center (Spelman,
GTM: YARD’s go-to-market strategy is campus-based and community-driven. We will begin with a focused pilot at Spelman by directly reaching students through email outreach, tabling, and targeted social media, leveraging existing housing conversations in group chats and student networks.

In parallel, we a
Revenue model: YARD will generate revenue through a combination of institutional partnerships, marketplace access, and transaction fees. We plan to partner with universities to provide a more structured and transparent housing system, which can also offer value thr
TAM/SAM/SOM: The U.S. college student population is approximately 20 million, with a majority living off campus and actively navigating housing, subleases, and shared living arrangements. This represents our long-
Users: 10 | Paying: 0 | Revenue to date: $0.00
Incorporated: No | Entity: Delaware C Corp
Investment raised: $2500.00 | Fundraising: No | Monthly burn: $37.00
Prior accelerators: I participated in a 10-day Pitch competition at Spelman College.
Summer goals: My primary goal for the summer is to move YARD from prototype to a functional, campus-ready MVP. This includes building out the backend infrastructure, launching a working marketplace, and onboarding at least 10 verified housing listings to establish initial supply.

In parallel, I aim to build early user demand by growing a waitlist of at least 20
Why right founder: I am the right founder to build YARD because I have experienced this problem firsthand and have observed how students navigate it across different environments. As a student who moved across the country for college, I have personally relied on fragmented and unverified systems to find housing, which
Achievement: I conducted independent research at UT Austin Populations Research Center analyzing racial disparities in capital sentencing, where I built and analyzed a dataset of national county death row cases using statistical methods including regression, ANOV
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
