import express from 'express'
const app = express();


//1. Http handshake
import { createServer } from 'http'
const httpServer = createServer(app)
//http handshake
//2. CORS security check
import cors from 'cors'
const corsOptions = {
    origin:"*",
    methods:["GET", "POST"]
}
app.use(cors());
//3. socket.io server setup
import { Server } from 'socket.io';

const io = new Server(
    httpServer,
    {
        cors: corsOptions
    }
)


io.on("connection", (socket)=>{
    console.log("New connection with id: ", socket.id)

    socket.on('message', (data)=>{
        console.log(data.message)
        io.to(data.reciever).emit("forward", {
            message:data.message,
            senderId:data.reciever
        })
    })

    socket.on("roomjoin", (roomId)=>{
        socket.join(roomId)
        //predefined method to let a socket join a specific room (it happens internally by assigning that id to the user)
        console.log(`a new user joined the room ${roomId}`)
    })


})




app.get("/", (req, res)=>{
    res.send("Welcome to the chat app")
})



httpServer.listen(3000, ()=>{
    console.log("Server is live on http://localhost:3000/")
})