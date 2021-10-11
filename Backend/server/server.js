import express from "express"
import cors from "cors"
import mongodb from "mongodb"
import MotileParts from "./motileParts.js"

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
    await MotileParts.retrieveMotileParts(client);
    app.listen(5000,() =>{
        console.log('Server started')
    });
})

app.get('/MotileParts', MotileParts.getMotileParts);

export default app