import express from "express"
import cors from "cors"
import {MongoClient, Db, ServerApiVersion} from "mongodb"
import multer from "multer"
import motilePartsCollection from "./motilePartsCollection.js"
import UsersCollection from "./usersCollection.js"
import BlenderJobs from "./blenderJobs.js"
import path from 'path';
import { fileURLToPath } from 'url';
import UserConfigsCollection from "./userConfigsCollection.js"
import userDataCollection from "./userDataCollection.js"
import Middleware from "./middleware.js"
import ImageUploadHandler from "./ImageUploadHandler.js"
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to Database
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORT}@cluster0.zpdterx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export let db;

client.connect()
.catch(error => { 
  console.error(error);
  process.exit(1);
}).then(async client =>{
    console.log("Connected to Database")

    db = client.db('Motile');

    app.listen(5000,() =>{
      console.log('Server started')
    });
})

app.get('/', (req, res) => {
  res.send("Server Online");
});

// MotileParts
app.get('api/MotileParts', motilePartsCollection.getMotileParts);

// Login/Register
app.post('api/Login', UsersCollection.login);
app.post('api/LoginJWT', Middleware.verifyJWT, UsersCollection.loginJWT);
app.post('api/StayAlive', Middleware.verifyJWT, UsersCollection.stayAlive);
app.post('api/Register', UsersCollection.addUser);
app.get('api/VerifyEmail', UsersCollection.verifyUser);

// UserData
app.post('api/User/Data', Middleware.verifyJWT, UsersCollection.getUserDataFromUser);
app.post('api/User/Data/AddAddress', Middleware.verifyJWT, userDataCollection.addAddress);
app.post('api/User/Data/RemoveAddress', Middleware.verifyJWT, userDataCollection.removeAddress);
app.post('api/User/Data/UploadProfilePic',  multer({ storage: ImageUploadHandler.getStorage() }).single('file'), Middleware.verifyJWT, userDataCollection.updateProfilePic);
app.post('api/User/Data/Modify', Middleware.verifyJWT, userDataCollection.modifyUserData);

// UserConfigurations
app.post('api/User/Configs', Middleware.verifyJWT, UsersCollection.getConfigFromUser);
app.post('api/User/Configs/Remove', Middleware.verifyJWT, UserConfigsCollection.removeUserConfiguration);
app.post('api/User/Configs/Add', Middleware.verifyJWT, UserConfigsCollection.addUserConfiguration);
app.post('api/User/Configs/GenerateThumbnail', Middleware.verifyJWT, BlenderJobs.renderThumbnail);
app.post('api/User/Configs/Buy', Middleware.verifyJWT, UserConfigsCollection.setUserConfigToBought)

// static assets - public folder
let filename = fileURLToPath(import.meta.url);
let dirname = path.dirname(filename);
app.use(express.static(path.join(dirname, 'public')));