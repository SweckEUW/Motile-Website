class Component {
    constructor(assetsManager, motilePart) {
        this.assetsManager = assetsManager;
        console.log(motilePart);
        // this.path = path;
        // this.name = name;
        //this.scale = scale;

        //this.loadMesh();
    }

    loadMesh() {
        let componentTask = this.assetsManager.addMeshTask("", "", "", this.path);
        componentTask.onSuccess = (task) => {     
            let component = task.loadedMeshes[0];
            component.scaling = this.scale;
            component.name = this.name;
        }    
    }
}

export default Component;