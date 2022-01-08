import { ObjectId } from "bson";
import UserConfigsCollection from "./userConfigsCollection.js"; 

let configs;

export default class userConfigsCollection {

    static async retrieveConfigsCollection(conn){
        if(configs)
            return 
        
        try{
            configs = await conn.db('Motile').collection("UserConfigurations");
            if(configs)
                console.log("Retrieved configsCollection")
            else
                console.error("Error retrieving configsCollection")
        }catch(error){
            console.error("cant connect to configsCollection database" + error);
        }
    }

    static async initializeUserConfigurations(user) {
        let template = await configs.insertOne({
            configs: []
        });
        
        user.configs = template.insertedId.toHexString();   
    }

    static async addConfig(user, config) {
        let newConfig = await configs.find({"_id": {$eq: ObjectId.createFromHexString(user.configs)}}).toArray();
        if(newConfig[0])
            return await configs.updateOne(newConfig[0], {$push: { "configs": config }});      
    }

    static async getConfig(user) {
        let config = await configs.find({"_id": {$eq: ObjectId.createFromHexString(user.configs)}}).toArray();
        return config[0];
    }

    static async saveUserConfiguration(request, response) {
        let user = request.user;
        if(user){
            await UserConfigsCollection.addConfig(user, request.body.config);
            response.json({success: true, message: 'Konfiguration gespeichert'});
        }else{
            response.json({success: false, message: 'Kein Nutzer gefunden'});
        }
    }

    static async setUserConfigThumbnail(user,number,thumbnail) {
        let userConfigs = await UserConfigsCollection.getConfig(user);
        let config = userConfigs.configs.find(config => config.number == number);
        config.thumbnail = thumbnail;
        
        return await configs.updateOne({"_id": {$eq: ObjectId.createFromHexString(user.configs)}}, {$set: userConfigs});
    }
}