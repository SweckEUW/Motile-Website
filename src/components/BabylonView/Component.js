import * as BABYLON from 'babylonjs';

class Component {
    constructor(assetsManager, motilePart) {
        this.assetsManager = assetsManager;
        
        let data = motilePart["3DData"]
        this.path = data.path;
        this.name = motilePart.name;;
        this.scale = data.scale;
        this.mesh = null;
        this.instances = 0;

        this.loadMesh();
    }

    loadMesh() {
        let componentTask = this.assetsManager.addMeshTask("", "", "", this.path);
        componentTask.onSuccess = (task) => {     
            this.mesh = task.loadedMeshes[0];
            this.mesh.scaling = new BABYLON.Vector3(...this.scale);
            this.mesh.name = this.name;
            this.mesh.setEnabled(false);
        }    
    }

    cloneMesh(){
        this.instances++;
        let parent = new BABYLON.TransformNode(this.name+"_"+this.instances);
        parent.position = new BABYLON.Vector3(-80,0,0);
        this.mesh.getChildMeshes().forEach(mesh => {
            let clone = mesh.createInstance(mesh.name+"_"+this.instances);
            clone.scaling = new BABYLON.Vector3(...this.scale);
            clone.parent = parent;
        });
    }
}

export default Component;