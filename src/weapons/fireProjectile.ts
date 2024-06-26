import { Boss } from "../boss";
import { Character } from "../character";
import { Enemy } from "../enemy";
import { Point } from "../shapes/point";
import { playSound } from "../soundPlayingFunction";
import { voice } from "../sounds";
import { stateVariables } from "../stateVariables";
import { distance } from "../utils/util";
export class FireProjectile {
  startPoint: Point;
  initialX: number;
  initialY: number;
  r: number;
  endPoint: Point;
  movement_speed: number;
  dir: string;
  toDelete: boolean;
  images: HTMLImageElement[];
  spritePos: number;
  owner: string;
  dirX: number;
  dirY: number;
  dist: number;
  angle: number;

  constructor(startPoint: Point, dir: string, endPoint: Point, owner: string) {
    this.startPoint = new Point(startPoint.x - 30, startPoint.y + 30);

    this.dir = dir;
    this.initialX = this.startPoint.x;
    this.initialY = this.startPoint.y;

    this.r = 5; 

    this.endPoint = new Point(endPoint.x * 1.05, endPoint.y * 1.05);

    this.movement_speed = 10;
    this.toDelete = false;
    this.images = [];
    this.spritePos = 0;
    this.initialiseImages();
    this.owner = owner;
    this.dirX = 0;
    this.dirY = 0;
    this.dist = 0;
    this.angle = 0;
    this.calculateTrajectory();
  }

  initialiseImages() {
    this.images = stateVariables.flameImages;
  }
  show(ctx: CanvasRenderingContext2D = stateVariables.ctx) {
    const staggerFrame = 5;
    let position = Math.floor(this.spritePos / staggerFrame) % 30;

    ctx.save();

    ctx.translate(this.startPoint.x, this.startPoint.y); //rotate the flame sprite as per direction
    ctx.rotate(this.angle);
    ctx.drawImage(this.images[position], -100, -100, 200, 200);
    ctx.restore();
    this.spritePos++;
  }

  hits(enemy: Enemy | Boss | Character) {
    let dist = distance(
      new Point(this.startPoint.x - 100, this.startPoint.y - 130),
      new Point(enemy.startPoint.x - 50, enemy.startPoint.y - 50)
    );
    if (this.owner == "player") playSound(voice.howsharp, 1);
    if (dist < this.r + enemy.r) {
      return true;
    } else {
      return false;
    }
  }

  evaporate() {
    this.toDelete = true;
  }

  calculateTrajectory() {
    let dx = this.endPoint.x - this.startPoint.x;
    let dy = this.endPoint.y - this.startPoint.y;

    this.angle = Math.atan2(dy, dx);
    this.dirX = Math.cos(this.angle);
    this.dirY = Math.sin(this.angle);
  }
  move() {
    this.startPoint.x = this.movement_speed * this.dirX + this.startPoint.x;
    this.startPoint.y = this.movement_speed * this.dirY + this.startPoint.y;

    if (
      this.startPoint.x < 0 ||
      this.startPoint.x > stateVariables.windowWidth ||
      this.startPoint.y < 0 ||
      this.startPoint.y > stateVariables.windowHeight
    ) {
      this.evaporate(); //delete the projectile
    }
  }
}
