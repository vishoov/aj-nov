// ES5 
// const express = require('express')

// ES6 
import express from 'express'
const app = express();




//deployed on a port
// PORT-> NETWORK PORTS-> interfaces through which our applications access the network
// port listener -> here we want to recieve the requests meant for this server
app.listen( 3000,()=>{
        console.log("the server is live on http://localhost:3000/")
    })


// http://localhost:3000/