import { BOSS_ATTACK_DAMAGE, BOSS_DEFAULT_HEALTH, BOSS_HEIGHT_AND_WIDTH, BOSS_MOVEMENT_SPEED, GOBLIN_SPAWN_TIME } from "./constants";
import { generateEnemy, generateRandomPickupItems } from "./functions";
import { Point } from "./shapes/point";
import { playSound } from "./soundPlayingFunction";
import { voice } from "./sounds";
import { enemyBack, enemyFront, enemyLeft, enemyRight } from "./sprites/boss";
import { GameState, freqLoadingAssets, stateVariables } from "./stateVariables";
import { calculateAngle, distance, getRandomInt } from "./utils/util";
import { FireProjectile } from "./weapons/fireProjectile";

export class Boss {
  startPoint: Point;
  images_back: HTMLImageElement[];
  images_front: HTMLImageElement[];
  images_left: HTMLImageElement[];
  images_right: HTMLImageElement[];
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
  abilityTimeout: number | null;
  isAttacking: boolean;
  spritePos: number;
  attackType: string;
  isAlive: boolean;
  hasWakeUp: boolean;
  spawnEnemyInterval: number | null;
  hasRoar: boolean;

  constructor() {
    let posX;
    let posY;
    if (Math.random() < 0.5) { //spawn randomly at edges of the map
      posX = getRandomInt(
        stateVariables.bgImage.startPoint.x,
        stateVariables.bgImage.startPoint.x + 100
      );
      posY = getRandomInt(
        stateVariables.bgImage.startPoint.y,
        stateVariables.bgImage.startPoint.y + stateVariables.bgImage.h
      );
    } else {
      posX = getRandomInt(
        stateVariables.bgImage.startPoint.x,
        stateVariables.bgImage.startPoint.x + stateVariables.bgImage.w
      );
      posY = getRandomInt(
        stateVariables.bgImage.startPoint.y,
        stateVariables.bgImage.startPoint.y + 100
      );
    }
    this.startPoint = new Point(posX, posY);

    this.direction = "d";
    this.h = BOSS_HEIGHT_AND_WIDTH;
    this.w = this.h;
    this.r = 80;

    this.default_damage = BOSS_ATTACK_DAMAGE;
    this.damage = this.default_damage;

    this.images_back = freqLoadingAssets.bossImages.back;
    this.images_front = freqLoadingAssets.bossImages.front;
    this.images_left = freqLoadingAssets.bossImages.left;
    this.images_right = freqLoadingAssets.bossImages.right;

    this.time = 0;

    this.damageTimeout = null;
    this.abilityTimeout = null;

    this.default_health = BOSS_DEFAULT_HEALTH;
    this.health = this.default_health;

    this.default_movement_speed = BOSS_MOVEMENT_SPEED;
    this.movement_speed = this.default_movement_speed;

    this.finalX = stateVariables.player.startPoint.x;

    this.finalY = stateVariables.player.startPoint.y;
    this.isAttacking = false;
    this.spritePos = 0;
    this.attackType = `attackType1`;
    this.isAlive = true;
    this.hasWakeUp = false;
    this.spawnEnemyInterval = null;
    this.hasRoar = false;
  }

  //method to increase boss attributes outside the lantern light
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
    if (
      Math.floor(this.health) > 0 &&
      stateVariables.bgImage.name != "house.png"
    ) {
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

        ctx.drawImage(
          img,
          this.startPoint.x,
          this.startPoint.y,
          this.w,
          this.h
        );
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
    } else if (this.isAlive) {
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

      if (this.health < 20) { //boss roar if health is less than 20
        this.hasRoar = true;
        playSound(voice.bossroar, 1);
        setTimeout(() => {
          playSound(voice.bosscallingallgoblins, 1);
        }, 3000);
      }

      if (distanceToPlayer < 400 && !this.hasWakeUp) { //boss wakes up if player goes near it 
        this.hasWakeUp = true;
        playSound(voice.bosswakeup, 1);

        setTimeout(() => {
          playSound(voice.bosshaswakenup, 1);
        }, 3000);
      }

      if (this.hasWakeUp) {
        let dx = this.finalX - this.startPoint.x;
        let dy = this.finalY - this.startPoint.y;
        let distanceToTarget = distance(
          new Point(this.finalX, this.finalY),
          this.startPoint
        );

        if (distanceToTarget > this.movement_speed) {
          let ratio = this.movement_speed / distanceToTarget;
          let x_move = ratio * dx;
          let y_move = ratio * dy;

          if (
            !stateVariables.bgImage.checkCollision(
              this.startPoint.x + x_move,
              this.startPoint.y
            )
          ) {
            this.startPoint.x += x_move;
          }

          if (
            !stateVariables.bgImage.checkCollision(
              this.startPoint.x,
              this.startPoint.y + y_move
            )
          ) {
            this.startPoint.y += y_move;
          }

          this.isAttacking = false;
          if (stateVariables.player.health > 0) {
            if (!this.abilityTimeout) {
              this.abilityTimeout = setTimeout(() => {
                this.useAbility();
                this.abilityTimeout = null;
              }, getRandomInt(2, 4) * 1000); //boss fires flames at random interval between 2 and 4 seconds
            }
          } else {
            clearTimeout(this.abilityTimeout!);
          }
        } else {
          this.isAttacking = true;
          this.attack();
        }
      }
    }
  }

  spawnEnemy() {
    if (!this.hasWakeUp && stateVariables.enemiesArray.length < 50) {
      if (!this.spawnEnemyInterval) {
        this.spawnEnemyInterval = setInterval(() => {
          if (stateVariables.gameState != GameState.paused) {
            generateEnemy(1);
            generateRandomPickupItems(1);
          }
        }, GOBLIN_SPAWN_TIME); //spawns goblin and an item
      }
    } else {
      clearInterval(this.spawnEnemyInterval!);
      this.spawnEnemyInterval = null;
    }
  }

  attack() {
    if (stateVariables.player.health > 0) {
      if (!this.damageTimeout) {
        this.damageTimeout = setTimeout(() => {
          stateVariables.player.health -= this.damage;
          playSound(voice.ithurts, 0.01);
          this.damageTimeout = null;
        }, 400);
      }
    } else {
      clearTimeout(this.damageTimeout!);
    }
  }

  useAbility() {
    const projectile = new FireProjectile(
      new Point(this.startPoint.x + this.w / 2, this.startPoint.y + 50),
      this.direction,
      stateVariables.player.startPoint,
      "boss"
    );
    stateVariables.fireProjectileArray.push(projectile);
  }
}
