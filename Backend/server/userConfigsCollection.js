import { ObjectId } from "bson";
import UserConfigsCollection from "./userConfigsCollection.js"; 
import {db} from "./index.js"

export default class userConfigsCollection {

    static async initializeUserConfigurations(user) {
        let template = await db.collection("UserConfigurations").insertOne({
            configs: []
        });
        
        user.configs = template.insertedId.toHexString();   
    }

    static async getConfig(user) {
        let config = await db.collection("UserConfigurations").find({"_id": {$eq: ObjectId.createFromHexString(user.configs)}}).toArray();
        return config[0];
    }

    static async setUserConfigThumbnail(user,number,thumbnail) {
        let userConfigs = await UserConfigsCollection.getConfig(user);
        if(userConfigs){
            let config = userConfigs.configs.find(config => config.number == number);
            config.thumbnail = thumbnail;
            return await db.collection("UserConfigurations").updateOne({"_id": {$eq: ObjectId.createFromHexString(user.configs)}}, {$set: userConfigs});
        }
    }

    static async addUserConfiguration(request, response) {
        let user = request.user;
        if(user){
            let userConfigs = await UserConfigsCollection.getConfig(user);
            if(userConfigs){
                await db.collection("UserConfigurations").updateOne(userConfigs, {$push: { "configs": request.body.config }});      
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
                await db.collection("UserConfigurations").updateOne(userConfigs, {$pull: {configs: {number: request.body.config.number}}});    
                response.json({success: true, message: 'Konfiguration gelöscht'});
            }else{
                response.json({success: false, message: 'Keine Nutzer Konfigurationen gefunden'});
            }
        }else{
            response.json({success: false, message: 'Kein Nutzer gefunden'});
        }
    }

    static async setUserConfigToBought(request, response) {
        let user = request.user;
        if(user){
            console.log("number", request.body.number);
            let userConfigs = await UserConfigsCollection.getConfig(user);
            let config = userConfigs.configs.find(config => config.number == request.body.number);
            config.bought = true;
            let result = await db.collection("UserConfigurations").updateOne({"_id": {$eq: ObjectId.createFromHexString(user.configs)}}, {$set: userConfigs});
            
            response.json({success: true, message: 'Kauf erfolgreich'});
        }else{
            response.json({success: false, message: 'Kauf konnte nicht vollzogen werden'});
        }
    }
}