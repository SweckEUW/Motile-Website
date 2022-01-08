import { fileURLToPath } from 'url';
import path from 'path';
import config from './config.js';
import { exec } from 'child_process';
import UserConfigsCollection from "./userConfigsCollection.js"; 

export default class blenderJobs{
    static async renderThumbnail(request,response){
        // let settings = request.body;
        let settings = {x: 0,y: 0,z: 0,rx: 0,ry: 0,rz: 0};
        let filename = fileURLToPath(import.meta.url);
        let dirname = path.dirname(filename);
        let exportPath = dirname + '/public/UserThumbnails/' + request.user.firstName + " " + request.user.lastName + " " + request.user._id + '/' + request.body.config.number + '.jpg';
        let blenderFilePath = dirname + '/Assets/Motile.blend';
        let blenderPath = config.blender.path;
        let pythonFilePath = dirname + '/Assets/RenderMotile.py';
        let drive = blenderPath.split("/")[0];
        
        console.log("Start Blender rendering");
        let blenderJob = exec((drive != "C:" ? drive : "") + 'cd "' + config.blender.path + '" & blender -b "' + blenderFilePath + '" -P "' + pythonFilePath + '" -- "' + exportPath + '" '  + settings.x + " " + settings.y + " " + settings.z + " " + settings.rx + " " + settings.ry + " " + settings.rz);
       
        blenderJob.stdout.on('data', function (data) {
            console.log('stdout: ' + data.toString());
        });
          
        blenderJob.stderr.on('data', function (data) {
            console.log('stderr: ' + data.toString());
        });
          
        blenderJob.on('exit', () => { 
            console.log("BlenderJob Done");
            // TODO set path to config
            let thumbnailPath = 'http://localhost:5000/UserThumbnails/' + request.user.firstName + " " + request.user.lastName + " " + request.user._id + '/' + request.body.config.number + '.jpg';
            let updteResponse = UserConfigsCollection.setUserConfigThumbnail(request.user,request.body.config.number,thumbnailPath);
            response.json({success: true , message: 'Rendering done, thumbnail set'});
        });

    }
}

