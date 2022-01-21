let motilePartsCollection;

export default class motileParts{
    static async retrieveMotilePartsCollection(conn){
        if(motilePartsCollection)
            return 
        
        try{
            motilePartsCollection = await conn.db('Motile').collection("MotileParts");
            if(motilePartsCollection)
                console.log("Retrieved MotileParts Collection")
            else
                console.error("Error retrieving MotileParts Collection")
        }catch(error){
            console.error("cant connect to motileParts database" + error);
        }
    }


    static async getMotileParts(request,response){
        let parts = await motilePartsCollection.find().toArray();
        if(parts)
            response.json({success: true, message: 'MotileParts gefunden', parts: parts});
        else    
            response.json({success: false, message: 'Keine MotileParts gefunden'}); 
    }
}