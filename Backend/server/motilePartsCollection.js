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


    static async getMotileParts(reques,response,next){
        let parts = await motilePartsCollection.find().toArray();
        response.json(parts.slice(0,10))
    }
}