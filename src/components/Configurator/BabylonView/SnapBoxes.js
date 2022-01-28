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
            allowsFor: ['s', 'm']
        },
        {
            position: new BABYLON.Vector3(0,5,57), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(23,5,57), 
            allowsFor: ['s']
        },
        {
            position: new BABYLON.Vector3(-23,5,19), 
            allowsFor: ['s', 'm']
        },
        {
            position: new BABYLON.Vector3(0,5,19), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(23,5,19), 
            allowsFor: ['s']
        },
        {
            position: new BABYLON.Vector3(-23,5,-21), 
            allowsFor: ['s', 'm']
        },
        {
            position: new BABYLON.Vector3(0,5,-21), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(23,5,-21), 
            allowsFor: ['s']
        },
        {
            position: new BABYLON.Vector3(-23,5,-57), 
            allowsFor: ['s', 'm']
        },
        {
            position: new BABYLON.Vector3(0,5,-57), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(23,5,-57), 
            allowsFor: ['s']
        }
    ];

    tabletPositions = [
        {
            position: new BABYLON.Vector3(-57.4,5,76), 
            allowsFor: ['s', 'm']
        },
        {
            position: new BABYLON.Vector3(-34.4,5,76), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(-11.4,5,76), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(11.6,5,76), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(34.6,5,76), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(57.6,5,76), 
            allowsFor: ['s']
        },
        {
            position: new BABYLON.Vector3(-57.4,5,38), 
            allowsFor: ['s', 'm']
        },
        {
            position: new BABYLON.Vector3(-34.4,5,38), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(-11.4,5,38), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(11.6,5,38), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(34.6,5,38), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(57.6,5,38), 
            allowsFor: ['s']
        },
        {
            position: new BABYLON.Vector3(-57.4,5,0), 
            allowsFor: ['s', 'm']
        },
        {
            position: new BABYLON.Vector3(-34.4,5,0), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(-11.4,5,0), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(11.6,5,0), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(34.6,5,0), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(57.6,5,0), 
            allowsFor: ['s']
        },
        {
            position: new BABYLON.Vector3(-57.4,5,-38), 
            allowsFor: ['s', 'm']
        },
        {
            position: new BABYLON.Vector3(-34.4,5,-38), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(-11.4,5,-38), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(11.6,5,-38), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(34.6,5,-38), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(57.6,5,-38), 
            allowsFor: ['s']
        },
        {
            position: new BABYLON.Vector3(-57.4,5,-76), 
            allowsFor: ['s', 'm']
        },
        {
            position: new BABYLON.Vector3(-34.4,5,-76), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(-11.4,5,-76), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(11.6,5,-76), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(34.6,5,-76), 
            allowsFor: ['s', 'm', 'l']
        },
        {
            position: new BABYLON.Vector3(57.6,5,-76), 
            allowsFor: ['s']
        },
    ];

    placeSnapBoxes() {
        const list = this.isTablet ? this.tabletPositions : this.phonePositions;

        for (let i = 0; i < list.length; i++) {
            const snapBox = BABYLON.MeshBuilder.CreateBox(`snapBox_${i}`, {width: 10, height: 5, depth: 20}, this.scene);
            snapBox.position = list[i].position;
            snapBox.showBoundingBox = true;
            snapBox.visibility = true;
            snapBox.isPickable = false;
            snapBox.parent = this.phoneNode;
            this.boxes.push({
              mesh: snapBox,
              allowsFor: list[i].allowsFor
            });
          }
    }
}

export default SnapBoxes;