import { upCounter } from "./functions";
import { voice } from "./sounds";
import { GameState, stateVariables } from "./stateVariables";
import { distance } from "./utils/util";

interface Sound {
  audio: HTMLAudioElement;
  hasPlayed: boolean;
  canPlayAgain: boolean;
}

export function playSound(sound: Sound, probability: number) {
  if (!sound.audio.paused) return;
  if (sound.hasPlayed && !sound.canPlayAgain) return;
  if (Math.random() < probability) {
    if (sound.audio) {
      sound.audio.pause();
      sound.audio.currentTime = 0;
    }
    sound.audio.play();
    sound.hasPlayed = true;
  }
}

export function playSoundandVoice() {
  if (
    stateVariables.player.health < 30 &&
    stateVariables.gameState == GameState.running
  ) {
    playSound(voice.idontfeelsogood, 0.001);
  }

  if (
    distance(stateVariables.player.startPoint, stateVariables.boss.startPoint) <
    200
  ) {
    playSound(voice.isthatboss, 0.01);
  }
  if (
    stateVariables.lantern.maxRadiusInnerCircle < 80 &&
    stateVariables.gameState == GameState.running
  ) {
    playSound(voice.lanternrunningout, 0.01);
  }
  if (stateVariables.gameState == GameState.running) {
    voice.wind.audio.volume = 0.4;
    playSound(voice.wind, 1);
  } else {
    voice.wind.audio.pause();
    voice.wind.audio.currentTime = 0;
  }
  if (
    stateVariables.gameState == GameState.menuScreen ||
    stateVariables.gameState == GameState.retryScreen ||
    stateVariables.gameState == GameState.paused ||
    stateVariables.gameState == GameState.controlsScreen
  ) {
    voice.mainmenumusic.audio.volume = 0.4;
    playSound(voice.mainmenumusic, 1);
  } else {
    voice.mainmenumusic.audio.pause();
    voice.mainmenumusic.audio.currentTime = 0;
  }
}

export function resetSound() {
  for (const sound in voice) {
    if (voice.hasOwnProperty(sound)) {
      if (voice[sound].hasPlayed && !voice[sound].canPlayAgain) {
        voice[sound].hasPlayed = false;
      }
    }
  }
}

export function loadSounds() {
  for (const sound in voice) {
    if (voice.hasOwnProperty(sound)) {
      voice[sound].audio.onload = upCounter;
    }
  }
}
