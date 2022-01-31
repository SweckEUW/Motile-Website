import * as BABYLON from 'babylonjs';

class Bridges {
    constructor(scene, assetsManager, shadowGenerator) {
        this.scene = scene;
        this.assetsManager = assetsManager;
        this.shadowGenerator = shadowGenerator;

        this.bridges = [
            {path: "http://localhost:5000/MotileParts/Models/back/frames/large-corner.glb", types: ["top-left","top-right","bottom-left","bottom-right"], size: "m"},
            {path: "http://localhost:5000/MotileParts/Models/back/frames/large-side.glb", types: ["left-side","right-side"], size: "m"},
            {path: "http://localhost:5000/MotileParts/Models/back/frames/large-top.glb", types: ["top-side","bottom-side"], size: "m"},
            {path: "http://localhost:5000/MotileParts/Models/back/frames/large-all.glb", types: ["middle"], size: "m"},
            {path: "http://localhost:5000/MotileParts/Models/back/frames/small-corner.glb", types: ["top-left","top-right","bottom-left","bottom-right"], size: "s"},
            {path: "http://localhost:5000/MotileParts/Models/back/frames/small-side.glb",  types: ["left-side","right-side"], size: "s"},
            {path: "http://localhost:5000/MotileParts/Models/back/frames/small-top.glb", types: ["top-side","bottom-side"], size: "s"},
            {path: "http://localhost:5000/MotileParts/Models/back/frames/small-all.glb", types: ["middle"], size: "s"},
            {path: "http://localhost:5000/MotileParts/Models/back/frames/xlarge-corner.glb", types: ["special1"], size: "l"},
            {path: "http://localhost:5000/MotileParts/Models/back/frames/wide.glb", types: ["special2"], size: "l"},
            {path: "http://localhost:5000/MotileParts/Models/back/frames/xlarge-top.glb", types: ["bottom-side"], size: "l"}
        ];
        this.ease = new BABYLON.CubicEase();
        this.ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
        this.instances = 0;
        this.loadMeshes();
    }

    loadMeshes() {
        this.bridges.forEach(bridge => {
            let componentTask = this.assetsManager.addMeshTask("", "", "", bridge.path);
            componentTask.onSuccess = (task) => {     
                bridge.mesh = task.loadedMeshes[0];
                bridge.mesh.name = bridge.types[0]+"_Bridge";
                bridge.mesh.setEnabled(false);

                bridge.mesh.getChildMeshes().forEach(mesh => {
                    mesh.receiveShadows = true;
                    this.shadowGenerator.getShadowMap().renderList.push(mesh);
                    mesh.visibility = 0;
                    mesh.isPickable = false;
                    if(mesh.material)
                        mesh.material.backFaceCulling = true;
                });
            }   
        });
         
    }

    cloneAndPlace(type,size,motilePartNode,neighbourAfterSnapBox,neighbourBeforeSnapBox){
        let mesh;
        this.bridges.forEach(bridge => {
            if(bridge.size == size && bridge.types.find(localType => localType === type))
                mesh = bridge.mesh;

            if(size === "m" && ((type === "top-side" && neighbourAfterSnapBox.type == "top-right") || (type === "bottom-side" && neighbourAfterSnapBox.type == "bottom-right")))
                mesh = this.bridges[0].mesh;

            if(size === "m" && type === "middle" && neighbourAfterSnapBox.type == "right-side")
                mesh = this.bridges[1].mesh;

            // L size
            if(size === "l" && (neighbourAfterSnapBox.type == "bottom-right" || neighbourBeforeSnapBox.type == "bottom-left"))
                mesh = this.bridges[8].mesh;
            if(size === "l" && neighbourAfterSnapBox.type == "bottom-right" && neighbourBeforeSnapBox.type == "bottom-left")
                mesh = this.bridges[9].mesh;
        });
        
        let parent = new BABYLON.TransformNode("Bridge_"+type+"_"+this.instances);
        parent.position.x += size === "m" ? 11 : 0;
        parent.parent = motilePartNode;
        parent.scaling = new BABYLON.Vector3(1000,1000,1000);
        parent.isPickable = false;

        if(type === "top-left") 
            parent.scaling = new BABYLON.Vector3(-1000,1000,-1000);
        if(type === "left-side") 
            parent.scaling = new BABYLON.Vector3(-1000,1000,1000);
        if(type === "top-right" || (size === "m" && type === "top-side")) 
            parent.scaling = new BABYLON.Vector3(1000,1000,-1000);
        if(type === "bottom-left") 
            parent.scaling = new BABYLON.Vector3(-1000,1000,1000);
        if(type === "bottom-right" || (size === "m" && type === "bottom-side"))
            parent.scaling = new BABYLON.Vector3(1000,1000,1000);
        if(type === "bottom-side" && size !== "m") 
            parent.scaling = new BABYLON.Vector3(1000,1000,-1000);


        // Small Corner
        if(type === "top-left" && size === "s") 
            parent.scaling = new BABYLON.Vector3(1000,1000,-1000);
        if(type === "top-right" && size === "s") 
            parent.scaling = new BABYLON.Vector3(-1000,1000,-1000);
        if(type === "bottom-left" && size === "s") 
            parent.scaling = new BABYLON.Vector3(1000,1000,1000);
        if(type === "bottom-right" && size === "s") 
            parent.scaling = new BABYLON.Vector3(-1000,1000,1000);

        // L-Size
        if(size == "l")
            parent.scaling = new BABYLON.Vector3(1000,1000,1000);
        if(size == "l" && neighbourBeforeSnapBox.type == "bottom-left" && neighbourAfterSnapBox.type != "bottom-right")
            parent.scaling = new BABYLON.Vector3(-1000,1000,1000);
        if(size === "l" && neighbourAfterSnapBox.type == "bottom-right" && neighbourBeforeSnapBox.type == "bottom-left"){
            parent.scaling = new BABYLON.Vector3(1000,1000,-1000);
            parent.position = new BABYLON.Vector3(-35,0,12);
        }
            
        mesh.getChildMeshes().forEach(mesh => {
            let clone = mesh.createInstance(mesh.name+"_"+this.instances);
            clone.parent = parent;
            clone.sourceMesh.receiveShadows = true;
            clone.sourceMesh.visibility = 1;
            clone.isPickable = false;
            this.shadowGenerator.getShadowMap().renderList.push(clone);
        });

        // mesh.getChildMeshes().forEach(mesh => {
        //     BABYLON.Animation.CreateAndStartAnimation("", mesh, "visibility", 30,15, 0, 1, 0, this.ease);
        // });

        // BABYLON.Animation.CreateAndStartAnimation("", parent, "position.y", 30,15, 30, 2.5, 0, this.ease);
        
        this.instances++;     
        
        return {
            name: mesh.name.replace("_Bridge","") + "_" + size, 
            scale: {
                x: parent.scaling.x /1000,
                z: -parent.scaling.z /1000
            }
        }
    }

    changeBridgeColor(color){
        color = this.hexToRgb(color);
        this.bridges.forEach(bridge => {
            bridge.mesh.getChildMeshes().forEach(mesh => {
                if(mesh.material)
                    mesh.material.albedoColor = new BABYLON.Color3(color.r,color.g,color.b); 
            });
        });
    }

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16)/255 - 0.07,
          g: parseInt(result[2], 16)/255 - 0.07,
          b: parseInt(result[3], 16)/255 - 0.07
        } : null;
    }

}

export default Bridges;