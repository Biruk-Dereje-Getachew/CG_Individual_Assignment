import { OrbitControls } from "three/examples/jsm/Addons.js";

function createControls(camera, canvas) {
   const controls = new OrbitControls(camera, canvas);
   controls.enableDamping = true;
   controls.autoRotate = false;
   controls.tick = () => controls.update();
   return controls;
}

export { createControls };
