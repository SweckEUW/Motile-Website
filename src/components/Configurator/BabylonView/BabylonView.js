import './BabylonView.css';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import * as Materials from 'babylonjs-materials';
// import * as cannon from "cannon";
// import { CannonJSPlugin} from "babylonjs";
import SnapBoxes from './SnapBoxes';
import React, {useEffect,useContext,useRef} from 'react';
import Base from './Base';
import Trashbin from './Trashbin';
import Bridges from './Bridges';
import Component from './Component';
import ServerRequest from '../../../services/ServerRequest';
import {Context} from '../../../Store'
import {CSSTransition} from 'react-transition-group';
import { useLocation } from "react-router-dom";

function BabylonView(props){
  const [state, setState] = useContext(Context);

  const currentMesh = useRef(null);
  const clonedDummyMeshes = useRef([]);
  const startingPoint = useRef(null);
  const ground = useRef(null);
  const snapBoxes = useRef(null);
  const bridges = useRef(null);
  const trashbin = useRef(null);
  const motileParts = useRef([]);;
  const globalEngine = useRef(null);
  const globalScene = useRef(null);
  const canvas = useRef(null)
  const motilePartsNodes =  useRef([]);

  const location = useLocation();
  
  useEffect(() => {
    document.title = "Motile - Konfigurator"
    initialize();

    // Cleanup
    return () => {
      globalScene.current.dispose();
      globalEngine.current.dispose();
      location.state = null;
    }
  }, []);

  function loadConfiguration(configuration){
    let components = [];
    configuration.parts.forEach(part => {
      addComponentToScene({detail:{name: part.component.name, color: part.color, position: part.position}});
      components.push(part);
    });
    setState(prevState => ({...prevState,components: components}));  
    
    globalScene.current.getNodeByName("Phone").getChildren().forEach(child => { 
      let motilePart = components.find(component => component.component.name == child.name);
      if(motilePart)
        for (let i = 0; i < snapBoxes.current.length; i++) 
          if(motilePart && snapBoxes.current[i].mesh.intersectsPoint(child.position)){
            let bridgeData = bridges.current.cloneAndPlace(snapBoxes.current[i].type,motilePart.component.metaData.size,child,snapBoxes.current[i+1],snapBoxes.current[i-1]);
            motilePart.bridge = bridgeData;
          }
    });
  }
  
  async function initialize(){
    // init engine
    let engine = new BABYLON.Engine(canvas.current, true);
    globalEngine.current = engine;
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
    scene.clearColor = BABYLON.Color3.White();
    globalScene.current = scene;
    // scene.debugLayer.show();
    
    // init camera
    let camera = new BABYLON.ArcRotateCamera("Camera", -1, 0.7, 0 ,new BABYLON.Vector3(0,0,0),scene); 
		camera.attachControl(canvas.current,false,false,4);
    camera.lowerRadiusLimit = props.tabletSelected ? 300: 250; // Stop zooming in
    camera.upperRadiusLimit = props.tabletSelected ? 300: 250; // Stop zooming out
    camera.upperBetaLimit = 1.5;
    camera.minZ = 10;
    camera.maxZ = 1000;

    // Set up Shadows
    let light0 = new BABYLON.DirectionalLight("MainLight", new BABYLON.Vector3(0, -1, 0), scene);
    light0.position = new BABYLON.Vector3(-200,100,0);
    light0.shadowMaxZ = 1000;
    light0.intensity = 2;

    let shadowGenerator = new BABYLON.ShadowGenerator(2048, light0);
    shadowGenerator.useExponentialShadowMap = true;
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.blurKernel = 32;
    shadowGenerator.blurScale = 2;
    shadowGenerator.setDarkness(0.3);

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

    ground.current = BABYLON.Mesh.CreateGround("Ground", 20000, 20000, 1, scene, false);
    ground.current.material = new Materials.ShadowOnlyMaterial('shadowOnly', scene);
    ground.current.receiveShadows = true;
    
    let phoneNode = new BABYLON.TransformNode("Phone");
    snapBoxes.current = new SnapBoxes(scene, phoneNode, props.tabletSelected).boxes;

    // Start rendering
    engine.runRenderLoop(() => {
      scene.render();
    });

    await loadMotileParts(scene,shadowGenerator);
    document.addEventListener("addComponentToScene", addComponentToScene);
    document.addEventListener("rotatePhone", rotatePhone);
    document.addEventListener("removeComponentFromScene", removeComponentFromScene);
    document.addEventListener("changeBridgeColor", changeBridgeColor);
    document.addEventListener("placeDummys", (e) => addDummys(e, snapBoxes.current));
    document.addEventListener("addClonedDummy", (e) => {
        clonedDummyMeshes.current.push(e.detail.parent);
      }
    );
     
    if(location.state && location.state.editMode)
      loadConfiguration(location.state.configuration);
  }

  function addComponentToScene(e){
    if(e.detail.name != "Display" && e.detail.name != "Hörmuschel"){
      let component = motilePartsNodes.current.find(part => part.name === e.detail.name); 
      component.place(e.detail.color,e.detail.position);
    }
  }

  function removeComponentFromScene(e){
    let compnentNode = motilePartsNodes.current.find(part => part.name == e.detail.name);
    if(compnentNode && e.detail.name != "Display" && e.detail.name != "Hörmuschel"){
      let ease = new BABYLON.CubicEase();
      ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
      if(e.detail.currentMesh){
        let mesh = e.detail.currentMesh.current;
        BABYLON.Animation.CreateAndStartAnimation("", mesh, "scaling", 30,4, mesh.scaling, new BABYLON.Vector3(0, 0, 0), 0, ease, () => {
          mesh.dispose();
        });
      }else{
        BABYLON.Animation.CreateAndStartAnimation("", compnentNode.parent, "scaling", 30,4, compnentNode.parent.scaling, new BABYLON.Vector3(0, 0, 0), 0, ease, () => {
          compnentNode.reset();
        });
      }
    }
  }

  function getFreeIndices(stateComponents, boxes) {
    const intersectionIndexes = [];
    for (let idx = 0; idx < boxes.length; idx++) {
      for (let components of stateComponents.components) {
        if(components.position && boxes[idx].mesh.intersectsPoint(components.position)) {
          intersectionIndexes.push({
            idx,
            size: components.component.metaData.size
          });
          break;
        };
      }
    }

    const dummySpotIdxs = [...Array(boxes.length).keys()];
    for (let intersection of intersectionIndexes) {
      if (intersection.size === 's') {
        const index = dummySpotIdxs.indexOf(intersection.idx);
        if (index > -1) {
          dummySpotIdxs.splice(index, 1); 
        }
      }
      else if (intersection.size === 'm') {
        const index = dummySpotIdxs.indexOf(intersection.idx);
        if (index > -1) {
          dummySpotIdxs.splice(index, 1); 
        }

        const indexForward = dummySpotIdxs.indexOf(intersection.idx + 1);
        if (indexForward > -1) {
          dummySpotIdxs.splice(indexForward, 1); 
        }
      }
      else if (intersection.size === 'l') {
        const index = dummySpotIdxs.indexOf(intersection.idx);
        if (index > -1) {
          dummySpotIdxs.splice(index, 1); 
        }

        const indexForward = dummySpotIdxs.indexOf(intersection.idx + 1);
        if (indexForward > -1) {
          dummySpotIdxs.splice(indexForward, 1); 
        }

        const indexBackward = dummySpotIdxs.indexOf(intersection.idx - 1);
        if (indexBackward > -1) {
          dummySpotIdxs.splice(indexBackward, 1); 
        }
      }
    }

    return dummySpotIdxs;
  }

  function addDummys(e, boxes) {
  
    const dummySpotIdxs = getFreeIndices(e.detail.stateOutside, boxes);

    const components = [...e.detail.stateOutside.components];
    const breakList = props.tabletSelected ? [6, 12, 18, 24, 30] : [3, 6, 9, 12];
    const allColors = [];
    for (let component of components){
      allColors.push(component.color);
    }
    const dominantColor = getDominantColor(allColors);

    const smallDummy = motileParts.current.filter(component => component.name === "Kleiner Dummy")[0];
    const mediumDummy = motileParts.current.filter(component => component.name === "Großer Dummy")[0];

    for (let val of dummySpotIdxs) {
      if (dummySpotIdxs.includes(val + 1) && !breakList.includes(val + 1)) {
        addComponentToScene({detail:{name: mediumDummy.name, color: dominantColor, position: boxes[val].mesh.position}});
        dummySpotIdxs.splice(dummySpotIdxs.indexOf(val + 1), 1);

        const clonedMesh = clonedDummyMeshes.current.filter(mesh => boxes[val].mesh.intersectsPoint(mesh.position))[0];

        let bridgeData = bridges.current.cloneAndPlace(boxes[val].type,"m",clonedMesh,boxes[val + 1],boxes[val - 1]); // Add Bridge
        components.push({component: mediumDummy, settings: [], color: dominantColor, position: boxes[val].mesh.position, bridge: bridgeData})
      }
      else {
        addComponentToScene({detail:{name: smallDummy.name, color: dominantColor, position: boxes[val].mesh.position}});

        const clonedMesh = clonedDummyMeshes.current.filter(mesh => boxes[val].mesh.intersectsPoint(mesh.position))[0];

        let bridgeData = bridges.current.cloneAndPlace(boxes[val].type,"s",clonedMesh,boxes[val + 1],boxes[val - 1]); // Add Bridge

        components.push({component: smallDummy, settings: [], color: dominantColor, position: boxes[val].mesh.position, bridge: bridgeData})
      }
    }
    setState(prevState => ({...prevState,components: components})); 
  }

  function rotatePhone(e){
    if(globalScene.current.getNodeByName("Phone")){
      globalScene.current.getNodeByName("Phone").position.y = e.detail.side == "Front" ? 8 : 0;
      globalScene.current.getNodeByName("Phone").rotation.z = e.detail.side == "Front" ? Math.PI : 0;
    }
  }

  function changeBridgeColor(e){
    bridges.current.changeBridgeColor(e.detail.color);
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
        motilePartsNodes.current.push(new Component(scene, assetsManager, shadowGenerator, motilePart));
        motileParts.current.push(motilePart);
      });
    }
    new Base(scene,assetsManager,shadowGenerator,props.tabletSelected);
    trashbin.current = new Trashbin(scene, assetsManager, props.tabletSelected);

    bridges.current = new Bridges(scene, assetsManager, shadowGenerator);

    assetsManager.load();

    return new Promise(function(resolve, reject) {
      assetsManager.onFinish = () => {
        resolve()
      }
    });
  }

  function getDominantColor(colors) {
    const colorTable = colors.reduce( (acc, value) => {
      acc[value] = (acc[value] || 0 ) + 1
      return acc
    },{})
    return Object.keys(colorTable).reduce((a, b) => colorTable[a] > colorTable[b] ? a : b)
 }

  function getGroundPosition(){
    var pickinfo = globalScene.current.pick(globalScene.current.pointerX, globalScene.current.pointerY, function (mesh) { return mesh === ground.current; });
    return pickinfo.hit ? pickinfo.pickedPoint: null
  }

  function onPointerMove(evt){
    if(startingPoint.current){
      var current = getGroundPosition(evt);
      if(!current) 
        return;

      var diff = current.subtract(startingPoint.current);
      currentMesh.current.position.addInPlace(diff);

      startingPoint.current = current;
    }

    if(trashbin.current && currentMesh.current){
      if(trashbin.current.detectionArea.intersectsPoint(currentMesh.current.position)) {
        let ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
        BABYLON.Animation.CreateAndStartAnimation("", trashbin.current.parent, "scaling", 30,4, trashbin.current.parent.scaling, new BABYLON.Vector3(1.2,1.2,1.2), 0);
      }else if(trashbin.current.parent.scaling.x == 1.2){
        let ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
        BABYLON.Animation.CreateAndStartAnimation("", trashbin.current.parent, "scaling", 30,4, trashbin.current.parent.scaling, BABYLON.Vector3.One(), 0);
      }
    }
  }

  function onPointerDown(evt){
    var pickInfo = globalScene.current.pick(globalScene.current.pointerX, globalScene.current.pointerY);
    if(pickInfo.hit && pickInfo.pickedMesh.name !== "SkyBox" && pickInfo.pickedMesh.name !== "Ground" && !pickInfo.pickedMesh.name.includes('snapBox') && !pickInfo.pickedMesh.name.includes('Trashbin')){
      currentMesh.current = pickInfo.pickedMesh.parent;
      startingPoint.current = getGroundPosition(evt);
      globalScene.current.activeCamera.detachControl(); 

      //remove Bridge
      let bridge = pickInfo.pickedMesh.parent.getChildren().find(node => node.name.includes("Bridge")); 
      if(bridge) 
        bridge.dispose();
    }
  } 

  function onPointerUp(){
    if(startingPoint.current){
      globalScene.current.activeCamera.attachControl(canvas.current);
      startingPoint.current = null;

      for (let i = 0; i < snapBoxes.current.length; i++) {
        let componentState = state.components.find(component => component.component.name == currentMesh.current.name);
        const freeIndices = getFreeIndices(state, snapBoxes.current);
        if(snapBoxes.current[i].mesh.intersectsPoint(currentMesh.current.position) && snapBoxes.current[i].allowsFor.includes(componentState.component.metaData.size) && snapBoxes.current[i].posRequirements.includes(componentState.component.metaData.requiredPos)
        && freeIndices.includes(i)) {
          currentMesh.current.position = new BABYLON.Vector3(snapBoxes.current[i].mesh.position._x, 5.3, snapBoxes.current[i].mesh.position._z);
          componentState.position = currentMesh.current.position; // save snap position
          currentMesh.current.parent = globalScene.current.getNodeByName("Phone");
          let bridgeData = bridges.current.cloneAndPlace(snapBoxes.current[i].type,componentState.component.metaData.size,currentMesh.current,snapBoxes.current[i+1],snapBoxes.current[i-1]); // Add Bridge
          componentState.bridge = bridgeData;
          setState(prevState => ({...prevState,configuratorErrorMessage: ""}));
          return;
        }
        else if (snapBoxes.current[i].mesh.intersectsPoint(currentMesh.current.position)) {
          setState(prevState => ({...prevState,configuratorErrorMessage: "Der ausgesuchte Spot ist für diese Komponente nicht verfügbar!"}));
          currentMesh.current.position = new BABYLON.Vector3(80,0,20);
          componentState.position =  null; // remove snap position
          currentMesh.current.parent = null;
        }
        else {
          componentState.position =  null; // remove snap position
          currentMesh.current.parent = null;
        }
      }

      if(trashbin.current.detectionArea.intersectsPoint(currentMesh.current.position)){
        // Update State
        let components = state.components;
        components.splice(components.findIndex(component => component.component.name === currentMesh.current.name),1);
        setState(prevState => ({...prevState,components: components}));
        
        // Update Scene
        removeComponentFromScene({detail:{name: currentMesh.current.name, currentMesh: currentMesh.current.name == "Kleiner Dummy" || currentMesh.current.name == "Großer Dummy" ? currentMesh: null}});
      }

      return;
    }
  }

  return (
    <div className="BabylonView">
      <CSSTransition in={state.configuratorErrorMessage != null} classNames="fade" timeout={400}>
        <div className='bv-error'>{state.configuratorErrorMessage}</div>
      </CSSTransition>
      <canvas className="bv-canvas" ref={canvas} onPointerMove={(ev)=> onPointerMove(ev)} onPointerDown={(ev)=> onPointerDown(ev)} onPointerUp={(ev)=> onPointerUp(ev)}/>
    </div>
  );

}

export default BabylonView;
