import { getMouseCoords, upCounter } from "./functions";
import { canvas } from "./main";
import { playSound } from "./soundPlayingFunction";
import { voice } from "./sounds";
import { GameState, stateVariables } from "./stateVariables";

export class AboutScreen {
  h: number;
  w: number;
  borderRadius: number;
  color: string;
  padding: number;
  img: HTMLImageElement;
  isHoveringMuteButton: boolean;
  isHoveringSkipButton: boolean;
  mute: boolean;
  constructor() {
    this.h = canvas.height * 0.9;
    this.w = canvas.width * 0.8;
    this.borderRadius = 20;
    this.color = "#FFFAFA";
    this.padding = 20;
    this.img = new Image();
    this.img.src = "./assets/controls.png";
    this.img.onload = upCounter;

    this.isHoveringMuteButton = false;
    this.isHoveringSkipButton = false;
    this.mute = false;
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

  show(ctx: CanvasRenderingContext2D = stateVariables.ctx) {
    playSound(voice.aboutvoice, 1);
    const rectX = (canvas.width - this.w) / 2;
    const rectY = (canvas.height - this.h) / 2;

    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = this.color;

    this.drawRoundedRect(ctx, rectX, rectY, this.w, this.h, this.borderRadius);

    ctx.font = "18px Outfit";
    ctx.fillStyle = "#222";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    const text = `The game "Eclipse of the Lantern" puts you in my shoes as I strive to protect our neighborhood from a relentless goblin invasion.
    Armed with a gun and an axe, I'm also blessed with special abilities that I can unleash after a cooldown period. Along the way,
    I gather essential items like medkits, fuel, and ammo to aid in my quest. I carry a lantern, my beacon in the dark, which dims
    over time, requiring constant attention to keep it lit. The lantern's light is crucial as it weakens the goblins, giving me an edge
    in combat. My ultimate goal is to track down the Goblin Boss hiding somewhere on the map. This menacing boss not only poses a significant
    threat but also spawns more goblins at regular intervals. I must provoke and defeat the Goblin Boss while fending off the goblin horde.
    Only by doing so can I restore peace to our beloved neighborhood.`;

    const instruction = `1. Goblin Boss: Found at the map's edge, it spawns goblins and items every second. Provoke it by approaching, and it will chase me, 
    stopping the spawns. Watch out for its flame ability.
2. Survival: The game ends if my lantern runs out or my health drops to zero. Collect fuel to refuel the lantern (takes 2 seconds)
and medkits to heal (takes 0.5 seconds). Gather ammo for my gun.

3. Lantern Light: Goblins weaken in the lantern's light, so it's best to kill them there.

4. Abilities: - "Light of Blessings": Screen-wide vision for 5 seconds (30s cooldown).
- "Breath of Dragon": Shoots a flame (20s cooldown).

5. Debug Mode: Hold the L key if I get stuck to move freely.

6. Safe House: Enter the house near the spawn point to reset health and stamina. 
Equip with 100 ammo, 5 medkits, and 5 fuel. No goblins can enter.

Good luck and have fun!`;

    const lines = text.split("\n");
    const lineHeight = 20;
    const instructionLines = instruction.split("\n");

    let y = rectY + this.padding;

    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, y + index * lineHeight);
    });
    ctx.font = "bold 25px Outfit";
    ctx.fillStyle = "#111";

    ctx.fillText(
      "Important Instructions",
      canvas.width / 2,
      0.35 * canvas.height
    );
    ctx.font = "18px Outfit";
    ctx.fillStyle = "#222";
    instructionLines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, 0.35 * canvas.height + index * lineHeight + 50);
    });

    ctx.fillStyle = this.color;

    let buttonX = canvas.width - 170 - 0.1 * canvas.width;
    let buttonY = canvas.height - 100;
    const buttonWidth = 150;
    const buttonHeight = 40;
    const buttonRadius = 10;

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;

    this.isHoveringSkipButton
      ? (ctx.fillStyle = "red")
      : (ctx.fillStyle = "#000000");

    ctx.fillText("Skip", buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);

    ctx.beginPath();
    ctx.moveTo(buttonX + buttonRadius, buttonY);
    ctx.lineTo(buttonX + buttonWidth - buttonRadius, buttonY);
    ctx.quadraticCurveTo(
      buttonX + buttonWidth,
      buttonY,
      buttonX + buttonWidth,
      buttonY + buttonRadius
    );
    ctx.lineTo(buttonX + buttonWidth, buttonY + buttonHeight - buttonRadius);
    ctx.quadraticCurveTo(
      buttonX + buttonWidth,
      buttonY + buttonHeight,
      buttonX + buttonWidth - buttonRadius,
      buttonY + buttonHeight
    );
    ctx.lineTo(buttonX + buttonRadius, buttonY + buttonHeight);
    ctx.quadraticCurveTo(
      buttonX,
      buttonY + buttonHeight,
      buttonX,
      buttonY + buttonHeight - buttonRadius
    );
    ctx.lineTo(buttonX, buttonY + buttonRadius);
    ctx.quadraticCurveTo(buttonX, buttonY, buttonX + buttonRadius, buttonY);
    ctx.closePath();
    ctx.stroke();

    buttonX = canvas.width - 170 - 0.1 * canvas.width;
    buttonY = canvas.height - buttonHeight - 120;

    this.isHoveringMuteButton
      ? (ctx.fillStyle = "red")
      : (ctx.fillStyle = "#000000");
    if (this.mute) {
      ctx.fillText(
        "Muted",
        buttonX + buttonWidth / 2,
        buttonY + buttonHeight / 2
      );
    } else {
      ctx.fillText(
        "Mute",
        buttonX + buttonWidth / 2,
        buttonY + buttonHeight / 2
      );
    }
    ctx.beginPath();
    ctx.moveTo(buttonX + buttonRadius, buttonY);
    ctx.lineTo(buttonX + buttonWidth - buttonRadius, buttonY);
    ctx.quadraticCurveTo(
      buttonX + buttonWidth,
      buttonY,
      buttonX + buttonWidth,
      buttonY + buttonRadius
    );
    ctx.lineTo(buttonX + buttonWidth, buttonY + buttonHeight - buttonRadius);
    ctx.quadraticCurveTo(
      buttonX + buttonWidth,
      buttonY + buttonHeight,
      buttonX + buttonWidth - buttonRadius,
      buttonY + buttonHeight
    );
    ctx.lineTo(buttonX + buttonRadius, buttonY + buttonHeight);
    ctx.quadraticCurveTo(
      buttonX,
      buttonY + buttonHeight,
      buttonX,
      buttonY + buttonHeight - buttonRadius
    );
    ctx.lineTo(buttonX, buttonY + buttonRadius);
    ctx.quadraticCurveTo(buttonX, buttonY, buttonX + buttonRadius, buttonY);
    ctx.closePath();
    ctx.stroke();

    canvas.addEventListener("mousemove", (e) => {
      const mouseCoords = getMouseCoords(e);
      const mouseX = mouseCoords.x;
      const mouseY = mouseCoords.y;

      this.isHoveringMuteButton =
        mouseX > buttonX &&
        mouseX < buttonX + buttonWidth &&
        mouseY > buttonY &&
        mouseY < buttonY + buttonHeight;
      this.isHoveringSkipButton =
        mouseX > buttonX &&
        mouseX < buttonX + buttonWidth &&
        mouseY > buttonY + buttonHeight + 20 &&
        mouseY < buttonY + 2 * buttonHeight + 20;
    });

    canvas.addEventListener("click", () => {
      if (this.isHoveringMuteButton) {
        this.mute = !this.mute;
        if (this.mute) {
          voice.aboutvoice.audio.pause();
          voice.aboutvoice.audio.currentTime = 0;
        } else {
          voice.aboutvoice.audio.play();
        }
      } else if (this.isHoveringSkipButton) {
        if (stateVariables.tempGameState == GameState.loadingScreen) {
          stateVariables.gameState = GameState.controlsScreen;
          voice.aboutvoice.audio.pause();
          voice.aboutvoice.audio.currentTime = 0;
        } else {
          stateVariables.gameState = stateVariables.tempGameState;
          voice.aboutvoice.audio.pause();
          voice.aboutvoice.audio.currentTime = 0;
        }
      }
    });
  }
}
