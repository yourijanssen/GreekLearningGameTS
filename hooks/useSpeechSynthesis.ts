import { useEffect, useRef } from "react";

export function useSpeechSynthesis(): { speak: (text: string) => void } {
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
      console.log(
        "Loaded voices:",
        voicesRef.current.map((v) => ({
          name: v.name,
          lang: v.lang,
          default: v.default,
          localService: v.localService,
        }))
      );
    };

    // Attach listener for voiceschanged
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => {
        console.log("voiceschanged event fired");
        loadVoices();
      };
    }

    loadVoices(); // load once immediately

    // Cleanup event listener
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = (text: string) => {
    if (!voicesRef.current.length) {
      console.log("No voices loaded.");
    }
    const utter = new window.SpeechSynthesisUtterance(text);
    // Always select the latest voices list
    const greekVoice = voicesRef.current.find(
      (v) => v.lang && v.lang.startsWith("el")
    );
    const fallbackVoice = voicesRef.current.find(
      (v) => v.lang && v.lang.startsWith("en")
    ); // fallback

    if (greekVoice) {
      console.log("Using Greek voice:", greekVoice);
      utter.voice = greekVoice;
    } else if (fallbackVoice) {
      console.log("No Greek voice found. Using fallback voice:", fallbackVoice);
      utter.voice = fallbackVoice;
    } else {
      console.log("No suitable voice found. Using default (browser-selected).");
    }
    utter.rate = 0.9;
    console.log(
      "Speaking text:",
      text,
      "with voice:",
      utter.voice?.name,
      "lang:",
      utter.voice?.lang
    );

    window.speechSynthesis.speak(utter);
  };

  return { speak };
}
