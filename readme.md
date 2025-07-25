
# AI Q&A Assistant with Gemini (FastAPI + Next.js)

This project is a conversational AI system that uses Google's Gemini Pro model to answer user questions through a React-based frontend and a FastAPI backend.

## Project Structure

```
llm-qa-system/
  backend/                  FastAPI backend
    main.py                 Main API logic and Gemini integration
    .env                    Environment variables (not committed)
    frontend_build/         Exported frontend code served by FastAPI

  frontend/                 React + Next.js frontend
    app/                    App directory with page.tsx UI logic
    tailwind.config.js      Tailwind CSS config
    package.json            Frontend dependencies and scripts
    ...                     Other frontend files

  prompts.md                Sample prompts and follow-ups
  .env.example              Template for environment variables
  README.md                 Setup instructions (this file)
  .gitignore                Git ignored files and folders
```

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- Python 3.10+
- pip
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/llm-qa-system.git
cd llm-qa-system
```

### 2. Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
.env\Scripts\Activate.ps1 # Windows PowerShell
# OR
source venv/bin/activate  # Linux/macOS

pip install -r requirements.txt
```

Create a `.env` file in the `backend` folder and add your Gemini API key:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

Then run the server:

```bash
uvicorn main:app --reload
```

### 3. Frontend Setup (Next.js with Tailwind)

```bash
cd frontend
npm install
```

Make sure your `next.config.js` contains:

```js
export const config = {
  output: 'export',
}
```

Then build the frontend:

```bash
npm run build
```

After building, the static files will be generated inside the `out/` directory.

Move this `out/` folder to your `backend/` folder and rename it to `frontend_build`.

- **Linux/macOS**:

```bash
mv out ../backend/frontend_build
```

- **Windows**: Manually copy the `out` folder into `backend` and rename it to `frontend_build`.

You should now be able to access the full app at:

```bash
http://127.0.0.1:8000/
```

## Sample Prompt

Example prompt used to test the app:

> What documents are required to travel from Kenya to Ireland?

Follow-up questions are retained in the chat interface for contextual conversation.

## Environment Variables Template

See `.env.example` in the root folder.

## Features

- Gemini AI integration for intelligent answers  
- Local chat history (saved in browser)  
- Copy-to-clipboard for AI answers  
- Light/Dark theme toggle  
- Mobile responsive layout  

## License

MIT – feel free to use, adapt, and enhance.
