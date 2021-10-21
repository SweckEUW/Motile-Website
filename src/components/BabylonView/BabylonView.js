import './BabylonView.css';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import React, { useEffect } from 'react';
import Plate from './Plate';
import Component from './Component';
import ServerRequest from '../../services/ServerRequest';

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
    scene.debugLayer.show();
    
    // init camera
    let camera = new BABYLON.ArcRotateCamera("Camera", 1,1 ,200,new BABYLON.Vector3(0,0,0),scene); 
		camera.attachControl(myRef.current);

    // init environment
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

    // Start rendering
    engine.runRenderLoop(() => {
      scene.render();
    });

    loadMotileParts(scene);
  
  }, []);

  async function loadMotileParts(scene){
    let assetsManager = new BABYLON.AssetsManager( scene );
    assetsManager.onTaskErrorObservable.add(function(task) {
      console.log('Task failed', task.errorObject.message, task.errorObject.exception);
    });

    let motilePartsResponse = await ServerRequest.getAllMotileParts();
    motilePartsResponse.data.forEach((motilePart) => {
      new Component(assetsManager, motilePart);
    });
    new Plate(assetsManager, "Plate", new BABYLON.Vector3(1000,1000,1000));

    assetsManager.load();
  }

  return (
    <div className="BabylonView">
      <canvas className="bv-canvas" ref={myRef}/>
    </div>
  );

}

export default BabylonView;
