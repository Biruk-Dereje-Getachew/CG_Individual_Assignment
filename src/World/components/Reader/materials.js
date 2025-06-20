import { MeshStandardMaterial } from "three";

function createMaterials() {
   const frameMaterial = new MeshStandardMaterial({
      color: "black",
      roughness: 1.0,
      metalness: 0.0,
   }); // Frame Material
   const screenMaterial = new MeshStandardMaterial({
      color: 0xeeeeee,
      roughness: 1.0,
      metalness: 0.0,
   }); // Screen Material
   const buttonMaterial = new MeshStandardMaterial({
      color: "silver",
      roughness: 0.0,
      metalness: 1.0,
   }); // Meterial of the buttons

   return { frameMaterial, screenMaterial, buttonMaterial };
}

export { createMaterials };
