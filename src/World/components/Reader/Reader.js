import { Box3, Group, Vector3 } from "three";

import { createMeshes } from "./meshes";

class Reader extends Group {
   constructor() {
      super();

      // Storing the meshes in a variable
      const meshes = createMeshes();

      // Getting device dimensions already calculated from those given in geometries.js
      const frameBoundingBox = new Box3().setFromObject(meshes.frameMesh);
      const frameSize = new Vector3();
      frameBoundingBox.getSize(frameSize);
      const deviceWidth = frameSize.x; // Total device width
      const deviceHeight = frameSize.y; // Total device height
      const deviceDepth = frameSize.z; // Total device depth

      const screenBoundingBox = new Box3().setFromObject(meshes.screenMesh);
      const screenSize = new Vector3();
      screenBoundingBox.getSize(screenSize);
      const screenWidth = screenSize.x; // Total device width
      const screenHeight = screenSize.y; // Total device height
      const screenDepth = screenSize.z; // Total device depth

      const sideButtonBoundingBox = new Box3().setFromObject(meshes.sidebuttonMesh);
      const sideButtonSize = new Vector3();
      sideButtonBoundingBox.getSize(sideButtonSize);
      const sideButtonWidth = sideButtonSize.x; // Total device width
      const sideButtonHeight = sideButtonSize.y; // Total device height
      const sideButtonDepth = sideButtonSize.z; // Total device depth
      const space = (0.1 * sideButtonHeight) / 0.45;

      // Adding frame and screen to the Reader Group
      this.add(meshes.frameMesh, meshes.screenMesh);
      meshes.screenMesh.position.z += deviceDepth / 2 + 0.0001;

      // Creating groups for left and right buttons
      //Left
      const leftButtonGroup = new Group();
      leftButtonGroup.add(meshes.sidebuttonMesh, meshes.sidebutton2);
      this.add(leftButtonGroup);
      leftButtonGroup.position.x = -deviceWidth / 2;
      leftButtonGroup.position.y = screenHeight / 4;
      meshes.sidebuttonMesh.position.y = (space + sideButtonHeight) / 2;
      meshes.sidebutton2.position.y = -(space + sideButtonHeight) / 2;
      // Right
      const rightButtonGroup = leftButtonGroup.clone();
      this.add(rightButtonGroup);
      rightButtonGroup.position.x = deviceWidth / 2;
      rightButtonGroup.position.y = screenHeight / 4;

      // Adding menu button
      this.add(meshes.menuButtonMesh);
      meshes.menuButtonMesh.rotation.x = Math.PI / 2;
      meshes.menuButtonMesh.position.y = -screenHeight / 2 - (deviceHeight - screenHeight) / 4;
      meshes.menuButtonMesh.position.z += 0.003;
   }
}

export { Reader };
