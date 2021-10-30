import { ObjectId } from "bson";

let configs;

export default class configsCollection {

    static async retrieveConfigsCollection(conn){
        if(configs)
            return 
        
        try{
            configs = await conn.db('Motile').collection("Configs");
            if(configs)
                console.log("Retrieved configsCollection")
            else
                console.error("Error retrieving configsCollection")
        }catch(error){
            console.error("cant connect to configsCollection database" + error);
        }
    }

    static async addConfigsToUser(user) {
        let template = await configs.insertOne({
            configs: []
        });
        const id = template.insertedId.toHexString();
        
        console.log("unique identifier", id);
        user.configs = id;
        this.addConfig(user, {
            config_id: "324789",
            cpu: "Snapdragon 888+",
            camera: "C7 Anamorphic",
            dac: "Fiio K3 Pro",
            battery:"Motile XCharge Premium"
        }) 
    }

    static async addConfig(user, config) {
        await configs.findOne({_id: ObjectId.createFromHexString(user.configs)}, async function (err, document){
            if (err) {
                console.log("Couldnt find the config collection for the respective user");
            }

            const updateDocument = {
                $push: { "configs": config }
            };

            const result = await configs.updateOne(document, updateDocument);
        });
    }
}