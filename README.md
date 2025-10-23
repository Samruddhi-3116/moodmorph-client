# 🌿 MoodMorph

**MoodMorph** is a calming, emotionally intelligent journaling and routine-planning app. It helps users reflect on their day, analyze their mood using sentiment analysis, and receive personalized affirmations and suggestions to support their well-being.

Built with **React**, **Firebase**, and **Tailwind CSS**, MoodMorph is designed to feel intuitive, secure, and emotionally supportive.

---

## 🧠 Features

- ✍️ Journal Entry with sentiment-based mood detection  
- 💬 Affirmations and Companion messages based on emotional tone  
- 🧘‍♀️ Personalized suggestions based on journal content  
- 🔐 Firebase Authentication (Login/Signup)  
- 📦 Firestore storage for journal entries and moods  
- 📱 Responsive design using Tailwind CSS  

---

## 🗂️ Project Structure

moodmorph-client/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Companion.js     # Mood-based affirmations and support
│   │   ├── Navbar.js        # Navigation bar
│   │   └── PrivateRoute.js  # Auth-protected routes
│   ├── context/
│   │   └── AuthContext.js   # Global auth state
│   ├── pages/               # Main app screens
│   │   ├── Dashboard.js     # User hub
│   │   ├── Login.js         # Login form
│   │   ├── Signup.js        # Signup form
│   │   ├── Mood.js          # Journal + mood analysis
│   │   ├── Planner.js       # Routine planner
│   │   └── MoodHistory.js   # Mood tracking (optional)
│   ├── utils/
│   │   └── affirmations.js  # Mood-based affirmations
│   ├── App.js               # Main app layout and routing
│   ├── firebase.js          # Firebase config
│   ├── index.js             # Entry point
│   └── index.css            # Global styles
├── tailwind.config.js       # Tailwind customization
├── package.json             # Dependencies and scripts
└── README.md                # Project overview

---

## Github

- https://github.com/Samruddhi-3116/moodmorph-client

## Firebase

- https://console.firebase.google.com/project/moodmorph-24ece/overview

## Vercel

- https://vercel.com/samruddhi-kapses-projects/moodmorph-client-34m1