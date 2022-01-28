import * as BABYLON from 'babylonjs';

class Component {
    constructor(scene, assetsManager, shadowGenerator, motilePart) {
        this.scene = scene;
        this.assetsManager = assetsManager;
        this.shadowGenerator = shadowGenerator;

        let data = motilePart["3DData"];
        this.path = data.path;
        this.name = motilePart.name;;
        this.scale = data.scale;
        this.size = motilePart.metaData.size;
        this.mesh = null;
        this.parent = null; 
        this.ease = null;
        this.loadMesh();
    }

    loadMesh() {
        let componentTask = this.assetsManager.addMeshTask("", "", "", this.path);
        componentTask.onSuccess = (task) => {     
            this.parent = new BABYLON.TransformNode(this.name);
            this.parent.position = new BABYLON.Vector3(80,0,20);
            this.parent.setEnabled(false);

            this.mesh = task.loadedMeshes[0];
            this.mesh.scaling = new BABYLON.Vector3(...this.scale);
            this.mesh.name = this.name+"_Meshes";
            this.mesh.parent = this.parent
            
            var boxCollider = BABYLON.MeshBuilder.CreateBox("Collider", {height: 3, width: this.size == "m" ? 47 : this.size == "s" ? 23 : 70 , depth: 38});
            boxCollider.position.y = 1.5;
            boxCollider.position.x = this.size == "m" ? -11 : 0;
            boxCollider.visibility = 0;
            boxCollider.parent = this.parent;

            this.mesh.getChildMeshes().forEach(mesh => {
                mesh.receiveShadows = true;
                this.shadowGenerator.getShadowMap().renderList.push(mesh);
                mesh.visibility = 0;
                mesh.isPickable = false;
                if(mesh.material)
                    mesh.material.backFaceCulling = true;
            });

            // Hover-over
            this.ease = new BABYLON.CubicEase();
            this.ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
            boxCollider.actionManager = new BABYLON.ActionManager(this.scene);
            boxCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => {  
                BABYLON.Animation.CreateAndStartAnimation("", this.parent, "position.y", 30,4, this.parent.position.y, 6, 0, this.ease);
                this.mesh.getChildMeshes().forEach(mesh => {
                    BABYLON.Animation.CreateAndStartAnimation("", mesh.material, "alpha", 30,4, mesh.material.alpha, 0.8, 0, this.ease);
                });
            }));
            
            // Hover-out
            boxCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => {
                BABYLON.Animation.CreateAndStartAnimation("", this.parent, "position.y", 30,4, this.parent.position.y, 2.5, 0, this.ease);
                this.mesh.getChildMeshes().forEach(mesh => {
                    BABYLON.Animation.CreateAndStartAnimation("", mesh.material, "alpha", 30,4, mesh.material.alpha, 1, 0, this.ease);
                });
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

    place(color,position){
        this.parent.setEnabled(true);

        if(position)
            this.parent.position = new BABYLON.Vector3(position._x,position._y,position._z);
        
        this.mesh.getChildMeshes().forEach(mesh => {
            if(mesh.material)
                mesh.material.albedoColor = BABYLON.Color3.FromHexString(color);
            BABYLON.Animation.CreateAndStartAnimation("", mesh, "visibility", 30,15, 0, 1, 0, this.ease);
        });

        BABYLON.Animation.CreateAndStartAnimation("", this.parent, "position.y", 30,15, 30, 2.5, 0, this.ease);
    }

}

export default Component;