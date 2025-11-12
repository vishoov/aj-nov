// ES5 
// const express = require('express')
// ES6 
import express from 'express'
const app = express();
//this is called an instance of express



import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Define __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.get("/response", (req, res)=>{
    // res.send([1,2,3,4]) //send method of response object
    // res.json({
    //     message:"JSON Response"
    // })

    //send http status codes 
    res.status(500).json({
        message:"Response is here!",
        status:"success",
    })

    // res.sendFile(__dirname + '/index.html')

})


//Routing in express.js
//Root route-> http://localhost:3000/

//event driven -> some event will trigger then a function will run 
//req -> function -> res
app.use(express.json())

//targetElement.addEventListener("eventName", callback)
// document.addEventListener("click", ()=>{})
//app.method('/path', handlerFunction)

app.get('/', (req, res)=>{
    console.log("Root route called")
    res.send("Welcome to the root route")
});

app.get('/about', (req, res)=>{
    res.send("Welcome to the about page")
})




//express provides us with a very clean way of handling what we recieve as a request and what we can send back as a response 
//req, res -> request and response objects that are provided by express 

app.get("/request", (req, res)=>{

    console.log(req)
    const headers = req.headers;
    const body = req.body;

    const ip = req.ip //gives us the ip address of the request
    const path = req.path //on which path we have recieved request
    const protocol = req.protocol //using which protocol 
    const hostname = req.hostname 
    const method = req.method //method of the request
    const route = req.route
    const url = req.url


    //params and query 

    res.send({
        headers, body,
        ip, path, 
        protocol, hostname, method, url, route
    })
})


// Dyanmic Routing 

// Route parameters
// dynamic routes use parameters as placeholders in URL path, define with a colon (:) 
// these params act as variables that capture values from the URL

app.get("/user/:username/:age", (req, res)=>{
    const username = req.params.username;
    // /user/ABCD/20
    const age = req.params.age
    res.send(`Welcome to the server Mr. ${username}, with age ${age}`)
})


app.get("/newRoute", (req, res)=>{
    res.status(200).send("This route is working perfectly!")
})

// Query Parameters
// searching 
// query parameters are key value pairs appended to the URL after a question mark (? )
// that allow clients to pass additional information to the server without changing the route structure

app.get("/search", (req, res)=>{
    const query = req.query.q;
    const name = req.query.name;
    // /search?q=something

    res.send(`You searched for ${query} and name: ${name}`)
})









//deployed on a port
// PORT-> NETWORK PORTS-> interfaces through which our applications access the network
// port listener -> here we want to recieve the requests meant for this server
app.listen( 3000,()=>{
        console.log("the server is live on http://localhost:3000/")
    })


// http://localhost:3000/