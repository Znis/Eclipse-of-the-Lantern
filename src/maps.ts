import { Point } from "./shapes/point";
import { mapData } from "./mapData";
import { stateVariables } from "./stateVariables";
import { upCounter } from "./functions";
export class Maps {
  startPoint: Point;
  w: number;
  h: number;
  img: HTMLImageElement;
  depthImg: HTMLImageElement;
  name: string;
  mapData: { [key: string]: any };
  otherMaps: HTMLImageElement[];
  otherMapsDepth: HTMLImageElement[];
  constructor(imgName: string) {
    this.startPoint = new Point(
      -2220 + stateVariables.adjustDeviceColliderX,
      -2220 + stateVariables.adjustDeviceColliderY
    );
    this.w = 4800;
    this.h = 4080;

    this.name = imgName as string;
    this.img = new Image();
    this.depthImg = new Image();

    this.otherMaps = [];
    this.otherMapsDepth = [];

    this.mapData = mapData;
  }

  initialiseImages() {
    this.img.src = "./assets/maps/" + this.name;
    this.img.onload = upCounter;
    this.otherMaps = [this.img];

    this.depthImg.src = "./assets/maps/" + this.getDepthImgName();
    this.depthImg.onload = upCounter;

    let temp = new Image();
    temp.src = `assets/maps/house.png`;
    temp.onload = upCounter;
    this.otherMaps = [temp];

    temp = new Image();
    temp.src = `assets/maps/house-depth.png`;
    temp.onload = upCounter;
    this.otherMapsDepth = [temp];

    this.otherMaps.push(this.img);
    this.otherMapsDepth.push(this.depthImg);
  }

  getDepthImgName() {
    let temp: string[] = this.name.split(".");
    let depth_image_name: string;
    temp.splice(1, 0, "-depth.");
    depth_image_name = temp.join("");
    return depth_image_name;
  }

  show(ctx: CanvasRenderingContext2D = stateVariables.ctx) {
    ctx.clearRect(
      0,
      0,
      stateVariables.windowWidth,
      stateVariables.windowHeight
    );
    ctx.fillStyle = "#181425";
    ctx.fillRect(0, 0, stateVariables.windowWidth, stateVariables.windowHeight);

    this.checkEvents();

    if (
      this.w == 0 &&
      this.h == 0 &&
      this.mapData[this.name].size == "native"
    ) {
      ctx.drawImage(this.img, this.startPoint.x, this.startPoint.y);
    } else {
      const size = this.mapData[this.name].size;
      if (size == "native") {
        ctx.drawImage(this.img, this.startPoint.x, this.startPoint.y);
      } else {
        ctx.drawImage(
          this.img,
          this.startPoint.x,
          this.startPoint.y,
          size.width,
          size.height
        );
      }
    }
  }

  showDepth(ctx: CanvasRenderingContext2D = stateVariables.ctx) {
    if (this.mapData[this.name].size == "native") {
      ctx.drawImage(this.depthImg, this.startPoint.x, this.startPoint.y);
    } else {
      ctx.drawImage(
        this.depthImg,
        this.startPoint.x,
        this.startPoint.y,
        this.mapData[this.name].size.width,
        this.mapData[this.name].size.height
      );
    }
  }

  checkEvents(x: number = this.startPoint.x, y: number = this.startPoint.y) {
    this.mapData[this.name].events["doors"].map((event: any) => {
      if (
        x - stateVariables.adjustDeviceColliderX < event.x &&
        x - stateVariables.adjustDeviceColliderX > event.w &&
        y - stateVariables.adjustDeviceColliderY < event.y &&
        y - stateVariables.adjustDeviceColliderY > event.h
      ) {
        this.startPoint.x = event.next_cor.x;
        this.startPoint.y = event.next_cor.y;
        this.name = event.map;
        this.img = this.otherMaps[event.other_pos];
        this.depthImg = this.otherMapsDepth[event.other_pos];
      }
    });
  }

  checkCollision(x: number, y: number) {
    let has_collided = false;
    let collidersLength = this.mapData[this.name].colliders.length;
    for (let i = 0; i < collidersLength; i++) {
      let collider = this.mapData[this.name].colliders[i];
      if (!stateVariables.debugCollider) {
        if (
          x - stateVariables.adjustDeviceColliderX < collider.x &&
          x - stateVariables.adjustDeviceColliderX > collider.w &&
          y - stateVariables.adjustDeviceColliderY < collider.y &&
          y - stateVariables.adjustDeviceColliderY > collider.h
        ) {
          has_collided = true;
          break;
        }
      }
    }

    return has_collided;
  }
}
