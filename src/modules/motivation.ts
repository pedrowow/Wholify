export const motivationalMessages = [
  "Your future self will thank you.",
  "Consistency beats intensity.",
  "Small steps lead to big changes.",
  "Every day is a new opportunity to grow.",
  "You are capable of more than you think.",
  "Focus on progress, not perfection.",
  "Be the best version of yourself.",
  "One habit at a time.",
  "Your potential is endless.",
  "Mind, Body, Soul – everything is connected."
];

export const getRandomMotivation = () => {
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
};
