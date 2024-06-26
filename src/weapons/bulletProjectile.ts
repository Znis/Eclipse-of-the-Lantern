import { Boss } from "../boss";
import { Enemy } from "../enemy";
import { drawEllipse } from "../functions";
import { Point } from "../shapes/point";
import { stateVariables } from "../stateVariables";
import { distance } from "../utils/util";
export class BulletProjectile {
  startPoint: Point;
  initialX: number;
  initialY: number;
  r: number;
  endPoint: Point;
  movement_speed: number;
  dir: string;
  toDelete: boolean;
  constructor(startPoint: Point, dir: string, endPoint: Point) {
    this.startPoint = new Point(startPoint.x - 30, startPoint.y + 30);
    this.dir = dir;
    this.initialX = this.startPoint.x;
    this.initialY = this.startPoint.y;

    this.r = 5; //bullet radius

    this.endPoint = new Point(endPoint.x * 1.05, endPoint.y * 1.05);

    this.movement_speed = 20;
    this.toDelete = false;
  }

  show(ctx: CanvasRenderingContext2D = stateVariables.ctx) {
    ctx.strokeStyle = "none";

    ctx.fillStyle = "rgb(255, 255, 100)";
    drawEllipse(
      ctx,
      this.startPoint.x,
      this.startPoint.y,
      this.r * 1.5,
      this.r * 1.5
    ); //bullet

    ctx.fillStyle = "rgba(255, 170, 51, 0.016)";
    for (let i = 0; i < this.r * 4; i++) {
      drawEllipse(ctx, this.initialX - 10, this.initialY, i * 3, i * 3); //bright yellow glowing effect
    }

    ctx.save();

    ctx.translate(this.startPoint.x, this.startPoint.y);
    ctx.rotate(
      Math.atan2(
        this.startPoint.y - this.endPoint.y,
        this.startPoint.x - this.endPoint.x
      )
    );

    for (let i = 0; i < this.r * 4; i++) {
      drawEllipse(ctx, 0, 0, i * 5, i); //bright yellow glowing effect
    }

    ctx.restore();
  }

  hits(enemy: Enemy | Boss) {
    let dist = distance(
      new Point(this.startPoint.x - 100, this.startPoint.y - 130),
      new Point(enemy.startPoint.x - 50, enemy.startPoint.y - 50)
    );
    if (dist < this.r + enemy.r) {
      return true;
    } else {
      return false;
    }
  }

  evaporate() {
    this.toDelete = true;
  }

  move() {
    let dx = this.endPoint.x - this.startPoint.x;
    let dy = this.endPoint.y - this.startPoint.y;
    let dist = distance(this.endPoint, this.startPoint);
    if (dist > this.movement_speed) {
      let ratio = this.movement_speed / dist;
      let x_move = ratio * dx;
      let y_move = ratio * dy;
      this.startPoint.x = x_move + this.startPoint.x;
      this.startPoint.y = y_move + this.startPoint.y;
    } else {
      this.startPoint.x = this.endPoint.x;
      this.startPoint.y = this.endPoint.y;

      this.evaporate();
    }
  }
}
