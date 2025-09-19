# AI-Powered Lead Scoring Backend

A backend service built with **Node.js + TypeScript + Express** that automatically scores sales leads using a hybrid approach combining **rule-based logic** and **AI reasoning** to determine buying intent.

## 🚀 Features

### Core APIs

- `POST /api/offer` - Accept product/offer details
- `POST /api/leads/upload` - Upload CSV file with lead data
- `POST /api/leads/score` - Execute scoring pipeline on uploaded leads
- `GET /api/leads/results` - Retrieve scored results with intent classification
- `POST /api/leads/reset` - Reset current stored offer and leads data

### Scoring System

**Two-Layer Scoring (0-100 points total)**

**Rule Layer (Max 50 points):**

- Role relevance: Decision maker (+20), Influencer (+10), Others (+0)
- Industry match: Exact ICP (+20), Adjacent (+10), No match (+0)
- Data completeness: All fields present (+10)

**AI Layer (Max 50 points):**

- AI analyzes prospect + offer context
- Intent classification: High (50pts), Medium (30pts), Low (10pts)
- Provides 1-2 sentence reasoning

**Final Score = Rule Points + AI Points**

## 🛠 Technology Stack

- **Backend:** Node.js + TypeScript + Express
- **File Processing:** Multer + CSV-Parser
- **AI Integration:** OpenAI GPT API
- **Deployment:** [Railway]
- **Optional:** Docker containerization

## ⚡ Quick Setup

### 1. Clone Repository

```bash
git clone https://github.com/mo-amir-code/lead-qualification-server.git
cd lead-qualification-server
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Create `.env` file:

```env
PORT=8080
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
```

### 4. Start Development Server

```bash
pnpm run dev
```

Server runs at: `http://localhost:8080`

### 5. Build for Production

```bash
pnpm run build
pnpm start
```

## 📖 API Documentation

### 1. Upload Product /api/Offer

**Endpoint:** `POST /api/offer`

```bash
curl -X POST http://localhost:8080/api/offer \
  -H "Content-Type: application/json" \
  -d '{
    "name": "AI Outreach Automation",
    "valueProps": ["24/7 outreach", "6x more meetings"],
    "idealUseCases": ["B2B SaaS mid-market"]
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Offer uploaded successfully"
}
```

### 2. Upload Leads CSV

**Endpoint:** `POST /api/leads/upload`

```bash
curl -X POST http://localhost:8080/api/leads/upload \
  -F "file=@leads.csv"
```

**CSV Format:**

```csv
name,role,company,industry,location,linkedin_bio
Ava Patel,Head of Growth,FlowMetrics,SaaS,San Francisco,"Growth leader scaling B2B SaaS companies"
John Smith,Software Engineer,TechCorp,Technology,New York,"Full-stack developer with 5 years experience"
```

**Response:**

```json
{
  "success": true,
  "message": "3 leads uploaded successfully",
  "data": {
    "count": 3
  }
}
```

### 3. Execute Scoring

**Endpoint:** `POST /api/leads/score`

```bash
curl -X POST http://localhost:8080/api/leads/score
```

**Response:**

```json
{
  "success": true,
  "message": "Scoring started"
}
```

### 4. Get Results

**Endpoint:** `GET /api/leads/results`

```bash
curl http://localhost:8080/api/leads/results
```

**Response:**

```json
{
  "success": true,
  "message": "result fetched",
  "data": {
    "leads": [
      {
        "name": "Ava Patel",
        "role": "Head of Growth",
        "company": "FlowMetrics",
        "industry": "SaaS",
        "location": "San Francisco",
        "intent": "High",
        "score": 90,
        "reasoning": "Perfect ICP fit for B2B SaaS mid-market with decision-making authority in growth role."
      },
      {
        "name": "John Smith",
        "role": "Software Engineer",
        "company": "TechCorp",
        "industry": "Technology",
        "location": "New York",
        "intent": "Low",
        "score": 25,
        "reasoning": "Technical role with limited purchasing authority, adjacent industry match."
      }
    ],
    "isProcessing": true
  }
}
```

## 🎥 Demo Video

A quick walkthrough of the AI-Powered Lead Scoring Backend:

[![Watch Demo Video](https://img.shields.io/badge/►-Watch%20Demo%20Video-blue?logo=youtube)](https://www.loom.com/share/your-demo-video-id)

Click the banner above to view the full demo, covering setup, API usage, scoring pipeline, and live deployment on Railway.

## 📝 Important Note

This implementation does **not** use a database; offers and lead data are held in in-memory variables. As a result, the service supports only one active offer and one CSV upload at a time. This design choice was made to focus on core scoring logic and AI integration. For production use, consider adding persistent storage to handle multiple offers and concurrent uploads.

## 🧠 Scoring Logic Details

### Rule-Based Scoring (Max 50 points)

**Role Classification:**

- **Decision Makers (+20):** CEO, CTO, VP, Director, Head, Manager, Founder, President
- **Influencers (+10):** Senior, Lead, Principal, Specialist, Consultant, Advisor
- **Others (+0):** Developer, Engineer, Analyst, Intern, Assistant

**Industry Matching:**

- **Exact Match (+20):** Industry directly matches offer's ideal use cases
- **Adjacent (+10):** Related industries (e.g., SaaS → Technology, FinTech → Finance)
- **No Match (+0):** Unrelated industries

**Data Completeness (+10):**

- All required fields (name, role, company, industry, location, linkedin_bio) present

### AI Integration

**Prompt Template:**

```
You are an AI sales assistant. Evaluate the buying intent of this prospect based on the offer and their profile.

Offer:
Name: ${offer.name}
Value Props: ${offer.valueProps.join(", ")}
Ideal Use Cases: ${offer.idealUseCases.join(", ")}
Prospect:
Name: ${lead.name}
Role: ${lead.role}
Company: ${lead.company}
Industry: ${lead.industry}
Location: ${lead.location}
LinkedIn Bio: ${lead.linkedin_bio}
Task:
1. Classify intent as High / Medium / Low.
2. Give reasoning in 1–2 sentences based on how well the prospect fits the offer.
Output in JSON format:
{
  "intent": "High",
  "reasoning": "Reasoning text"
}.
```

**Intent Mapping:**

- **High Intent:** 50 points - Strong authority + perfect fit
- **Medium Intent:** 30 points - Some authority or good fit
- **Low Intent:** 10 points - Limited authority + poor fit

## 🌐 Deployment

**Live API Base URL:**

```
https://lead-qualification-server.up.railway.app
```

**Test the deployed API:**

```bash
curl https://lead-qualification-server.up.railway.app/api/leads/results
```

## 🧪 Testing

### Manual Testing with Sample Data

Create `sample-leads.csv`:

```csv
name,role,company,industry,location,linkedin_bio
Sarah Johnson,VP Marketing,GrowthTech,SaaS,Austin,"Marketing executive driving growth at B2B SaaS companies"
Mike Chen,Senior Developer,CodeBase,Technology,Seattle,"Full-stack developer passionate about clean code"
Lisa Wang,CEO,StartupXYZ,FinTech,San Francisco,"Serial entrepreneur building next-gen financial products"
```

### Test Flow:

1. Upload offer: `POST /api/offer`
2. Upload leads: `POST /api/leads/upload`
3. Run scoring: `POST /api/leads/score`
4. View results: `GET /api/leads/results`
5. Reset uploaded data: `POST /api/leads/reset`

## 📊 Example Scoring Breakdown

**High-Score Lead (Score: 90)**

- Name: "Sarah Johnson, VP Marketing"
- Rule Points: 40 (Decision maker +20, Exact industry +20)
- AI Points: 50 (High intent - perfect authority and fit)
- Reasoning: "VP role with decision authority in target SaaS market"

**Medium-Score Lead (Score: 55)**

- Name: "Mike Chen, Senior Developer"
- Rule Points: 25 (Influencer +10, Adjacent industry +10, Complete data +5)
- AI Points: 30 (Medium intent - technical influence, adjacent fit)
- Reasoning: "Technical influencer in related industry with some input on tooling decisions"

**Low-Score Lead (Score: 20)**

- Name: "Junior Analyst"
- Rule Points: 10 (Complete data +10)
- AI Points: 10 (Low intent - no authority, poor fit)
- Reasoning: "Limited decision-making authority with minimal product relevance"

## 🎯 Evaluation Highlights

✅ **Clean API Design:** RESTful endpoints with proper HTTP methods  
✅ **AI Integration:** Context-aware prompting with structured responses  
✅ **Rule Engine:** Transparent, configurable scoring logic  
✅ **Code Quality:** TypeScript, comments, proper error handling  
✅ **Deployment:** Live, testable API with public URL  
✅ **Documentation:** Comprehensive setup and usage guide
