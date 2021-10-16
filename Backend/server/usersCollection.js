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

    static async getUser(request, response, next) {
        let email = request.query.email ? request.query.email : null;
        let password = request.query.password ? request.query.password : null;
        let query;
        if(email)
            query = { "email": {$eq: email}}
        if(email && password)
            query = {$and: [{password: "password"},{email: "email"}]}
            
        let cursor = await users.find(query).toArray()

        response.json(password);
    }

    static async addUser(newUser) {
        users.insertOne(newUser, function(err, res) {
            if (err) throw err;
            console.log("user added");
        });
    }
}