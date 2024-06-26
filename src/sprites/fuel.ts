import fuelSprite from "/assets/pickups/fuel/fuel.png";
import { Point } from "../shapes/point";
import { upCounter } from "../functions";

const Sprite = new Image();
Sprite.src = fuelSprite;
Sprite.onload = upCounter;

type fuel = {
  sprite: HTMLImageElement;
  width: number;
  height: number;
  position: Point[];
};
const fuel: fuel = {
  sprite: Sprite,
  width: 24,
  height: 25,
  position: [
    new Point(0, 0),
    new Point(24, 0),
    new Point(48, 0),
    new Point(72, 0),
    new Point(96, 0),
    new Point(120, 0),
    new Point(144, 0),
    new Point(168, 0),
  ],
};
export default fuel;
