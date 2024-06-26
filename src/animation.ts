//class that changes frame of animation
export class AnimateEntity {
  no_of_frames: number;
  frameIndex: number;
  time: number;
  animation_speed: number;
  frames_array: HTMLImageElement[];
  constructor(frames_array: HTMLImageElement[], animation_speed: number = 5) {
    this.animation_speed = animation_speed;
    this.frames_array = frames_array;
    this.no_of_frames = frames_array.length;
    this.frameIndex = 0;
    this.time = 0;
  }

  change_frames() {
    let frameSpeed = this.animation_speed;

    if (this.time > frameSpeed) {
      this.frameIndex += 1;

      if (this.frameIndex == this.frames_array.length) {
        this.frameIndex = 0;
      }
      this.time = 0;
    }
    this.time++;
  }
  frame() {
    return this.frameIndex;
  }
}
