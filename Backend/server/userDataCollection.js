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
            firstName: user.firstName,
            lastName: user.lastName,
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

    static async modifyUserData(user, userDataObj) {
        const filter = {"_id": {$eq: ObjectId.createFromHexString(user.userData)}};
        const updateDoc = {
            $set: {
                ...userDataObj
            }
        }
        const result = await userData.updateOne(filter, updateDoc);
    }

    static async getUserData(user) {
        let uD = await userData.find({"_id": {$eq: ObjectId.createFromHexString(user.userData)}}).toArray();
        return uD[0];
    }
}