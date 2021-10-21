class Plate {
    constructor(assetsManager, name, scale) {
        this.assetsManager = assetsManager;
        this.path = "http://localhost:5000/babylon/plate.glb";
        this.name = name;
        this.scale = scale;

        this.loadMesh();
    }

    loadMesh() {
        let plateTask = this.assetsManager.addMeshTask("", "", "", this.path);
        plateTask.onSuccess = (task) => {     
            let plate = task.loadedMeshes[0];
            plate.scaling = this.scale;
            plate.name = this.name;
        }    
    }
}

export default Plate;