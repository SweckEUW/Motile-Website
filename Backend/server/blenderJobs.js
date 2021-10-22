import { fileURLToPath } from 'url';
import path from 'path';
import config from './config.js';
import { exec } from 'child_process';


export default class blenderJobs{
    static async render(request,response){

        let settings = request.body;
        let filename = fileURLToPath(import.meta.url);
        let dirname = path.dirname(filename);
        console.log(dirname);
        let exportPath = dirname + '/Assets/render.jpg';
        let blenderFilePath = dirname + '/Assets/Motile.blend';
        let blenderPath = config.blender.path;
        let pythonFilePath = dirname + '/Assets/RenderMotile.py';
        let drive = blenderPath.split("/")[0];
        
        console.log("Start Blender rendering");
        let blenderJob = exec((drive != "C:" ? drive : "") + 'cd "' + config.blender.path + '" & blender -b "' + blenderFilePath + '" -P "' + pythonFilePath + '" -- "' + exportPath + '" '  + settings.x + " " + settings.y + " " + settings.z + " " + settings.rx + " " + settings.ry + " " + settings.rz);
        console.log((drive != "C:" ? drive : "") + 'cd "' + config.blender.path + '" & blender -b "' + blenderFilePath + '" -P "' + pythonFilePath + '" -- "' + exportPath + '" '  + settings.x + " " + settings.y + " " + settings.z + " " + settings.rx + " " + settings.ry + " " + settings.rz);
        blenderJob.stdout.on('data', function (data) {
            console.log('stdout: ' + data.toString());
        });
          
        blenderJob.stderr.on('data', function (data) {
            console.log('stderr: ' + data.toString());
        });
          
        blenderJob.on('exit', function (code) {
            console.log("BlenderJob Done");
            response.sendFile(dirname + '/Assets/render.jpg');  
        });

    }
}

