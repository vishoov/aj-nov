import express from 'express'
const app = express();


const LoggingMiddleware = (req, res, next)=>{
    //Logging means keeping a record of something 
    const method = req.method
    const path = req.path
    const time = new Date().toLocaleTimeString();

    console.log(`[${time}]: ${path}, ${method}`)
    next()
}


app.use(LoggingMiddleware)

//to identify a middleware function look at the arguments and it should have a 'next' argument
const myLogger = (req, res, next) =>{
    console.log("LOGGED!")
    next(); 
}

app.get("/beforeMW", (req, res)=>{
    console.log("before MW route executed")
    res.send("this route is before middleware")
})

//implementation of a middleware 
//this middleware will be applicable on all the routes that are written after this in this file!
app.use(myLogger)

//will only enable the mw for this route 
app.get("/", myLogger, (req, res)=>{
    console.log("Handler function reached!")
    res.status(200).send("Welcome to the middleware root route")
})

// what is the diff between app.use() and sandwiching middleware function in  a route


// ---------------------------------------------------------------------------------
// TYPES OF MIDDLEWARES
// ---------------------------------------------------------------------------------


// Core functions of middlewares
// Execute any code -> write any logic relayted to security, validation, monitoring 
// Modify Request and response object -> add properties, parse data, or transform info in req and res
// End Req-Res cycle -> if there is an error in data we can send a response with error before the handler function
// Call next middleware -> next() passing the request to next mw in line or the handler function 


// security -> write your name, entry time, exit time 
// parse json file
// authentication 


// 1. Application Level Middleware - middlewares bound to entire express application using app.use() or app.METHOD()
// app.use(myLogger)
// routes after this middleware will have to implement this before their handler functions

// app.get("/", myLogger, (req, res)=>{
//     console.log("Handler function reached!")
//     res.status(200).send("Welcome to the middleware root route")
// })


// 2. Custom Middlewares 

// const LoggingMiddleware = (req, res, next)=>{
//     //Logging means keeping a record of something 
//     const method = req.method
//     const path = req.path
//     const time = new Date().toLocaleTimeString();

//     console.log(`[${time}]: ${path}, ${method}`)
//     next()
// }


// app.use(LoggingMiddleware)


// 3. Builtin middlewares
// express.json()

app.use(express.json()) // helps us in parsing the json files that we reciever on the server

app.get("/customInfo", (req, res)=>{
    const data = req.body;

    res.send(data)
})


// 4. third party middlewares
import morgan from 'morgan';

app.use(morgan('combined'))

app.get("/morganUsage", (req, res)=>{
    res.send("Welcome to morgan route")
})


//5. Router level middleware for handling routes written in files except for the main file
// Router level middleware is used for modular programming 
import blogRoutes from "./view/blog.route.js"


app.use(blogRoutes)








app.listen(3000, ()=>{
    console.log("middleware file is live on http://localhost:3000/")
})