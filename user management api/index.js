import express from 'express';
const app = express()



app.get("/", (req, res)=>{
    res.send("Welcome to the user management api")
})


//signup, login, reset password, logout, fetch users
// security 
// database (cloud DB Atlas)
// Modelling and Validating the data 



app.listen(3000, ()=>{
    console.log("Server is live on http://localhost:3000/")
})