import { fileURLToPath } from 'url';
import path from 'path';
import config from './config.js';
import { exec } from 'child_process';


export default class blenderJobs{
    static async render(request,response){

        let settings = request.body;
        let filename = fileURLToPath(import.meta.url);
        let dirname = path.dirname(filename);
        
        let exportPath = path.join(dirname,'Assets/render.jpg')
        let blenderPath = config.blender.path;
        let drive = blenderPath.split("/")[0];
        
        console.log("Start Blender rendering");

        let blenderJob = exec((drive != "C:" ? drive : "") + 'cd ' + config.blender.path + ' & blender -b ' + path.join(dirname,'Assets/Motile.blend') + ' -P ' + path.join(dirname,'Assets/RenderMotile.py') + ' -- ' + exportPath + " "  + settings.x + " " + settings.y + " " + settings.z + " " + settings.rx + " " + settings.ry + " " + settings.rz);

        blenderJob.stdout.on('data', function (data) {
            console.log('stdout: ' + data.toString());
        });
          
        blenderJob.stderr.on('data', function (data) {
            console.log('stderr: ' + data.toString());
        });
          
        blenderJob.on('exit', function (code) {
            console.log("BlenderJob Done");
            response.sendFile(path.join(dirname,'Assets/render.jpg'));  
        });

    }
}

