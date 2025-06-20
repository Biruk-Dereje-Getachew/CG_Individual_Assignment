import { Clock } from "three";

let animationId;
const clock = new Clock();

class Loop {
   constructor(camera, scene, renderer) {
      this.camera = camera;
      this.scene = scene;
      this.renderer = renderer;
      this.updatables = [];
   }

   start() {
      const loop = () => {
         this.tick();
         this.renderer.render(this.scene, this.camera);
         animationId = requestAnimationFrame(loop);
      };
      loop();
   }
   stop() {
      cancelAnimationFrame(animationId);
   }
   tick() {
      const delta = clock.getDelta();
      for (const updatable of this.updatables) {
         updatable.tick(delta);
      }
   }
}

export { Loop };
