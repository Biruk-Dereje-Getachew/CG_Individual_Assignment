import { BoxGeometry, PlaneGeometry, CylinderGeometry } from "three";

function createGeometries() {
   const deviceWidth = 0.5625; // Total device width
   const deviceHeight = 1; // Total device height
   const deviceDepth = 0.04; // Total device depth
   const screenFactor = 0.85; // Specifies how much of the area of the frame is covered by the screen
   const buttonsGroupFactor = 0.1; // Specifies how much of the area along the length of the screen the buttons should take up together

   const frameGeo = new BoxGeometry(deviceWidth, deviceHeight, deviceDepth); // Frame Geometry
   const screenGeo = new PlaneGeometry(deviceWidth * screenFactor, deviceHeight * screenFactor); // Screen Geometry
   const sideButtonGeo = new BoxGeometry(buttonsGroupFactor * deviceHeight, deviceDepth * 0.85); // Geometry of a single side button
   const menuButtonGeo = new CylinderGeometry((deviceHeight * (1 - screenFactor)) / 4, deviceDepth);

   return { frameGeo, screenGeo, sideButtonGeo, menuButtonGeo };
}
