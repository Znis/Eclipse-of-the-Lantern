import { Enemy } from "../enemy";
import { Point } from "../shapes/point";
import { stateVariables } from "../stateVariables";
import { distance } from "../utils/util";
import { axeBack, axeFront, axeLeft, axeRight } from "../sprites/axe";
import { Boss } from "../boss";
import { WEAPON_HEIGHT_AND_WIDTH } from "../constants";

export class Axe {
  startPoint: Point;
  r: number;
  spritePos: number;
  shockPoint: Point;

  constructor() {
    this.startPoint = stateVariables.player.startPoint;
    this.r = 50; //impact radius
    this.spritePos = 0;
    this.shockPoint = new Point(0, 0);
  }
  show(
    ctx: CanvasRenderingContext2D = stateVariables.ctx,
    isAttacking: boolean
  ) {
    if (stateVariables.player.direction == "r") {
      const staggerFrame = 5; //number of frames to show the particular frame of the sprite
      let position = isAttacking
        ? Math.floor(this.spritePos / staggerFrame) % 8 //this sprite has 8 frames
        : 0;
      ctx.drawImage(
        axeRight.sprite,
        axeRight.position[position].x,
        axeRight.position[position].y,
        axeRight.width[position],
        axeRight.height,
        stateVariables.player.startPoint.x + axeRight.offset[position].x,
        stateVariables.player.startPoint.y + axeRight.offset[position].y,
        WEAPON_HEIGHT_AND_WIDTH,
        WEAPON_HEIGHT_AND_WIDTH
      );
      if (isAttacking) {
        this.spritePos++;
        if (this.spritePos % 40 == 0) stateVariables.player.isAttacking = false;
      }
    } else if (stateVariables.player.direction == "l") {
      const staggerFrame = 5;
      let position = isAttacking
        ? Math.floor(this.spritePos / staggerFrame) % 8
        : 0;
      ctx.drawImage(
        axeLeft.sprite,
        axeLeft.position[position].x,
        axeLeft.position[position].y,
        axeLeft.width[position],
        axeLeft.height,
        stateVariables.player.startPoint.x + axeLeft.offset[position].x,
        stateVariables.player.startPoint.y + axeLeft.offset[position].y,
        WEAPON_HEIGHT_AND_WIDTH,
        WEAPON_HEIGHT_AND_WIDTH
      );
      if (isAttacking) {
        this.spritePos++;
        if (this.spritePos % 40 == 0) stateVariables.player.isAttacking = false;
      }
    } else if (stateVariables.player.direction == "u") {
      const staggerFrame = 14;
      let position = isAttacking
        ? Math.floor(this.spritePos / staggerFrame) % 3
        : 0;
      ctx.drawImage(
        axeBack.sprite,
        axeBack.position[position].x,
        axeBack.position[position].y,
        axeBack.width[position],
        axeBack.height,
        stateVariables.player.startPoint.x + axeBack.offset[position].x,
        stateVariables.player.startPoint.y + axeBack.offset[position].y,
        8,
        WEAPON_HEIGHT_AND_WIDTH
      );
      if (isAttacking) {
        this.spritePos++;
        if (this.spritePos % 42 == 0) stateVariables.player.isAttacking = false;
      }
    } else if (stateVariables.player.direction == "d") {
      const staggerFrame = 14;
      let position = isAttacking
        ? Math.floor(this.spritePos / staggerFrame) % 3
        : 0;
      ctx.drawImage(
        axeFront.sprite,
        axeFront.position[position].x,
        axeFront.position[position].y,
        axeFront.width[position],
        axeFront.height,
        stateVariables.player.startPoint.x + axeFront.offset[position].x,
        stateVariables.player.startPoint.y + axeFront.offset[position].y,
        8,
        WEAPON_HEIGHT_AND_WIDTH
      );
      if (isAttacking) {
        this.spritePos++;
        if (this.spritePos % 42 == 0) stateVariables.player.isAttacking = false;
      }
    }
    ctx.fillStyle = "rgba(20, 20, 20,0.55)";
    ctx.beginPath();
    ctx.ellipse(
      this.shockPoint.x,
      this.shockPoint.y,
      10,
      10,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.closePath();
  }

  calculateShockPoint() {
    const angle = Math.atan2(
      stateVariables.mouseCoords.y - stateVariables.player.startPoint.y,
      stateVariables.mouseCoords.x - stateVariables.player.startPoint.x
    );
    const dy = Math.sin(angle) * this.r;
    const dx = Math.cos(angle) * this.r;
    this.shockPoint = new Point(
      this.startPoint.x + dx + 20,
      this.startPoint.y + dy + 50
    );
  }

  hits(enemy: Enemy | Boss) {
    let dist = distance(
      new Point(this.shockPoint.x, this.shockPoint.y),
      new Point(
        enemy.startPoint.x + enemy.w / 2,
        enemy.startPoint.y + enemy.h / 2
      )
    );

    if (dist < this.r) {
      return true;
    } else {
      return false;
    }
  }
}
