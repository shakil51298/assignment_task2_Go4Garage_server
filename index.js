const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bptoi.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majorit`;
const app = express()
const port = process.env.PORT || 5000 

app.use(cors())
app.use(bodyParser.json());

// mongo
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const usersCollection = client.db("intern_coustomer").collection("coustomers");
    const productsCollection = client.db("internProduct").collection("products");
    // insert to database users info
    app.post('/user/login', (req, res) => {
        const userInfo = req.body;
        usersCollection.insertOne(userInfo)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })
    // find the specific user
    app.post('/user', (req, res) => {
        const userName = req.body.userInfo.User_name;
        const userPassword = req.body.userInfo.password;
        usersCollection.find({ userName: userName, userPass: userPassword })
            .toArray((err, userDocs) => {
                res.send(userDocs)
            })
    })
    // insert to database products info
    app.post('/Addvendor/list', (req, res) => {
        const productsInfo = req.body;
        productsCollection.insertMany(productsInfo)
            .then(proData => {
                res.send(proData)
            })
    })
    //  get product
    app.get('/vendor/list', (req, res) => {
        productsCollection.find().toArray((err, producDocs) => {
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