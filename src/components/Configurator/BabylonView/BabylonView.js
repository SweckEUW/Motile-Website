import './BabylonView.css';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import * as Materials from 'babylonjs-materials';
// import * as cannon from "cannon";
// import { CannonJSPlugin} from "babylonjs";
import SnapBoxes from './SnapBoxes';
import React, {useEffect,useState,useContext,useRef} from 'react';
import Base from './Base';
import Trashbin from './Trashbin';
import Bridges from './Bridges';
import Component from './Component';
import ServerRequest from '../../../services/ServerRequest';
import history from '../../../services/RouterHistory';
import {Context} from '../../../Store'
import {CSSTransition} from 'react-transition-group';

function BabylonView(props){
  const [state, setState] = useContext(Context);
  const [currentMesh, setCurrentMesh] =  useState(null);
  const [startingPoint, setStartingPoint] = useState(null);
  const [ground, setGround] = useState(null);
  const [snapBoxes, setSnapBoxes] = useState(null);
  const [trashbin, setTrashbin] = useState(null);
  const bridges = useRef(null);
  const motileParts = useRef([]);;
  const globalEngine = useRef(null);
  const globalScene = useRef(null);
  const canvas = useRef(null)
  const motilePartsNodes =  useRef([]);

  useEffect(() => {
    document.title = "Motile - Konfigurator"
    initialize();

    // Cleanup
    return () => {
      globalScene.current.dispose();
      globalEngine.current.dispose();
      history.location.state = null;
    }
  }, []);

  function loadConfiguration(configuration){
    let components = [];
    configuration.parts.forEach(part => {
      addComponentToScene({detail:{name: part.component.name, color: part.color, position: part.position}});
      components.push(part);
    });
    setState(prevState => ({...prevState,components: components}));    
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
    globalScene.current = scene;
    scene.clearColor = BABYLON.Color3.White();
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

    let ground = BABYLON.Mesh.CreateGround("Ground", 20000, 20000, 1, scene, false);
    ground.material = new Materials.ShadowOnlyMaterial('shadowOnly', scene);
    ground.receiveShadows = true;
    setGround(ground);
    
    let phoneNode = new BABYLON.TransformNode("Phone");
    let snapBoxes = new SnapBoxes(scene, phoneNode, props.tabletSelected)
    setSnapBoxes(snapBoxes.boxes);

    // Start rendering
    engine.runRenderLoop(() => {
      scene.render();
    });

    await loadMotileParts(scene,shadowGenerator);
    document.addEventListener("addComponentToScene", addComponentToScene);
    document.addEventListener("rotatePhone", rotatePhone);
    document.addEventListener("removeComponentFromScene", removeComponentFromScene);
    document.addEventListener("changeBridgeColor", changeBridgeColor);
    document.addEventListener("placeDummys", (e) => addDummys(e, snapBoxes.boxes));

    if(history.location.state && history.location.state.editMode)
      loadConfiguration(history.location.state.configuration);
  }

  function addComponentToScene(e){
    if(e.detail.name != "Display" && e.detail.name != "Hörmuschel"){
      let component = motilePartsNodes.current.find(part => part.name === e.detail.name); 
      component.place(e.detail.color,e.detail.position);
    }
  }

  function removeComponentFromScene(e){
    // Update Scene
    let compnentNode = motilePartsNodes.current.find(part => part.name === e.detail.name);
    if(compnentNode){
      let ease = new BABYLON.CubicEase();
      ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
      BABYLON.Animation.CreateAndStartAnimation("", compnentNode.parent, "scaling", 30,4, compnentNode.parent.scaling, new BABYLON.Vector3(0, 0, 0), 0, ease, () => {
        compnentNode.reset();
      });
    }
  }

  function addDummys(e, boxes) {
    const intersectionIndexes = [];
    for (let idx = 0; idx < boxes.length; idx++) {
      for (let components of e.detail.stateOutside.components) {
        if(boxes[idx].mesh.intersectsPoint(components.position)) {
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


    const components = [...e.detail.stateOutside.components];
    const breakList = props.tabletSelected ? [6, 12, 18, 24, 30] : [3, 6, 9, 12];
    const allColors = [];
    for (let component of components){
      allColors.push(component.color);
    }
    const dominantColor = getDominantColor(allColors);

    const smallDummy = motileParts.current.filter(component => component.name === "Dummy Small")[0];
    const mediumDummy = motileParts.current.filter(component => component.name === "Dummy Medium")[0];

    for (let val of dummySpotIdxs) {
      if (dummySpotIdxs.includes(val + 1) && !breakList.includes(val + 1)) {
        addComponentToScene({detail:{name: mediumDummy.name, color: dominantColor, position: boxes[val].mesh.position}});
        dummySpotIdxs.splice(dummySpotIdxs.indexOf(val + 1), 1);
        components.push({component: mediumDummy, settings: [], color: dominantColor, position: boxes[val].mesh.position})
      }
      else {
        addComponentToScene({detail:{name: smallDummy.name, color: dominantColor, position: boxes[val].mesh.position}});
        components.push({component: smallDummy, settings: [], color: dominantColor, position: boxes[val].mesh.position})
      }
    }
    setState(prevState => ({...prevState,components: components})); 
  }

  function rotatePhone(e){
    if(globalScene.current.getNodeByName("Phone"))
      globalScene.current.getNodeByName("Phone").rotation.z = e.detail.side == "Front" ? Math.PI : 0;
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
    let trashbinPlate = new Trashbin(scene, assetsManager, props.tabletSelected);
    setTrashbin(trashbinPlate)

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
    var pickinfo = globalScene.current.pick(globalScene.current.pointerX, globalScene.current.pointerY, function (mesh) { return mesh === ground; });
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

    if(trashbin && currentMesh){
      if(trashbin.detectionArea.intersectsPoint(currentMesh.position)) {
        let ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
        BABYLON.Animation.CreateAndStartAnimation("", trashbin.parent, "scaling", 30,4, trashbin.parent.scaling, new BABYLON.Vector3(1.2,1.2,1.2), 0);
      }else if(trashbin.parent.scaling.x == 1.2){
        let ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
        BABYLON.Animation.CreateAndStartAnimation("", trashbin.parent, "scaling", 30,4, trashbin.parent.scaling, BABYLON.Vector3.One(), 0);
      }
    }
  }

  function onPointerDown(evt){
    var pickInfo = globalScene.current.pick(globalScene.current.pointerX, globalScene.current.pointerY);
    if(pickInfo.hit && pickInfo.pickedMesh.name !== "SkyBox" && pickInfo.pickedMesh.name !== "Ground" && !pickInfo.pickedMesh.name.includes('snapBox') && !pickInfo.pickedMesh.name.includes('Trashbin')){
      setCurrentMesh(pickInfo.pickedMesh.parent);
      setStartingPoint(getGroundPosition(evt));
      globalScene.current.activeCamera.detachControl(); 

      //remove Bridge
      let bridge = pickInfo.pickedMesh.parent.getChildren().find(node => node.name.includes("Bridge")); 
      if(bridge) 
        bridge.dispose();
    }
  } 

  function onPointerUp(){
    if(startingPoint){
      globalScene.current.activeCamera.attachControl(canvas.current);
      setStartingPoint(null);

      for (let i = 0; i < snapBoxes.length; i++) {
        let componentState = state.components.find(component => component.component.name == currentMesh.name);
        if(snapBoxes[i].mesh.intersectsPoint(currentMesh.position) && snapBoxes[i].allowsFor.includes(componentState.component.metaData.size) && snapBoxes[i].posRequirements.includes(componentState.component.metaData.requiredPos)) {
          currentMesh.position = new BABYLON.Vector3(snapBoxes[i].mesh.position._x, 6, snapBoxes[i].mesh.position._z);
          componentState.position = currentMesh.position; // save snap position
          currentMesh.parent = globalScene.current.getNodeByName("Phone");
          setState(prevState => ({...prevState,configuratorErrorMessage: ""}));
          bridges.current.cloneAndPlace(snapBoxes[i].type,componentState.component.metaData.size,currentMesh,snapBoxes[i+1],snapBoxes[i-1]); // Add Bridge
          return;
        }
        else if (snapBoxes[i].mesh.intersectsPoint(currentMesh.position)) {
          setState(prevState => ({...prevState,configuratorErrorMessage: "Der ausgesuchte Spot ist für diese Komponente nicht verfügbar!"}));
          componentState.position =  null; // remove snap position
          currentMesh.parent = null;
        }
        else {
          componentState.position =  null; // remove snap position
          currentMesh.parent = null;
        }
      }

      if(trashbin.detectionArea.intersectsPoint(currentMesh.position)){
        // Update State
        let components = state.components.filter(component => component.component.name !== currentMesh.name);
        setState(prevState => ({...prevState,components: components}));
        
        // Update Scene
        removeComponentFromScene({detail:{name: currentMesh.name}});
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
