import { LANTERN_BRIGHTNESS_DECREASE_RATE, LANTERN_BRIGHTNESS_RADIUS } from "./constants";
import { drawEllipse } from "./functions";
import { canvas } from "./main";
import lantern from "./sprites/lantern";
import { GameState, stateVariables } from "./stateVariables";

export class Lantern {
  x: number;
  y: number;
  img: HTMLImageElement;
  maxRadiusInnerCircle: number;
  maxRadiusOuterCircle: number;
  decreaseLuminosity: number | null;
  setLuminosityInterval: number | null;
  resetLuminosityInterval: number | null;
  brightnessDecreaseRate: number;
  spritePos: number;
  r: number;
  blowingLantern: number | null;
  constructor() {
    this.decreaseLuminosity = null;
    this.setLuminosityInterval = null;
    this.resetLuminosityInterval = null;
    this.x = stateVariables.player.startPoint.x + 15;
    this.y = stateVariables.player.startPoint.y + 45;
    this.img = new Image();
    this.maxRadiusInnerCircle = LANTERN_BRIGHTNESS_RADIUS;
    this.maxRadiusOuterCircle =
      Math.max(stateVariables.windowWidth, stateVariables.windowHeight) / 2;
    this.brightnessDecreaseRate = LANTERN_BRIGHTNESS_DECREASE_RATE;
    this.spritePos = 0;
    this.r = 14;
    this.blowingLantern = null;
  }

  show(ctx: CanvasRenderingContext2D = stateVariables.ctx) {
    if (stateVariables.player.isBlowingLantern) {
      if (!this.blowingLantern) {
        this.blowingLantern = setInterval(() => {
          if (this.r < 28) {
            this.r += 1;
          } else {
            clearInterval(this.blowingLantern!);
            this.blowingLantern = null;
          }
        }, 100);
      }
    } else {
      this.r = 14;
    }

    if (stateVariables.player.direction == "l") {
      ctx.fillStyle = "rgba(255, 170, 51, 0.04)";
      for (let i = 0; i < this.r; i++) {
        drawEllipse(ctx, this.x + 10, this.y + 20, i * 3, i * 3);
      }
      const staggerFrame = stateVariables.player.isRunning ? 5 : 8;
      let position =
        stateVariables.player.isWalking || stateVariables.player.isRunning
          ? Math.floor(this.spritePos / staggerFrame) % 5
          : 0;
      ctx.drawImage(
        lantern.sprite,
        lantern.position[position].x,
        lantern.position[position].y,
        lantern.width,
        lantern.height,
        this.x,
        this.y,
        25,
        30
      );
      if (stateVariables.player.isWalking || stateVariables.player.isRunning)
        this.spritePos++;
    }

    if (stateVariables.player.direction == "r") {
      ctx.fillStyle = "rgba(255, 170, 51, 0.04)";
      for (let i = 0; i < this.r; i++) {
        drawEllipse(ctx, this.x + 5, this.y + 20, i * 3, i * 3);
      }
      const staggerFrame = stateVariables.player.isRunning ? 5 : 8;
      let position =
        stateVariables.player.isWalking || stateVariables.player.isRunning
          ? Math.floor(this.spritePos / staggerFrame) % 5
          : 0;
      ctx.drawImage(
        lantern.sprite,
        lantern.position[position].x,
        lantern.position[position].y,
        lantern.width,
        lantern.height,
        this.x - 5,
        this.y,
        25,
        30
      );
      if (stateVariables.player.isWalking || stateVariables.player.isRunning)
        this.spritePos++;
    }

    if (stateVariables.player.direction == "u") {
      ctx.fillStyle = "rgba(255, 170, 51, 0.04)";
      for (let i = 0; i < this.r; i++) {
        drawEllipse(ctx, this.x - 5, this.y + 10, i * 3, i * 3);
      }
      ctx.drawImage(this.img, this.x - 25, this.y - 10, 40, 40);
    }

    if (stateVariables.player.direction == "d") {
      ctx.fillStyle = "rgba(255, 170, 51, 0.04)";
      for (let i = 0; i < this.r; i++) {
        drawEllipse(ctx, this.x - 5, this.y + 15, i * 3, i * 3);
      }
      ctx.drawImage(this.img, this.x - 25, this.y - 10, 40, 40);
    }
  }

  showLuminosity() {
    const gradient = stateVariables.ctx.createRadialGradient(
      this.x + 5,
      this.y + 35,
      this.maxRadiusInnerCircle,
      this.x + 5,
      this.y + 35,
      this.maxRadiusOuterCircle
    );
    gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(0.1, "rgba(0, 0, 0, 0.8)");
    gradient.addColorStop(0.2, "rgba(0, 0, 0, 0.9)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)");

    stateVariables.ctx.fillStyle = gradient;

    stateVariables.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  changeLuminosity() {
    if (!this.decreaseLuminosity) {
      this.decreaseLuminosity = setInterval(() => {
        if (this.maxRadiusInnerCircle <= 0) {
          this.maxRadiusInnerCircle = 0;
          clearInterval(this.decreaseLuminosity!);
          this.decreaseLuminosity = null;
        } else if (stateVariables.gameState != GameState.paused) {
          this.maxRadiusInnerCircle -= this.brightnessDecreaseRate;
        }
      }, 200);
    }
  }
  resetLuminosity() {
    this.brightnessDecreaseRate = LANTERN_BRIGHTNESS_DECREASE_RATE;
    this.resetLuminosityInterval = setInterval(() => {
      if (this.maxRadiusInnerCircle == LANTERN_BRIGHTNESS_RADIUS) {
        clearInterval(this.resetLuminosityInterval!);
        this.resetLuminosityInterval = null;
      } else if (this.maxRadiusInnerCircle > LANTERN_BRIGHTNESS_RADIUS) {
        this.maxRadiusInnerCircle -= 1;
      } else if (this.maxRadiusInnerCircle < LANTERN_BRIGHTNESS_RADIUS) {
        this.maxRadiusInnerCircle += 1;
      }
    }, 2);
  }

  setLuminosity() {
    this.brightnessDecreaseRate = 0;
    this.setLuminosityInterval = setInterval(() => {
      if (
        this.maxRadiusInnerCircle >=
        Math.max(canvas.width / 2, canvas.height / 2)
      ) {
        this.maxRadiusInnerCircle = Math.max(
          canvas.width / 2,
          canvas.height / 2
        );
        clearInterval(this.setLuminosityInterval!);
        this.setLuminosityInterval = null;
      } else {
        this.maxRadiusInnerCircle += 1;
      }
    }, 2);
  }
}
