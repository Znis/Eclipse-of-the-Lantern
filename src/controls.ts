import {
  GameState,
  inventory,
  keyDown,
  stateVariables,
} from "./stateVariables";
import { getMouseCoords } from "./functions";
import { playSound } from "./soundPlayingFunction";
import { voice } from "./sounds";
import { calculateAngle } from "./utils/util";
import { Point } from "./shapes/point";

window.addEventListener(
  "keydown",
  function (e) {
    stateVariables.keyState[e.keyCode || e.which] = true;
  },
  true
);
window.addEventListener(
  "keyup",
  function (e) {
    stateVariables.keyState[e.keyCode || e.which] = false;
  },
  true
);

window.addEventListener(
  "mousemove",
  function (e) {
    stateVariables.mouseCoords = getMouseCoords(e);
  },
  true
);

window.addEventListener(
  "click",
  function () {
    if (
      stateVariables.gameState != GameState.running &&
      stateVariables.gameState != GameState.controlsScreen &&
      stateVariables.gameState != GameState.aboutScreen &&
      stateVariables.gameState != GameState.loadingScreen
    ) {
      stateVariables.mainMenu.handleSelect();
    }
  },
  true
);

export const mousepress = window.addEventListener("click", () => {
  if (
    stateVariables.gameState == GameState.running &&
    !stateVariables.player.isBlowingLantern &&
    stateVariables.player.health > 0
  ) {
    const angle =
      calculateAngle(
        new Point(stateVariables.mouseCoords.x, stateVariables.mouseCoords.y),
        stateVariables.player.startPoint
      ) *
      (180 / Math.PI);
    if (angle >= -45 && angle < 45) {
      stateVariables.player.direction = "r";
    } else if (angle >= 45 && angle < 135) {
      stateVariables.player.direction = "d";
    } else if (angle >= -135 && angle < -45) {
      stateVariables.player.direction = "u";
    } else {
      stateVariables.player.direction = "l";
    }
    if (stateVariables.player.abilityMode) {
      stateVariables.player.useAbility("flame");
    } else if (stateVariables.player.currWeapon == "gun") {
      if (inventory.ammo > 0) {
        stateVariables.player.isAttacking = true;
        stateVariables.gun.fire();
        playSound(voice.gunfire, 0.5);
      } else {
        stateVariables.inventory.displayMessage(stateVariables.ctx, "ammo");
      }
    } else if (stateVariables.player.currWeapon == "axe") {
      stateVariables.player.isAttacking = true;
      stateVariables.axe.calculateShockPoint();
      playSound(voice.axesound, 0.5);
    }
  }
});

let refuelTimeout: number | null = null;
let healTimeout: number | null = null;
export function handleMovementControls() {
  if (stateVariables.keyState[87] && stateVariables.keyState[68]) {
    stateVariables.player.direction = "u";
    stateVariables.player.dirX = -0.72;
    stateVariables.player.dirY = 0.72;
    stateVariables.player.move();
  } else if (stateVariables.keyState[87] && stateVariables.keyState[65]) {
    stateVariables.player.direction = "u";
    stateVariables.player.dirX = 0.72;
    stateVariables.player.dirY = 0.72;
    stateVariables.player.move();
  } else if (stateVariables.keyState[83] && stateVariables.keyState[65]) {
    stateVariables.player.direction = "d";
    stateVariables.player.dirX = 0.72;
    stateVariables.player.dirY = -0.72;
    stateVariables.player.move();
  } else if (stateVariables.keyState[83] && stateVariables.keyState[68]) {
    stateVariables.player.direction = "d";
    stateVariables.player.dirX = -0.72;
    stateVariables.player.dirY = -0.72;
    stateVariables.player.move();
  } else if (stateVariables.keyState[65]) {
    stateVariables.player.direction = "l";
    stateVariables.player.dirX = 1;
    stateVariables.player.dirY = 0;
    stateVariables.player.move();
  } else if (stateVariables.keyState[68]) {
    stateVariables.player.direction = "r";
    stateVariables.player.dirX = -1;
    stateVariables.player.dirY = 0;
    stateVariables.player.move();
  } else if (stateVariables.keyState[83]) {
    stateVariables.player.direction = "d";
    stateVariables.player.dirX = 0;
    stateVariables.player.dirY = -1;
    stateVariables.player.move();
  } else if (stateVariables.keyState[87]) {
    stateVariables.player.direction = "u";
    stateVariables.player.dirX = 0;
    stateVariables.player.dirY = 1;
    stateVariables.player.move();
  } else {
    stateVariables.player.frameToShow = 0;
    stateVariables.player.dirX = 0;
    stateVariables.player.dirY = 0;
    stateVariables.player.isWalking = false;
  }
}
export function handleOtherControls() {
  if (stateVariables.keyState[76]) {
    stateVariables.debugCollider = true;
  } else {
    stateVariables.debugCollider = false;
  }

  if (stateVariables.keyState[69]) {
    if (!keyDown.E) {
      stateVariables.player.useAbility("light");
      keyDown.E = true;
    }
  } else {
    keyDown.E = false;
  }

  if (stateVariables.keyState[80]) {
    stateVariables.gameState = GameState.paused;
  }

  if (stateVariables.keyState[82]) {
    if (!keyDown.R) {
      if (stateVariables.inventory.abilities[1].cooldown == 0) {
        stateVariables.player.abilityMode = true;
      } else {
        stateVariables.inventory.displayMessage(
          stateVariables.ctx,
          "",
          "Ability on Cooldown!"
        );
        setTimeout(() => {
          playSound(voice.notready, 1);
        }, 1000);
        keyDown.R = true;
      }
    }
  } else {
    stateVariables.player.abilityMode = false;
    keyDown.R = false;
  }

  if (
    stateVariables.keyState[16] &&
    !stateVariables.player.isBlowingLantern &&
    !stateVariables.player.isUsingMedkit
  ) {
    stateVariables.player.frameTime = 2;
    stateVariables.player.increaseSpeed();
    stateVariables.player.isRunning = true;
  } else {
    stateVariables.player.movement_speed = stateVariables.player.default_speed;
    stateVariables.player.frameTime = 4;
    stateVariables.player.isRunning = false;
  }

  if (stateVariables.keyState[81]) {
    if (!keyDown.Q) {
      if (stateVariables.player.currWeapon == "axe") {
        stateVariables.player.currWeapon = "gun";
        playSound(voice.yaygun, 1);
      } else {
        stateVariables.player.currWeapon = "axe";
        playSound(voice.hmmaxe, 1);
      }
      keyDown.Q = true;
    }
  } else {
    keyDown.Q = false;
  }

  if (stateVariables.keyState[32]) {
    if (!keyDown.SPACE) {
      if (!healTimeout && stateVariables.player.health > 0) {
        if (inventory.medKit > 0) {
          stateVariables.healStart = new Date().getTime();
          stateVariables.isHoldingHealKey = true;
          stateVariables.player.isUsingMedkit = true;
          healTimeout = setTimeout(() => {
            stateVariables.player.increaseHealth();
            playSound(voice.itfeelsgood, 1);
            healTimeout = null;
            stateVariables.player.isUsingMedkit = false;
            stateVariables.isHoldingHealKey = false;
            stateVariables.healStart = null;
          }, stateVariables.healDuration);
        } else {
          stateVariables.inventory.displayMessage(
            stateVariables.ctx,
            "health_pack"
          );
        }
      }
      keyDown.SPACE = true;
    }
  } else {
    if (healTimeout && stateVariables.player.health > 0) {
      clearTimeout(healTimeout);
      healTimeout = null;
      stateVariables.isHoldingHealKey = false;
      stateVariables.player.isUsingMedkit = false;
      stateVariables.healStart = null;
    }
    keyDown.SPACE = false;
  }

  if (stateVariables.keyState[70]) {
    if (!keyDown.F) {
      if (!refuelTimeout && stateVariables.player.health > 0) {
        if (inventory.fuel > 0) {
          stateVariables.refuelStart = new Date().getTime();
          stateVariables.isHoldingRefuelKey = true;
          stateVariables.player.isBlowingLantern = true;
          refuelTimeout = setTimeout(() => {
            playSound(voice.refuelingdone, 1);
            stateVariables.lantern.resetLuminosity();
            inventory.fuel--;
            refuelTimeout = null;
            stateVariables.player.isBlowingLantern = false;
            stateVariables.isHoldingRefuelKey = false;
            stateVariables.refuelStart = null;
          }, stateVariables.refuelDuration);
        } else {
          stateVariables.inventory.displayMessage(stateVariables.ctx, "fuel");
        }
      }
      keyDown.F = true;
    }
  } else {
    if (refuelTimeout && stateVariables.player.health > 0) {
      clearTimeout(refuelTimeout);
      refuelTimeout = null;
      stateVariables.isHoldingRefuelKey = false;
      stateVariables.player.isBlowingLantern = false;
      stateVariables.refuelStart = null;
    }
    keyDown.F = false;
  }
}
