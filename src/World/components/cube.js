import { BoxGeometry, MathUtils, Mesh, MeshStandardMaterial } from "three";

function createCube() {
   const geometry = new BoxGeometry(2, 2, 2);
   const material = new MeshStandardMaterial({
      color: "firebrick",
   });
   const cube = new Mesh(geometry, material);
   const radiansPerSecond = MathUtils.degToRad(30);
   cube.tick = (delta) => {
      cube.rotation.x += radiansPerSecond * delta;
   };
   return cube;
}

export { createCube };
