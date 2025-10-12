const affirmations = {
  happy: [
    "Your joy is contagious.",
    "Keep shining—your light matters.",
    "Celebrate this moment fully."
  ],
  sad: [
    "It’s okay to feel this way. You’re not alone.",
    "Gentleness is strength. Be kind to yourself.",
    "This feeling will pass. You are resilient."
  ],
  anxious: [
    "Breathe. You are safe right now.",
    "You’ve handled hard things before—you’ll do it again.",
    "Let go of what you can’t control. Focus on now."
  ],
  neutral: [
    "Even quiet moments are part of growth.",
    "You’re doing better than you think.",
    "Stay present. You’re exactly where you need to be."
  ]
};

export function getAffirmation(mood) {
  const options = affirmations[mood] || affirmations["neutral"];
  return options[Math.floor(Math.random() * options.length)];
}