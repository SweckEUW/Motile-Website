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
            posRequirements: ['none', 'side']
        },
        {
            position: new BABYLON.Vector3(0,5,57), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none']
        },
        {
            position: new BABYLON.Vector3(23,5,57), 
            allowsFor: ['s'],
            posRequirements: ['none', 'side']
        },
        {
            position: new BABYLON.Vector3(-23,5,19), 
            allowsFor: ['s', 'm'],
            posRequirements: ['none', 'side']
        },
        {
            position: new BABYLON.Vector3(0,5,19), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none']
        },
        {
            position: new BABYLON.Vector3(23,5,19), 
            allowsFor: ['s'],
            posRequirements: ['none', 'side']
        },
        {
            position: new BABYLON.Vector3(-23,5,-19), 
            allowsFor: ['s', 'm'],
            posRequirements: ['none', 'side']    
        },
        {
            position: new BABYLON.Vector3(0,5,-19), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none']
        },
        {
            position: new BABYLON.Vector3(23,5,-19), 
            allowsFor: ['s'],
            posRequirements: ['none', 'side']
        },
        {
            position: new BABYLON.Vector3(-23,5,-57), 
            allowsFor: ['s', 'm'],
            posRequirements: ['none', 'side', 'bottom']    

        },
        {
            position: new BABYLON.Vector3(0,5,-57), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none', 'bottom']    

        },
        {
            position: new BABYLON.Vector3(23,5,-57), 
            allowsFor: ['s'],
            posRequirements: ['none', 'side', 'bottom']    

        }
    ];

    tabletPositions = [
        {
            position: new BABYLON.Vector3(-57.4,5,76), 
            allowsFor: ['s', 'm'],
            posRequirements: ['none', 'side'] 
        },
        {
            position: new BABYLON.Vector3(-34.4,5,76), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'] 
        },
        {
            position: new BABYLON.Vector3(-11.4,5,76), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'] 
        },
        {
            position: new BABYLON.Vector3(11.6,5,76), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'] 
        },
        {
            position: new BABYLON.Vector3(34.6,5,76), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'] 
        },
        {
            position: new BABYLON.Vector3(57.6,5,76), 
            allowsFor: ['s'],
            posRequirements: ['none', 'side'] 
        },
        {
            position: new BABYLON.Vector3(-57.4,5,38), 
            allowsFor: ['s', 'm'],
            posRequirements: ['none', 'side'] 
        },
        {
            position: new BABYLON.Vector3(-34.4,5,38), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'] 
        },
        {
            position: new BABYLON.Vector3(-11.4,5,38), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'] 
        },
        {
            position: new BABYLON.Vector3(11.6,5,38), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'] 
        },
        {
            position: new BABYLON.Vector3(34.6,5,38), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'] 
        },
        {
            position: new BABYLON.Vector3(57.6,5,38), 
            allowsFor: ['s'],
            posRequirements: ['none', 'side'] 
        },
        {
            position: new BABYLON.Vector3(-57.4,5,0), 
            allowsFor: ['s', 'm'],
            posRequirements: ['none', 'side'] 
        },
        {
            position: new BABYLON.Vector3(-34.4,5,0), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'] 
        },
        {
            position: new BABYLON.Vector3(-11.4,5,0), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'] 
        },
        {
            position: new BABYLON.Vector3(11.6,5,0), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'] 
        },
        {
            position: new BABYLON.Vector3(34.6,5,0), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'] 
        },
        {
            position: new BABYLON.Vector3(57.6,5,0), 
            allowsFor: ['s'],
            posRequirements: ['none', 'side'] 
        },
        {
            position: new BABYLON.Vector3(-57.4,5,-38), 
            allowsFor: ['s', 'm'],
            posRequirements: ['none', 'side'] 
        },
        {
            position: new BABYLON.Vector3(-34.4,5,-38), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'] 
        },
        {
            position: new BABYLON.Vector3(-11.4,5,-38), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'] 
        },
        {
            position: new BABYLON.Vector3(11.6,5,-38), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'] 
        },
        {
            position: new BABYLON.Vector3(34.6,5,-38), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none'] 
        },
        {
            position: new BABYLON.Vector3(57.6,5,-38), 
            allowsFor: ['s'],
            posRequirements: ['none', 'side'] 
        },
        {
            position: new BABYLON.Vector3(-57.4,5,-76), 
            allowsFor: ['s', 'm'],
            posRequirements: ['none', 'side', 'bottom'] 
        },
        {
            position: new BABYLON.Vector3(-34.4,5,-76), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none', 'bottom'] 
        },
        {
            position: new BABYLON.Vector3(-11.4,5,-76), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none', 'bottom'] 
        },
        {
            position: new BABYLON.Vector3(11.6,5,-76), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none', 'bottom'] 
        },
        {
            position: new BABYLON.Vector3(34.6,5,-76), 
            allowsFor: ['s', 'm', 'l'],
            posRequirements: ['none', 'bottom'] 
        },
        {
            position: new BABYLON.Vector3(57.6,5,-76), 
            allowsFor: ['s'],
            posRequirements: ['none', 'side', 'bottom'] 
        },
    ];

    placeSnapBoxes() {
        const list = this.isTablet ? this.tabletPositions : this.phonePositions;

        for (let i = 0; i < list.length; i++) {
            const snapBox = BABYLON.MeshBuilder.CreateBox(`snapBox_${i}`, {width: 22, height: 5, depth: 36.5}, this.scene);
            snapBox.position = list[i].position;
            snapBox.showBoundingBox = true;
            snapBox.visibility = false;
            snapBox.isPickable = false;
            snapBox.parent = this.phoneNode;
            this.boxes.push({
              mesh: snapBox,
              allowsFor: list[i].allowsFor,
              posRequirements: list[i].posRequirements
            });
          }
    }
}

export default SnapBoxes;