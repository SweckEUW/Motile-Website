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
import { Zoom } from "swiper"

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
    await UserConfigsCollection.retrieveConfigsCollection(client);
    await userDataCollection.retrieveUserDataCollection(client);
    app.listen(5000,() =>{
        console.log('Server started')
    });
})

app.get('/MotileParts', motilePartsCollection.getMotileParts);
app.get('/VerifyEmail', UsersCollection.verifyUser);

app.post('/Login', UsersCollection.login);
app.post('/LoginJWT', Middleware.verifyJWT, UsersCollection.loginJWT);
app.post('/Register', UsersCollection.addUser);
app.post('/User/Configs', Middleware.verifyJWT, UsersCollection.getConfigFromUser);
app.post('/User/Data', Middleware.verifyJWT, UsersCollection.getUserDataFromUser);
app.post('/StayAlive', Middleware.verifyJWT, UsersCollection.stayAlive);
app.post('/SaveConfiguration', Middleware.verifyJWT, UserConfigsCollection.saveUserConfiguration);
app.post('/GenerateThumbnail', Middleware.verifyJWT, BlenderJobs.renderThumbnail);

// app.post('/Blender', BlenderJobs.render);
app.post('/User/Modify', Middleware.verifyJWT, userDataCollection.modifyUserData);
app.post('/User/AddAddress', Middleware.verifyJWT, userDataCollection.addAddress);
app.post('/User/RemoveAddress', Middleware.verifyJWT, userDataCollection.removeAddress);

//Image upload prep
let upload = multer({ storage: ImageUploadHandler.getStorage() })
app.post('/User/UploadProfilePic', upload.single('file'), Middleware.verifyJWT, userDataCollection.updateProfilePic);

// static assets - public folder
let filename = fileURLToPath(import.meta.url);
let dirname = path.dirname(filename);
app.use(express.static(path.join(dirname, 'public')));

export default app