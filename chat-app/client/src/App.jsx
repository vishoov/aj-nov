
import './App.css'
import { io } from 'socket.io-client'
import { useEffect, useMemo, useState } from 'react'

function App() {

  const [messages, setMessages] = useState([])
  const [socketId, setSocketId] = useState("")

  //request the server to connect
  // socket = client
  const socket = useMemo(()=>io('http://localhost:3000'), [])
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    //emitting the message
    const message = e.target[0].value;
    const reciever = e.target[1].value;
    socket.emit('message', {message, reciever})
  }

  useEffect(()=>{
    socket.on("connect", ()=>{
      console.log("Connected to the server");
      setSocketId(socket.id)

    })

    socket.on("forward", (data)=>{
      console.log(data);
      setMessages((prev)=>[...prev, data.message])
    })
  }, [])

  return (
    <>
    <h1>Socket app</h1>
    <p>{socketId}</p>
    

    <form className="message" onSubmit={handleSubmit} >
      <input type="text"  placeholder='Please enter your message' />
      <input type='text' placeholder='Enter Reciever Id' />
      <button type='submit'>Send Message</button>
    </form>

    <div className='messages'>
      {
        messages.map((message, index)=>{
          return <div key={index} className='app-message'>
            {message}
            </div>
        })
      }
    </div>

    </>
  )
}

export default App
