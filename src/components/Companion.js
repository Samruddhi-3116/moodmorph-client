import React from 'react';

function Companion({ mood }) {
  const moodLower = mood.toLowerCase();

  let message = "I'm here with you. Let's take today one step at a time.";
  let affirmation = "You are resilient. You are growing.";

  if (moodLower.includes('sad') || moodLower.includes('low')) {
    affirmation = "Your feelings are valid. Healing takes time, and you're doing beautifully.";
  } else if (moodLower.includes('anxious') || moodLower.includes('nervous')) {
    affirmation = "You are safe. You are grounded. You are enough.";
  } else if (moodLower.includes('happy') || moodLower.includes('excited')) {
    affirmation = "Your joy is radiant. Let it ripple outward.";
  } else if (moodLower.includes('tired') || moodLower.includes('exhausted')) {
    affirmation = "Rest is not weakness. It’s wisdom. You deserve it.";
  } else if (moodLower.includes('angry') || moodLower.includes('frustrated')) {
    affirmation = "You are powerful. You can transform this energy into clarity.";
  }

  return (
    <div className="bg-gray-800 text-teal-300 p-4 rounded-lg mt-6 max-w-md mx-auto text-center">
      <p className="text-lg italic">🧠 {message}</p>
        <p className="mt-4 text-sm text-teal-200 italic">💬 {affirmation}</p>
    </div>
  );
}

export default Companion;