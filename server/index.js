const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res) =>{
    res.send("Hello World");
})

MongoClient.connect('mongodb://localhost/mydb', (err, client) => {
   console.log("Data base connected");
})

const port = 5000;
app.listen(port,() => console.log('Server started'));