import { BloodParticle } from "./particles/bloodParticle";
import {
  GameState,
  abilities,
  characters,
  cursorImages,
  difficultySetting,
  freqLoadingAssets,
  gameOptions,
  inventory,
  pickupItems,
  pickupItemsTypes,
  stateVariables,
  weapons,
} from "./stateVariables";
import { Character } from "./character";
import { Maps } from "./maps";
import { canvas } from "./main";
import { Lantern } from "./lantern";
import { Enemy } from "./enemy";
import { AnimateEntity } from "./animation";
import { Ui } from "./ui";
import { MenuScreen } from "./menuScreen";
import { Point } from "./shapes/point";
import { PickupItems } from "./pickupItems";
import { Inventory } from "./inventory";
import { Axe } from "./weapons/axe";
import { Gun } from "./weapons/gun";
import { Boss } from "./boss";
import { getRandomInt } from "./utils/util";
import { mapData } from "./mapData";
import { voice } from "./sounds";
import { playSound, resetSound } from "./soundPlayingFunction";
import { ControlsScreen } from "./controlsScreen";
import { AboutScreen } from "./aboutScreen";
import { LoadingScreen } from "./loadingScreen";
import { LANTERN_BRIGHTNESS_RADIUS } from "./constants";

export function preload() {
  stateVariables.bgImage = new Maps("main-map.jpg");
  stateVariables.bgImage.initialiseImages();
  stateVariables.player = new Character();
  stateVariables.player.direction = "r";
  stateVariables.player.startPoint.x = stateVariables.windowWidth / 2;
  stateVariables.player.startPoint.y = stateVariables.windowHeight / 2;
  stateVariables.ui = new Ui();
  cursorImages.axe.src = "./assets/attack.png";
  cursorImages.axe.onload = upCounter;
  cursorImages.gun.src = "./assets/crosshair.png";
  cursorImages.gun.onload = upCounter;
  cursorImages.direction.src = "./assets/direction.png";
  cursorImages.direction.onload = upCounter;
  stateVariables.cursorImage = cursorImages.axe;
  stateVariables.inventory = new Inventory();
  stateVariables.axe = new Axe();
  stateVariables.gun = new Gun();
  stateVariables.inventory.initialiseImages();
  stateVariables.ui.initialiseImages("./assets/ui");
  stateVariables.ui.initialiseRainParticles();
  stateVariables.lantern = new Lantern();
  stateVariables.lantern.img.src = "assets/lantern/lantern.png";
  stateVariables.lantern.img.onload = upCounter;
  stateVariables.mainMenu = new MenuScreen();
  stateVariables.controlsScreen = new ControlsScreen();
  stateVariables.aboutScreen = new AboutScreen();
  stateVariables.loadingScreen = new LoadingScreen();
  stateVariables.boss = new Boss();
  let animateEnemy = new AnimateEntity(stateVariables.boss.images_front, 2);
  stateVariables.animateEnemyArray.push(animateEnemy);
  stateVariables.mainMenu.initialiseImages();
  stateVariables.flameImages = loadImages("assets/flame", 30);
  weapons.axe.src = "./assets/axe.png";
  weapons.axe.onload = upCounter;
  weapons.gun.src = "./assets/gun.png";
  weapons.gun.onload = upCounter;
  abilities.light.src = "./assets/abilities/light.png";
  abilities.light.onload = upCounter;
  abilities.flame.src = "./assets/abilities/flame.png";
  abilities.flame.onload = upCounter;
  pickupItems.ammo.src = "./assets/inventory/ammo.png";
  pickupItems.ammo.onload = upCounter;
  freqLoadingAssets.goblinImages.back = loadGoblinImages(
    "back",
    6,
    "assets/enemy/goblin"
  );
  freqLoadingAssets.goblinImages.front = loadGoblinImages(
    "front",
    6,
    "assets/enemy/goblin"
  );
  freqLoadingAssets.goblinImages.left = loadGoblinImages(
    "left",
    6,
    "assets/enemy/goblin"
  );
  freqLoadingAssets.goblinImages.right = loadGoblinImages(
    "right",
    6,
    "assets/enemy/goblin"
  );
  freqLoadingAssets.bossImages.back = loadGoblinImages(
    "back",
    6,
    "assets/boss"
  );
  freqLoadingAssets.bossImages.front = loadGoblinImages(
    "front",
    6,
    "assets/boss"
  );
  freqLoadingAssets.bossImages.left = loadGoblinImages(
    "left",
    6,
    "assets/boss"
  );
  freqLoadingAssets.bossImages.right = loadGoblinImages(
    "right",
    6,
    "assets/boss"
  );
  characters.Ophelia.back = loadCharacterImages(
    "back",
    4,
    "assets/character/images/characters/Ophelia"
  );
  characters.Ophelia.front = loadCharacterImages(
    "front",
    4,
    "assets/character/images/characters/Ophelia"
  );
  characters.Ophelia.left = loadCharacterImages(
    "left",
    4,
    "assets/character/images/characters/Ophelia"
  );
  characters.Ophelia.right = loadCharacterImages(
    "right",
    4,
    "assets/character/images/characters/Ophelia"
  );
  characters.Noah.back = loadCharacterImages(
    "back",
    4,
    "assets/character/images/characters/Noah"
  );
  characters.Noah.front = loadCharacterImages(
    "front",
    4,
    "assets/character/images/characters/Noah"
  );
  characters.Noah.left = loadCharacterImages(
    "left",
    4,
    "assets/character/images/characters/Noah"
  );
  characters.Noah.right = loadCharacterImages(
    "right",
    4,
    "assets/character/images/characters/Noah"
  );
  freqLoadingAssets.bloodParticleImages = loadBloodParticleImages(
    7,
    "assets/blood"
  );
  freqLoadingAssets.pickupItems.medkit = loadPickupItemImages(
    11,
    pickupItemsTypes.health_pack.itemName,
    "assets/pickups/health_pack"
  );
}

export function loadCharacterImages(
  direction: string,
  no_of_frames: number,
  path: string
) {
  const imagesArray = [];
  for (let i = 1; i <= no_of_frames; i++) {
    const img = new Image();
    img.src = `${path}/${direction}/${direction} (${i}).png`;
    img.onload = upCounter;
    imagesArray.push(img);
  }
  return imagesArray;
}

export function loadPickupItemImages(
  frame: number,
  type: string,
  path: string
) {
  let imgArray = [];
  for (let i = 1; i <= frame; i++) {
    const img = new Image();
    img.src = `${path}/${type} (${i}).png`;
    img.onload = upCounter;
    imgArray.push(img);
  }
  return imgArray;
}

export function loadBloodParticleImages(frames: number, path: string) {
  const imagesArray = [];
  for (let i = 0; i <= frames; i++) {
    const img = new Image();
    img.src = `${path}/sprite_${i}.png`;
    img.onload = upCounter;
    imagesArray.push(img);
  }
  return imagesArray;
}

export function loadGoblinImages(
  direction: string,
  no_of_frames: number,
  path: string
) {
  const imagesArray = [];
  for (let i = 1; i <= no_of_frames; i++) {
    const img = new Image();
    img.src = `${path}/${direction}/${direction} (${i}).png`;
    img.onload = upCounter;
    imagesArray.push(img);
  }
  return imagesArray;
}
export function loadImages(path: string, num: number) {
  const imagesArray = [];
  for (let i = 0; i < num; i++) {
    const img = new Image();
    img.src = `${path}/${i}.png`;
    img.onload = upCounter;
    imagesArray.push(img);
  }
  return imagesArray;
}

export function adjustCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
export function upCounter() {
  stateVariables.assetsLoadCount++;
}

export function startJourney() {
  resetStateVariables();
  resetSound();
  stateVariables.gameState = GameState.running;
  generateEnemy(50);
  generateRandomPickupItems(100);

  stateVariables.player.changeCharacter(gameOptions.character);
  stateVariables.player.direction = "r";
  stateVariables.player.startPoint.x = stateVariables.windowWidth / 2;
  stateVariables.player.startPoint.y = stateVariables.windowHeight / 2;

  stateVariables.enemiesArray.forEach((enemy) => {
    enemy.MAX_HEALTH =
      difficultySetting[gameOptions.difficultyLevel].enemyMaxHealth;
    enemy.MIN_HEALTH =
      difficultySetting[gameOptions.difficultyLevel].enemyMinHealth;
    enemy.default_damage =
      difficultySetting[gameOptions.difficultyLevel].enemyAttackDamage;
    enemy.default_movement_speed =
      difficultySetting[gameOptions.difficultyLevel].enemySpeed;
  });
  setTimeout(() => {
    playSound(voice.letsstartkilling, 1);
  }, 500);
}

export function isPointInCollider(x: number, y: number): boolean {
  mapData[
    stateVariables.bgImage.name as keyof typeof mapData
  ].colliders.forEach((collider: any) => {
    const colliderX1 =
      20 +
      (stateVariables.windowWidth / 2 +
        stateVariables.bgImage.startPoint.x -
        (collider.x + stateVariables.adjustDeviceColliderX));
    const colliderY1 =
      50 +
      (stateVariables.windowHeight / 2 +
        stateVariables.bgImage.startPoint.y -
        (collider.y + stateVariables.adjustDeviceColliderY));
    const colliderX2 = colliderX1 + Math.abs(collider.x - collider.w);
    const colliderY2 = colliderY1 + Math.abs(collider.y - collider.h);

    const minX = Math.min(colliderX1, colliderX2);
    const maxX = Math.max(colliderX1, colliderX2);
    const minY = Math.min(colliderY1, colliderY2);
    const maxY = Math.max(colliderY1, colliderY2);

    if (x >= minX && x <= maxX && y >= minY && y <= maxY) return true;
  });
  return false;
}


export function debugColliderMode() {
  mapData[
    stateVariables.bgImage.name as keyof typeof mapData
  ].colliders.forEach((collider: any) => {
    stateVariables.ctx.fillStyle = collider.color || "#ffffff";
    stateVariables.ctx.beginPath();
    stateVariables.ctx.fillRect(
      20 +
        (stateVariables.windowWidth / 2 +
          stateVariables.bgImage.startPoint.x -
          (collider.x + stateVariables.adjustDeviceColliderX)),
      50 +
        (stateVariables.windowHeight / 2 +
          stateVariables.bgImage.startPoint.y -
          (collider.y + stateVariables.adjustDeviceColliderY)),
      Math.abs(collider.x - collider.w),
      Math.abs(collider.y - collider.h)
    );
  });
}


export function checkPlayerHealthAndLanternLuminosity() {
  if (
    stateVariables.player.health <= 0 ||
    stateVariables.lantern.maxRadiusInnerCircle <= 0
  )
    stateVariables.gameState = GameState.retryScreen;
}


export function displayCursorImage(
  ctx: CanvasRenderingContext2D = stateVariables.ctx
) {
  ctx.save();
  if (stateVariables.player.abilityMode) {
    stateVariables.cursorImage = cursorImages.direction;
    ctx.translate(stateVariables.mouseCoords.x, stateVariables.mouseCoords.y);
    ctx.rotate(
      Math.atan2(
        stateVariables.mouseCoords.y - stateVariables.player.startPoint.y + 50,
        stateVariables.mouseCoords.x - stateVariables.player.startPoint.x + 30
      )
    );
    ctx.drawImage(stateVariables.cursorImage, 0, 0, 50, 50);
    ctx.restore();
  } else if (stateVariables.player.currWeapon == "gun") {
    stateVariables.cursorImage = cursorImages.gun;
    ctx.drawImage(
      stateVariables.cursorImage,
      stateVariables.mouseCoords.x,
      stateVariables.mouseCoords.y,
      30,
      30
    );
  } else {
    stateVariables.cursorImage = cursorImages.axe;
    ctx.drawImage(
      stateVariables.cursorImage,
      stateVariables.mouseCoords.x,
      stateVariables.mouseCoords.y,
      30,
      30
    );
  }
}

export function generateRandomPickupItems(num: number) {
  while (num != 0) {
    const itemType =
      Math.random() < 0.8
        ? Math.random() < 0.5
          ? pickupItemsTypes.ammo
          : pickupItemsTypes.health_pack
        : pickupItemsTypes.fuel;

    let posX = getRandomInt(
      stateVariables.bgImage.startPoint.x,
      stateVariables.bgImage.startPoint.x + stateVariables.bgImage.w
    );
    let posY = getRandomInt(
      stateVariables.bgImage.startPoint.y,
      stateVariables.bgImage.startPoint.y + stateVariables.bgImage.h
    );
    if (!isPointInCollider(posX, posY)) {
      const pickupItem = new PickupItems(posX, posY, itemType);
      stateVariables.pickupItemsArray.push(pickupItem);
      const animatePickupItem = new AnimateEntity(pickupItem.images, 12);
      stateVariables.animatePickupItemsArray.push(animatePickupItem);
      num--;
    }
  }
}

export function handlePickupItems() {
  for (let i = 0; i < stateVariables.pickupItemsArray.length; i++) {
    stateVariables.pickupItemsArray[i].show(
      stateVariables.pickupItemsArray[i].images[
        stateVariables.animatePickupItemsArray[i].frame()
      ],
      stateVariables.animatePickupItemsArray[i].frame()
    );
    stateVariables.animatePickupItemsArray[i].change_frames();
    stateVariables.pickupItemsArray[i].collect();
    if (stateVariables.pickupItemsArray[i].isUsed) {
      stateVariables.pickupItemsArray.splice(i, 1);
      stateVariables.animatePickupItemsArray.splice(i, 1);
    }
  }
}

export function resumeGame() {
  stateVariables.gameState = GameState.running;
}

export function resetStateVariables() {
  stateVariables.player.health = 100;
  stateVariables.player.score = 0;
  stateVariables.lantern.maxRadiusInnerCircle = LANTERN_BRIGHTNESS_RADIUS;
  stateVariables.bgImage.startPoint = new Point(
    -2220 + stateVariables.adjustDeviceColliderX,
    -2220 + stateVariables.adjustDeviceColliderY
  );
  stateVariables.boss = new Boss();
  stateVariables.bloodParticleArray = [];
  stateVariables.bulletProjectileArray = [];
  stateVariables.fireProjectileArray = [];
  stateVariables.enemiesArray = [];
  stateVariables.pickupItemsArray = [];
  stateVariables.keyState = {};
  stateVariables.animateEnemyArray = [];
  stateVariables.animatePickupItemsArray = [];
  stateVariables.inventory.abilities[0].cooldown = 0;
  stateVariables.inventory.abilities[1].cooldown = 0;
  inventory.medKit = 0;
  inventory.fuel = 0;
  inventory.ammo = 100;
}

export function renderInventory() {
  stateVariables.inventory.show();
}

export function renderUi() {
  stateVariables.ui.renderHealth();
  stateVariables.ui.renderStamina();
  stateVariables.ui.renderScore();
}

export function renderMainMenu() {
  stateVariables.mainMenu.show();
}

export function handleEnemies() {
  stateVariables.enemiesArray.forEach((enemy) => {
    enemy.show();
    enemy.move();
    enemy.determineDirection();
    enemy.updateAttributes();
    enemy.separate();
  });
}

export function handleBoss() {
  stateVariables.boss.show();
  stateVariables.boss.move();
  stateVariables.boss.determineDirection();
  stateVariables.boss.updateAttributes();
  stateVariables.boss.spawnEnemy();
}

export function getMouseCoords(event: MouseEvent) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
}

export function handleProjectiles() {
  stateVariables.bulletProjectileArray.forEach((projectile) => {
    projectile.show();
    projectile.move();
  });
  stateVariables.bulletProjectileArray =
    stateVariables.bulletProjectileArray.filter(
      (projectile) => !projectile.toDelete
    );
  stateVariables.fireProjectileArray.forEach((projectile) => {
    projectile.show();
    projectile.move();
  });
  stateVariables.fireProjectileArray =
    stateVariables.fireProjectileArray.filter(
      (projectile) => !projectile.toDelete
    );
}

export function drawChannelledAnimation() {
  let holdDuration = 0;
  let text = "";
  if (stateVariables.isHoldingRefuelKey) {
    holdDuration = stateVariables.refuelDuration;
    text = " Refueling Lantern";
    playSound(voice.refueling, 1);
  } else if (stateVariables.isHoldingHealKey) {
    holdDuration = stateVariables.healDuration;
    text = " Using Med Kit";
    playSound(voice.usingmedkit, 1);
  }
  const currentTime = new Date().getTime();
  let elapsedTime = 0;
  if (stateVariables.isHoldingHealKey)
    elapsedTime = currentTime - stateVariables.healStart!;
  if (stateVariables.isHoldingRefuelKey)
    elapsedTime = currentTime - stateVariables.refuelStart!;

  const remainingTime = holdDuration - elapsedTime;
  if (remainingTime < 0) {
    stateVariables.isHoldingHealKey = false;
    stateVariables.isHoldingRefuelKey = false;
  }
  const progress = 1 - Math.min(elapsedTime / holdDuration, 1);

  const barWidth = 400;
  const barHeight = 20;
  const barX = (stateVariables.windowWidth - barWidth) / 2;
  const barY = stateVariables.windowHeight - 50;

  stateVariables.ctx.fillStyle = "#ccc";
  stateVariables.ctx.fillRect(barX, barY, barWidth, barHeight);

  stateVariables.ctx.fillStyle = "#76c7c0";
  stateVariables.ctx.fillRect(barX, barY, barWidth * progress, barHeight);

  stateVariables.ctx.font = "16px Outfit";
  stateVariables.ctx.fillStyle = "#fff";
  stateVariables.ctx.textAlign = "center";
  stateVariables.ctx.fillText(
    `${text} ${(remainingTime / 1000).toFixed(1)}s`,
    stateVariables.windowWidth / 2,
    barY - 10
  );
}

export function generateEnemy(num: number) {
  while (num != 0) {
    let posX = getRandomInt(
      stateVariables.bgImage.startPoint.x,
      stateVariables.bgImage.startPoint.x + stateVariables.bgImage.w
    );
    let posY = getRandomInt(
      stateVariables.bgImage.startPoint.y,
      stateVariables.bgImage.startPoint.y + stateVariables.bgImage.h
    );
    if (!isPointInCollider(posX, posY)) {
      let enemy = new Enemy(posX, posY);
      let animateEnemy = new AnimateEntity(enemy.images_front, 2);
      stateVariables.enemiesArray.push(enemy);
      stateVariables.animateEnemyArray.push(animateEnemy);
      num--;
    }
  }
}

export function drawEllipse(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) {
  ctx.beginPath();
  ctx.ellipse(x, y, width / 2, height / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

export function checkHitToEnemy() {
  if (stateVariables.player.currWeapon == "gun") {
    stateVariables.bulletProjectileArray.forEach((bulletProjectile) => {
      for (let i = 0; i < stateVariables.enemiesArray.length; i++) {
        if (bulletProjectile.hits(stateVariables.enemiesArray[i])) {
          stateVariables.enemiesArray[i].health -= 1;
          bulletProjectile.evaporate();
          playSound(voice.diegoblins, 0.001);
          const bloodParticle = new BloodParticle(
            stateVariables.enemiesArray[i].startPoint.x -
              stateVariables.bgImage.startPoint.x,
            stateVariables.enemiesArray[i].startPoint.y -
              stateVariables.bgImage.startPoint.y
          );
          bloodParticle.updateState();
          stateVariables.bloodParticleArray.push(bloodParticle);
        }
      }
    });
  } else if (
    stateVariables.player.currWeapon == "axe" &&
    stateVariables.player.isAttacking
  ) {
    for (let i = 0; i < stateVariables.enemiesArray.length; i++) {
      if (stateVariables.axe.hits(stateVariables.enemiesArray[i])) {
        stateVariables.enemiesArray[i].health -= 0.1;
        playSound(voice.diegoblins, 0.01);

        const bloodParticle = new BloodParticle(
          stateVariables.enemiesArray[i].startPoint.x -
            stateVariables.bgImage.startPoint.x,
          stateVariables.enemiesArray[i].startPoint.y -
            stateVariables.bgImage.startPoint.y
        );
        bloodParticle.updateState();
        stateVariables.bloodParticleArray.push(bloodParticle);
      }
    }
  }
  stateVariables.fireProjectileArray.forEach((fireProjectile) => {
    if (fireProjectile.owner == "player") {
      for (let i = 0; i < stateVariables.enemiesArray.length; i++) {
        if (fireProjectile.hits(stateVariables.enemiesArray[i])) {
          stateVariables.enemiesArray[i].health -= 5;

          const bloodParticle = new BloodParticle(
            stateVariables.enemiesArray[i].startPoint.x -
              stateVariables.bgImage.startPoint.x,
            stateVariables.enemiesArray[i].startPoint.y -
              stateVariables.bgImage.startPoint.y
          );
          bloodParticle.updateState();
          stateVariables.bloodParticleArray.push(bloodParticle);
          if (!stateVariables.enemiesArray[i].isAlive) {
            stateVariables.player.score++;
            stateVariables.enemiesArray.splice(i, 1);
            stateVariables.animateEnemyArray.splice(i, 1);
          }
        }
      }
    } else if (fireProjectile.owner == "boss") {
      if (fireProjectile.hits(stateVariables.player)) {
        stateVariables.player.health -= 10;
        fireProjectile.evaporate();
        playSound(voice.ithurts, 1);
      }
    }
  });

  for (let i = 0; i < stateVariables.enemiesArray.length; i++) {
    if (!stateVariables.enemiesArray[i].isAlive) {
      stateVariables.player.score++;
      stateVariables.enemiesArray.splice(i, 1);
      stateVariables.animateEnemyArray.splice(i, 1);
    }
  }

  for (let i = stateVariables.bloodParticleArray.length - 1; i >= 0; i--) {
    stateVariables.bloodParticleArray[i].showAnimation();
    if (!stateVariables.bloodParticleArray[i].show) {
      stateVariables.bloodParticleArray.splice(i, 1);
    }
  }
}

export function checkHitToBoss() {
  if (stateVariables.boss.health > 0) {
    if (stateVariables.boss.hasWakeUp) {
      if (stateVariables.player.currWeapon == "gun") {
        stateVariables.bulletProjectileArray.forEach((bulletProjectile) => {
          if (bulletProjectile.hits(stateVariables.boss)) {
            stateVariables.boss.health -= 1;
            bulletProjectile.evaporate();
            playSound(voice.diegoblins, 0.01);

            const bloodParticle = new BloodParticle(
              stateVariables.boss.startPoint.x -
                stateVariables.bgImage.startPoint.x,
              stateVariables.boss.startPoint.y -
                stateVariables.bgImage.startPoint.y
            );
            bloodParticle.updateState();
            stateVariables.bloodParticleArray.push(bloodParticle);
          }
        });
      } else if (
        stateVariables.player.currWeapon == "axe" &&
        stateVariables.player.isAttacking
      ) {
        if (stateVariables.axe.hits(stateVariables.boss)) {
          stateVariables.boss.health -= 0.1;
          playSound(voice.diegoblins, 0.001);

          const bloodParticle = new BloodParticle(
            stateVariables.boss.startPoint.x -
              stateVariables.bgImage.startPoint.x,
            stateVariables.boss.startPoint.y -
              stateVariables.bgImage.startPoint.y
          );
          bloodParticle.updateState();
          stateVariables.bloodParticleArray.push(bloodParticle);
        }
      }
      stateVariables.fireProjectileArray.forEach((fireProjectile) => {
        if (fireProjectile.owner == "player") {
          if (fireProjectile.hits(stateVariables.boss)) {
            stateVariables.boss.health -= 10;
            fireProjectile.evaporate();

            const bloodParticle = new BloodParticle(
              stateVariables.boss.startPoint.x -
                stateVariables.bgImage.startPoint.x,
              stateVariables.boss.startPoint.y -
                stateVariables.bgImage.startPoint.y
            );
            bloodParticle.updateState();
            stateVariables.bloodParticleArray.push(bloodParticle);
          }
        }
      });
    }
  } else {
    stateVariables.boss.isAlive = false;
  }
}
