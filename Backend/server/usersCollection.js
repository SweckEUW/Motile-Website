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


    static async getAllUsers(request,response,next){
        let userData = await users.find().toArray();
        response.json(userData);
    }

    static async getUser(request, response, next) {
        let email = request.query.email ? request.query.email : null;
        let query;
        if(email)
            query = { "email": {$eq: email}}
        
        let cursor = await users.find(query).toArray()

        response.json(cursor);
    }

    static async addUser(newUser) {
        users.insertOne(newUser, function(err, res) {
            if (err) throw err;
            console.log("user added");
        });
    }
}