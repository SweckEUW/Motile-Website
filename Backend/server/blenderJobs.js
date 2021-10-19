import nodeCmd from "node-cmd"
import { fileURLToPath } from 'url';
import path from 'path';
import config from './config.js'

export default class blenderJobs{
    static async render(request,response){

        let settings = request.body;
        let filename = fileURLToPath(import.meta.url);
        let dirname = path.dirname(filename);
        
        nodeCmd.run('cd ' + config.blender.path + ' & blender -b ' + path.join(dirname,'Assets/Motile.blend') + ' -P ' + path.join(dirname,'Assets/RenderMotile.py') + ' -- ' + settings.x + " " + settings.y + " " + settings.z,
        function(err, data, stderr){
            if(data)
                console.log(data);
            if(err)
                console.log("err: "+err)
            if(stderr)
                console.log("stderr: "+stderr)


            response.sendFile(path.join(dirname,'Assets/render.jpg'));  
        });
        
    }
}

