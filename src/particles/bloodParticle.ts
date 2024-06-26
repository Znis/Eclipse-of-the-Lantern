import { freqLoadingAssets, stateVariables } from "../stateVariables";
import { Point } from "../shapes/point";
import { BLOOD_PARTICLE_TIMEOUT } from "../constants";

//blood particle sprite animation when goblin is hurt
export class BloodParticle {
  startPoint: Point;
  state: number;
  blood_img: HTMLImageElement[];
  show: boolean;
  constructor(x: number, y: number) {
    this.startPoint = new Point(x, y);
    this.state = 0;
    this.show = true;
    this.blood_img = freqLoadingAssets.bloodParticleImages;
  }

  //method to change frame
  updateState() {
    for (let i = 0; i < this.blood_img.length - 1; i++) {
      setTimeout(() => {
        this.state++;
      }, 90 * i);
    }
  }

  showAnimation(ctx: CanvasRenderingContext2D = stateVariables.ctx) {
    if (this.show) {
      ctx.drawImage(
        this.blood_img[this.state],
        this.startPoint.x + stateVariables.bgImage.startPoint.x,
        this.startPoint.y + stateVariables.bgImage.startPoint.y
      );
    }
    //disappears in 5 second
    const bloodShowTimeout = setTimeout(() => {
      this.show = false;
      clearTimeout(bloodShowTimeout);
    }, BLOOD_PARTICLE_TIMEOUT);
  }
}
