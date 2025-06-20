import { DirectionalLight, AmbientLight } from "three";

function createLights() {
   const directionalLight = new DirectionalLight("white", 7);
   const ambientLight = new AmbientLight("white", 3);
   directionalLight.position.set(10, 10, 10);
   return { directionalLight, ambientLight };
}

export { createLights };
