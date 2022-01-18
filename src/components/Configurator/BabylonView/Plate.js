import * as BABYLON from 'babylonjs';

class Plate {
    constructor(assetsManager, shadowGenerator) {
        this.assetsManager = assetsManager;
        this.shadowGenerator = shadowGenerator;

        this.loadMesh();
    }

    loadMesh() {
        let plateTask = this.assetsManager.addMeshTask("", "", "", "http://localhost:5000/MotileParts/Models/plate.glb");
        plateTask.onSuccess = (task) => {     
            let plate = task.loadedMeshes[0];
            plate.scaling = new BABYLON.Vector3(1000,1000,1000);
            plate.position = new BABYLON.Vector3(60,0,30);
            plate.rotation = new BABYLON.Vector3(0,2.09,0);
            plate.name = "Plate";
            plate.getChildMeshes().forEach(mesh => {
                mesh.receiveShadows = true;
                // this.shadowGenerator.getShadowMap().renderList.push(mesh);
                mesh.isPickable = false;
            });
           
        }    
    }
}

export default Plate;