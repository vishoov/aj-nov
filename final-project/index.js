import express from 'express';
const app = express();
import userRoutes from './view/users.view.js'
import productRoutes from "./view/products.view.js"
app.use(express.json());

import mongoose from 'mongoose';

const uri = "mongodb+srv://vverma971_db_user:tgnrKMsovewn3rVS@cluster0.xluprhn.mongodb.net/?appName=Cluster0"

mongoose.connect(uri)
.then(()=>{
    console.log("DB Connected")
})
.catch((err)=>console.log(error.message))

app.get("/", (req, res)=>{
    res.send("Welcome to ecommerce api")
})

app.use("/users", userRoutes)
app.use("/products", productRoutes)
app.listen(3000, ()=>{
    console.log("server is live on port http://localhost:3000/")
})