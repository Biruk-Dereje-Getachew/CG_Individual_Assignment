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

      // Text display element
      this.tooltip = document.createElement("div");
      this.tooltip.style.position = "absolute";
      this.tooltip.style.padding = "6px 12px";
      this.tooltip.style.background = "rgba(0,0,0,0.7)";
      this.tooltip.style.color = "#fff";
      this.tooltip.style.borderRadius = "4px";
      this.tooltip.style.pointerEvents = "none";
      this.tooltip.style.display = "none";
      this.tooltip.style.fontFamily = "sans-serif";
      this.tooltip.style.fontSize = "13px";
      document.body.appendChild(this.tooltip);

      canvas.addEventListener("mousemove", (event) => {
         const rect = this.canvas.getBoundingClientRect();
         this.pointerX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
         this.pointerY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

         this.latestMouseEvent = event; // store for tooltip positioning
      });

      canvas.addEventListener("click", (event) => this.onClick(event));
   }

   tick() {
      this.mouse.set(this.pointerX, this.pointerY);
      this.raycaster.setFromCamera(this.mouse, this.camera);

      const objectsToTest = [];
      this.scene.traverse((child) => {
         if (child.isMesh && child.material && "emissive" in child.material && "emissiveIntensity" in child.material) {
            objectsToTest.push(child);
         }
      });

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

   onClick(event) {
      this.raycaster.setFromCamera(this.mouse, this.camera);

      const objectsToTest = [];
      this.scene.traverse((child) => {
         if (child.isMesh) {
            objectsToTest.push(child);
         }
      });

      const intersects = this.raycaster.intersectObjects(objectsToTest, true);
      if (intersects.length > 0) {
         const hit = intersects[0].object;

         const label = hit.name || hit.userData.label || "Unnamed Object";

         // Show tooltip near mouse
         const x = event.clientX;
         const y = event.clientY;

         this.tooltip.innerText = label;
         this.tooltip.style.left = `${x + 10}px`;
         this.tooltip.style.top = `${y + 10}px`;
         this.tooltip.style.display = "block";

         // Optional: hide after a few seconds
         clearTimeout(this._hideTimeout);
         this._hideTimeout = setTimeout(() => {
            this.tooltip.style.display = "none";
         }, 3000);
      }
   }
}

export { RaycasterSystem };
