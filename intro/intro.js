//MERN Stack
// M = MongoDB
// E = Express.js
// R = React.js
// N = Node.js


// HTTP Protocol -> internet protocol used for communication in the appliation layer of networking
// Req-Res cycles-> where whenever we have to access any data from the server side
// we send a REQUEST to the server and after gathering the info and doing all the formalities server replies us with a RESPONSE and this whole process is called request-response cycle

//Buy a product




// HTTP Methods -> Request -> purpose in terms of data -> GET, POST, PUT, PATCH, DELETE

//RESTful API -> Representational State Transfer -> this is an API development architecture that follows some principles that help us to create a scalable, flexible and efficient web server for communication between client and data

// Architectural pointers
// 1. Uniform Interface - well identification of resources -> /api/signup 
// 2. Statelessness-> we donot store any data on the server 
// 3. Cacheability -> the server should be able to cache responses for better performance and reduced latency 
// 4. Layered System -> we implement features in layers 


// HTTP Status Codes -> they tell about the nature of the response that we have got
// 200s -> success codes 
// 400s-> Client errors 
// 500s server errors 


// MERN Stack
// M = MongoDB
// E = Express.js
// R = React.js
// N = Node.js

// React-> framework that is used for creating dynamic UIs and front ends

// Node.js -> Javascript runtime that allows us to execute javascript code on the server side, enabling non blocking i/o operations and event driven architecture for scalable network applications 

// NPM -> Node package manager -> package manager for node.js with over 2 million packages. helps us in installing, managing and shipping our server side applications 

//How to set up a node.js project?

//We'll be setting up a new nodejs project

// how to do it
// 1. create a folder for your project
// 2. open terminal inside it 
// 3. on the terminal type -> npm init 
// 4. follow the steps

// for shortcut -> npm init -y


// EXPRESS.JS -> is a fast, unopinionated, minimalist web framework for Node.js that helps in building APIs for server side development which includes routing, middleware handling and HTTP req/res processing 


// SERVER IS EVENT DRIVEN!!!!! -> whenever we will get a request only then a function will be invoked 

// Routes handlers 


// package-lock -> this stores the stable versions of the packages that we are using inside our application
// node_modules -> files of the packages are stored


// steps to setup express.js
//1. npm install express