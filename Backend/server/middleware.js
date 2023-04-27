import jwt from "jsonwebtoken"
import UsersCollection from "./usersCollection.js";

export default class middleware{
    static async verifyJWT(request,response,next){
        try {           
            let decoded = jwt.verify(request.body.token,'secret007');
            request.user = await UsersCollection.getUser(decoded.userId);
            next();
        } catch (error) {
            response.json({success: false , message: 'Authentifizierung fehlgeschlagen!'})
        }
    }

}