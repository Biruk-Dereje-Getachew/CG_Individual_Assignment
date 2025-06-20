import { createCamera } from "./components/camera";
import { createScene } from "./components/scene";
import { createLights } from "./components/lights";
import { createCube } from "./components/cube";

import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";
import { Loop } from "./systems/Loop";
import { createControls } from "./systems/controls";

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

      // Adding camera controls
      const controls = createControls(camera, renderer.domElement);

      // Adding things that animate to the updatables array of Loop
      loop.updatables.push(controls);

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
