import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import ConfigsCollection from "./configsCollection.js"; 
import jwt from "jsonwebtoken"

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
        let email = request.query.email;
        let password = request.query.password;
        
        // Look for user with same E-Mail
        let user = await users.find({"email": {$eq: email}}).toArray();
        if(user.length){
            let validation = await bcrypt.compare(password,user[0].password);
            if(validation){
                if(!user[0].active){
                    response.json({success: false , message: 'E-Mail wurde noch nicht bestätigt'})
                }else{
                    let token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
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

    static async addUser(request,response) {
        let newUser = request.body;
        let user = await users.find({"email": {$eq: newUser.email}}).toArray();
        console.log(user);
        if(user[0]){
            console.log("Registrierung nicht erfolgreich!")
            response.json({success: false , message: 'Registrierung nicht erfolgreich, Nutzer existiert bereits!'})
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
            ConfigsCollection.addConfigsToUser(newUser);
            
            try {
                await transporter.sendMail(mailOptions);
                await users.insertOne(newUser);
                response.json({success: true , message: 'Registrierung erfolgreich!'})
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
}