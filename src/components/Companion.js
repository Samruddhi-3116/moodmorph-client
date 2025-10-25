import React, { useState } from 'react';

function Companion({ mood = 'neutral', affirmation = '', mode = 'ask', journalText = '' }) {
  const [userQuestion, setUserQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const moodLower = (mood || 'neutral').toLowerCase();

  const moodGradient =
    moodLower.includes('sad') ? 'bg-gradient-to-br from-blue-900 to-blue-700' :
    moodLower.includes('happy') ? 'bg-gradient-to-br from-yellow-700 to-yellow-500' :
    moodLower.includes('anxious') ? 'bg-gradient-to-br from-purple-900 to-purple-700' :
    moodLower.includes('tired') ? 'bg-gradient-to-br from-gray-800 to-gray-600' :
    moodLower.includes('angry') ? 'bg-gradient-to-br from-red-900 to-red-700' :
    'bg-gradient-to-br from-gray-800 to-gray-700';

  let finalAffirmation = affirmation || "You are resilient. You are growing.";
  if (moodLower.includes('sad') || moodLower.includes('low')) {
    finalAffirmation = "Your feelings are valid. Healing takes time, and you're doing beautifully.";
  } else if (moodLower.includes('anxious') || moodLower.includes('nervous')) {
    finalAffirmation = "You are safe. You are grounded. You are enough.";
  } else if (moodLower.includes('happy') || moodLower.includes('excited')) {
    finalAffirmation = "Your joy is radiant. Let it ripple outward.";
  } else if (moodLower.includes('tired') || moodLower.includes('exhausted')) {
    finalAffirmation = "Rest is not weakness. It’s wisdom. You deserve it.";
  } else if (moodLower.includes('angry') || moodLower.includes('frustrated')) {
    finalAffirmation = "You are powerful. You can transform this energy into clarity.";
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    let timeGreeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    if (moodLower.includes('sad')) return `${timeGreeting}. I'm here with you — gently.`;
    if (moodLower.includes('anxious')) return `${timeGreeting}. Let’s breathe together. You’re safe.`;
    if (moodLower.includes('happy')) return `${timeGreeting}! Your joy is contagious.`;
    if (moodLower.includes('tired')) return `${timeGreeting}. Rest is wise. Let’s take it slow.`;
    if (moodLower.includes('angry')) return `${timeGreeting}. I’m here to help you find clarity.`;

    return `${timeGreeting}. Let’s take today one step at a time.`;
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserQuestion(transcript);
      handleAsk(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  const handleAsk = async (overrideQuestion = null) => {
    setLoading(true);
    const payload = { mood, mode };

    if (mode === 'ask') {
      payload.question = overrideQuestion || userQuestion;
    } else if (mode === 'journal') {
      payload.journalText = journalText || 'No journal text provided.';
    }

    try {
      const response = await fetch("http://localhost:5000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      const reply = data.reply || "I'm still learning. Try asking something else.";
      setAnswer(reply);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAnswer("Hmm, I’m having trouble connecting. Let’s try again in a moment. You’re doing great.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${moodGradient} text-indigo-300 p-6 rounded-lg mt-6 w-full max-w-4xl mx-auto text-center shadow-lg px-4 sm:px-6 lg:px-8`}>
      <p className="text-base sm:text-lg lg:text-xl italic">🧠 {getGreeting()}</p>
      <p className="mt-4 text-sm sm:text-base lg:text-lg text-indigo-300 italic">💬 {finalAffirmation}</p>

      {mode === 'ask' && (
        <div className="mt-6">
          <input
            type="text"
            placeholder="Ask MoodMorph anything..."
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            className="w-full p-3 rounded border border-teal-300 bg-gray-900 text-white placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={() => handleAsk()}
            className="mt-3 w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition font-bold"
          >
            Ask
          </button>
          <button
            onClick={startListening}
            className="mt-3 w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
          >
            🎤 Speak Instead
          </button>
          {isListening && (
            <div className="mt-2 text-sm text-teal-300 animate-pulse">🎙️ Listening…</div>
          )}
        </div>
      )}

      {mode === 'journal' && (
        <div className="mt-6">
          <button
            onClick={() => handleAsk()}
            className="w-full bg-indigo-500 text-black py-2 rounded hover:bg-moon-light transition font-bold"
          >
            View
          </button>
        </div>
      )}

      {mode === 'planner' && (
        <div className="mt-6">
          <button
            onClick={() => handleAsk()}
            className="w-full bg-indigo-500 text-black py-2 rounded hover:bg-moon-light transition font-bold"
          >
            Suggest Routines
          </button>
        </div>
      )}

      {loading ? (
        <div className="mt-4 p-4 bg-moon-dark/80 rounded shadow relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-500/10 to-transparent animate-[shimmer_2s_infinite]"></div>
          <p className="relative text-moon-light italic">Thinking…</p>
        </div>
      ) : (
        answer && (
          <div className="mt-4 p-4 bg-moon-dark/80 rounded-lg shadow-lg text-left animate-fadeIn max-h-[60vh] overflow-y-auto">
            <p className="font-semibold text-moon-light">MoodMorph says:</p>
            <p className="mt-2 italic text-teal-100 whitespace-pre-line">{answer}</p>
            <p className="text-xs text-moon-light mt-2">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Response generated
            </p>
            <div className="mt-3 flex gap-4 flex-wrap">
              <button
                onClick={() => speak(answer)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                🔊 Read Aloud
              </button>
              <button
                onClick={() => speechSynthesis.cancel()}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                ⏹ Stop Voice
              </button>
              <button
                onClick={() => setAnswer('')}
                className="text-sm text-moon-light underline hover:text-white transition"
              >
                Clear Response
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Companion;
