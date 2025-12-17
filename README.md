# 🧠 ConsoleChacha

**ConsoleChacha** is a domain-restricted, sarcastic yet friendly AI chatbot designed specifically for **programming and computer science queries**.  
It uses a **Cloudflare Worker as a secure edge backend** to communicate with the **Groq LLM API**, while a **vanilla HTML/CSS/JavaScript frontend** delivers a clean chat experience.

---

## 🚀 Live Demo
Frontend (Cloudflare Pages):  
👉 `<your-pages-url-here>`

Backend (Cloudflare Worker):  
👉 https://flat-night-0a40.krayush1099.workers.dev/

---

## 🎯 Key Features

- 🧑‍🏫 **Programming-only AI tutor**  
  Strictly answers questions related to programming, DSA, web development, and CS concepts.

- 😏 **Sarcastic ConsoleChacha personality**  
  Friendly, mentor-like tone with light sarcasm (never rude).

- 🔐 **Secure backend using Cloudflare Workers**  
  API keys are stored securely as environment variables — never exposed to the frontend.

- ⚡ **Edge-deployed LLM calls**  
  Low latency and fast responses using Cloudflare’s global edge network.

- 🚦 **Rate limiting implemented at the edge**  
  Protects free-tier usage by limiting requests per IP (RPM & RPD).

- 🧼 **XSS-safe message rendering**  
  AI responses are sanitized before rendering in the UI.

- 💻 **Pure Vanilla JavaScript frontend**  
  No frameworks — clean, readable, and easy to understand.

---

## 🏗️ Architecture Overview


- The frontend communicates **only with the Worker**
- The Worker handles:
  - Prompt control
  - API authentication
  - Rate limiting
  - CORS
  - Response sanitization

---

## 📁 Project Structure
consolechacha/
├── frontend/
│ ├── index.html
│ ├── style.css
│ ├── app.js
│ ├── user.png
│ └── chatbot.png
│
├── README.md
└── .gitignore


- The frontend communicates **only with the Worker**
- The Worker handles:
  - Prompt control
  - API authentication
  - Rate limiting
  - CORS
  - Response sanitization

  > The Cloudflare Worker is deployed directly via the Cloudflare dashboard.

---

## 🧠 ConsoleChacha Rules (System Prompt)

- Answers **only programming-related questions**
- Politely refuses non-technical queries with light sarcasm
- Prefers concise explanations (20–60 words)
- Uses simple examples when helpful
- Teaching-focused, beginner-friendly tone

---

## 🚦 Rate Limiting

Rate limiting is implemented **inside the Cloudflare Worker** using in-memory tracking:

- **20 requests per minute per IP**
- **10,000 requests per day per IP**

This ensures:
- Free-tier API protection
- No frontend bypassing
- Edge-level enforcement

---

## 🛠️ Tech Stack

**Frontend**
- HTML5
- CSS3
- Vanilla JavaScript

**Backend**
- Cloudflare Workers
- Groq LLM API

**Deployment**
- Cloudflare Pages (Frontend)
- Cloudflare Workers (Backend)

---

## 🔒 Security Considerations

- API keys are stored using **Cloudflare Worker environment variables**
- No secrets are exposed to the client
- XSS-safe rendering of AI responses
- CORS handled properly for cross-origin requests

---

## 🧪 Local Development

You can open the frontend directly:

```bash
cd frontend
open index.html
