# RightShift Ventures — LP Chatbot

An AI-powered chatbot for prospective LPs to explore Fund I details — fund structure, returns, team, portfolio construction, and FAQs.

---

## Deploy to Vercel (5 minutes)

### Option A: GitHub → Vercel (recommended)

1. **Push this folder to a new GitHub repo**
   - Go to github.com → New repository → name it `rsv-lp-chatbot`
   - Upload all these files (or use `git push`)

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in (free)
   - Click "Add New Project"
   - Import your GitHub repo
   - Framework: **Create React App** (auto-detected)
   - Click "Deploy" — don't add env vars yet, first deploy will fail, that's fine

3. **Add your Anthropic API key**
   - In your Vercel project → Settings → Environment Variables
   - Add: `ANTHROPIC_API_KEY` = `sk-ant-...` (your key from console.anthropic.com)
   - Click Save

4. **Redeploy**
   - Go to Deployments tab → click the three dots on latest → Redeploy
   - Your chatbot is now live at `https://rsv-lp-chatbot.vercel.app`

---

### Option B: Vercel CLI (if you prefer terminal)

```bash
npm install -g vercel
cd rsv-lp-chatbot
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
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY
npm start
# Opens at http://localhost:3000
```

---

## Optional: Password Protect for LPs Only

To require a password before LPs can use the chatbot:

1. Open `api/chat.js`
2. Uncomment the password check block (lines 5–8)
3. Add `LP_PASSWORD=yourpassword` to Vercel environment variables
4. In `src/App.js`, add a password prompt UI before the chat renders

---

## File Structure

```
rsv-lp-chatbot/
├── api/
│   └── chat.js          ← Vercel serverless function (Anthropic proxy)
├── public/
│   └── index.html       ← HTML shell
├── src/
│   ├── index.js         ← React entry point
│   └── App.js           ← Full chatbot UI + fund knowledge base
├── .env.example         ← Environment variables template
├── package.json         ← Dependencies
├── vercel.json          ← Vercel routing config
└── README.md
```

---

## Getting Your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign in or create an account
3. API Keys → Create Key
4. Copy the `sk-ant-...` key and add it to Vercel

Estimated cost: ~$0.003 per LP conversation (Claude Sonnet). For 100 LP conversations = ~$0.30.
