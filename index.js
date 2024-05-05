const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const connectDB = require('./db/connect');

const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());

const productsRoutes = require('./routes/products')

app.get("/",(req,res)=>{
    res.send('Hi I am live')
})

app.use('/api/products',productsRoutes)

const start = async()=>{
    try{
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`${PORT} Yes I am connected`);
        })
    }catch(err){
        console.log(err)
    }
}

start()