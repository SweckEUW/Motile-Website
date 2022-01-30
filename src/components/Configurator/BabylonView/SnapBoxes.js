import * as BABYLON from 'babylonjs';

class SnapBoxes {

    constructor(scene, phoneNode, isTablet) {
       this.boxes = [];
       this.scene = scene;
       this.phoneNode = phoneNode;
       this.isTablet = isTablet;

       this.placeSnapBoxes();
    }

    phonePositions = [
        {
            position: new BABYLON.Vector3(-23,5,57), 
            allowsFor: ['s', 'm'],
            posRequirements: ['none', 'side'],
            type: "top-left"
        },
        {
            position: new BABYLON.Vector3(0,5,57), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'],
            type: "top-side"
        },
        {
            position: new BABYLON.Vector3(23,5,57), 
            allowsFor: ['s'],
            posRequirements: ['none', 'side'],
            type: "top-right"
        },
        {
            position: new BABYLON.Vector3(-23,5,19), 
            allowsFor: ['s', 'm'],
            posRequirements: ['none', 'side'],
            type: "left-side"
        },
        {
            position: new BABYLON.Vector3(0,5,19), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'],
            type: "middle"
        },
        {
            position: new BABYLON.Vector3(23,5,19), 
            allowsFor: ['s'],
            posRequirements: ['none', 'side'],
            type: "right-side"
        },
        {
            position: new BABYLON.Vector3(-23,5,-19), 
            allowsFor: ['s', 'm'],
            posRequirements: ['none', 'side'],
            type: "left-side"
        },
        {
            position: new BABYLON.Vector3(0,5,-19), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'],
            type: "middle"
        },
        {
            position: new BABYLON.Vector3(23,5,-19), 
            allowsFor: ['s'],
            posRequirements: ['none', 'side'],
            type: "right-side"
        },
        {
            position: new BABYLON.Vector3(-23,5,-57), 
            allowsFor: ['s', 'm'],
            posRequirements: ['none', 'side', 'bottom'],
            type: "bottom-left"
        },
        {
            position: new BABYLON.Vector3(0,5,-57), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none', 'bottom'],
            type: "bottom-side"    

        },
        {
            position: new BABYLON.Vector3(23,5,-57), 
            allowsFor: ['s'],
            posRequirements: ['none', 'side', 'bottom'],
            type: "bottom-right"
        }
    ];

    tabletPositions = [
        {
            position: new BABYLON.Vector3(-57.4,5,76), 
            allowsFor: ['s', 'm'],
            posRequirements: ['none', 'side'],
            type: "top-left"
        },
        {
            position: new BABYLON.Vector3(-34.4,5,76), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'],
            type: "top-side"
        },
        {
            position: new BABYLON.Vector3(-11.4,5,76), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'],
            type: "top-side"
        },
        {
            position: new BABYLON.Vector3(11.6,5,76), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'],
            type: "top-side"
        },
        {
            position: new BABYLON.Vector3(34.6,5,76), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'],
            type: "top-side"
        },
        {
            position: new BABYLON.Vector3(57.6,5,76), 
            allowsFor: ['s'],
            posRequirements: ['none', 'side'],
            type: "top-right"
        },
        {
            position: new BABYLON.Vector3(-57.4,5,38), 
            allowsFor: ['s', 'm'],
            posRequirements: ['none', 'side'],
            type: "left-side"
        },
        {
            position: new BABYLON.Vector3(-34.4,5,38), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'],
            type: "middle"
        },
        {
            position: new BABYLON.Vector3(-11.4,5,38), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'],
            type: "middle"
        },
        {
            position: new BABYLON.Vector3(11.6,5,38), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'],
            type: "middle"
        },
        {
            position: new BABYLON.Vector3(34.6,5,38), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'],
            type: "middle"
        },
        {
            position: new BABYLON.Vector3(57.6,5,38), 
            allowsFor: ['s'],
            posRequirements: ['none', 'side'],
            type: "right-side"
        },
        {
            position: new BABYLON.Vector3(-57.4,5,0), 
            allowsFor: ['s', 'm'],
            posRequirements: ['none', 'side'],
            type: "left-side"
        },
        {
            position: new BABYLON.Vector3(-34.4,5,0), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'],
            type: "middle"
        },
        {
            position: new BABYLON.Vector3(-11.4,5,0), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'],
            type: "middle"
        },
        {
            position: new BABYLON.Vector3(11.6,5,0), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'],
            type: "middle"
        },
        {
            position: new BABYLON.Vector3(34.6,5,0), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'],
            type: "middle" 
        },
        {
            position: new BABYLON.Vector3(57.6,5,0), 
            allowsFor: ['s'],
            posRequirements: ['none', 'side'],
            type: "right-side"
        },
        {
            position: new BABYLON.Vector3(-57.4,5,-38), 
            allowsFor: ['s', 'm'],
            posRequirements: ['none', 'side'],
            type: "left-side"
        },
        {
            position: new BABYLON.Vector3(-34.4,5,-38), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'],
            type: "middle"
        },
        {
            position: new BABYLON.Vector3(-11.4,5,-38), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'],
            type: "middle"
        },
        {
            position: new BABYLON.Vector3(11.6,5,-38), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'],
            type: "middle"
        },
        {
            position: new BABYLON.Vector3(34.6,5,-38), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'],
            type: "middle"
        },
        {
            position: new BABYLON.Vector3(57.6,5,-38), 
            allowsFor: ['s'],
            posRequirements: ['none', 'side'],
            type: "right-side"
        },
        {
            position: new BABYLON.Vector3(-57.4,5,-76), 
            allowsFor: ['s', 'm'],
            posRequirements: ['none', 'side', 'bottom'],
            type: "bottom-left"
        },
        {
            position: new BABYLON.Vector3(-34.4,5,-76), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none', 'bottom'],
            type: "bottom-side"
        },
        {
            position: new BABYLON.Vector3(-11.4,5,-76), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none', 'bottom'],
            type: "bottom-side"
        },
        {
            position: new BABYLON.Vector3(11.6,5,-76), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none', 'bottom'],
            type: "bottom-side"
        },
        {
            position: new BABYLON.Vector3(34.6,5,-76), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none', 'bottom'],
            type: "bottom-side"
        },
        {
            position: new BABYLON.Vector3(57.6,5,-76), 
            allowsFor: ['s'],
            posRequirements: ['none', 'side', 'bottom'],
            type: "bottom-right"
        },
    ];

    placeSnapBoxes() {
        const list = this.isTablet ? this.tabletPositions : this.phonePositions;

        for (let i = 0; i < list.length; i++) {
            const snapBox = BABYLON.MeshBuilder.CreateBox(`snapBox_${i}`, {width: 22, height: 5, depth: 36.5}, this.scene);
            snapBox.position = list[i].position;
            snapBox.showBoundingBox = true;
            snapBox.visibility = 0;
            snapBox.isPickable = false;
            snapBox.parent = this.phoneNode;
            this.boxes.push({
              mesh: snapBox,
              allowsFor: list[i].allowsFor,
              posRequirements: list[i].posRequirements,
              type: list[i].type
            });
          }
    }
}

export default SnapBoxes;