import { MeshBasicMaterial, MeshStandardMaterial, Texture } from "three";

function createMaterials() {
   const frameMaterial = new MeshStandardMaterial({
      color: "black",
      roughness: 1.0,
      metalness: 0.0,
   }); // Frame Material

   // Get the preloaded image
   const image = document.getElementById("source-image");

   // Create the texture directly from the image
   const texture = new Texture(image);
   texture.needsUpdate = true;

   const screenMaterial = new MeshBasicMaterial({
      map: texture,
   });

   const buttonMaterial = new MeshStandardMaterial({
      color: 0xeeeeee,
      roughness: 0.1,
      metalness: 0.9,
   }); // Meterial of the buttons

   return { frameMaterial, screenMaterial, buttonMaterial };
}

export { createMaterials };
