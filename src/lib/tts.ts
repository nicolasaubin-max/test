// Wrapper Text-to-Speech pour la prononciation russe

let cachedVoice: SpeechSynthesisVoice | null | undefined;

function pickRussianVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice !== undefined) return cachedVoice;
  const voices = window.speechSynthesis?.getVoices() ?? [];
  cachedVoice = voices.find((v) => v.lang.toLowerCase().startsWith('ru')) ?? null;
  return cachedVoice;
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = undefined;
  };
}

export function speakRussian(text: string, rate = 0.9): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ru-RU';
  utterance.rate = rate;
  const voice = pickRussianVoice();
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

export function isTtsAvailable(): boolean {
  return typeof window !== 'undefined' && !!window.speechSynthesis;
}
