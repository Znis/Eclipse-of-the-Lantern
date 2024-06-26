import { GameState, inventory, stateVariables } from "./stateVariables";
import "./style.css";
import "./controls";
import {
  adjustCanvasSize,
  checkHitToBoss,
  checkHitToEnemy,
  checkPlayerHealthAndLanternLuminosity,
  debugColliderMode,
  displayCursorImage,
  drawChannelledAnimation,
  handleBoss,
  handleEnemies,
  handlePickupItems,
  handleProjectiles,
  preload,
  renderInventory,
  renderMainMenu,
  renderUi,
} from "./functions";
import { handleMovementControls, handleOtherControls } from "./controls";
import { playSound, playSoundandVoice } from "./soundPlayingFunction";
import { voice } from "./sounds";

export const canvas = document.querySelector(
  "#gameCanvas"
) as HTMLCanvasElement;
stateVariables.ctx = canvas.getContext("2d")!;

canvas.width = stateVariables.windowWidth;
canvas.height = stateVariables.windowHeight;
canvas.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

preload();

function draw() {
  adjustCanvasSize();

  stateVariables.bgImage.show();
  if (stateVariables.gameState == GameState.loadingScreen) {
    stateVariables.loadingScreen.show();
  }

  if (stateVariables.gameState == GameState.aboutScreen) {
    stateVariables.aboutScreen.show();
  }
  if (stateVariables.gameState == GameState.controlsScreen) {
    stateVariables.controlsScreen.show();
  }

  playSoundandVoice();

  if (stateVariables.gameState == GameState.running) {
    if (stateVariables.bgImage.name != "house.png") {
      if (stateVariables.rain) stateVariables.ui.renderRainParticles();
      handlePickupItems();
      checkHitToEnemy();
      stateVariables.player.show();
      handleEnemies();
      handleBoss();
      checkHitToBoss();
      stateVariables.bgImage.showDepth();
      stateVariables.lantern.showLuminosity();
      stateVariables.lantern.changeLuminosity();
      handleProjectiles();
      handleOtherControls();
    } else {
      stateVariables.player.show();
      stateVariables.bgImage.showDepth();
      stateVariables.lantern.maxRadiusInnerCircle = 250;
      stateVariables.player.health = 100;
      stateVariables.player.stamina = 100;
      if (inventory.ammo < 100) inventory.ammo = 100;
      if (inventory.fuel < 5) inventory.fuel = 5;
      if (inventory.medKit < 5) inventory.medKit = 5;
      playSound(voice.homesweethome, 1);
    }
    renderUi();
    renderInventory();
    handleMovementControls();

    if (
      stateVariables.enemiesArray.length == 0 &&
      !stateVariables.boss.isAlive
    ) {
      playSound(voice.wedidit, 1);
      stateVariables.gameState = GameState.gameFinish;
    }

    stateVariables.axe.calculateShockPoint();

    if (
      stateVariables.isHoldingRefuelKey &&
      stateVariables.refuelStart != null
    ) {
      drawChannelledAnimation();
    }

    if (stateVariables.isHoldingHealKey && stateVariables.healStart != null) {
      drawChannelledAnimation();
    }
    checkPlayerHealthAndLanternLuminosity();
  }

  if (
    stateVariables.gameState == GameState.menuScreen ||
    stateVariables.gameState == GameState.retryScreen
  ) {
    stateVariables.lantern.showLuminosity();
    stateVariables.ui.renderBloodOverlay();
    stateVariables.lantern.maxRadiusInnerCircle = 10;
    renderMainMenu();
  }

  if (stateVariables.gameState == GameState.paused) {
    stateVariables.lantern.showLuminosity();
    stateVariables.ui.renderBloodOverlay();
    renderMainMenu();
  }

  if (stateVariables.debugCollider) {
    debugColliderMode();
  }

  displayCursorImage();

  stateVariables.reqAnimFrame = requestAnimationFrame(draw);
}
stateVariables.reqAnimFrame = requestAnimationFrame(draw);
