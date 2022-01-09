import { ObjectId } from "bson";
import UsersCollection from './usersCollection.js'

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
            telephone: '+49 1575 0456123',
            adresses: [
                {
                    street: "An der Zapsäule 69",
                    city: "59557 Lippstadt",
                    country: "Deutschland",
                },
        
                {
                    street: "Nice street 123",
                    city: "12345 Westhausen",
                    country: "Griechenland",
                }
            ]
        });
        
        user.userData = template.insertedId.toHexString();
    }

    static async modifyUserData(request, response) {
        const filter = {"_id": {$eq: ObjectId.createFromHexString(request.user.userData)}};
        if ('email' in request.body.userData) {
            UsersCollection.updateUser(request, response, {
                email: request.body.userData.email
            })
        
            delete request.body.userData.email;
        }
        const updateDoc = {
            $set: {
                ...request.body.userData
            }
        }
        const result = await userData.updateOne(filter, updateDoc);
        if (result) {
            response.json({success: true , message: 'updated userData', result: result})
        }
        else {
            response.json({success: false ,  message: 'userData Update didnt work'})
        }
    }

    static async modifyUserDataFromBackend(request, updateData) { 
        const filter = {"_id": {$eq: ObjectId.createFromHexString(request.user.userData)}};
        const updateDoc = {
            $set: {
                ...updateData
            }
        }
        const result = await userData.updateOne(filter, updateDoc);
    }

    static async updateProfilePic(request, response, next) {
        const filter = {"_id": {$eq: ObjectId.createFromHexString(request.user.userData)}};
        const updateDoc = {
            $set: {
                ...{
                    profilePic: 'http://localhost:5000/ProfilePics/' + request.file.filename
                }
            }
        }
        const result = await userData.updateOne(filter, updateDoc);
        response.status(200).send("file uploaded");
    }

    static async addAddress(request, response) {
        userData.updateOne({"_id": ObjectId.createFromHexString(request.user.userData)}, {$push: {adresses: request.body.address}});
        response.json({success: true , message: "added Adress to userData"})
    }

    static async removeAddress(request, response) {
        console.log(request.user.userData);
        userData.updateOne({"_id": ObjectId.createFromHexString(request.user.userData)},  { $pull: { adresses: { id:  request.body.addressId } } });
        response.json({success: true , message: "removed Adress from userData"})
    }

    static async getUserData(user) {
        let uD = await userData.find({"_id": {$eq: ObjectId.createFromHexString(user.userData)}}).toArray();
        return uD[0];
    }
}