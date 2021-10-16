let users;

export default class usersCollection{
    static async retrieveUsers(conn){
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


    static async getUsers(request,response,next){
        let userData = await users.find().toArray();
        response.json(userData);
    }

    static async getUser(request, response, next) {
        let userData = await users.find().toArray();
        // if (userData.find(user => user.email === email)) {
        //     return user;
        // } else{
        //     return null;
        // }
        response.json(null);
    }
}