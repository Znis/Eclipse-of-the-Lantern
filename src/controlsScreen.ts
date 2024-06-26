import { getMouseCoords, upCounter } from "./functions";
import { canvas } from "./main";
import { GameState, stateVariables } from "./stateVariables";

export class ControlsScreen {
  h: number;
  w: number;
  borderRadius: number;
  color: string;
  padding: number;
  img: HTMLImageElement;
  isHoveringCloseButton: boolean;
  constructor() {
    this.h = canvas.height * 0.9;
    this.w = canvas.width * 0.8;
    this.borderRadius = 20;
    this.color = "#FFFAFA";
    this.padding = 20;
    this.img = new Image();
    this.img.src = "./assets/controls.png";
    this.img.onload = upCounter;
    this.isHoveringCloseButton = false;
  }

  drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  }

  drawCloseButton(
    ctx: CanvasRenderingContext2D,
    color: string,
    closeButtonX: number,
    closeButtonY: number,
    closeButtonSize: number
  ) {
    ctx.beginPath();
    ctx.arc(
      closeButtonX + closeButtonSize / 2,
      closeButtonY + closeButtonSize / 2,
      closeButtonSize / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 20px Outfit";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText("X", closeButtonX + 7, closeButtonY + 23);
  }

  show(ctx: CanvasRenderingContext2D = stateVariables.ctx) {
    const rectX = (canvas.width - this.w) / 2;
    const rectY = (canvas.height - this.h) / 2;

    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = this.color;

    this.drawRoundedRect(ctx, rectX, rectY, this.w, this.h, this.borderRadius);

    const imgWidth = this.w - 2 * this.padding;
    const imgHeight = this.h - 2 * this.padding;
    const imgX = rectX + this.padding;
    const imgY = rectY + this.padding;

    ctx.drawImage(this.img, imgX, imgY, imgWidth, imgHeight);

    const closeButtonSize = 30;
    const closeButtonX = rectX + this.w - closeButtonSize - this.padding;
    const closeButtonY = rectY + this.padding;
    const color = this.isHoveringCloseButton ? "red" : "#222222";

    this.drawCloseButton(
      ctx,
      color,
      closeButtonX,
      closeButtonY,
      closeButtonSize
    );

    canvas.addEventListener("mousemove", (e) => {
      const mouseCoords = getMouseCoords(e);
      const mouseX = mouseCoords.x;
      const mouseY = mouseCoords.y;

      this.isHoveringCloseButton =
        mouseX > closeButtonX &&
        mouseX < closeButtonX + closeButtonSize &&
        mouseY > closeButtonY &&
        mouseY < closeButtonY + closeButtonSize;
    });

    canvas.addEventListener("click", () => {
      if (this.isHoveringCloseButton) {
        if (stateVariables.tempGameState == GameState.loadingScreen) {
          stateVariables.gameState = GameState.menuScreen;
          stateVariables.tempGameState = GameState.menuScreen;
        } else {
          stateVariables.gameState = stateVariables.tempGameState;
        }
      }
    });
  }
}
