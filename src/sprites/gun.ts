import gunSpriteLeft from "/assets/weapons/gun-left/gun-left.png";
import gunSpriteRight from "/assets/weapons/gun-right/gun-right.png";
import gunSpriteBack from "/assets/weapons/gun-back/gun-back.png";
import gunSpriteFront from "/assets/weapons/gun-front/gun-front.png";
import { Point } from "../shapes/point";
import { upCounter } from "../functions";

const SpriteLeft = new Image();
SpriteLeft.src = gunSpriteLeft;
SpriteLeft.onload = upCounter;

const SpriteRight = new Image();
SpriteRight.src = gunSpriteRight;
SpriteRight.onload = upCounter;

const SpriteBack = new Image();
SpriteBack.src = gunSpriteBack;
SpriteBack.onload = upCounter;

const SpriteFront = new Image();
SpriteFront.src = gunSpriteFront;
SpriteFront.onload = upCounter;

type sprite = {
  sprite: HTMLImageElement;
  width: number[];
  height: number;
  position: Point[];
  offset: { [key: string]: number }[];
};
export const gunLeft: sprite = {
  sprite: SpriteLeft,
  height: 65,
  position: [
    new Point(0, 0),
    new Point(136, 0),
    new Point(274, 0),
    new Point(408, 0),
  ],
  offset: [
    { x: -8, y: 24 },
    { x: -8, y: 20 },
    { x: -8, y: 22 },
    { x: -8, y: 24 },
  ],

  width: [116, 116, 110, 116],
};
export const gunRight: sprite = {
  sprite: SpriteRight,
  height: 65,
  position: [
    new Point(0, 0),
    new Point(137, 0),
    new Point(270, 0),
    new Point(408, 0),
  ],
  offset: [
    { x: -4, y: 24 },
    { x: -4, y: 20 },
    { x: -4, y: 22 },
    { x: -4, y: 24 },
  ],
  width: [116, 110, 116, 116],
};

export const gunFront: sprite = {
  sprite: SpriteFront,
  height: 28,
  position: [
    new Point(3, 0),
    new Point(50, 0),
    new Point(99, 0),
    new Point(144, 0),
  ],
  offset: [
    { x: 32, y: 14 },
    { x: 32, y: 14 },
    { x: 32, y: 14 },
    { x: 32, y: 14 },
  ],
  width: [19, 20, 18, 19],
};

export const gunBack: sprite = {
  sprite: SpriteBack,
  height: 28,
  position: [
    new Point(1, 0),
    new Point(41, 0),
    new Point(88, 0),
    new Point(127, 0),
  ],
  offset: [
    { x: 32, y: 10 },
    { x: 32, y: 10 },
    { x: 32, y: 10 },
    { x: 32, y: 10 },
  ],
  width: [22, 26, 20, 20],
};
