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

    static async getUser(request, response) {
        let email = request.query.email != null ? request.query.email : null;
        let password = request.query.password != null ? request.query.password : null;
        
        let query;
        if(email)
            query ={"email": {$eq: email}}
        if(email && password)
            query = {"email": {$eq: email} , "password": {$eq: password}}
            
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