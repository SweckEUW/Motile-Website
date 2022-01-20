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

    static async getConfig(user) {
        let config = await configs.find({"_id": {$eq: ObjectId.createFromHexString(user.configs)}}).toArray();
        return config[0];
    }

    static async setUserConfigThumbnail(user,number,thumbnail) {
        let userConfigs = await UserConfigsCollection.getConfig(user);
        if(userConfigs){
            let config = userConfigs.configs.find(config => config.number == number);
            config.thumbnail = thumbnail;
            return await configs.updateOne({"_id": {$eq: ObjectId.createFromHexString(user.configs)}}, {$set: userConfigs});
        }
    }

    static async addUserConfiguration(request, response) {
        let user = request.user;
        if(user){
            let userConfigs = await UserConfigsCollection.getConfig(user);
            if(userConfigs){
                await configs.updateOne(userConfigs, {$push: { "configs": request.body.config }});      
                response.json({success: true, message: 'Konfiguration gespeichert'});
            }else{
                response.json({success: false, message: 'Keine Nutzer Konfigurationen gefunden'});
            }
        }else{
            response.json({success: false, message: 'Kein Nutzer gefunden'});
        }
    }

    static async removeUserConfiguration(request, response) {
        let user = request.user;
        if(user){
            let userConfigs = await UserConfigsCollection.getConfig(user);
            if(userConfigs){
                await configs.updateOne(userConfigs, {$pull: {configs: {number: request.body.config.number}}});    
                response.json({success: true, message: 'Konfiguration gelöscht'});
            }else{
                response.json({success: false, message: 'Keine Nutzer Konfigurationen gefunden'});
            }
        }else{
            response.json({success: false, message: 'Kein Nutzer gefunden'});
        }
    }
}