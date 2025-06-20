import { Mesh } from "three";
import { createGeometries } from "./geometries";
import { createMaterials } from "./materials";

function createMeshes() {
   const geometries = createGeometries();
   const materials = createMaterials();

   const frameMesh = new Mesh(geometries.frameGeo, materials.frameMaterial); // Frame Mesh
   frameMesh.name = "Frame";
   const screenMesh = new Mesh(geometries.screenGeo, materials.screenMaterial); // Screen Mesh
   screenMesh.name = "Screen";

   const sidebuttonMesh = new Mesh(geometries.sideButtonGeo, materials.buttonMaterial); // Side Button Mesh
   sidebuttonMesh.name = "Decrease By One Page";

   const sidebutton2 = sidebuttonMesh.clone();
   sidebutton2.name = "Decrease By 10% of the length of the book";

   const menuButtonMesh = new Mesh(geometries.menuButtonGeo, materials.buttonMaterial); // Side Button Mesh
   menuButtonMesh.name = "Book Menu";

   return { frameMesh, screenMesh, sidebuttonMesh, sidebutton2, menuButtonMesh };
}

export { createMeshes };
