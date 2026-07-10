// Wrapper reconnaissance vocale (Web Speech API) pour l'exercice "répète après moi"

interface SpeechRecognitionResultLike {
  transcript: string;
  confidence: number;
}

type RecognitionCtor = new () => SpeechRecognition;

function getRecognitionCtor(): RecognitionCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function isSpeechRecognitionAvailable(): boolean {
  return getRecognitionCtor() !== null;
}

export function listenOnce(lang = 'ru-RU', timeoutMs = 6000): Promise<SpeechRecognitionResultLike | null> {
  const Ctor = getRecognitionCtor();
  if (!Ctor) return Promise.resolve(null);

  return new Promise((resolve) => {
    const recognition = new Ctor();
    recognition.lang = lang;
    recognition.maxAlternatives = 1;
    recognition.interimResults = false;

    let settled = false;
    const finish = (result: SpeechRecognitionResultLike | null) => {
      if (settled) return;
      settled = true;
      try {
        recognition.stop();
      } catch {
        // ignore
      }
      resolve(result);
    };

    const timer = setTimeout(() => finish(null), timeoutMs);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      clearTimeout(timer);
      const alt = event.results[0]?.[0];
      finish(alt ? { transcript: alt.transcript, confidence: alt.confidence } : null);
    };
    recognition.onerror = () => {
      clearTimeout(timer);
      finish(null);
    };
    recognition.onend = () => {
      clearTimeout(timer);
      finish(null);
    };

    try {
      recognition.start();
    } catch {
      clearTimeout(timer);
      finish(null);
    }
  });
}

// Compare la transcription obtenue à la cible en normalisant les caractères
export function comparePronunciation(target: string, heard: string): { correct: boolean; similarity: number } {
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/[.,!?;:"'«»]/g, '')
      .trim();

  const a = normalize(target);
  const b = normalize(heard);

  if (!b) return { correct: false, similarity: 0 };
  if (a === b) return { correct: true, similarity: 1 };

  // distance de Levenshtein simple pour tolérer les petites erreurs de reconnaissance
  const dist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length) || 1;
  const similarity = 1 - dist / maxLen;
  return { correct: similarity >= 0.75, similarity };
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}
