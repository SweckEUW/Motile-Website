import express from "express"
import cors from "cors"
import mongodb from "mongodb"
import motilePartsCollection from "./motilePartsCollection.js"
import UsersCollection from "./usersCollection.js"
import BlenderJobs from "./blenderJobs.js"
import path from 'path';
import { fileURLToPath } from 'url';
import ConfigsCollection from "./configsCollection.js"
import Middleware from "./middleware.js"

const app = express();

app.use(cors());
app.use(express.json());

// Connect to Database
const MongoClient = mongodb.MongoClient
MongoClient.connect(
    'mongodb://localhost:27017/Motile', 
    {useNewUrlParser: true},
)
.catch(error => { 
    console.error(error);
    process.exit(1);
}).then(async client =>{
    console.log("Connected to Database")
    await motilePartsCollection.retrieveMotilePartsCollection(client);
    await UsersCollection.retrieveUsersCollection(client);
    await ConfigsCollection.retrieveConfigsCollection(client);
    app.listen(5000,() =>{
        console.log('Server started')
    });
})

app.get('/MotileParts', motilePartsCollection.getMotileParts);
app.get('/Login', UsersCollection.login);
app.get('/VerifyEmail', UsersCollection.verifyUser);

app.post('/Blender', BlenderJobs.render);
app.post('/Register', UsersCollection.addUser);

// static assets
let filename = fileURLToPath(import.meta.url);
let dirname = path.dirname(filename);

app.use(express.static(path.join(dirname, 'public')));

export default app