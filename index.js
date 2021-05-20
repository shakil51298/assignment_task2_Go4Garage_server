const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');




const uri = "mongodb+srv://shakil51298:Webdeveloper21mongo@cluster0.bptoi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json());

// mongo
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const CoustomersCollection = client.db("intern_coustomer").collection("coustomers");
    const productsCollection = client.db("internProduct").collection("products");
    // insert to database users info
    app.post('/user/login', (req , res) => {
        const userInfo = req.body;
        CoustomersCollection.insertOne(userInfo)
        .then(result => {
            res.send(result.insertedCount > 0 )
        })
    })
    // find the specific user
    app.post('/user' , (req , res)=> {
        const userName = req.body.userInfo.User_name;
        const userPassword = req.body.userInfo.password;
        CoustomersCollection.find({userName : userName , userPass : userPassword})
        .toArray((err , userDocs)=> {
            res.send(userDocs)
        })
    })
    // insert to database products info
    app.post('/Addvendor/list' , (req , res)=> {
        const productsInfo =  req.body;
        productsCollection.insertMany(productsInfo)
        .then (proData => {
            res.send(proData)
        })
    })
    //  get product
    app.get('/vendor/list' , (req , res)=> {
        productsCollection.find().toArray((err , producDocs) =>{
            res.send(producDocs)
        })
    })
});



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})