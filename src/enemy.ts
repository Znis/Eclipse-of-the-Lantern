import { ENEMY_REACTION_DISTANCE } from "./constants";
import { Point } from "./shapes/point";
import { playSound } from "./soundPlayingFunction";
import { voice } from "./sounds";
import { enemyBack, enemyFront, enemyLeft, enemyRight } from "./sprites/enemy";
import { freqLoadingAssets, stateVariables } from "./stateVariables";
import { calculateAngle, distance, getRandomInt } from "./utils/util";

export class Enemy {
  startPoint: Point;
  images_back: HTMLImageElement[];
  images_front: HTMLImageElement[];
  images_left: HTMLImageElement[];
  images_right: HTMLImageElement[];
  MAX_HEALTH: number;
  MIN_HEALTH: number;
  damage: number;
  health: number;
  movement_speed: number;
  finalX: number;
  finalY: number;
  direction: string;
  time: number;
  h: number;
  w: number;
  r: number;
  default_movement_speed: number;
  default_damage: number;
  default_health: number;
  damageTimeout: number | null;
  isAttacking: boolean;
  spritePos: number;
  attackType: string;
  isAlive: boolean;

  constructor(x: number, y: number) {
    this.startPoint = new Point(x, y);
    this.direction = "d";
    this.h = getRandomInt(80, 100);
    this.w = this.h;
    this.r = 40;

    this.MAX_HEALTH = 5;
    this.MIN_HEALTH = 2;
    this.default_damage = 1;
    this.damage = this.default_damage;

    this.images_back = freqLoadingAssets.goblinImages.back;
    this.images_front = freqLoadingAssets.goblinImages.front;
    this.images_left = freqLoadingAssets.goblinImages.left;
    this.images_right = freqLoadingAssets.goblinImages.right;

    this.time = 0;

    this.damageTimeout = null;

    this.default_health =
      Math.random() * (this.MAX_HEALTH - this.MIN_HEALTH) + this.MIN_HEALTH;
    this.health = this.default_health;

    this.default_movement_speed = 1;
    this.movement_speed = Math.random() + this.default_movement_speed;

    this.finalX = stateVariables.player.startPoint.x;

    this.finalY = stateVariables.player.startPoint.y;
    this.isAttacking = false;
    this.spritePos = 0;
    this.attackType = `attackType1`;
    this.isAlive = true;
  }

  updateAttributes() {
    const dist = distance(this.startPoint, stateVariables.player.startPoint);
    if (dist > stateVariables.lantern.maxRadiusInnerCircle * 2) {
      this.movement_speed = this.default_movement_speed * 2;
      this.damage = this.default_damage * 2;
      this.health = this.health < this.default_health ? this.health : this.default_health * 2;
    } else {
      this.movement_speed = this.default_movement_speed;
      this.damage = this.default_damage;
    }
  }
  determineDirection() {
    const angle =
      calculateAngle(new Point(this.finalX, this.finalY), this.startPoint) *
      (180 / Math.PI);
    if (angle >= -45 && angle < 45) {
      this.direction = "r";
    } else if (angle >= 45 && angle < 135) {
      this.direction = "d";
    } else if (angle >= -135 && angle < -45) {
      this.direction = "u";
    } else {
      this.direction = "l";
    }
  }

  show(ctx: CanvasRenderingContext2D = stateVariables.ctx) {
    if (Math.floor(this.health) > 0) {
      if (this.isAttacking) {
        const staggerFrame = 5;
        let position = Math.floor(this.spritePos / staggerFrame) % 8;

        if (this.direction == "l") {
          ctx.drawImage(
            enemyLeft[this.attackType].sprite,
            enemyLeft[this.attackType].position[position].x - 10,
            enemyLeft[this.attackType].position[position].y - 10,
            48,
            48,
            this.startPoint.x,
            this.startPoint.y,
            this.w,
            this.h
          );
        } else if (this.direction == "r") {
          ctx.drawImage(
            enemyRight[this.attackType].sprite,
            enemyRight[this.attackType].position[position].x - 10,
            enemyRight[this.attackType].position[position].y - 10,
            48,
            48,
            this.startPoint.x,
            this.startPoint.y,
            this.w,
            this.h
          );
        } else if (this.direction == "d") {
          ctx.drawImage(
            enemyFront[this.attackType].sprite,
            enemyFront[this.attackType].position[position].x - 10,
            enemyFront[this.attackType].position[position].y - 10,
            48,
            48,
            this.startPoint.x,
            this.startPoint.y,
            this.w,
            this.h
          );
        } else if (this.direction == "u") {
          ctx.drawImage(
            enemyBack[this.attackType].sprite,
            enemyBack[this.attackType].position[position].x - 10,
            enemyBack[this.attackType].position[position].y - 10,
            48,
            48,
            this.startPoint.x,
            this.startPoint.y,
            this.w,
            this.h
          );
        }
      } else if (!this.isAttacking) {
        const staggerFrame = 5;
        let position =
          Math.floor(this.spritePos / staggerFrame) % this.images_right.length;
        let img = this.images_right[position];
        if (this.direction == "r") {
          img = this.images_right[position];
        } else if (this.direction == "l") {
          img = this.images_left[position];
        } else if (this.direction == "u") {
          img = this.images_back[position];
        } else if (this.direction == "d") {
          img = this.images_front[position];
        }
        if (
          this.startPoint.x > -100 &&
          this.startPoint.x < stateVariables.windowWidth &&
          this.startPoint.y > -100 &&
          this.startPoint.y < stateVariables.windowHeight
        ) {
          ctx.drawImage(
            img,
            this.startPoint.x,
            this.startPoint.y,
            this.w,
            this.h
          );
        }
      }

      this.spritePos++;

      ctx.fillStyle = "rgba(20, 20, 20, 0.6)";
      ctx.beginPath();
      const randomWidth = this.w / 3;
      const randomHeight = this.h / 10;
      ctx.ellipse(
        this.startPoint.x + this.w / 2,
        this.startPoint.y + this.h - 10,
        randomWidth,
        randomHeight,
        0,
        0,
        2 * Math.PI
      );
      ctx.fill();
    } else {
      const staggerFrame = 5;
      let position = Math.floor(this.spritePos / staggerFrame) % 8;

      if (this.direction == "l") {
        ctx.drawImage(
          enemyLeft.enemyDead.sprite,
          enemyLeft.enemyDead.position[position].x - 10,
          enemyLeft.enemyDead.position[position].y - 10,
          48,
          48,
          this.startPoint.x,
          this.startPoint.y,
          this.w,
          this.h
        );
      } else if (this.direction == "r") {
        ctx.drawImage(
          enemyRight.enemyDead.sprite,
          enemyRight.enemyDead.position[position].x - 10,
          enemyRight.enemyDead.position[position].y - 10,
          48,
          48,
          this.startPoint.x,
          this.startPoint.y,
          this.w,
          this.h
        );
      } else if (this.direction == "d") {
        ctx.drawImage(
          enemyFront.enemyDead.sprite,
          enemyFront.enemyDead.position[position].x - 10,
          enemyFront.enemyDead.position[position].y - 10,
          48,
          48,
          this.startPoint.x,
          this.startPoint.y,
          this.w,
          this.h
        );
      } else if (this.direction == "u") {
        ctx.drawImage(
          enemyBack.enemyDead.sprite,
          enemyBack.enemyDead.position[position].x - 10,
          enemyBack.enemyDead.position[position].y - 10,
          48,
          48,
          this.startPoint.x,
          this.startPoint.y,
          this.w,
          this.h
        );
      }
      this.spritePos++;
      if (this.spritePos % 40 == 0) this.isAlive = false;
    }
  }

  move() {
    if (this.health > 0) {
      let distanceToPlayer = distance(
        stateVariables.player.startPoint,
        this.startPoint
      );

      if (distanceToPlayer < ENEMY_REACTION_DISTANCE || stateVariables.boss.hasRoar) {
        let dx = this.finalX - this.startPoint.x;
        let dy = this.finalY - this.startPoint.y;
        let distanceToTarget = distance(
          new Point(this.finalX, this.finalY),
          this.startPoint
        );

        if (distanceToPlayer > 50) {
          if (distanceToTarget > this.movement_speed) {
            let ratio = this.movement_speed / distanceToTarget;
            let x_move = ratio * dx;
            let y_move = ratio * dy;

            if (
              stateVariables.bgImage.checkCollision(
                stateVariables.bgImage.startPoint.x -
                  this.startPoint.x +
                  this.finalX,
                stateVariables.bgImage.startPoint.y -
                  this.startPoint.y +
                  this.finalY +
                  this.movement_speed
              )
            ) {
              this.startPoint.x = x_move + this.startPoint.x;
            } else if (
              stateVariables.bgImage.checkCollision(
                stateVariables.bgImage.startPoint.x -
                  this.startPoint.x +
                  this.finalX +
                  this.movement_speed,
                stateVariables.bgImage.startPoint.y -
                  this.startPoint.y +
                  this.finalY
              )
            ) {
              this.startPoint.y = y_move + this.startPoint.y;
            } else {
              this.startPoint.x = x_move + this.startPoint.x;
              this.startPoint.y = y_move + this.startPoint.y;
            }

            this.isAttacking = false;
          }
        } else {
          let angle = Math.atan2(
            this.startPoint.y - stateVariables.player.startPoint.y,
            this.startPoint.x - stateVariables.player.startPoint.x
          );

          let targetX =
            stateVariables.player.startPoint.x + Math.cos(angle) * 40;
          let targetY =
            stateVariables.player.startPoint.y + Math.sin(angle) * 40;

          let smoothingFactor = 0.05;
          this.startPoint.x += (targetX - this.startPoint.x) * smoothingFactor;
          this.startPoint.y += (targetY - this.startPoint.y) * smoothingFactor;
          this.isAttacking = true;
          this.attack();
        }
      }
    }
  }

  attack() {
    if (stateVariables.player.health > 0) {
      playSound(voice.zombiegrunt, 0.001);
      if (!this.damageTimeout) {
        this.damageTimeout = setTimeout(() => {
          stateVariables.player.health -= this.damage;
          playSound(voice.ithurts, 0.01);
          this.damageTimeout = null;
        }, 500);
      }
    } else {
      clearTimeout(this.damageTimeout!);
    }
  }

  //method to prevent them from overlapping
  separate() {
    let moveX = 0;
    let moveY = 0;
    stateVariables.enemiesArray.forEach((other) => {
      if (this != other) {
        let dx = this.startPoint.x - other.startPoint.x;
        let dy = this.startPoint.y - other.startPoint.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 40 && distance > 0) {
          let force = ((40 - distance) / 40) * 20;
          moveX += (dx / distance) * force;
          moveY += (dy / distance) * force;
        }
      }
    });

    this.startPoint.x += moveX;
    this.startPoint.y += moveY;
  }
}
