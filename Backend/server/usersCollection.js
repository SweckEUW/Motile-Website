import bcrypt from "bcrypt"

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
        
        if(email && password){
            let user = await users.find({"email": {$eq: email}}).toArray();
            if(user.length){
                let validation = await bcrypt.compare(password,user[0].password);
                response.json(validation ? true : false);
            }else{
                response.json(false);
            }
           
        }

        else if(email){
            let user = await users.find({"email": {$eq: email}}).toArray()
            response.json(user.length ? true : false);
        }
        
    }

    static async addUser(newUser) {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(newUser.password,salt);
        newUser.password = hash;
        users.insert(newUser);
    }
}