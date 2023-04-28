import {db} from "./index.js"

export default class motileParts{
    static async getMotileParts(request,response){
        console.log(db);
        let parts = await db.collection("MotileParts").find().toArray();
        if(parts)
            response.json({success: true, message: 'MotileParts gefunden', parts: parts});
        else    
            response.json({success: false, message: 'Keine MotileParts gefunden'}); 
    }
}