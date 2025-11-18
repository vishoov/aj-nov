import express from "express";
import User from "../model/user.model.js";
const router = express.Router();


router.get("/aggregation", async (req, res)=>{
    try{
        const data= await User.aggregate([
            {
                $match:{
                    role:"admin"
                }
            }
            
        ])

        if(!data){
            res.send("No data found")
        }

        res.json({
            data
        })
    }
    catch(err){
        res.send(err.message)
    }
})

export default router;