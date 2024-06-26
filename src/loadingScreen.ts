import { loadFonts } from "./fonts";
import { canvas } from "./main";
import { GameState, stateVariables } from "./stateVariables";

export class LoadingScreen {
  h: number;
  w: number;
  borderRadius: number;
  color: string;
  padding: number;
  loadProgress: number;
  constructor() {
    this.h = canvas.height * 0.9;
    this.w = canvas.width * 0.8;
    this.borderRadius = 20;
    this.color = "#FFFAFA";
    this.padding = 20;
    this.loadProgress = 0;

    this.initFonts();
  }

  async initFonts() {
    await loadFonts();
  }

  show(ctx: CanvasRenderingContext2D = stateVariables.ctx) {
    const rectX = (canvas.width - this.w) / 2;
    const rectY = (canvas.height - this.h) / 2;

    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = this.color;

    this.drawRoundedRect(ctx, rectX, rectY, this.w, this.h, this.borderRadius);

    const loadingBarWidth = this.w * 0.6;
    const loadingBarHeight = 20;
    const loadingBarX = rectX + (this.w - loadingBarWidth) / 2;
    const loadingBarY = rectY + (this.h - loadingBarHeight) / 2;

    ctx.fillStyle = "#CCCCCC";
    ctx.fillRect(loadingBarX, loadingBarY, loadingBarWidth, loadingBarHeight);

    const loadingText = "Loading...";
    const loadingTextX =
      rectX + (this.w - ctx.measureText(loadingText).width) / 2;
    const loadingTextY = loadingBarY + loadingBarHeight + 80;
    ctx.fillStyle = "#000000";
    ctx.font = "20px Outfit";

    this.loadProgress = stateVariables.assetsLoadCount / 180;

    ctx.fillStyle = "#00FF00";
    ctx.fillRect(
      loadingBarX,
      loadingBarY,
      this.loadProgress * loadingBarWidth,
      loadingBarHeight
    );
    if (stateVariables.assetsLoadCount >= 180) {
      this.showCompletionMessage(
        ctx,
        rectX,
        loadingTextX,
        loadingBarY,
        loadingBarX,
        loadingBarY,
        loadingBarWidth,
        loadingBarHeight,
        loadingText
      );
    } else {
      ctx.fillStyle = "#000000";
      ctx.fillText(loadingText, loadingTextX, loadingTextY);
    }
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

  showCompletionMessage(
    ctx: CanvasRenderingContext2D = stateVariables.ctx,
    rectX: number,
    loadingTextX: number,
    loadingTextY: number,
    loadingBarX: number,
    loadingBarY: number,
    loadingBarWidth: number,
    loadingBarHeight: number,
    loadingText: string
  ) {
    ctx.clearRect(loadingBarX, loadingBarY, loadingBarWidth, loadingBarHeight);
    ctx.clearRect(
      loadingTextX,
      loadingTextY - 20,
      ctx.measureText(loadingText).width,
      30
    );

    const completionText = "Press any key or click to continue";
    const completionTextX =
      rectX + (this.w - ctx.measureText(completionText).width) / 2;
    const completionTextY = loadingBarY + loadingBarHeight + 30;
    ctx.fillStyle = "#000000";
    ctx.fillText(completionText, completionTextX, completionTextY);

    function handleContinue() {
      window.removeEventListener("keydown", handleContinue);
      canvas.removeEventListener("click", handleContinue);
      stateVariables.gameState = GameState.aboutScreen;
    }

    window.addEventListener("keydown", handleContinue);
    canvas.addEventListener("click", handleContinue);
  }
}
