import { ObjectId } from "bson";

let userData;

export default class userDataCollection {

    static async retrieveUserDataCollection(conn){
        if(userData)
            return 
        
        try{
            userData = await conn.db('Motile').collection("UserData");
            if(userData)
                console.log("Retrieved userDataCollection")
            else
                console.error("Error retrieving userDataCollection")
        }catch(error){
            console.error("cant connect to userDataCollection database" + error);
        }
    }

    static async addUserDataToUser(user) {
        let template = await userData.insertOne({
            firstName: "",
            lastName:"",
            profilePic:"",
            adress: {
                street:"",
                city: "",
                country: "",
                telephone: ""
            }
        });
        
        user.userData = template.insertedId.toHexString();
    }

    static async addUserData(user, userDataObj) {
        let newUserData = await userData.find({"_id": {$eq: ObjectId.createFromHexString(user.userData)}}).toArray();
        if(newUserData[0])
            await userData.updateOne(newUserData[0], {$push: { "userData": userDataObj }});      
    }

    static async getUserData(user) {
        let uD = await userData.find({"_id": {$eq: ObjectId.createFromHexString(user.userData)}}).toArray();
        return uD[0];
    }
}