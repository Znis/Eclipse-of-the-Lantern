import { Point } from "../shapes/point";

export function getRandomInt(min: number, max: number): number {
  return min + Math.floor((max - min) * Math.random());
}
export function distance(a: Point, b: Point) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.sqrt(dx ** 2 + dy ** 2);
  return dist;
}

export function calculateAngle(a: Point, b: Point) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.atan2(dy, dx);
}
