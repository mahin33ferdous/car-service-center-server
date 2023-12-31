const express=require('express');
const cors=require('cors');
require('dotenv').config()
const app=express()
const port=process.env.PORT || 5000;
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');

//midddleware
app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER)
console.log("hhhhhh")
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2qayojn.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
console.log(uri)
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    const serviceCollection=client.db('carService').collection('services')
    const orderCollection =client.db('carService').collection('orders')
    app.get('/services', async(req,res)=>{
        const query={}
        const cursor=serviceCollection.find(query);
        const services=await cursor.toArray();
        res.send(services)
    })

    app.get('/services/:id',async(req,res)=>{
        const id=req.params.id;
        const query={ _id:new ObjectId(id)}
        const service= await serviceCollection.findOne(query);
        res.send(service)
    })

    app.post('/orders',async(req,res)=>{
      const order=req.body
      const result= await orderCollection.insertOne(order)
      res.send(result)
    })

    app.get('/orders', async(req,res)=>{
      
      let query={}
      if(req.query.email){
        query={
          email: req.query.email
        }
      }
      const cursor=orderCollection.find(query);
      const order=await cursor.toArray();
      res.send(order)
  })

    app.get('/orders/:id',async(req,res)=>{
      const orderId=req.body.id
      const query={ _id:new ObjectId(id)}
        const order= await orderCollection.findOne(query);
        res.send(order)
    })
   
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send("car")
})

app.listen(port,()=>{
    console.log(`car service ${port}`);
})