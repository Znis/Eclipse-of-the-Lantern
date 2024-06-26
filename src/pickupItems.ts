import { Point } from "./shapes/point";
import { playSound } from "./soundPlayingFunction";
import { voice } from "./sounds";
import fuel from "./sprites/fuel";
import {
  freqLoadingAssets,
  inventory,
  pickupItems,
  stateVariables,
} from "./stateVariables";
import { distance } from "./utils/util";

export class PickupItems {
  images: HTMLImageElement[];
  startPoint: Point;
  isUsed: boolean;
  type: { [key: string]: string };
  spritePos: number;
  constructor(x: number, y: number, pickupItemType: { [key: string]: string }) {
    this.images = freqLoadingAssets.pickupItems.medkit;
    this.startPoint = new Point(x, y);
    this.isUsed = false;
    this.type = pickupItemType;
    this.spritePos = 0;
  }

  show(
    img: HTMLImageElement,
    shadowFrame: number,
    ctx: CanvasRenderingContext2D = stateVariables.ctx
  ) {
    const imgX = this.startPoint.x;
    const imgY = this.startPoint.y;
    let ellipseX = imgX + 16;
    let ellipseY = imgY + 40;
    let ellipseWidth = shadowFrame + 10;
    let ellipseHeight = shadowFrame + 5;

    if (this.type.itemName == "fuel") {
      const staggerFrame = 5;
      let position = Math.floor(this.spritePos / staggerFrame) % 8;
      ctx.drawImage(
        fuel.sprite,
        fuel.position[position].x,
        fuel.position[position].y,
        fuel.width,
        fuel.height,
        imgX,
        imgY,
        30,
        30
      );
      this.spritePos++;
    } else if (this.type.itemName == "health_pack") {
      ellipseX = imgX + 30;
      ellipseY = imgY + 50;
      ellipseWidth = shadowFrame + 14;
      ellipseHeight = shadowFrame + 4;
      ctx.drawImage(img, imgX, imgY, 60, 60);
    } else if (this.type.itemName == "ammo") {
      ellipseWidth = shadowFrame + 22;
      const img = pickupItems.ammo;
      ctx.drawImage(img, imgX, imgY, 30, 30);
    }

    ctx.fillStyle = "rgba(20, 20, 20, 150)";

    ctx.beginPath();
    ctx.ellipse(
      ellipseX,
      ellipseY,
      ellipseWidth / 2,
      ellipseHeight / 2,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  collect() {
    if (distance(this.startPoint, stateVariables.player.startPoint) < 50) {
      if (this.type.itemName == "health_pack") {
        playSound(voice.medkitpickup, 1);
        setTimeout(() => {
          playSound(voice.foundmedkits, 0.5);
        }, 500);
        inventory.medKit++;
      } else if (this.type.itemName == "fuel") {
        playSound(voice.fuelpickup, 1);
        setTimeout(() => {
          playSound(voice.foundfuel, 0.5);
        }, 500);
        inventory.fuel++;
      } else if (this.type.itemName == "ammo") {
        playSound(voice.ammopickup, 1);
        setTimeout(() => {
          playSound(voice.moreammo, 0.5);
        }, 500);
        inventory.ammo += 50;
      }
      this.isUsed = true;
    }
  }
}
