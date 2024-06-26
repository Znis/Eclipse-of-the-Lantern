import {
  characters,
  gameOptions,
  inventory,
  stateVariables,
} from "./stateVariables";
import { Point } from "./shapes/point";
import { FireProjectile } from "./weapons/fireProjectile";
import { playSound } from "./soundPlayingFunction";
import { voice } from "./sounds";
import { LIGHT_OF_BLESSINGS_DURATION, PLAYER_HEALTH, PLAYER_MOVEMENT_SPEED, PLAYER_STAMINA } from "./constants";

export class Character {
  charName: string;
  startPoint: Point;
  movement_speed: number;
  default_speed: number;
  dirX: number;
  dirY: number;
  direction: string;
  images_back: HTMLImageElement[];
  images_front: HTMLImageElement[];
  images_right: HTMLImageElement[];
  images_left: HTMLImageElement[];
  health: number;
  stamina: number;
  score: number;
  time: number;
  frameToShow: number;
  isBlowingLantern: boolean;
  isUsingMedkit: boolean;
  frameTime: number;
  currWeapon: string;
  isAttacking: boolean;
  isWalking: boolean;
  isRunning: boolean;
  abilityMode: boolean;
  r: number;
  constructor() {
    this.charName = gameOptions.character;
    this.startPoint = new Point(0, 0);
    this.movement_speed = PLAYER_MOVEMENT_SPEED;
    this.default_speed = this.movement_speed;
    this.dirX = 0;
    this.dirY = 0;
    this.direction = "r"; //'l' is left 'r' is right 'u' and 'd' is up and down

    this.images_back = [];
    this.images_front = [];
    this.images_left = [];
    this.images_right = [];
    this.health = PLAYER_HEALTH;
    this.stamina = PLAYER_STAMINA;
    this.score = 0;
    this.time = 0;
    this.frameToShow = 0;
    this.isBlowingLantern = false;
    this.isUsingMedkit = false;
    this.frameTime = 4;
    this.currWeapon = "axe";
    this.isAttacking = false;
    this.isWalking = false;
    this.isRunning = false;
    this.abilityMode = false;
    this.r = 50;
  }

  changeCharacter(charName: string) {
    this.charName = charName;
    this.images_back = characters[charName].back;
    this.images_front = characters[charName].front;
    this.images_left = characters[charName].left;
    this.images_right = characters[charName].right;
  }

  increaseSpeed() {
    if (this.stamina > 1) {
      this.movement_speed = 2 * this.default_speed;
      this.isRunning = true;
      voice.run.audio.playbackRate = 2;
      playSound(voice.run, 1);

      this.drainStamina();
    } else {
      this.movement_speed = this.default_speed;
      this.isRunning = false;
      playSound(voice.iamtired, 0.01);
    }
  }

  drainStamina() {
    if (this.stamina > 0) {
      this.stamina -= 1;
    } else {
      this.stamina = 0;
    }
  }

  change_frames() {
    if (this.time > this.frameTime) {
      this.frameToShow += 1;

      if (this.frameToShow == this.images_back.length) {
        this.frameToShow = 0;
      }

      this.time = 0;
    }
    this.time++;
  }

  show(ctx: CanvasRenderingContext2D = stateVariables.ctx) {
    let img = this.images_right[this.frameToShow];
    if (this.direction == "r") {
      img = this.images_right[this.frameToShow];
    } else if (this.direction == "l") {
      img = this.images_left[this.frameToShow];
    } else if (this.direction == "u") {
      img = this.images_back[this.frameToShow];
    } else if (this.direction == "d") {
      img = this.images_front[this.frameToShow];
    }

    if (this.health > 0) {
      ctx.fillStyle = "rgba(20, 20, 20,0.55)";
      ctx.beginPath();
      ctx.ellipse(
        this.startPoint.x + 20,
        this.startPoint.y + 70,
        14,
        7,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.closePath();

      if (this.direction == "d")
        ctx.drawImage(img, this.startPoint.x, this.startPoint.y);

      if (this.direction == "u") stateVariables.lantern.show();

      if (this.currWeapon == "axe")
        stateVariables.axe.show(stateVariables.ctx, this.isAttacking);

      if (this.currWeapon == "gun")
        stateVariables.gun.show(stateVariables.ctx, this.isAttacking);

      if (this.direction != "d") {
        ctx.drawImage(img, this.startPoint.x, this.startPoint.y);
      }
      if (this.direction != "u") stateVariables.lantern.show();
    }
  }

  move() {
    if (!this.isBlowingLantern && !this.isUsingMedkit) {
      if (this.health > 0 && (this.dirX != 0 || this.dirY != 0)) {
        if (!this.isRunning) playSound(voice.walk, 1);
        if (
          !stateVariables.bgImage.checkCollision(
            stateVariables.bgImage.startPoint.x +
              this.movement_speed * this.dirX,
            stateVariables.bgImage.startPoint.y +
              this.movement_speed * this.dirY
          )
        ) {
          if (
            !(
              stateVariables.bgImage.startPoint.x +
                stateVariables.adjustDeviceColliderX -
                stateVariables.windowWidth / 2 <
              0
            )
          ) {
            if (this.dirX > 0) this.dirX = 0;
            playSound(voice.cantgobeyondthis, 0.01);
          }
          if (
            !(
              stateVariables.bgImage.startPoint.y +
                stateVariables.adjustDeviceColliderY -
                stateVariables.windowHeight / 2 >
              -stateVariables.bgImage.h
            )
          ) {
            if (this.dirY < 0) this.dirY = 0;
            playSound(voice.cantgobeyondthis, 0.01);
          }
          if (
            !(
              stateVariables.bgImage.startPoint.y +
                stateVariables.adjustDeviceColliderY -
                stateVariables.windowHeight / 2 <
              0
            )
          ) {
            if (this.dirY > 0) this.dirY = 0;
            playSound(voice.cantgobeyondthis, 0.01);
          }
          if (
            !(
              stateVariables.bgImage.startPoint.x +
                stateVariables.adjustDeviceColliderX -
                stateVariables.windowWidth / 2 >
              -stateVariables.bgImage.w
            )
          ) {
            if (this.dirX < 0) this.dirX = 0;
            playSound(voice.cantgobeyondthis, 0.01);
          }

          stateVariables.enemiesArray.forEach((enemy) => {
            enemy.startPoint.x += this.movement_speed * this.dirX;
            enemy.startPoint.y += this.movement_speed * this.dirY;
          });
          stateVariables.pickupItemsArray.forEach((pickupItem) => {
            pickupItem.startPoint.x += this.movement_speed * this.dirX;
            pickupItem.startPoint.y += this.movement_speed * this.dirY;
          });
          stateVariables.fireProjectileArray.forEach((fireProjectile) => {
            if (fireProjectile.owner == "boss") {
              fireProjectile.startPoint.x += this.movement_speed * this.dirX;
              fireProjectile.startPoint.y += this.movement_speed * this.dirY;
            }
          });
          stateVariables.boss.startPoint.x += this.movement_speed * this.dirX;
          stateVariables.boss.startPoint.y += this.movement_speed * this.dirY;
          stateVariables.bgImage.startPoint.x +=
            this.movement_speed * this.dirX;
          stateVariables.bgImage.startPoint.y +=
            this.movement_speed * this.dirY;
          this.isWalking = true;
          this.change_frames();
        } else {
          playSound(voice.collidedontosomething, 0.01);
        }
      }
    }
  }

  increaseHealth() {
    stateVariables.player.health += 20;
    if (stateVariables.player.health > 100) {
      stateVariables.player.health = 100;
    }
    inventory.medKit--;
  }

  useAbility(ability: string) {
    if (ability == "light") {
      if (stateVariables.inventory.abilities[0].cooldown == 0) {
        playSound(voice.lightofblessings, 1);
        playSound(voice.lightsound, 1);
        stateVariables.lantern.setLuminosity();
        stateVariables.inventory.resetAbility(ability);
        const reset = setTimeout(() => {
          stateVariables.lantern.resetLuminosity();
          clearTimeout(reset);
        }, LIGHT_OF_BLESSINGS_DURATION);
      } else {
        stateVariables.inventory.displayMessage(
          stateVariables.ctx,
          "",
          "Ability on Cooldown!"
        );
        playSound(voice.notready, 1);
      }
    } else if (ability == "flame") {
      if (stateVariables.inventory.abilities[1].cooldown == 0) {
        playSound(voice.breathofdragon, 1);
        playSound(voice.flamesound, 1);
        stateVariables.inventory.resetAbility(ability);
        const projectile = new FireProjectile(
          new Point(
            stateVariables.player.startPoint.x + 60,
            stateVariables.player.startPoint.y + 20
          ),
          stateVariables.player.direction,
          new Point(stateVariables.mouseCoords.x, stateVariables.mouseCoords.y),
          "player"
        );
        stateVariables.fireProjectileArray.push(projectile);
      }
    }
  }
}
