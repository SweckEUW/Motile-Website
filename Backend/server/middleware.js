import jwt from "jsonwebtoken"

export default class middleware{
    static async verifyJWT(request,response,next){
        try {
            jwt.verify(request.body.token,'secret007');
            next();
        } catch (error) {
            response.json({success: false , message: 'Authentifizierung fehlgeschlagen!'})
        }
    }

}