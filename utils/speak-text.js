import { wlFilePaths } from "../database/wl-file-paths.js";
import store from "../app/store.js";

let availableVoices = [];

// Load voices once they are available
function loadVoices() {
  return new Promise((resolve) => {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      availableVoices = voices;
      resolve(voices);
    } else {
      // wait until voices are loaded
      speechSynthesis.onvoiceschanged = () => {
        availableVoices = speechSynthesis.getVoices();
        resolve(availableVoices);
      };
    }
  });
}

export async function speakText(text, { voiceName = "Google Deutsch", fallbackLang = "de-DE" } = {}) {
  if (!("speechSynthesis" in window)) {
    console.error("Text-to-Speech is not supported in this browser.");
    return;
  }

  // make sure voices are loaded
  await loadVoices();

  const utterance = new SpeechSynthesisUtterance(text);

  // try to find exact voice by name
  let selectedVoice = availableVoices.find((v) => v.name === voiceName);

  // if not found, try fallback by language
  if (!selectedVoice) {
    selectedVoice = availableVoices.find((v) => v.lang === fallbackLang);
  }

  if (selectedVoice) {
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
  } else {
    // no matching voice, fallback to given language string
    utterance.lang = fallbackLang;
    console.warn(
      `No matching voice found, falling back to browser default with lang "${fallbackLang}".`
    );
  }

  // tweak settings
  utterance.pitch = 0.9;
  utterance.rate = 0.9;
  utterance.volume = 0.8;

  speechSynthesis.speak(utterance);
}
