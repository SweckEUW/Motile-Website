import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import UserConfigsCollection from "./userConfigsCollection.js"; 
import jwt from "jsonwebtoken"
import UserDataCollection from "./userDataCollection.js";
import { ObjectId } from "bson";

let users;

export default class usersCollection{
    static async retrieveUsersCollection(conn){
        if(users)
            return 
        
        try{
            users = await conn.db('Motile').collection("Users");
            if(users)
                console.log("Retrieved usersCollection")
            else
                console.error("Error retrieving usersCollection")
        }catch(error){
            console.error("cant connect to usersCollection database" + error);
        }
    }

    static async login(request, response) {
        let email = request.body.email;
        let password = request.body.password;
        
        // Look for user with same E-Mail
        let user = await users.find({"email": {$eq: email}}).toArray();
        if(user[0]){
            let validation = await bcrypt.compare(password,user[0].password);
            if(validation){
                if(!user[0].active){
                    response.json({success: false , message: 'E-Mail wurde noch nicht bestätigt'})
                }else{
                    let token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                        language: request.body.language,
                        availWidth: request.body.availWidth,
                        availHeight: request.body.availHeight,
                        colorDepth: request.body.colorDepth,
                        pixelDepth: request.body.pixelDepth,
                        mobile: request.body.mobile,
                    },"secret007",{expiresIn: '1h'})
                    response.json({
                        success: true , 
                        message: 'Anmeldung erfolgreich',
                        token: token
                    })
                }
            }else{
                response.json({success: false , message: 'E-Mail und Passwort stimmen nicht überein'})
            }
        }else{
            response.json({success: false , message: 'Kein Nutzer mit dieser E-Mail gefunden'})
        }
    }

    static async loginJWT(request, response) {
        let user = request.user;
        if(user)
            response.json({success: true , message: 'Nutzer gefunden, JWT-Token Anmeldung erfolgreich'})
        else
            response.json({success: false , message: 'Kein Nutzer mit dieser E-Mail gefunden'})
    }

    static async getUser(id) {
        let user = await users.find({"_id": {$eq: ObjectId.createFromHexString(id)}}).toArray();
        return user[0];
    }

    static async addUser(request,response) {
        let newUser = request.body;
        let user = await users.find({"email": {$eq: newUser.email}}).toArray();

        if(user[0]){
            console.log("Registrierung nicht erfolgreich!")
            response.json({success: false , message: 'Ein Nutzer mit dieser E-Mail-Adresse existiert bereits!'})
        }else{
            // Hash password
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(newUser.password,salt);
            newUser.password = hash;
            
            // send E-Mail to verify account
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                service: 'gmail',
                auth: {
                user: 'motilecvd@gmail.com',
                pass: 'motilecvd1234'
                }
            });

            let rand = Math.floor((Math.random() * 100) + 54);
            newUser.active = false;
            newUser.emailID = rand;

            let link = "http://localhost:5000/VerifyEmail?emailID="+rand;
            let mailOptions = {
                from: 'motilecvd@gmail.com',
                to : newUser.email,
                subject : "Motile - E-Mail Bestätigen",
                html : "E-Mail verifizieren: <a href=" + link + ">" + link + "</a>"
            } 

            //generate a configs collection for a new user
            UserConfigsCollection.initializeUserConfigurations(newUser);
            UserDataCollection.initializeUserData(newUser);

            //delete first and last name
            delete newUser.firstName;
            delete newUser.lastName;
            
            try {
                await transporter.sendMail(mailOptions);
                await users.insertOne(newUser);
                response.json({success: true , message: 'Registrierung erfolgreich - Bitte E-Mail-Adresse bestätigen'})
                console.log("Registrierung erfolgreich!")
            }catch (error) {
                console.log(error);
                response.json({success: false , message: 'Registrierung nicht erfolgreich!'})
                console.log("Registrierung nicht erfolgreich!")
            }
        }
    }

    static async verifyUser(request, response) {
        let emailID = parseInt(request.query.emailID)
        let user = await users.find({"emailID": {$eq: emailID}}).toArray();
        if(user[0]){
            users.updateOne({_id:user[0]._id}, {$set :{active : true}, $unset :{emailID}});
            console.log(user[0].email+" Verified");
            response.send('<h1>E-Mail bestätigt: ' + user[0].email + '</h1>')
        }else{
            response.send('<h1>E-Mail nicht bestätigt: Kein Nutzer gefunden!</h1>')
        }
    }

    static async getConfigFromUser(request, response) {
        let user = request.user;
        if(user){
            let configs = await UserConfigsCollection.getConfig(user);
            if(configs){
                response.json({success: true , message: 'Konfigurationen gefunden', configs: configs})
            }else{
                response.json({success: false ,  message: 'Keine Konfigurationen gefunden'})
            }
        }else{
            response.json({success: false , message: 'Kein Nutzer gefunden'})
        }
    }

    static async updateUser(request, response, updateData) {
        const filter = {"_id": {$eq: request.user._id}};
        const updateDoc = {
            $set: {
                ...updateData
            }
        }
        const result = await users.updateOne(filter, updateDoc);
    }

    static async getUserDataFromUser(request, response) {
        let user = request.user;
        if(user){
            let userData = await UserDataCollection.getUserData(user);
            if(userData){
                userData.email = user.email;
                response.json({success: true , message: 'UserData gefunden', userData: userData})
            }else{
                response.json({success: false ,  message: 'Keine UserData gefunden'})
            }
        }else{
            response.json({success: false , message: 'Kein Nutzer gefunden'})
        }
    }

    static async stayAlive(request, response) {
        let user = request.user;
        if(user){
            let token = jwt.sign({
                email: user.email,
                userId: user._id
            },"secret007",{expiresIn: '1h'})
            response.json({
                success: true, 
                message: 'Sending new Token from Server!',
                token: token
            })
        }else{
            response.json({success: false , message: 'Kein Nutzer gefunden'})
        }
    }
}