import { ObjectId } from "bson";

let configs;

export default class configsCollection {

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
        

        // Adding Mock-Data
        await this.addConfig(user, {
            name: "Walter",
            number: "804686108",
            orderDate: "20 Oktober 2021",
            deliveryDate: "25 Oktober 2021",
            price: "250 €",
            thumbnail: "http://localhost:5000/Placeholder/phone_placeholder.png",
            bought: false,
            parts: [
                {icon: "memory"},
                {icon: "wifi"},
                {icon: "storage"},
                {icon: "battery_std"},
                {icon: "photo_camera"},
            ], 
        }),

        await this.addConfig(user, {
            name: "Norbert",
            number: "123456789",
            orderDate: "4 Juli 1988",
            deliveryDate: "18 Oktober 2010",
            price: "666,14 €",
            thumbnail: "http://localhost:5000/Placeholder/phone_placeholder.png",
            bought: true,
            parts: [
                {icon: "storage"},
                {icon: "wifi"},
                {icon: "storage"},
                {icon: "battery_std"},
            ], 
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