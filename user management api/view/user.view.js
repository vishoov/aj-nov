import express from 'express';
import User from '../model/user.model.js';
const router = express.Router();



// CREATE QUERIES
//signup page
router.post("/signup", async (req, res)=>{
    const userData = req.body;

    // users.push(userData);
    const createdUser = await User.create(userData)
    
    // const user = new User(userData);
    // await user.save(); //this is the object oriented programming way of creating the data
    //sending the data to the DB

    res.status(201).json({
        createdUser
    })
})

//a process where multiple documents are entered in the database at once 
//DATA SEEDING or handling bulk uploads


router.post('/signup_multi', async (req, res)=>{
    const usersArray = req.body;

    const users = await User.create(usersArray);

    if(!users){
        res.status(400).json({
            message:"Users couldnt be created"
        })
    }

    res.status(201).json({
        message:"All users created successfully",
        users
    })
})

// READ

// fetch any data form the db
//conditions!!!

router.get('/all_users', async (req, res)=>{
    try{

        const users = await User.find();
        //find() -:> that returns multiple documents that follow the conditions
        // findOne() -:> returns the FIRST document that matches the conditions

        //no conditions for finding ALL USERS
        res.status(200).json({
            users
        })


    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})


router.get("/users/:id", async (req, res)=>{
    try{
        const id = req.params.id;
//_id -> normal syntax for id in mongodb
        const user = await User.findOne({
            _id:id
        })

        //basic query where we match the query with a field

        if(!user){
            res.status(500).send("No user found")
        }

        res.status(200).json({
            user
        })
    }
    catch(err){
        res.send(err.message)
    }
})

//find = read

//find people below the age of 40
//write comparison queries 
// > -- $gt
// < -- $lt
// >= -- $gte
// <= -- $lte
// != -- $ne

router.get("/users/age/:age", async (req, res)=>{
    try{
        const age = req.params.age;

        const users = await User.find(
            {
                age:{
                    $lt:age
                }
            }
        )

        res.status(200).json(
            {
                users
            }
        )

    }
    catch(err){
        res.json({message:err.message})
    }
})




export default router;