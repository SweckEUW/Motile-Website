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
        this.ease = new BABYLON.CubicEase();
        this.ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
        
        if(this.name != "Hörmuschel" && this.name != "Display")
            this.loadMesh();
    }

    loadMesh() {
        let componentTask = this.assetsManager.addMeshTask("", "", "", this.path);
        componentTask.onSuccess = (task) => {     
            this.parent = new BABYLON.TransformNode(this.name);
            this.parent.position = new BABYLON.Vector3(80,0,20);
            this.parent.setEnabled(false);

            this.mesh = task.loadedMeshes[0];
            this.mesh.scaling = new BABYLON.Vector3(...this.scale).multiplyByFloats(-1, 1, 1);
            this.mesh.name = this.name+"_Meshes";
            this.mesh.parent = this.parent
            
            var boxCollider = BABYLON.MeshBuilder.CreateBox("Collider", {height: 3, width: this.size == "m" ? 47 : this.size == "s" ? 23 : 70 , depth: 38});
            boxCollider.position.y = 1.5;
            boxCollider.position.x = this.size == "m" ? 11 : 0;
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
            boxCollider.actionManager = new BABYLON.ActionManager(this.scene);
            boxCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => {  
                BABYLON.Animation.CreateAndStartAnimation("", this.parent, "position.y", 30, 4, this.parent.position.y, 9, 0, this.ease);
                this.mesh.getChildMeshes().forEach(mesh => {
                    if(mesh.name != "All_clonedChild")
                        BABYLON.Animation.CreateAndStartAnimation("", mesh.material, "alpha", 30, 4, mesh.material.alpha, 0.8, 0, this.ease);
                });
            }));
            
            // Hover-out
            boxCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => {
                BABYLON.Animation.CreateAndStartAnimation("", this.parent, "position.y", 30, 4, this.parent.position.y, 5.3, 0, this.ease);
                this.mesh.getChildMeshes().forEach(mesh => {
                    if(mesh.name != "All_clonedChild")
                        BABYLON.Animation.CreateAndStartAnimation("", mesh.material, "alpha", 30, 4, mesh.material.alpha, 1, 0, this.ease);
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
        if (this.name.toLowerCase().includes("dummy")) {
            let parent = new BABYLON.TransformNode(this.name);
            parent.position = new BABYLON.Vector3(position._x,position._y,position._z);
            parent.parent = this.scene.getNodeByName("Phone");

            let localMesh = new BABYLON.TransformNode(this.name+"_Meshes");
            localMesh.scaling = new BABYLON.Vector3(1000, 1000, 1000);
            localMesh.parent = parent;

            var boxCollider = BABYLON.MeshBuilder.CreateBox("Collider", {height: 3, width: this.size == "m" ? 47 : this.size == "s" ? 23 : 70 , depth: 38});
            boxCollider.position.y = 1.5;
            boxCollider.position.x = this.size == "m" ? 11 : 0;
            boxCollider.visibility = 0;
            boxCollider.parent = parent;
           
            this.mesh.getChildMeshes().forEach(mesh => {
                let clone = mesh.createInstance(mesh.name + '_' + position._x);
                clone.parent = localMesh;
                clone.sourceMesh.receiveShadows = true;
                clone.sourceMesh.visibility = 1;
                clone.isPickable = false;
                this.colorMesh(clone.sourceMesh,color);
                this.shadowGenerator.getShadowMap().renderList.push(clone);
            })
            BABYLON.Animation.CreateAndStartAnimation("", parent, "position.y", 30,15, 30, 5.3, 0, this.ease);

            // Hover-over
            boxCollider.actionManager = new BABYLON.ActionManager(this.scene);
            boxCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,() => {  
                BABYLON.Animation.CreateAndStartAnimation("", parent, "position.y", 30, 4, parent.position.y, 9, 0, this.ease);
                this.mesh.getChildMeshes().forEach(mesh => {
                    if(mesh.name != "All_clonedChild")
                        BABYLON.Animation.CreateAndStartAnimation("", mesh.material, "alpha", 30, 4, mesh.material.alpha, 0.8, 0, this.ease);
                });
            }));
            
            // Hover-out
            boxCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,() => {
                BABYLON.Animation.CreateAndStartAnimation("", parent, "position.y", 30, 4, parent.position.y, 5.3, 0, this.ease);
                this.mesh.getChildMeshes().forEach(mesh => {
                    if(mesh.name != "All_clonedChild")
                        BABYLON.Animation.CreateAndStartAnimation("", mesh.material, "alpha", 30, 4, mesh.material.alpha, 1, 0, this.ease);
                });
            }));
            document.dispatchEvent(new CustomEvent("addClonedDummy", {detail:{parent: parent}}));
            
        }else {
            this.parent.setEnabled(true);
            if(position){
                this.parent.position = new BABYLON.Vector3(position._x,position._y,position._z);
                this.parent.parent = this.scene.getNodeByName("Phone");
            }
            
            this.mesh.getChildMeshes().forEach(mesh => {
                this.colorMesh(mesh,color);
                BABYLON.Animation.CreateAndStartAnimation("", mesh, "visibility", 30,15, 0, 1, 0, this.ease);
            });
    
            BABYLON.Animation.CreateAndStartAnimation("", this.parent, "position.y", 30,15, 30, 5.3, 0, this.ease);
        }
    }

    reset() {
        this.parent.parent = null;
        this.parent.position = new BABYLON.Vector3(80,0,20);
        this.parent.scaling = new BABYLON.Vector3(1,1,1);
        this.parent.setEnabled(false);
    }

    colorMesh(mesh,color){
        if(mesh.material && this.name != "Kleines Rückdisplay" && this.name != "Großes Rückdisplay"){ // && mesh.material.name == "Soft Touch Black"
            color = this.hexToRgb(color);
            mesh.material.albedoColor = new BABYLON.Color3(color.r,color.g,color.b); 
        }
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

export default Component;