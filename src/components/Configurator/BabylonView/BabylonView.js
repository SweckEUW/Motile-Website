import './BabylonView.css';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import * as Materials from 'babylonjs-materials';
// import * as cannon from "cannon";
// import { CannonJSPlugin } from "babylonjs";
import React, {useEffect,useState,useContext} from 'react';
import Base from './Base';
import Component from './Component';
import ServerRequest from '../../../services/ServerRequest';
import history from '../../../services/RouterHistory';
import {Context} from '../../../Store'

function BabylonView(props){
  const [state, setState] = useContext(Context);
  const [globalEngine, setGlobalEngine] = useState([null]);
  const [globalScene, setglobalScene] = useState([null]);
  const [currentMesh, setCurrentMesh] =  useState(null);
  const [startingPoint, setStartingPoint] = useState(null);
  const [ground, setGround] = useState(null);
  const [snapBoxes, setSnapBoxes] = useState(null);


  let motilePartsNodes = [];
  let myRef = React.useRef(null)

  useEffect(() => {
    document.title = "Motile - Konfigurator"
    initialize();

    // Cleanup
    return () => {
      globalScene[0].dispose();
      globalEngine[0].dispose();
      history.location.state = null;
    }
  }, []);

  function loadConfiguration(configuration){
    let components = [];
    configuration.parts.forEach(part => {
      spawnComponent({detail:{name: part.component.name, color: part.color}});
      components.push(part);
    });
    setState(prevState => ({...prevState,components: components}));    
  }

  async function initialize(){
    // init engine
    let engine = new BABYLON.Engine(myRef.current, true);
    setGlobalEngine(globalEngine[0] = engine);
    engine.enableOfflineSupport = true;
    BABYLON.Database.IDBStorageEnabled = true;
    BABYLON.Engine.OfflineProviderFactory = (urlToScene, callbackManifestChecked, disableManifestCheck) => {
      return new BABYLON.Database(urlToScene, callbackManifestChecked, true);
    };

    // Enable Hardware Scaling
    engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
    window.addEventListener("resize", () => {
      engine.resize();
    });

    // init scene
    let scene = new BABYLON.Scene(engine);
    globalScene[0] = scene;
    setglobalScene(globalScene);
    scene.clearColor = BABYLON.Color3.White();
    // scene.debugLayer.show();

    // Physics
    // scene.enablePhysics(new BABYLON.Vector3(0,-10,0), new CannonJSPlugin(true, 0, cannon));
    // var ground = BABYLON.Mesh.CreateGround("ground1", 1000, 1000, 1, scene);
    // ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
    
    // init camera
    let camera = new BABYLON.ArcRotateCamera("Camera", -1, 1, 200,new BABYLON.Vector3(60,0,30),scene); 
		camera.attachControl(myRef.current,true,false,4);
    camera.lowerRadiusLimit = 200; // Stop zooming in
    camera.upperRadiusLimit = 200; // Stop zooming out
    camera.upperBetaLimit = 1.5;
    camera.minZ = 10;
    camera.maxZ = 1000;

    // Set up Shadows
    let light0 = new BABYLON.DirectionalLight("MainLight", new BABYLON.Vector3(1, -1, 1), scene);
    light0.position = new BABYLON.Vector3(-200,100,0);
    light0.shadowMaxZ = 1000;

    let shadowGenerator = new BABYLON.ShadowGenerator(2048, light0);
    shadowGenerator.useExponentialShadowMap = true;
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.blurKernel = 64;
    shadowGenerator.blurScale = 4;
    shadowGenerator.setDarkness(0.5);

    // init environment
    // var skybox = BABYLON.Mesh.CreateBox("SkyBox", 5000.0, scene);
    // skybox.isPickable = false;
    // var skyboxMaterial = new BABYLON.PBRMaterial("pbr", scene);
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.microSurface = 0.7;
    // skyboxMaterial.disableLighting = true;
    // skybox.material = skyboxMaterial;
    // skybox.infiniteDistance = true;
    // skyboxMaterial.disableLighting = true;
    // skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://assets.babylonjs.com/environments/studio.env", scene);
    // skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    var hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("https://assets.babylonjs.com/environments/studio.env", scene);
    scene.environmentTexture = hdrTexture;
    scene.clearColor = new BABYLON.Color3(0.98,0.98,0.97);

    let ground = BABYLON.Mesh.CreateGround("Ground", 20000, 20000, 1, scene, false);
    ground.material = new Materials.ShadowOnlyMaterial('shadowOnly', scene);
    ground.receiveShadows = true;
    setGround(ground);
    const snapBoxes = [];
    const positions = [new BABYLON.Vector3(37,5,87), new BABYLON.Vector3(60,5,87), new BABYLON.Vector3(83,5,87),
                        new BABYLON.Vector3(37,5,49), new BABYLON.Vector3(60,5,49), new BABYLON.Vector3(83,5,49),
                        new BABYLON.Vector3(37,5,11), new BABYLON.Vector3(60,5,11), new BABYLON.Vector3(83,5,11),
                        new BABYLON.Vector3(37,5,-27), new BABYLON.Vector3(60,5,-27), new BABYLON.Vector3(83,5,-27)]
    for (let i = 0; i < 12; i++) {
      const snapBox = BABYLON.MeshBuilder.CreateBox(`snapBox_${i}`, {width: 10, height: 5, depth: 20}, scene);
      snapBox.position = positions[i];
      snapBox.showBoundingBox = true;
      snapBox.visibility = false;
      snapBoxes.push(snapBox);
    }
    setSnapBoxes(snapBoxes);

    // Start rendering
    engine.runRenderLoop(() => {
      scene.render();
    });

    await loadMotileParts(scene,shadowGenerator);
    // initDragAndDrop(scene,ground, snapBoxes);

    document.addEventListener("spawnComponent", spawnComponent);

    if(history.location.state && history.location.state.editMode)
      loadConfiguration(history.location.state.configuration);
  }


  function spawnComponent(e){
    if(e.detail.settings){
      
    }
    let component = motilePartsNodes.find(part => part.name === (e.detail.name)); 
    component.cloneMesh(e.detail.color);
  }

  async function loadMotileParts(scene,shadowGenerator){
    let assetsManager = new BABYLON.AssetsManager(scene);
    assetsManager.useDefaultLoadingScreen = false;
    assetsManager.onTaskErrorObservable.add(function(task) {
      console.log('Task failed', task.errorObject.message, task.errorObject.exception);
    });

    let motilePartsResponse = await ServerRequest.getAllMotileParts();
    console.log(motilePartsResponse.data.message);
    if(motilePartsResponse.data.success){
      motilePartsResponse.data.parts.forEach((motilePart) => {
        motilePartsNodes.push(new Component(scene, assetsManager, shadowGenerator, motilePart));
      });
    }
    new Base(assetsManager,shadowGenerator,props.tabletSelected);
  

    assetsManager.load();

    return new Promise(function(resolve, reject) {
      assetsManager.onFinish = () => {
        resolve()
      }
    });
  }

  function getGroundPosition(){
    var pickinfo = globalScene[0].pick(globalScene[0].pointerX, globalScene[0].pointerY, function (mesh) { return mesh === ground; });
    return pickinfo.hit ? pickinfo.pickedPoint: null
  }

  function onPointerMove(evt){
    if(startingPoint){
      var current = getGroundPosition(evt);
      if(!current) 
        return;

      var diff = current.subtract(startingPoint);
      currentMesh.position.addInPlace(diff);

      setStartingPoint(current);
    }
  }

  function onPointerDown(evt){
    var pickInfo = globalScene[0].pick(globalScene[0].pointerX, globalScene[0].pointerY);
    if(pickInfo.hit && pickInfo.pickedMesh.name !== "SkyBox" && pickInfo.pickedMesh.name !== "Ground" && !pickInfo.pickedMesh.name.includes('snapBox')){
      setCurrentMesh(pickInfo.pickedMesh.parent);
      setStartingPoint(getGroundPosition(evt));
      globalScene[0].activeCamera.detachControl(); 
    }
  } 

  function onPointerUp(){
    if(startingPoint){
      globalScene[0].activeCamera.attachControl(myRef.current);
      setStartingPoint(null);
      for (let snapBox of snapBoxes) {
        if(snapBox.intersectsPoint(currentMesh.position)) {
          currentMesh.position = new BABYLON.Vector3(snapBox.position._x, snapBox.position._y, snapBox.position._z);
          state.components.find(component => component.component.name == currentMesh.name.split('_')[0]).position = currentMesh.position; // save snap position
          return;
        }else{
          state.components.find(component => component.component.name == currentMesh.name.split('_')[0]).position =  null; // remove snap position
        }
      }
      return;
    }
  }

  return (
    <div className="BabylonView">
      <canvas className="bv-canvas" ref={myRef} onPointerMove={(ev)=> onPointerMove(ev)} onPointerDown={(ev)=> onPointerDown(ev)} onPointerUp={(ev)=> onPointerUp(ev)}/>
    </div>
  );

}

export default BabylonView;
