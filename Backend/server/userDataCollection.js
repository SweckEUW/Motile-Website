import { ObjectId } from "bson";
import UsersCollection from './usersCollection.js'
import {db} from "./index.js"

export default class userDataCollection {

    static async initializeUserData(user) {
        
        // Adding Mock-Data
        let template = await db.collection("UserData").insertOne({
            firstName: user.firstName,
            lastName: user.lastName,
            profilePic: "http://localhost:5000/Placeholder/profile_placeholder.png",
            telephone: '+49 1575 0456123',
            paymentMethods: [
                {
                    name: 'PayPal',
                    previewImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/640px-PayPal.svg.png",
                    user: user.firstName + ' ' + user.lastName
                },
                {
                    name: 'VISA',
                    previewImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/2560px-Visa_2021.svg.png",
                    user: user.firstName + ' ' + user.lastName
                }
            ],
            adresses: [
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    street: "An der Zapsäule 69",
                    city: "59557 Lippstadt",
                    country: "Deutschland",
                },
        
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
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
        const result = await db.collection("UserData").updateOne(filter, updateDoc);
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
        const result = await db.collection("UserData").updateOne(filter, updateDoc);
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
        const result = await db.collection("UserData").updateOne(filter, updateDoc);
        if(result.acknowledged)
            response.json({success: true , message: "Picture uploaded and set"})
        else
            response.json({success: false , message: "Update User Picture failed"})
    }

    static async addAddress(request, response) {
        db.collection("UserData").updateOne({"_id": ObjectId.createFromHexString(request.user.userData)}, {$push: {adresses: request.body.address}});
        response.json({success: true , message: "added Adress to userData"})
    }

    static async removeAddress(request, response) {
        console.log(request.user.userData);
        db.collection("UserData").updateOne({"_id": ObjectId.createFromHexString(request.user.userData)},  { $pull: { adresses: { id:  request.body.addressId } } });
        response.json({success: true , message: "removed Adress from userData"})
    }

    static async getUserData(user) {
        let uD = await db.collection("UserData").find({"_id": {$eq: ObjectId.createFromHexString(user.userData)}}).toArray();
        return uD[0];
    }
}