import { createCamera } from "./components/camera";
import { createScene } from "./components/scene";
import { createLights } from "./components/lights";
import { Reader } from "./components/Reader/Reader";

import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";
import { Loop } from "./systems/Loop";
import { createControls } from "./systems/controls";
import { RaycasterSystem } from "./systems/Raycaster";

let renderer;
let camera;
let scene;
let loop;

class World {
   constructor(container) {
      renderer = createRenderer();
      camera = createCamera();
      scene = createScene();
      loop = new Loop(camera, scene, renderer);
      container.appendChild(renderer.domElement);

      // Adding Lights to the scene
      const lights = createLights();
      scene.add(lights.directionalLight, lights.ambientLight);

      // Adding Reader
      const reader = new Reader();
      scene.add(reader);
      // Adding camera controls
      const controls = createControls(camera, renderer.domElement);

      container.addEventListener("click", () => {
         controls.autoRotate = !controls.autoRotate;
      });
      const raycasterSystem = new RaycasterSystem(camera, renderer.domElement, scene);

      // Adding things that animate to the updatables array of Loop
      loop.updatables.push(controls);
      loop.updatables.push(raycasterSystem);

      const resizer = new Resizer(container, camera, renderer);
   }
   render() {
      renderer.render(scene, camera);
   }
   start() {
      loop.start();
   }
   stop() {
      loop.stop();
   }
}

export { World };
