import { Point } from "../shapes/point";
import { inventory, stateVariables } from "../stateVariables";
import { calculateAngle } from "../utils/util";
import { gunBack, gunFront, gunLeft, gunRight } from "../sprites/gun";
import { drawEllipse } from "../functions";
import { BulletProjectile } from "./bulletProjectile";
import { WEAPON_HEIGHT_AND_WIDTH } from "../constants";

export class Gun {
  startPoint: Point;
  spritePos: number;

  constructor() {
    this.startPoint = stateVariables.player.startPoint;
    this.spritePos = 0;
  }
  show(
    ctx: CanvasRenderingContext2D = stateVariables.ctx,
    isAttacking: boolean
  ) {
    if (stateVariables.player.direction == "r") {
      const staggerFrame = 5;
      let position = isAttacking
        ? Math.floor(this.spritePos / staggerFrame) % 4
        : 0;
      ctx.drawImage(
        gunRight.sprite,
        gunRight.position[position].x,
        gunRight.position[position].y,
        gunRight.width[position],
        gunRight.height,
        stateVariables.player.startPoint.x + gunRight.offset[position].x,
        stateVariables.player.startPoint.y + gunRight.offset[position].y,
        WEAPON_HEIGHT_AND_WIDTH,
        WEAPON_HEIGHT_AND_WIDTH
      );

      if (isAttacking) {
        ctx.fillStyle = "rgba(255, 170, 51, 0.04)";
        for (let i = 0; i < 14; i++) {
          drawEllipse(
            ctx,
            stateVariables.player.startPoint.x +
              gunRight.offset[position].x +
              50,
            stateVariables.player.startPoint.y +
              gunRight.offset[position].y +
              20,
            i * 3,
            i * 3
          ); //glowing effect on the gun after firing
        }

        this.spritePos++;
        if (this.spritePos % 20 == 0) stateVariables.player.isAttacking = false;
      }
    } else if (stateVariables.player.direction == "l") {
      const staggerFrame = 5;
      let position = isAttacking
        ? Math.floor(this.spritePos / staggerFrame) % 4
        : 0;
      ctx.drawImage(
        gunLeft.sprite,
        gunLeft.position[position].x,
        gunLeft.position[position].y,
        gunLeft.width[position],
        gunLeft.height,
        stateVariables.player.startPoint.x + gunLeft.offset[position].x,
        stateVariables.player.startPoint.y + gunLeft.offset[position].y,
        WEAPON_HEIGHT_AND_WIDTH,
        WEAPON_HEIGHT_AND_WIDTH
      );
      if (isAttacking) {
        ctx.fillStyle = "rgba(255, 170, 51, 0.04)";
        for (let i = 0; i < 14; i++) {
          drawEllipse(
            ctx,
            stateVariables.player.startPoint.x + gunLeft.offset[position].x,
            stateVariables.player.startPoint.y +
              gunLeft.offset[position].y +
              20,
            i * 3,
            i * 3
          );
        }

        this.spritePos++;
        if (this.spritePos % 20 == 0) stateVariables.player.isAttacking = false;
      }
    } else if (stateVariables.player.direction == "u") {
      const staggerFrame = 5;
      let position = isAttacking
        ? Math.floor(this.spritePos / staggerFrame) % 4
        : 0;
      ctx.drawImage(
        gunBack.sprite,
        gunBack.position[position].x,
        gunBack.position[position].y,
        gunBack.width[position],
        gunBack.height,
        stateVariables.player.startPoint.x + gunBack.offset[position].x,
        stateVariables.player.startPoint.y + gunBack.offset[position].y,
        8,
        WEAPON_HEIGHT_AND_WIDTH
      );
      if (isAttacking) {
        ctx.fillStyle = "rgba(255, 170, 51, 0.04)";
        for (let i = 0; i < 14; i++) {
          drawEllipse(
            ctx,
            stateVariables.player.startPoint.x +
              gunLeft.offset[position].x +
              45,
            stateVariables.player.startPoint.y + gunLeft.offset[position].y,
            i * 3,
            i * 3
          );
        }

        this.spritePos++;
        if (this.spritePos % 20 == 0) stateVariables.player.isAttacking = false;
      }
    } else if (stateVariables.player.direction == "d") {
      const staggerFrame = 5;
      let position = isAttacking
        ? Math.floor(this.spritePos / staggerFrame) % 4
        : 0;
      ctx.drawImage(
        gunFront.sprite,
        gunFront.position[position].x,
        gunFront.position[position].y,
        gunFront.width[position],
        gunFront.height,
        stateVariables.player.startPoint.x + gunFront.offset[position].x,
        stateVariables.player.startPoint.y + gunFront.offset[position].y,
        8,
        WEAPON_HEIGHT_AND_WIDTH
      );
      if (isAttacking) {
        ctx.fillStyle = "rgba(255, 170, 51, 0.04)";
        for (let i = 0; i < 14; i++) {
          drawEllipse(
            ctx,
            stateVariables.player.startPoint.x +
              gunLeft.offset[position].x +
              45,
            stateVariables.player.startPoint.y +
              gunLeft.offset[position].y +
              10,
            i * 3,
            i * 3
          );
        }

        this.spritePos++;
        if (this.spritePos % 20 == 0) stateVariables.player.isAttacking = false;
      }
    }
  }

  fire() {
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
    const projectile = new BulletProjectile(
      new Point(
        stateVariables.player.startPoint.x + 60,
        stateVariables.player.startPoint.y + 20
      ),
      stateVariables.player.direction,
      new Point(stateVariables.mouseCoords.x, stateVariables.mouseCoords.y)
    );
    stateVariables.bulletProjectileArray.push(projectile);

    inventory.ammo--;
  }
}
