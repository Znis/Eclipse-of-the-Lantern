import { Point } from "../shapes/point";
import { stateVariables } from "../stateVariables";

//rain particles are basically the lines of random length moving from top left to bottom right
export class RainParticle {
  slope: number;
  startPoint: Point;
  c: number;
  constructor() {
    this.slope = 1;
    this.startPoint = new Point(
      Math.floor(Math.random() * 1920),
      Math.random() * 1000
    );
    this.c = this.startPoint.y - this.startPoint.x * this.slope;
  }

  show(ctx: CanvasRenderingContext2D = stateVariables.ctx) {
    let randomLength = Math.random() * 100;
    ctx.strokeStyle = "rgb(200, 200, 200)";
    ctx.beginPath();
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    ctx.lineTo(
      this.generateX(this.startPoint.y + randomLength),
      this.startPoint.y + randomLength
    );
    ctx.stroke();
  }

  move() {
    this.startPoint.y = this.startPoint.y + Math.random() * 30;
    this.startPoint.x = this.generateX(this.startPoint.y);
  }

  generateX(y: number) {
    return (y - this.c) / this.slope;
  }
}
