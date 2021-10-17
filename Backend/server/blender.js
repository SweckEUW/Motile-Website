import nodeCmd from "node-cmd"

export default class blenderJob{
    static async render(file){
        nodeCmd.run('cd "C:/Program Files/Blender Foundation/Blender 2.93" & blender -b C:/Users/Simon/Desktop/3d-model-workflow/blender-jobs/GLTFTextureAssign.blend -P C:/Users/Simon/Desktop/3d-model-workflow/blender-jobs/GLTF_TexAssign.py -- C:/Users/Simon/Desktop/FashionMasterB3312anthrazitgrauaufgestellt --force_normal -comp 1',
        function(err, data, stderr){
            console.log(data);
        });
    }

}

