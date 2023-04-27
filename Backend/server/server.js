import express from "express"
import cors from "cors"
import mongodb from "mongodb"
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

const app = express();

app.use(cors());
app.use(express.json());

// Connect to Database
// const MongoClient = mongodb.MongoClient
// MongoClient.connect(
//     'mongodb://0.0.0.0/Motile', 
//     {useNewUrlParser: true},
// )
// .catch(error => { 
//     console.error(error);
//     process.exit(1);
// }).then(async client =>{
//     console.log("Connected to Database")
//     await motilePartsCollection.retrieveMotilePartsCollection(client);
//     await UsersCollection.retrieveUsersCollection(client);
//     await UserConfigsCollection.retrieveConfigsCollection(client);
//     await userDataCollection.retrieveUserDataCollection(client);
//     app.listen(5000,() =>{
//         console.log('Server started')
//     });
// })

app.listen(5000,() =>{
    console.log('Server started')
});

app.get('/test', (req, res) => {
    res.json("Hello");
});

// MotileParts
app.get('/MotileParts', motilePartsCollection.getMotileParts);

// Login/Register
app.post('/Login', UsersCollection.login);
app.post('/LoginJWT', Middleware.verifyJWT, UsersCollection.loginJWT);
app.post('/StayAlive', Middleware.verifyJWT, UsersCollection.stayAlive);
app.post('/Register', UsersCollection.addUser);
app.get('/VerifyEmail', UsersCollection.verifyUser);

// UserData
app.post('/User/Data', Middleware.verifyJWT, UsersCollection.getUserDataFromUser);
app.post('/User/Data/AddAddress', Middleware.verifyJWT, userDataCollection.addAddress);
app.post('/User/Data/RemoveAddress', Middleware.verifyJWT, userDataCollection.removeAddress);
app.post('/User/Data/UploadProfilePic',  multer({ storage: ImageUploadHandler.getStorage() }).single('file'), Middleware.verifyJWT, userDataCollection.updateProfilePic);
app.post('/User/Data/Modify', Middleware.verifyJWT, userDataCollection.modifyUserData);

// UserConfigurations
app.post('/User/Configs', Middleware.verifyJWT, UsersCollection.getConfigFromUser);
app.post('/User/Configs/Remove', Middleware.verifyJWT, UserConfigsCollection.removeUserConfiguration);
app.post('/User/Configs/Add', Middleware.verifyJWT, UserConfigsCollection.addUserConfiguration);
app.post('/User/Configs/GenerateThumbnail', Middleware.verifyJWT, BlenderJobs.renderThumbnail);
app.post('/User/Configs/Buy', Middleware.verifyJWT, UserConfigsCollection.setUserConfigToBought)

// static assets - public folder
let filename = fileURLToPath(import.meta.url);
let dirname = path.dirname(filename);
app.use(express.static(path.join(dirname, 'public')));

export default app