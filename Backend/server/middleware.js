import jwt from "jsonwebtoken"

export default class middleware{
    static async verifyJWT(request,response,next){
        try {
            jwt.verify(request.body.token,'secret007');
            console.log("jwt verified");
            next();
        } catch (error) {
            response.json({success: false , message: 'Authentifizierung fehlgeschlagen!'})
        }
    }

}