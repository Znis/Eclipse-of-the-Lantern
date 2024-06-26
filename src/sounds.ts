interface Sound {
  audio: HTMLAudioElement;
  hasPlayed: boolean;
  canPlayAgain: boolean;
}
export const voice: { [key: string]: Sound } = {
  diegoblins: {
    audio: new Audio("./assets/sound/voice/dieyougoblins.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  howsharp: {
    audio: new Audio("./assets/sound/voice/howsharp.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  idontfeelsogood: {
    audio: new Audio("./assets/sound/voice/idontfeelsogood.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  isthatboss: {
    audio: new Audio("./assets/sound/voice/isthatthegoblinboss.mp3"),
    hasPlayed: false,
    canPlayAgain: false,
  },
  ithurts: {
    audio: new Audio("./assets/sound/voice/ithurts.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  lanternrunningout: {
    audio: new Audio("./assets/sound/voice/lanternisrunningout.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  letsstartkilling: {
    audio: new Audio("./assets/sound/voice/letsstartkillinggoblins.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  notready: {
    audio: new Audio("./assets/sound/voice/notreadyyet.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  outofammo: {
    audio: new Audio("./assets/sound/voice/outofammo.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  outoffuel: {
    audio: new Audio("./assets/sound/voice/outoflanternfuel.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  outofmedkit: {
    audio: new Audio("./assets/sound/voice/outofmedkit.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  wedidit: {
    audio: new Audio("./assets/sound/voice/yaywedidit.mp3"),
    hasPlayed: false,
    canPlayAgain: false,
  },
  axesound: {
    audio: new Audio("./assets/sound/axesound.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  breathofdragon: {
    audio: new Audio("./assets/sound/voice/breathofdragon.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  hmmaxe: {
    audio: new Audio("./assets/sound/voice/hmmaxe.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  gunfire: {
    audio: new Audio("./assets/sound/gunfire.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  iamtired: {
    audio: new Audio("./assets/sound/voice/iamtired.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  lightofblessings: {
    audio: new Audio("./assets/sound/voice/lightofblessings.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  yaygun: {
    audio: new Audio("./assets/sound/voice/yaygun.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  walk: {
    audio: new Audio("./assets/sound/walk.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  run: {
    audio: new Audio("./assets/sound/walk.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  zombiegrunt: {
    audio: new Audio("./assets/sound/zombiegrunt.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  wind: {
    audio: new Audio("./assets/sound/wind.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  bossroar: {
    audio: new Audio("./assets/sound/bossroar.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  bosswakeup: {
    audio: new Audio("./assets/sound/bosswakeup.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  refueling: {
    audio: new Audio("./assets/sound/refueling.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  usingmedkit: {
    audio: new Audio("./assets/sound/usingmedkit.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  bosscallingallgoblins: {
    audio: new Audio("./assets/sound/voice/bosscallingallgoblins.mp3"),
    hasPlayed: false,
    canPlayAgain: false,
  },
  bosshaswakenup: {
    audio: new Audio("./assets/sound/voice/bosshaswakenup.mp3"),
    hasPlayed: false,
    canPlayAgain: false,
  },
  itfeelsgood: {
    audio: new Audio("./assets/sound/voice/itfeelsgood.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  refuelingdone: {
    audio: new Audio("./assets/sound/voice/refuelingdone.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  wefailed: {
    audio: new Audio("./assets/sound/voice/wefailed.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  cantgobeyondthis: {
    audio: new Audio("./assets/sound/voice/cantgobeyondthis.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  collidedontosomething: {
    audio: new Audio("./assets/sound/voice/collidedontosomething.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  foundfuel: {
    audio: new Audio("./assets/sound/voice/foundfuel.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  foundmedkits: {
    audio: new Audio("./assets/sound/voice/foundmedkits.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  moreammo: {
    audio: new Audio("./assets/sound/voice/moreammo.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  medkitpickup: {
    audio: new Audio("./assets/sound/medkitpickup.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  fuelpickup: {
    audio: new Audio("./assets/sound/fuelpickup.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  ammopickup: {
    audio: new Audio("./assets/sound/ammopickup.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  optionhover: {
    audio: new Audio("./assets/sound/optionhover.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  optionclick: {
    audio: new Audio("./assets/sound/optionclick.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  mainmenumusic: {
    audio: new Audio("./assets/sound/mainmenumusic.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  lightsound: {
    audio: new Audio("./assets/sound/lightsound.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  flamesound: {
    audio: new Audio("./assets/sound/flamesound.mp3"),
    hasPlayed: false,
    canPlayAgain: true,
  },
  homesweethome: {
    audio: new Audio("./assets/sound/homesweethome.mp3"),
    hasPlayed: false,
    canPlayAgain: false,
  },
  aboutvoice: {
    audio: new Audio("./assets/sound/voice/aboutvoice.mp3"),
    hasPlayed: false,
    canPlayAgain: false,
  },
};
