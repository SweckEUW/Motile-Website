import './BabylonView.css';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import React, { useEffect } from 'react';

function ThreeView(){

  let myRef = React.useRef(null);

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
    let camera = new BABYLON.ArcRotateCamera("Camera", 1,1 ,200,new BABYLON.Vector3(-40,80,0),scene); 
		camera.attachControl(myRef.current);

    // init Light
    new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);

    let assetsManager = new BABYLON.AssetsManager( scene );
    assetsManager.onTaskErrorObservable.add(function(task) {
      console.log('Task failed', task.errorObject.message, task.errorObject.exception);
    });

    let phone;
    var phoneTask = assetsManager.addMeshTask("", "", "","./models/Phone-complete.glb");
    phoneTask.onSuccess = (task) => {     
     phone = task.loadedMeshes[0];
     phone.name = "Phone";
    }
    assetsManager.load();
    
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

export default ThreeView;
