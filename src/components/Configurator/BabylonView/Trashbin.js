import * as BABYLON from 'babylonjs';

class Trashbin {
    constructor(scene, assetsManager, isTablet) {
        this.name = "Trashbin"
        this.scene = scene;
        this.assetsManager = assetsManager;
        this.path = "http://localhost:5000/MotileParts/Models/TrashbinPlaneRounded.glb"
        this.mesh = null;
        this.detectionArea = null;
        this.isTablet = isTablet;

        this.loadMesh();
    }

    loadMesh() {
        let trashbinTask = this.assetsManager.addMeshTask("", "", "", this.path);
        this.detectionArea = BABYLON.MeshBuilder.CreateBox(`trashbin_detection_box`, {width: 50, height: 10, depth: 50}, this.scene);
        this.detectionArea.position = new BABYLON.Vector3(this.isTablet ? -130 : -90,5,20);
        this.detectionArea.isPickable = false;
        this.detectionArea.visibility = false;

        trashbinTask.onSuccess = (task) => {     
            this.parent = new BABYLON.TransformNode(this.name);
            this.parent.position = new BABYLON.Vector3(this.isTablet ? -130 : -90,0,20);
            this.parent.setEnabled(true);

            this.mesh = task.loadedMeshes[1];
            this.mesh.scaling = new BABYLON.Vector3(20, 20, 20).multiplyByFloats(1, 1, -1);
            this.mesh.name = this.name+"_Meshes";
            this.mesh.parent = this.parent
    
            this.mesh.getChildMeshes().forEach(mesh => {
                mesh.receiveShadows = true;
                mesh.visibility = 0;
                mesh.isPickable = false;
                if(mesh.material)
                    mesh.material.backFaceCulling = true;
            });
        }  
    }
}

export default Trashbin;