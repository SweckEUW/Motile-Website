import './BabylonView.css';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import React, { useEffect } from 'react';

function BabylonView(){

  let myRef = React.useRef(null)

  useEffect(() => {
    // init engine
    let engine = new BABYLON.Engine(myRef.current, true);
    window.addEventListener("resize", () => {
      engine.resize();
    });

    // init scene
    let scene = new BABYLON.Scene(engine);
    scene.clearColor = BABYLON.Color3.White();
    // scene.debugLayer.show();
    
    // init camera
    // let camera = new BABYLON.ArcRotateCamera("Camera", 1,1 ,200,new BABYLON.Vector3(-40,80,0),scene); 
    let camera = new BABYLON.ArcRotateCamera("Camera", 1,1 ,200,new BABYLON.Vector3(0,0,0),scene); 
		camera.attachControl(myRef.current);

    // init Light
    // new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);

    let assetsManager = new BABYLON.AssetsManager( scene );
    assetsManager.onTaskErrorObservable.add(function(task) {
      console.log('Task failed', task.errorObject.message, task.errorObject.exception);
    });

    // Loading Meshes
    var plateTask = assetsManager.addMeshTask("", "", "","./models/plate.glb");
    plateTask.onSuccess = (task) => {     
     let plate = task.loadedMeshes[0];
     plate.scaling = new BABYLON.Vector3(1000,1000,1000);
     plate.name = "Plate";
    }

    var moduleLTask = assetsManager.addMeshTask("", "", "","./models/module-large.glb");
    moduleLTask.onSuccess = (task) => {     
     let moduleL = task.loadedMeshes[0];
     moduleL.scaling = new BABYLON.Vector3(1000,1000,1000);
     moduleL.position = new BABYLON.Vector3(1,2,-55);
     moduleL.name = "moduleL";
    }

    var moduleSTask = assetsManager.addMeshTask("", "", "","./models/module-small.glb");
    moduleSTask.onSuccess = (task) => {     
     let moduleS = task.loadedMeshes[0];
     moduleS.scaling = new BABYLON.Vector3(1000,1000,1000);
     moduleS.position = new BABYLON.Vector3(0,2,0);
     moduleS.name = "moduleS";
    }

    var moduleXLTask = assetsManager.addMeshTask("", "", "","./models/module-xlarge.glb");
    moduleXLTask.onSuccess = (task) => {     
     let moduleXL = task.loadedMeshes[0];
     moduleXL.scaling = new BABYLON.Vector3(1000,1000,1000);
     moduleXL.position = new BABYLON.Vector3(0,2,0);
     moduleXL.name = "moduleXL";
    }

    assetsManager.load();

    var skybox = BABYLON.Mesh.CreateBox("skyBox", 2000.0, scene);
    var skyboxMaterial = new BABYLON.PBRMaterial("pbr", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.microSurface = 0.7;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    skyboxMaterial.disableLighting = true;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://assets.babylonjs.com/environments/studio.env", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    var hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("https://assets.babylonjs.com/environments/studio.env", scene);
    scene.environmentTexture = hdrTexture;

    engine.runRenderLoop(() => {
      scene.render();
    });
  
  });

  return (
    <div className="BabylonView">
      <canvas className="bv-canvas" ref={myRef}/>
    </div>
  );

}

export default BabylonView;
