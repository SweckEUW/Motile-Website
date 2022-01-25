import * as BABYLON from 'babylonjs';

class Component {
    constructor(scene, assetsManager, shadowGenerator, motilePart) {
        this.scene = scene;
        this.assetsManager = assetsManager;
        this.shadowGenerator = shadowGenerator;

        let data = motilePart["3DData"]
        this.path = data.path;
        this.name = motilePart.name;;
        this.scale = data.scale;
        this.mesh = null;
        this.instances = 0;
        let metaData = motilePart["metaData"];

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

    cloneMesh(color,position){
        this.instances++;
        let parent = new BABYLON.TransformNode(this.name+"_"+this.instances);
        parent.position = position ? position : new BABYLON.Vector3(120,0,110);
        // parent.rotation = new BABYLON.Vector3(0,2.09,0);

        var boxCollider = BABYLON.MeshBuilder.CreateBox("Collider", {height: 3, width: 47, depth: 38});
        boxCollider.position.y = 1.5;
        boxCollider.visibility = 0;
        boxCollider.parent = parent;

        this.mesh.getChildMeshes().forEach(mesh => {
            let clone = mesh.createInstance(mesh.name+"_"+this.instances);
            clone.scaling = new BABYLON.Vector3(...this.scale);
            clone.parent = parent;
            clone.sourceMesh.receiveShadows = true;
            // this.shadowGenerator.getShadowMap().renderList.push(clone);
            mesh.material.albedoColor = BABYLON.Color3.FromHexString(color);
        });

        // Hover-over animation
        var ease = new BABYLON.CubicEase();
        boxCollider.actionManager = new BABYLON.ActionManager(this.scene);
        boxCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => {  
            BABYLON.Animation.CreateAndStartAnimation("", parent, "position.y", 30,8, parent.position.y, 6, 0, ease);
        }));

        boxCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => {
            BABYLON.Animation.CreateAndStartAnimation("", parent, "position.y", 30,8, parent.position.y, 2.5, 0, ease);
        }));

        // Physics
        // var boxCollider = BABYLON.MeshBuilder.CreateBox(this.mesh.name+"_Collider", {height: 3, width: 47, depth: 38});
        // boxCollider.position.y = 1.5;
        // boxCollider.isVisible = false;
        // boxCollider.parent = parent;

        // var physicsRoot = new BABYLON.Mesh("physicsRoot", this.scene);
        // physicsRoot.addChild(parent);
        // physicsRoot.position.y = 40;

        // boxCollider.physicsImpostor = new BABYLON.PhysicsImpostor(boxCollider, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.1 }, this.scene);
        // physicsRoot.physicsImpostor = new BABYLON.PhysicsImpostor(physicsRoot, BABYLON.PhysicsImpostor.NoImpostor, { mass: 200 }, this.scene);
    }

}

export default Component;