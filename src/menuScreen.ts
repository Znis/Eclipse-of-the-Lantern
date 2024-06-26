import { resumeGame, startJourney, upCounter } from "./functions";
import { Point } from "./shapes/point";
import { GameState, gameOptions, stateVariables } from "./stateVariables";
import "./controls.ts";
import { playSound } from "./soundPlayingFunction.ts";
import { voice } from "./sounds.ts";
export class MenuScreen {
  startPoint: Point;
  hoveredOption: number;
  hoveredChar: number;
  difficultyLevel: number;
  selectedChar: number;
  difficulties: string[];
  menuItems: any;
  charItems: any;
  charInfo: any;
  characterImages: any;
  tempHoverOption: number;

  constructor() {
    this.startPoint = new Point(stateVariables.windowWidth / 15, 150);
    this.hoveredOption = -1;
    this.hoveredChar = -1;
    this.difficultyLevel = 0;
    this.selectedChar = 0;
    this.tempHoverOption = 0;
    this.difficulties = ["GENOCIDE", "HOMICIDE", "SUICIDE"];

    this.menuItems = [
      {
        text: "Eclipse of the Lantern",
        fontSize: stateVariables.windowWidth / 25,
        x: this.startPoint.x,
        y: this.startPoint.y + (stateVariables.windowWidth / 15) * 0,
        type: 1,
      },

      {
        text: "START JOURNEY",
        fontSize: stateVariables.windowWidth / 25,
        x: this.startPoint.x,
        y: this.startPoint.y + (stateVariables.windowWidth / 20) * 2,
        type: 0,
      },
      {
        text: "CONTROLS",
        fontSize: stateVariables.windowWidth / 25,
        x: this.startPoint.x,
        y: this.startPoint.y + (stateVariables.windowWidth / 20) * 3,
        type: 0,
      },
      {
        text: "ABOUT",
        fontSize: stateVariables.windowWidth / 25,
        x: this.startPoint.x,
        y: this.startPoint.y + (stateVariables.windowWidth / 20) * 4,
        type: 0,
      },
      {
        text: "DIFFICULTY: ",
        fontSize: stateVariables.windowWidth / 20,
        x: this.startPoint.x,
        y: this.startPoint.y + (stateVariables.windowWidth / 20) * 5,
        type: 0,
      },
    ];

    this.charItems = [
      {
        text: "SELECT CHARACTER",
        x: stateVariables.windowWidth / 1.5 + 100,
        y: 380,
      },
      {
        text: "<",
        x: stateVariables.windowWidth / 1.5,
        y: 480,
      },
      {
        text: ">",
        x: stateVariables.windowWidth / 1.5 + 400,
        y: 480,
      },
    ];
    this.characterImages = [];
    this.charInfo = [
      {
        name: "Ophelia",
      },
      {
        name: "Noah",
      },
    ];
  }

  initialiseImages() {
    this.charInfo.forEach((character: any) => {
      const img = new Image();
      img.src = `assets/character/images/characters/profile/${character.name}.png`;
      img.onload = upCounter;
      this.characterImages.push(img);
    });
  }

  updateMenuItems() {
    if (stateVariables.gameState == GameState.menuScreen) {
      this.menuItems = [
        {
          text: "Eclipse of the Lantern",
          fontSize: stateVariables.windowWidth / 25,
          x: this.startPoint.x,
          y: this.startPoint.y + (stateVariables.windowWidth / 15) * 0,
          type: 1,
        },
        {
          text: "START JOURNEY",
          fontSize: stateVariables.windowWidth / 25,
          x: this.startPoint.x,
          y: this.startPoint.y + (stateVariables.windowWidth / 20) * 2,
          type: 0,
        },
        {
          text: "CONTROLS",
          fontSize: stateVariables.windowWidth / 25,
          x: this.startPoint.x,
          y: this.startPoint.y + (stateVariables.windowWidth / 20) * 3,
          type: 0,
        },
        {
          text: "ABOUT",
          fontSize: stateVariables.windowWidth / 25,
          x: this.startPoint.x,
          y: this.startPoint.y + (stateVariables.windowWidth / 20) * 4,
          type: 0,
        },
        {
          text: "DIFFICULTY: ",
          fontSize: stateVariables.windowWidth / 20,
          x: this.startPoint.x,
          y: this.startPoint.y + (stateVariables.windowWidth / 20) * 5,
          type: 0,
        },
      ];
      this.charItems = [
        {
          text: "SELECT CHARACTER",
          x: stateVariables.windowWidth / 1.5 + 100,
          y: 380,
        },
        {
          text: "<",
          x: stateVariables.windowWidth / 1.5,
          y: 480,
        },
        {
          text: ">",
          x: stateVariables.windowWidth / 1.5 + 400,
          y: 480,
        },
      ];
    } else if (stateVariables.gameState == GameState.paused) {
      this.menuItems = [
        {
          text: "Eclipse of the Lantern",
          fontSize: stateVariables.windowWidth / 25,
          x: this.startPoint.x,
          y: this.startPoint.y + (stateVariables.windowWidth / 15) * 0,
          type: 1,
        },
        {
          text: "RESUME",
          fontSize: stateVariables.windowWidth / 25,
          x: this.startPoint.x,
          y: this.startPoint.y + (stateVariables.windowWidth / 20) * 2,
          type: 0,
        },
        {
          text: "CONTROLS",
          fontSize: stateVariables.windowWidth / 25,
          x: this.startPoint.x,
          y: this.startPoint.y + (stateVariables.windowWidth / 20) * 3,
          type: 0,
        },
        {
          text: "ABOUT",
          fontSize: stateVariables.windowWidth / 25,
          x: this.startPoint.x,
          y: this.startPoint.y + (stateVariables.windowWidth / 20) * 4,
          type: 0,
        },
        {
          text: "QUIT",
          fontSize: stateVariables.windowWidth / 20,
          x: this.startPoint.x,
          y: this.startPoint.y + (stateVariables.windowWidth / 20) * 5,
          type: 0,
        },
      ];
      this.charItems = [];
    } else if (stateVariables.gameState == GameState.retryScreen) {
      this.menuItems = [
        {
          text: "Eclipse of the Lantern",
          fontSize: stateVariables.windowWidth / 25,
          x: this.startPoint.x,
          y: this.startPoint.y + (stateVariables.windowWidth / 15) * 0,
          type: 1,
        },
        {
          text: "RETRY",
          fontSize: stateVariables.windowWidth / 25,
          x: this.startPoint.x,
          y: this.startPoint.y + (stateVariables.windowWidth / 20) * 2,
          type: 0,
        },
        {
          text: "CONTROLS",
          fontSize: stateVariables.windowWidth / 25,
          x: this.startPoint.x,
          y: this.startPoint.y + (stateVariables.windowWidth / 20) * 3,
          type: 0,
        },
        {
          text: "ABOUT",
          fontSize: stateVariables.windowWidth / 25,
          x: this.startPoint.x,
          y: this.startPoint.y + (stateVariables.windowWidth / 20) * 4,
          type: 0,
        },
        {
          text: "QUIT",
          fontSize: stateVariables.windowWidth / 20,
          x: this.startPoint.x,
          y: this.startPoint.y + (stateVariables.windowWidth / 20) * 5,
          type: 0,
        },
      ];
      this.charItems = [];
    } else if (stateVariables.gameState == GameState.gameFinish) {
      this.menuItems = [
        {
          text: "Eclipse of the Lantern",
          fontSize: stateVariables.windowWidth / 25,
          x: this.startPoint.x,
          y: this.startPoint.y + (stateVariables.windowWidth / 15) * 0,
          type: 1,
        },
        {
          text: "CONGRATULATIONS! You conquered the enemies.",
          fontSize: stateVariables.windowWidth / 25,
          x: this.startPoint.x,
          y: this.startPoint.y + (stateVariables.windowWidth / 20) * 2,
          type: 0,
        },
        {
          text: "ABOUT",
          fontSize: stateVariables.windowWidth / 25,
          x: this.startPoint.x,
          y: this.startPoint.y + (stateVariables.windowWidth / 20) * 3,
          type: 0,
        },
        {
          text: "QUIT",
          fontSize: stateVariables.windowWidth / 20,
          x: this.startPoint.x,
          y: this.startPoint.y + (stateVariables.windowWidth / 20) * 4,
          type: 0,
        },
      ];
      this.charItems = [];
    }
  }

  show(ctx: CanvasRenderingContext2D = stateVariables.ctx) {
    this.updateMenuItems();

    ctx.fillStyle = "rgba(0, 0, 0, 0.74)";
    ctx.fillRect(0, 0, stateVariables.windowWidth, stateVariables.windowHeight);

    ctx.textAlign = "left";
    ctx.font = "30px Nos";

    let index = 0;
    let noHover = true;

    let mouseX = stateVariables.mouseCoords.x;
    let mouseY = stateVariables.mouseCoords.y;

    this.menuItems.forEach((menuItem: any) => {
      ctx.font = `${menuItem.fontSize}px Nos`;

      ctx.fillStyle = "rgb(255, 255, 255)";

      let isHovered = false;

      if (
        mouseX >= menuItem.x &&
        mouseX <
          menuItem.x + (menuItem.text.length / 1.5) * menuItem.fontSize &&
        mouseY <= menuItem.y &&
        mouseY > menuItem.y - menuItem.fontSize
      ) {
        isHovered = true;
        if (!(this.tempHoverOption == this.hoveredOption))
          playSound(voice.optionhover, 1);
        this.tempHoverOption = this.hoveredOption;
        this.hoveredOption = index;
        noHover = false;
      }

      if (menuItem.type == 1 || isHovered) {
        if (index > 0) {
          ctx.font = "30px stat";
          ctx.fillStyle = "red";
        }
      } else {
        ctx.font = "30px stat";

        ctx.fillStyle = "rgb(255, 255, 255)";
      }

      if (stateVariables.gameState == GameState.menuScreen) {
        if (index == 4) {
          ctx.fillText(
            menuItem.text + this.difficulties[this.difficultyLevel],
            menuItem.x,
            menuItem.y
          );
        } else {
          ctx.fillText(menuItem.text, menuItem.x, menuItem.y);
        }
      } else {
        ctx.fillText(menuItem.text, menuItem.x, menuItem.y);
      }
      index++;
    });
    if (stateVariables.gameState == GameState.menuScreen) {
      if (noHover) {
        this.hoveredOption = -1;
      }
      noHover = true;
      index = 0;
      this.charItems.forEach((charItem: any) => {
        ctx.fillStyle = "rgb(255, 255, 255)";
        if (
          mouseX >= charItem.x &&
          mouseX < charItem.x + 50 &&
          mouseY <= charItem.y &&
          mouseY > charItem.y - 50
        ) {
          ctx.fillStyle = "red";
          playSound(voice.optionhover, 1);
          noHover = false;
          this.hoveredChar = index;
        }
        ctx.fillText(charItem.text, charItem.x, charItem.y);

        index++;
      });

      if (noHover) {
        this.hoveredChar = -1;
      }
      ctx.drawImage(
        this.characterImages[this.selectedChar],
        stateVariables.windowWidth / 1.5 + 140,
        500,
        100,
        100
      );

      ctx.font = "40px stat";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.fillText(
        this.charInfo[this.selectedChar].name,
        stateVariables.windowWidth / 1.5 + 200,
        450,
        500
      );

      ctx.font = "20px stat";
    }
  }

  handleSelect() {
    if (stateVariables.gameState == GameState.menuScreen) {
      if (this.hoveredChar == 1 || this.hoveredChar == 2) {
        //character selection
        playSound(voice.optionclick, 1);
        this.selectedChar = this.selectedChar == 0 ? 1 : 0;
      }

      if (this.hoveredOption == 4) {
        //difficulty option
        playSound(voice.optionclick, 1);
        if (this.difficultyLevel < this.difficulties.length - 1) {
          this.difficultyLevel++;
        } else {
          this.difficultyLevel = 0;
        }
      }
    } else {
      if (this.hoveredOption == 4) {
        //quit button
        playSound(voice.optionclick, 1);
        stateVariables.gameState = GameState.menuScreen;
      }
    }
    if (stateVariables.gameState != GameState.gameFinish) {
      if (this.hoveredOption == 1) {
        //start game
        playSound(voice.optionclick, 1);
        gameOptions.difficultyLevel = this.difficultyLevel;
        gameOptions.character = this.charInfo[this.selectedChar].name;
        if (stateVariables.gameState == GameState.paused) {
          resumeGame();
        } else {
          startJourney();
        }
      }

      if (this.hoveredOption == 2) {
        stateVariables.tempGameState = stateVariables.gameState;
        stateVariables.gameState = GameState.controlsScreen;
      }

      if (this.hoveredOption == 3) {
        stateVariables.tempGameState = stateVariables.gameState;
        stateVariables.gameState = GameState.aboutScreen;
      }
    }
  }
}
