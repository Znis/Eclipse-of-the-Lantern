import lanternSprite from "/assets/lantern/lantern-right.png";
import { Point } from "../shapes/point";
import { upCounter } from "../functions";

const Sprite = new Image();
Sprite.src = lanternSprite;
Sprite.onload = upCounter;

type sprite = {
  sprite: HTMLImageElement;
  width: number;
  height: number;
  position: Point[];
};
const lantern: sprite = {
  sprite: Sprite,
  width: 55,
  height: 74,
  position: [
    new Point(30, 30),
    new Point(123, 30),
    new Point(230, 30),
    new Point(320, 30),
    new Point(430, 30),
  ],
};
export default lantern;
