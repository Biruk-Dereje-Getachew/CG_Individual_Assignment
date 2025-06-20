import { Mesh } from "three";
import { createGeometries } from "./geometries";
import { createMaterials } from "./materials";

function createMeshes() {
   const geometries = createGeometries();
   const materials = createMaterials();

   const frameMesh = new Mesh(geometries.frameGeo, materials.frameMaterial); // Frame Mesh
   const screenMesh = new Mesh(geometries.screenGeo, materials.screenMaterial); // Screen Mesh
   const sidebuttonMesh = new Mesh(geometries.sideButtonGeo, materials.buttonMaterial); // Side Button Mesh
   const menubuttonMesh = new Mesh(geometries.menuButtonGeo, materials.buttonMaterial); // Side Button Mesh

   return { frameMesh, screenMesh, sidebuttonMesh, menubuttonMesh };
}

export { createMeshes };
