import jwt, { decode } from "jsonwebtoken"
import UsersCollection from "./usersCollection.js";

export default class middleware{
    static async verifyJWT(request,response,next){
        try {           
            let decoded = jwt.verify(request.body.token,'secret007');
            if(decoded.language == request.body.language && decoded.availWidth == request.body.availWidth &&
            decoded.availHeight == request.body.availHeight && decoded.colorDepth == request.body.colorDepth &&
            decoded.pixelDepth == request.body.pixelDepth && decoded.mobile == request.body.mobile){
                request.user = await UsersCollection.getUser(decoded.userId);
                next();
            }else{
                response.json({success: false , message: 'Geräte stimmen nicht überein'})
            }
        } catch (error) {
            response.json({success: false , message: 'Authentifizierung fehlgeschlagen!'})
        }
    }

}