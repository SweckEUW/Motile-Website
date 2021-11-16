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

    static async initializeUserData(user) {

        // Adding Mock-Data
        let template = await userData.insertOne({
            firstName: user.firstName,
            lastName: user.lastName,
            profilePic: "http://localhost:5000/Placeholder/profile_placeholder.png",
            adresses: [
                {
                    street: "An der Zapsäule 69",
                    city: "59557 Lippstadt",
                    country: "Deutschland",
                    telephone: "+49 1575 0456123"
                },
        
                {
                    street: "Nice street 123",
                    city: "12345 Westhausen",
                    country: "Griechenland",
                    telephone: "+49 3451 145212"
                }
            ]
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