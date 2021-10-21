import './BabylonView.css';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import React, { useState, useEffect } from 'react';
import Plate from './Plate';
import Component from './Component';
import ServerRequest from '../../services/ServerRequest';

function BabylonView(){
  const [motileParts, setMotileParts] = useState([]);
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

    getMotileParts();

    motileParts.forEach((motilePart) => {
      new Component(assetsManager, motilePart);
    });

    // Loading Meshes
    const plate = new Plate(assetsManager, "Plate", new BABYLON.Vector3(1000,1000,1000));
    // const moduleL = new Component(assetsManager, , new BABYLON.Vector3(1,2,-55));
    // const moduleS = new Component(assetsManager, "./models/module-small.glb", "moduleS", new BABYLON.Vector3(1000,1000,1000), new BABYLON.Vector3(0, 2, 0));
    // const moduleXL = new Component(assetsManager, "./models/module-xlarge.glb", "moduleXL", new BABYLON.Vector3(1000,1000,1000), new BABYLON.Vector3(0, 2, 0));

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
  
  }, []);

  async function getMotileParts(){
    let motilePartsResponse = await ServerRequest.getAllMotileParts();
    setMotileParts(motilePartsResponse.data)
  }

  return (
    <div className="BabylonView">
      <canvas className="bv-canvas" ref={myRef}/>
    </div>
  );

}

export default BabylonView;
