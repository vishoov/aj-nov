import express from 'express';
const router = express.Router();
import User from '../model/user.model.js';

// Signup	
// Login
// Logout
// Update Password
// Profile Page through id 


router.get("/", (req, res)=>{
    res.send("welcome to user routes")
})

router.post("/signup", async (req, res)=>{
    try{
        const user = req.body;
        console.log(user)

        const createdUser = await User.create(user);

        if(!createdUser){
            return res.send("User couldnt be created")
        }

        res.send({
            user
        })
    }
    catch(err){
        res.send(err.message)
    }
})

router.post("/login", async (req, res) => {

    const { email, password } = req.body;
  
    if (!email || !password) {
  
      return res.status(400).json({ message: "All fields are required" });
  
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
  
      res.status(404).send("User not found");
  
    }
  
    if (password !== user.password) {
  
      res.status(400).send("invalid password");
  
    }
  
   
  
   
  
    res.status(200).json({
  
      message: "user logged in",
  
      user,
  
    });
  
  });

router.get("/all", async (req, res)=>{
  try{
    const users = await User.find();
    res.send({
      users
    })
  }
  catch(err){
    res.send(err.message)
  }
})


router.post("/check", (req, res)=>{
    res.send(req.body.message)
})



export default router;