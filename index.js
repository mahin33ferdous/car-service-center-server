const express=require('express');
const cors=require('cors');
const app=express()
const port=process.env.PORT || 5000;

//midddleware
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("car")
})

app.listen(port,()=>{
    console.log(`car service ${port}`);
})