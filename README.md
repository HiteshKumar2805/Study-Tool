# VidyaAce 🎓  
**Your AI Study Partner — From Static Notes to Strategic Understanding**

> Passive studying is legacy behavior. VidyaAce modernizes learning by turning lecture PDFs into interactive, intelligent study experiences.

---

### Deployed Link : https://study-tool-ten.vercel.app/<img width="592" height="61" alt="image" src="https://github.com/user-attachments/assets/afb5651a-3125-4c2e-86bf-d5745f48362a" />


## 🚀 Overview

**VidyaAce** is an AI-powered educational platform purpose-built for engineering students who refuse to settle for rote memorization. It transforms static lecture notes into a dynamic learning loop—**ask, assess, reflect, and master**.

Upload your notes. Interrogate them. Test yourself. Learn faster.

---

## 🌟 Core Capabilities

### 💬 Chat with Your Notes  
Upload a PDF and converse with it. VidyaAce understands document context and delivers precise, citation-aware answers.

### 🧠 Smart Summarization  
Condenses dense lecture material into crisp, exam-ready bullet points—no fluff, just signal.

### 📝 Auto-Generated Quizzes  
Generates MCQs directly from your notes to validate comprehension, not just exposure.

### ✨ Instant Grading & Feedback  
Immediate evaluation with actionable insights—what you know, what you don’t, and what to fix.

### 📚 Teach Mode (Concept Deep-Dive)  
When topics get complex, VidyaAce slows down and teaches—step by step, concept by concept.

---

## 🛠 Technology Stack

Built with a **modern, production-grade architecture** focused on scalability, performance, and developer velocity.

### Frontend & UI
- **Framework:** Next.js 15 (App Router) & React 19  
- **Language:** TypeScript (Strict Mode)  
- **Styling:** Tailwind CSS  
- **UI Components:** Radix UI, Lucide React  
- **Animations:** Framer Motion  
- **Data Visualization:** Recharts  
- **Carousels:** Embla Carousel  

### Backend & AI
- **API Layer:** Next.js Server Routes  
- **AI Orchestration:** Google Genkit  
- **LLM:** Google GenAI (Gemini)  
- **Database:** Firebase  

### Developer Tooling
- **Forms & Validation:** React Hook Form + Zod  
- **Linting:** ESLint  

---

## 📦 Getting Started

### Prerequisites
- Node.js **18+**
- Google Cloud Project with **Gemini API enabled**
- Firebase Project

---

### 🔧 Installation

Clone the repository:
```bash
git clone https://github.com/your-username/VidyaAce.git
cd VidyaAce
npm install
# or
yarn install
# or
pnpm install
```
---

### 🔐 Environment Configuration

Create a `.env.local` file at the root of the project. This is your control plane—treat it with respect.

```env
# Google AI / Genkit
GOOGLE_GENAI_API_KEY=your_gemini_api_key_here
GOOGLE_CLOUD_PROJECT=your_google_cloud_project_id

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```
### Running the Application

Start the development server:
```bash
npm run dev
```
---

## 🎯 Usage Workflow

### 1️⃣ Upload
- Drag and drop your lecture PDF into the upload zone.
- VidyaAce ingests and contextualizes the document for downstream AI processing.

---

### 2️⃣ Select a Mode
Choose how you want to engage with your material:

- 💬 **Chat with Notes**  
  Ask specific, context-aware questions directly against your uploaded PDF.

- 🧠 **Summary**  
  Generate concise, structured bullet-point summaries from dense lecture content.

- 📝 **Quiz**  
  Automatically generate MCQs to validate understanding and surface knowledge gaps.

---

### 3️⃣ Engage & Learn
- Ask targeted questions to clarify concepts
- Review AI-generated summaries for rapid revision
- Take auto-graded quizzes with instant feedback
- Identify weak areas and reinforce understanding

> **Outcome:**  
> This is **active learning**—designed for comprehension, retention, and mastery, not passive content consumption.

### TEAM NAME : ZA WARDUO
