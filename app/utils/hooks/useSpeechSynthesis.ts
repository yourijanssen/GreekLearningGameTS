// hooks/useSpeechSynthesis.ts
export function useSpeechSynthesis(): {
  speak: (text: string) => void;
} {
  const speak = (text: string) => {
    const utter = new window.SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const greekVoice = voices.find((v) => v.lang && v.lang.startsWith("el"));
    if (greekVoice) utter.voice = greekVoice;
    utter.rate = 0.9;
    window.speechSynthesis.speak(utter);
  };

  return { speak };
}
