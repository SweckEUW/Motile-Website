import './BabylonView.css';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import * as Materials from 'babylonjs-materials';
import * as cannon from "cannon";
import { CannonJSPlugin } from "babylonjs";
import React, {  useEffect } from 'react';
import Plate from './Plate';
import Component from './Component';
import ServerRequest from '../../services/ServerRequest';

function BabylonView(){
  let motileParts = [];

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

    // Physics
    // scene.enablePhysics(new BABYLON.Vector3(0,-10,0), new CannonJSPlugin(true, 0, cannon));
    // var ground = BABYLON.Mesh.CreateGround("ground1", 1000, 1000, 1, scene);
    // ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
    
    // init camera
    let camera = new BABYLON.ArcRotateCamera("Camera", 0.8, 1.1, 250,new BABYLON.Vector3(0,0,0),scene); 
		camera.attachControl(myRef.current);

    // Set up Shadows
    let light0 = new BABYLON.DirectionalLight("MainLight", new BABYLON.Vector3(1, -1, 1), scene);
    light0.position = new BABYLON.Vector3(-200,100,0);
    // light0.intensity = 2;
    light0.shadowMaxZ = 1000;
    // light0.shadowMinZ = -20;

    let shadowGenerator = new BABYLON.ShadowGenerator(2048, light0);
    shadowGenerator.useExponentialShadowMap = true;
    // shadowGenerator.bias = 0.006;
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.blurKernel = 64;
    shadowGenerator.blurScale = 4;
    shadowGenerator.setDarkness(0.5);

    // init environment
    var skybox = BABYLON.Mesh.CreateBox("SkyBox", 5000.0, scene);
    skybox.isPickable = false;
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

    var ground = BABYLON.Mesh.CreateGround("Ground", 20000, 20000, 1, scene, false);
    ground.material = new Materials.ShadowOnlyMaterial('shadowOnly', scene);
    // ground.material = new BABYLON.PBRMaterial("GroundMat", scene);
    // ground.material.disableLighting = true;
    // ground.material.albedoColor = BABYLON.Color3.FromHexString("#424345");
    // ground.material.microSurface = 0.5;
    // ground.material.metallic = 0;
    // ground.material.roughness = 0.35;
    ground.receiveShadows = true;

    // Start rendering
    engine.runRenderLoop(() => {
      scene.render();
    });

    loadMotileParts(scene,shadowGenerator);
    initDragAndDrop(scene,ground);
    
    document.addEventListener("spawnComponent", spawnComponent);

  }, []);

  function spawnComponent(e){
    let component = motileParts.find(part => part.name === e.detail.name); 
    component.cloneMesh();
  }

  async function loadMotileParts(scene,shadowGenerator){
    let assetsManager = new BABYLON.AssetsManager(scene);
    assetsManager.onTaskErrorObservable.add(function(task) {
      console.log('Task failed', task.errorObject.message, task.errorObject.exception);
    });

    let motilePartsResponse = await ServerRequest.getAllMotileParts();
    motilePartsResponse.data.forEach((motilePart) => {
      motileParts.push(new Component(scene, assetsManager, shadowGenerator, motilePart));
    });
    new Plate(assetsManager,shadowGenerator);

    assetsManager.load();
  }

  function initDragAndDrop(scene,ground){
    let currentMesh, startingPoint;
    
    var getGroundPosition = function () {
      var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh == ground; });
      return pickinfo.hit ? pickinfo.pickedPoint: null
    }


    var onPointerDown = function (evt) {
      var pickInfo = scene.pick(scene.pointerX, scene.pointerY);
      if(pickInfo.hit && pickInfo.pickedMesh.name != "SkyBox" && pickInfo.pickedMesh.name != "Ground"){
        currentMesh = pickInfo.pickedMesh.parent;
        startingPoint = getGroundPosition(evt);

        if(startingPoint)
          scene.activeCamera.detachControl(); 
      }
    } 

    var onPointerUp = function () {
      if(startingPoint){
        scene.activeCamera.attachControl(myRef.current);
        startingPoint = null;
        return;
      }
    }

    var onPointerMove = function (evt) {
      if(startingPoint){
        var current = getGroundPosition(evt);
        if(!current) 
          return;

        var diff = current.subtract(startingPoint);
        currentMesh.position.addInPlace(diff);

        startingPoint = current;
      }
    }

    myRef.current.addEventListener("pointerdown", onPointerDown, false);
    myRef.current.addEventListener("pointerup", onPointerUp, false);
    myRef.current.addEventListener("pointermove", onPointerMove, false);
  }

  return (
    <div className="BabylonView">
      <canvas className="bv-canvas" ref={myRef}/>
    </div>
  );

}

export default BabylonView;
