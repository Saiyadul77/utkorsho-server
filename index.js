const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rtqf9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const programCollection = client.db("utkorsho").collection("program");
        const programsCollection = client.db("utkorsho").collection("programs");


        app.get('/programs', async(req,res)=>{
            const query= {};
            const cursor= programCollection.find(query);
            const programs= await cursor.toArray();
            res.send(programs);
        })
        app.get('/programs/:id', async(req, res)=>{
            const id= req.params.id;
            const query= {_id: ObjectId(id)};
            const program= await programCollection.findOne(query);
            res.send(program);
        })

        app.get('/program', async(req, res)=>{
            const query={};
            const cursor=programsCollection.find(query);
            const program= await cursor.toArray();
            res.send(program);
        })


    }
    finally {

    }
}

run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('I love my country')
})
app.listen(port, () => {
    console.log(`Welcome to Utkorsho Academic & Admission Care`)
})