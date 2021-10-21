import * as BABYLON from 'babylonjs';

class Component {
    constructor(assetsManager, motilePart) {
        this.assetsManager = assetsManager;
        
        let data = motilePart["3DData"]
        this.path = data.path;
        this.name = motilePart.name;;
        this.scale = data.scale;

        this.loadMesh();
    }

    loadMesh() {
        let componentTask = this.assetsManager.addMeshTask("", "", "", this.path);
        componentTask.onSuccess = (task) => {     
            let component = task.loadedMeshes[0];
            component.scaling = new BABYLON.Vector3(...this.scale);
            component.name = this.name;
        }    
    }
}

export default Component;