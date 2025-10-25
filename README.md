# 🌈 MoodMorph

**MoodMorph** is an emotionally intelligent journaling companion built with React, Firebase, and Cohere. It helps users reflect on their feelings, track emotional patterns, and receive gentle, AI-powered support — all through a calming, voice-enabled interface.

---

## 🔥 Features

- 🎤 **Voice Input & Output** — Speak your mood, hear gentle reflections
- 🔐 **Google Sign-In** — Secure, seamless authentication
- 📊 **Emotion Analysis** — Powered by Cohere for nuanced mood insights
- 🌈 **Responsive UI** — Clean, calming design across devices
- 🧠 **Personalized Greetings** — Emotionally aware welcome messages
- ✨ **Visual Polish** — Gradient backgrounds, shimmer effects, and BottomNav
- 📁 **Lean File Structure** — Only essential components for clarity and performance

---

## 🚀 Tech Stack

| Frontend     | Backend       | AI Integration | Hosting        |
|--------------|---------------|----------------|----------------|
| React + Tailwind | Firebase Auth & Firestore | Cohere API | Vercel & Firebase |

---

## 🛠️ Setup Instructions

1. Clone the repo  
   `git clone https://github.com/SamrudDhi-3116/moodmorph-client.git`

2. Install dependencies  
   `npm install`

3. Create a `.env.local` file in the `moodmorph-client/` folder and add the following:

```env
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
REACT_APP_COHERE_API_KEY=your_cohere_api_key
   

4. Run locally  
   `npm start`

---

## 🌐 Live Demo

 [Vercel Deployment](https://moodmorph-client.vercel.app/)

---

## 📬 Feedback & Contributions

Feel free to open issues, suggest features, or fork the project.  
Let’s build emotionally intelligent tech together 🌱

## 📦 Key Dependencies

| Package              | Purpose                                      |
|----------------------|----------------------------------------------|
| `react`              | Core UI library                              |
| `react-dom`          | DOM rendering for React                      |
| `react-router-dom`   | Client-side routing                          |
| `react-icons`        | Icon library                                 |
| `chart.js`           | Chart rendering                              |
| `react-chartjs-2`    | React wrapper for Chart.js                   |
| `firebase`           | Authentication, Firestore, Hosting           |
| `sentiment`          | Text sentiment analysis                      |
| `cra-template-tailwindcss` | Tailwind CSS integration with CRA     |
| `web-vitals`         | Performance metrics                          |

## 📦 Reproducibility

To install all dependencies in a virtual environment:

```bash
npm install