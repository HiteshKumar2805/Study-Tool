VidyaAce 🎓
Your AI Study Partner. Upload notes for summaries, quizzes & answers.

VidyaAce BannerTypeScriptGoogle Genkit

Live Demo License

📖 About
VidyaAce is an AI-powered educational platform designed to transform static lecture notes into an interactive learning experience. Built for engineering students, it solves the problem of "passive studying" by allowing users to chat with their PDFs, generate auto-graded quizzes, and receive personalized feedback.

🌟 Key Features
💬 Chat with your Notes: Upload a PDF and ask specific questions. VidyaAce understands the context of your document to provide accurate answers.
📝 Smart Summarization: Instantly converts dense lecture notes into concise, bullet-point summaries.
📝 Auto-Generated Quizzes: Automatically creates Multiple Choice Questions (MCQs) based on the uploaded material to test understanding.
✨ Instant Grading: Provides detailed feedback on quiz answers, highlighting strengths and knowledge gaps.
🧠 Concept Deep-Dive: A dedicated "Teach Mode" for in-depth explanations of complex topics found within the notes.
🛠 Tech Stack
This project is built with a modern, production-ready stack optimized for performance and developer experience.

Frontend & UI
Framework: Next.js 15 (App Router) & React 19
Language: TypeScript (Strict Mode)
Styling: Tailwind CSS
Components: Radix UI & Lucide React (Icons)
Animations: Framer Motion
Visualization: Recharts & Embla Carousel
Backend & AI
API Routes: Next.js Server Routes
AI Engine: Google Genkit (Flow orchestration)
LLM: Google GenAI (Gemini)
Database: Firebase
Development Tooling
Form Validation: React Hook Form + Zod
Linting: ESLint
🚀 Getting Started
Prerequisites
Node.js 18+ installed
A Google Cloud Project with the Gemini API enabled
A Firebase Project
Installation
Clone the repository
git clone https://github.com/your-username/VidyaAce.gitcd VidyaAce
Install dependencies
npm install# oryarn install# orpnpm install
Set up Environment VariablesCreate a .env.local file in the root directory and add your keys:
# Google AI / GenkitGOOGLE_GENAI_API_KEY=your_gemini_api_key_hereGOOGLE_CLOUD_PROJECT=your_project_id# FirebaseNEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_keyNEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.comNEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
Run the development server
npm run dev
Open http://localhost:3000 in your browser.

🎯 Usage
Upload: Drag and drop your lecture PDF into the upload zone.
Interact: Choose between "Chat", "Summary", or "Quiz" mode.
Learn: Review AI-generated summaries or take the auto-generated quiz to test your knowledge.
🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
📜 License
Distributed under the MIT License. See LICENSE for more information.

