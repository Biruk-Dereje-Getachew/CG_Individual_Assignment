import { DirectionalLight, AmbientLight } from "three";

function createLights() {
   const directionalLight = new DirectionalLight("white", 20);
   const ambientLight = new AmbientLight("white", 3);
   directionalLight.position.set(5, 5, 0);
   return { directionalLight, ambientLight };
}

export { createLights };
