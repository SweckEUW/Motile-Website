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
  const globalEngine = useRef(null);
  const globalScene = useRef(null);

  let motilePartsNodes = [];
  let myRef = React.useRef(null)

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
    let engine = new BABYLON.Engine(myRef.current, true);
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
		camera.attachControl(myRef.current,false,false,4);
    camera.lowerRadiusLimit = props.tabletSelected ? 300: 250; // Stop zooming in
    camera.upperRadiusLimit = props.tabletSelected ? 300: 250; // Stop zooming out
    camera.upperBetaLimit = 1.5;
    camera.minZ = 10;
    camera.maxZ = 1000;

    // Set up Shadows
    let light0 = new BABYLON.DirectionalLight("MainLight", new BABYLON.Vector3(0, -1, 0), scene);
    light0.position = new BABYLON.Vector3(-200,100,0);
    light0.shadowMaxZ = 1000;
    light0.intensity = 8;

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

    if(history.location.state && history.location.state.editMode)
      loadConfiguration(history.location.state.configuration);
  }

  function addComponentToScene(e){
    if(e.detail.name != "Display" && e.detail.name != "Hörmuschel"){
      let component = motilePartsNodes.find(part => part.name === e.detail.name); 
      component.place(e.detail.color,e.detail.position);
    }
  }

  function removeComponentFromScene(e){
    // Update Scene
    let compnentNode = motilePartsNodes.find(part => part.name === e.detail.name);
    if(compnentNode){
      let ease = new BABYLON.CubicEase();
      ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
      BABYLON.Animation.CreateAndStartAnimation("", compnentNode.parent, "scaling", 30,4, compnentNode.parent.scaling, new BABYLON.Vector3(0, 0, 0), 0, ease, () => {
        compnentNode.reset();
      });
    }
  }

  function rotatePhone(e){
    if(globalScene.current.getNodeByName("Phone"))
    globalScene.current.getNodeByName("Phone").rotation.z = e.detail.side == "Front" ? Math.PI : 0;
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
    new Base(scene,assetsManager,shadowGenerator,props.tabletSelected);
    let trashbinPlate = new Trashbin(scene, assetsManager, props.tabletSelected);
    setTrashbin(trashbinPlate)

    assetsManager.load();

    return new Promise(function(resolve, reject) {
      assetsManager.onFinish = () => {
        resolve()
      }
    });
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

    // TODO: Hover over trashbin animation
    // if(trashbin && currentMesh && trashbin.detectionArea.intersectsPoint(currentMesh.position)) {
    //   let ease = new BABYLON.CubicEase();
    //   ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
    //   BABYLON.Animation.CreateAndStartAnimation("", trashbin.detectionArea, "scaling", 30,4, trashbin.detectionArea.scaling, trashbin.detectionArea.scaling.scale(2), 0);
    // }

  }

  function onPointerDown(evt){
    var pickInfo = globalScene.current.pick(globalScene.current.pointerX, globalScene.current.pointerY);
    if(pickInfo.hit && pickInfo.pickedMesh.name !== "SkyBox" && pickInfo.pickedMesh.name !== "Ground" && !pickInfo.pickedMesh.name.includes('snapBox')
        && !pickInfo.pickedMesh.name.includes('Trashbin')){
      setCurrentMesh(pickInfo.pickedMesh.parent);
      setStartingPoint(getGroundPosition(evt));
      globalScene.current.activeCamera.detachControl(); 
    }
  } 

  function onPointerUp(){
    if(startingPoint){
      globalScene.current.activeCamera.attachControl(myRef.current);
      setStartingPoint(null);

      for(let snapBox of snapBoxes){
        let componentState = state.components.find(component => component.component.name == currentMesh.name.split('_')[0])
        if(snapBox.mesh.intersectsPoint(currentMesh.position) && snapBox.allowsFor.includes(componentState.component.metaData.size) && snapBox.posRequirements.includes(componentState.component.metaData.requiredPos)) {
          currentMesh.position = new BABYLON.Vector3(snapBox.mesh.position._x, 6, snapBox.mesh.position._z);
          componentState.position = currentMesh.position; // save snap position
          currentMesh.parent = globalScene.current.getNodeByName("Phone");
          setState(prevState => ({...prevState,configuratorErrorMessage: ""}));
          return;
        }
        else if (snapBox.mesh.intersectsPoint(currentMesh.position)) {
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
        let ease = new BABYLON.CubicEase();
        ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
        BABYLON.Animation.CreateAndStartAnimation("", currentMesh, "scaling", 30,4, currentMesh.scaling, new BABYLON.Vector3(0, 0, 0), 0, ease, () => {
          removeComponentFromScene({detail:{name: currentMesh.name.split('_')[0]}});
        });
      }

      return;
    }
  }

  return (
    <div className="BabylonView">
      <CSSTransition in={state.configuratorErrorMessage != null} classNames="fade" timeout={400}>
        <div className='bv-error'>{state.configuratorErrorMessage}</div>
      </CSSTransition>
      <canvas className="bv-canvas" ref={myRef} onPointerMove={(ev)=> onPointerMove(ev)} onPointerDown={(ev)=> onPointerDown(ev)} onPointerUp={(ev)=> onPointerUp(ev)}/>
    </div>
  );

}

export default BabylonView;
