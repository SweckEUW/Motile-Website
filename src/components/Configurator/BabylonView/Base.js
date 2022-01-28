import * as BABYLON from 'babylonjs';

class Base {
    constructor(scene, assetsManager, shadowGenerator, isTablet) {
        this.scene = scene;
        this.assetsManager = assetsManager;
        this.shadowGenerator = shadowGenerator;
        this.isTablet = isTablet;
        this.loadMesh();
    }

    loadMesh() {
        let plateTask = this.assetsManager.addMeshTask("", "", "", this.isTablet ? "http://localhost:5000/MotileParts/Models/plate-tablet.glb" : "http://localhost:5000/MotileParts/Models/plate.glb");
        plateTask.onSuccess = (task) => {     
            let plate = task.loadedMeshes[0];
            plate.name = "Base";
            plate.scaling = new BABYLON.Vector3(1000,1000,1000);
            plate.position = new BABYLON.Vector3(0,0,0);
            plate.parent = this.scene.getNodeByName("Phone");
            
            plate.getChildMeshes().forEach(mesh => {
                mesh.receiveShadows = true;
                this.shadowGenerator.getShadowMap().renderList.push(mesh);
                mesh.isPickable = false;
            });
        }    
    }
}

export default Base;