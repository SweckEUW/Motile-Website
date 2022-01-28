import { fileURLToPath } from 'url';
import path from 'path';
import config from './config.js';
import { exec } from 'child_process';
import UserConfigsCollection from "./userConfigsCollection.js"; 

export default class blenderJobs{
    static async renderThumbnail(request,response){
        let filename = fileURLToPath(import.meta.url);
        let dirname = path.dirname(filename);
        let exportPath = dirname + '/public/UserThumbnails/' + request.user.firstName + "_" + request.user.lastName + "_" + request.user._id + '/' + request.body.config.number + '.png';
        let blenderFilePath = dirname + '/Assets/Motile.blend';
        let blenderPath = config.blender.path;
        let pythonFilePath = dirname + '/Assets/RenderMotile.py';
        let drive = blenderPath.split("/")[0];

        let renderPositions = []
        request.body.config.parts.forEach(part => {
            renderPositions.push({
                name: part.component.name.replaceAll(" ",""),
                position: part.position,
                color: part.color
            })
        });

        let settings = {
            exportPath: exportPath,
            components: renderPositions
        }    
        console.log(settings);
        settings = JSON.stringify(JSON.stringify(settings));

        console.log("Start Blender rendering");
        let blenderJob = exec((drive != "C:" ? drive : "") + 'cd "' + config.blender.path + '" & blender -b "' + blenderFilePath + '" -P "' + pythonFilePath + '" -- "' + settings);
       
        blenderJob.stdout.on('data', function (data) {
            console.log('stdout: ' + data.toString());
        });
          
        blenderJob.stderr.on('data', function (data) {
            console.log('stderr: ' + data.toString());
        });
          
        blenderJob.on('exit', () => { 
            console.log("BlenderJob Done");
            let thumbnailPath = 'http://localhost:5000/UserThumbnails/' + request.user.firstName + "_" + request.user.lastName + "_" + request.user._id + '/' + request.body.config.number + '.png';
            let updteResponse = UserConfigsCollection.setUserConfigThumbnail(request.user,request.body.config.number,thumbnailPath);
            response.json({success: true , message: 'Rendering done, thumbnail set'});
        });

    }
}

