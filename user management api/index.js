import express from 'express';
const app = express()

app.use(express.json())



//Database connection code
const uri = "mongodb+srv://vverma971_db_user:tgnrKMsovewn3rVS@cluster0.xluprhn.mongodb.net/?appName=Cluster0"
//URI -> Uniform Resource Identifier 


import mongoose from 'mongoose';

//implement a db connection promise 
mongoose.connect(uri)
.then(()=>console.log("Connected to Database Successfully"))
.catch(err=>console.error(err.message))

import User from "./model/user.model.js"



app.get("/", (req, res)=>{
    res.send("Welcome to the user management api")
})


//signup, login, reset password, logout, fetch users
// security 
// database (cloud DB Atlas)
// Modelling and Validating the data 
//mongoose

//RESTful API -> Stateless
//Stateful 

//read mongoosejs.com/docs/
//write routes for our api

//signup 
// /users/:id  GET -> find user by id  dynamic rroute parameter
// /users/:id METHOD:PUT -> update user's password
// /users/:id METHOD:DELETE-> delete user



//signup page
app.post("/signup", async (req, res)=>{
    const userData = req.body;

    // users.push(userData);
    const createdUser = await User.create(userData)
    //sending the data to the DB

    res.status(201).json({
        createdUser
    })
})


//fetch 
app.get("/users", (req, res)=>{
    // res.json({
    //     users
    // })
})




app.listen(3000, ()=>{
    console.log("Server is live on http://localhost:3000/")
})