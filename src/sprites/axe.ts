import axeSpriteLeft from "/assets/weapons/axe-left/axe-left.png";
import axeSpriteRight from "/assets/weapons/axe-right/axe-right.png";
import axeSpriteBack from "/assets/weapons/axe-back/back.png";
import axeSpriteFront from "/assets/weapons/axe-front/front.png";
import { Point } from "../shapes/point";
import { upCounter } from "../functions";

const SpriteLeft = new Image();
SpriteLeft.src = axeSpriteLeft;
SpriteLeft.onload = upCounter;
const SpriteRight = new Image();
SpriteRight.src = axeSpriteRight;
SpriteRight.onload = upCounter;
const SpriteBack = new Image();
SpriteBack.src = axeSpriteBack;
SpriteBack.onload = upCounter;
const SpriteFront = new Image();
SpriteFront.src = axeSpriteFront;
SpriteFront.onload = upCounter;

type sprite = {
  sprite: HTMLImageElement;
  width: number[];
  height: number;
  position: Point[];
  offset: { [key: string]: number }[];
};
export const axeLeft: sprite = {
  sprite: SpriteLeft,
  height: 54,
  position: [
    new Point(0, 0),
    new Point(77, 0),
    new Point(141, 0),
    new Point(228, 0),
    new Point(312, 0),
    new Point(392, 0),
    new Point(487, 0),
    new Point(564, 0),
  ],
  offset: [
    { x: 12, y: 10 },
    { x: 0, y: 10 },
    { x: -24, y: 18 },
    { x: -24, y: 32 },
    { x: -28, y: 44 },
    { x: -26, y: 32 },
    { x: -24, y: 18 },
    { x: 12, y: 10 },
  ],

  width: [32, 30, 49, 51, 38, 49, 30, 32],
};
export const axeRight: sprite = {
  sprite: SpriteRight,
  height: 54,
  position: [
    new Point(0, 0),
    new Point(77, 0),
    new Point(155, 0),
    new Point(245, 0),
    new Point(317, 0),
    new Point(411, 0),
    new Point(487, 0),
    new Point(564, 0),
  ],
  offset: [
    { x: -25, y: 10 },
    { x: 10, y: 10 },
    { x: 20, y: 28 },
    { x: 20, y: 44 },
    { x: 20, y: 28 },
    { x: 20, y: 20 },
    { x: -12, y: 10 },
    { x: -24, y: 10 },
  ],
  width: [32, 30, 49, 51, 50, 60, 30, 32],
};

export const axeFront: sprite = {
  sprite: SpriteFront,
  height: 50,
  position: [new Point(0, 0), new Point(26, 0), new Point(37, 0)],
  offset: [
    { x: 28, y: 8 },
    { x: 28, y: 8 },
    { x: 28, y: 8 },
  ],
  width: [9, 9, 9],
};

export const axeBack: sprite = {
  sprite: SpriteBack,
  height: 50,
  position: [new Point(1, 0), new Point(34, 0), new Point(47, 0)],
  offset: [
    { x: 30, y: 10 },
    { x: 30, y: 10 },
    { x: 30, y: 10 },
  ],
  width: [8, 8, 8],
};
