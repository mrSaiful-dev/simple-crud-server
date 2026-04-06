const express = require('express');

const { MongoClient, ServerApiVersion } = require('mongodb');

const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const dns = require('dns');
dns.setServers(["1.1.1.1", "8.8.8.8"]);


const uri = "mongodb+srv://mrsaifuldev:ayn7AjiJYsYH5X19@cluster0.r7sov8y.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

    // middleware 
    app.use(cors());
    app.use(express.json());


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const database = client.db("userDatabase");
    const usersCollection = database.collection("users");


    app.get('/users', async(req,res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

   // add to database 
    app.post('/users', async(req,res)=>{
      console.log('data in the server ', req.body);
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    })
    


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  
  finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res)=>{
    res.send('simple crush server running');
})

app.listen(port, () => {
    console.log(`simple crud server running on , ${port}`);
})













