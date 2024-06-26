import EnemyAttackSpriteLeft1 from "/assets/enemy/goblin/left/Png/GoblinBeastLeftAttack01.png";
import EnemyDeadSpriteLeft from "/assets/enemy/goblin/left/Png/GoblinBeastLeftDeath.png";

import EnemyAttackSpriteRight1 from "/assets/enemy/goblin/right/Png/GoblinBeastRightAttack01.png";
import EnemyDeadSpriteRight from "/assets/enemy/goblin/right/Png/GoblinBeastRightDeath.png";

import EnemyAttackSpriteFront1 from "/assets/enemy/goblin/front/Png/GoblinBeastDownAttack01.png";
import EnemyDeadSpriteFront from "/assets/enemy/goblin/front/Png/GoblinBeastDownDeath.png";

import EnemyAttackSpriteBack1 from "/assets/enemy/goblin/back/Png/GoblinBeastUpAttack01.png";
import EnemyDeadSpriteBack from "/assets/enemy/goblin/back/Png/GoblinBeastUpDeath.png";

import { Point } from "../shapes/point";
import { upCounter } from "../functions";

const SpriteLeftAttack1 = new Image();
SpriteLeftAttack1.src = EnemyAttackSpriteLeft1;
SpriteLeftAttack1.onload = upCounter;

const SpriteEnemyDeadLeft = new Image();
SpriteEnemyDeadLeft.src = EnemyDeadSpriteLeft;
SpriteEnemyDeadLeft.onload = upCounter;

const SpriteRightAttack1 = new Image();
SpriteRightAttack1.src = EnemyAttackSpriteRight1;
SpriteRightAttack1.onload = upCounter;

const SpriteEnemyDeadRight = new Image();
SpriteEnemyDeadRight.src = EnemyDeadSpriteRight;
SpriteEnemyDeadRight.onload = upCounter;

const SpriteFrontAttack1 = new Image();
SpriteFrontAttack1.src = EnemyAttackSpriteFront1;
SpriteFrontAttack1.onload = upCounter;

const SpriteEnemyDeadFront = new Image();
SpriteEnemyDeadFront.src = EnemyDeadSpriteFront;
SpriteEnemyDeadFront.onload = upCounter;

const SpriteBackAttack1 = new Image();
SpriteBackAttack1.src = EnemyAttackSpriteBack1;
SpriteBackAttack1.onload = upCounter;

const SpriteEnemyDeadBack = new Image();
SpriteEnemyDeadBack.src = EnemyDeadSpriteBack;
SpriteEnemyDeadBack.onload = upCounter;

type sprite = {
  [key: string]: {
    sprite: HTMLImageElement;
    width: number;
    height: number;
    position: Point[];
    offset: { [key: string]: number }[];
  };
};

export const enemyLeft: sprite = {
  attackType1: {
    sprite: SpriteLeftAttack1,
    height: 48,
    width: 48,
    position: [
      new Point(20, 16),
      new Point(85, 17),
      new Point(146, 17),
      new Point(210, 17),
      new Point(270, 16),
      new Point(331, 17),
      new Point(398, 17),
      new Point(462, 17),
    ],
    offset: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
  },
  enemyDead: {
    sprite: SpriteEnemyDeadLeft,
    height: 48,
    width: 48,
    position: [
      new Point(12, 8),
      new Point(63, 12),
      new Point(111, 14),
      new Point(147, 30),
      new Point(193, 30),
      new Point(243, 30),
      new Point(387, 30),
      new Point(435, 30),
    ],

    offset: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
  },
};

export const enemyRight: sprite = {
  attackType1: {
    sprite: SpriteRightAttack1,
    height: 48,
    width: 48,
    position: [
      new Point(20, 16),
      new Point(82, 17),
      new Point(143, 17),
      new Point(206, 17),
      new Point(280, 16),
      new Point(350, 17),
      new Point(414, 17),
      new Point(470, 17),
    ],
    offset: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
  },
  enemyDead: {
    sprite: SpriteEnemyDeadRight,
    height: 48,
    width: 48,
    position: [
      new Point(12, 8),
      new Point(60, 12),
      new Point(108, 14),
      new Point(159, 30),
      new Point(207, 30),
      new Point(255, 30),
      new Point(399, 30),
      new Point(447, 30),
    ],

    offset: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
  },
};

export const enemyFront: sprite = {
  attackType1: {
    sprite: SpriteFrontAttack1,
    height: 48,
    width: 48,
    position: [
      new Point(20, 16),
      new Point(84, 17),
      new Point(145, 17),
      new Point(208, 17),
      new Point(272, 23),
      new Point(343, 25),
      new Point(402, 25),
      new Point(460, 25),
    ],
    offset: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
  },
  enemyDead: {
    sprite: SpriteEnemyDeadFront,
    height: 48,
    width: 48,
    position: [
      new Point(12, 8),
      new Point(61, 13),
      new Point(109, 15),
      new Point(157, 27),
      new Point(205, 27),
      new Point(253, 27),
      new Point(397, 27),
      new Point(445, 27),
    ],

    offset: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
  },
};

export const enemyBack: sprite = {
  attackType1: {
    sprite: SpriteBackAttack1,
    height: 48,
    width: 48,
    position: [
      new Point(20, 16),
      new Point(84, 17),
      new Point(145, 17),
      new Point(208, 17),
      new Point(272, 16),
      new Point(343, 9),
      new Point(402, 3),
      new Point(460, 0),
    ],
    offset: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
  },
  enemyDead: {
    sprite: SpriteEnemyDeadBack,
    height: 48,
    width: 48,
    position: [
      new Point(12, 8),
      new Point(61, 13),
      new Point(109, 15),
      new Point(157, 27),
      new Point(205, 27),
      new Point(253, 27),
      new Point(397, 27),
      new Point(445, 27),
    ],

    offset: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
  },
};
