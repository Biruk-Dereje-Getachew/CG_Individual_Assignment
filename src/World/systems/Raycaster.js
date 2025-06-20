import { Raycaster, Vector2, Color } from "three";

class RaycasterSystem {
   constructor(camera, canvas, scene) {
      this.camera = camera;
      this.canvas = canvas;
      this.scene = scene;

      this.raycaster = new Raycaster();
      this.mouse = new Vector2();
      this.intersected = null;
      this.originalEmissive = new Color();

      this.pointerX = 0;
      this.pointerY = 0;

      // Track pointer position
      this.canvas.addEventListener("mousemove", (event) => {
         const rect = this.canvas.getBoundingClientRect();
         this.pointerX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
         this.pointerY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      });
   }

   tick() {
      // Update mouse coordinates
      this.mouse.set(this.pointerX, this.pointerY);

      // Cast the ray
      this.raycaster.setFromCamera(this.mouse, this.camera);

      // Collect objects with emissive support
      const objectsToTest = [];
      this.scene.traverse((child) => {
         if (child.isMesh && child.material && "emissive" in child.material && "emissiveIntensity" in child.material) {
            objectsToTest.push(child);
         }
      });

      // Find intersections
      const intersects = this.raycaster.intersectObjects(objectsToTest, true);

      if (intersects.length > 0) {
         const hit = intersects[0].object;

         if (this.intersected !== hit) {
            if (this.intersected) {
               this.intersected.material.emissive.copy(this.originalEmissive);
            }

            this.intersected = hit;

            if (!hit.userData._clonedMaterial) {
               hit.material = hit.material.clone();
               hit.userData._clonedMaterial = true;
            }

            this.originalEmissive.copy(hit.material.emissive);
            hit.material.emissive.set(0xaaaaaa);
            hit.material.emissiveIntensity = 1.5;
         }
      } else {
         if (this.intersected) {
            this.intersected.material.emissive.copy(this.originalEmissive);
            this.intersected = null;
         }
      }
   }
}

export { RaycasterSystem };
