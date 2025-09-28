# 🎵 Mood-to-Music Generator

Hackathon-ready project: AI-powered mood-to-music generator with playlist display and AI-generated album covers.

## 🚀 How to Run

### Backend
```bash
cd server
npm install express cors body-parser node-fetch dotenv
echo "OPENAI_API_KEY=your_api_key_here" > .env
node index.js
```

### Frontend
```bash
cd client
npm install
npm install framer-motion
npm run dev
```

Visit http://localhost:5173 in your browser.

## 🌐 Deploy
- Frontend: Deploy `client` to Vercel/Netlify.
- Backend: Deploy `server` to Render/Railway/Heroku.  
Update frontend fetch URL accordingly.
