const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5001;

//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jgjgvfa.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const fashionCollection = client.db('fashionBrands').collection('newBrands');
    const allFashionCollection = client.db('fashionBrands').collection('allFashionBrands');

    app.get('/newBrands' , async(req, res) =>{
        const cursor = fashionCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/allFashionBrands' , async(req, res) =>{
        const cursor = allFashionCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('server is running successfully')
})

app.listen(port, () =>{
    console.log(`server is running on port: ${port}`);
})