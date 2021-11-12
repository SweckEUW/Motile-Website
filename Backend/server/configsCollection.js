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
        
        user.configs = template.insertedId.toHexString();

        await this.addConfig(user, {
            cpu: "Snapdragon 888+",
            camera: "C7 Anamorphic",
            dac: "Fiio K3 Pro",
            battery:"Motile XCharge Premium"
        }),

        await this.addConfig(user, {
            cpu: "MediaTek Dimensity",
            camera: "Pro",
            dac: "Fiio K3 Pro",
            battery:"3.500 mAh"
        }) 
    }

    static async addConfig(user, config) {
        let newConfig = await configs.find({"_id": {$eq: ObjectId.createFromHexString(user.configs)}}).toArray();
        if(newConfig[0])
            await configs.updateOne(newConfig[0], {$push: { "configs": config }});      
    }

    static async getConfig(user) {
        let config = await configs.find({"_id": {$eq: ObjectId.createFromHexString(user.configs)}}).toArray();
        return config[0];
    }

}