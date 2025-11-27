import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

name:{
    type:String,
   minLength:5
    // required:true
},

// Age:number,
age:{
    type:Number
},
// Email:string,
email:{
    type:String,
    // match:(v)=>/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(v)
},
// Address:string,
address:{
    type:String
},
// Contact:number,
contact:{
    type:Number,
},
role:{
    type:String,
    enum:["guest","admin", "superadmin", "user"]
},
password:{
    type:String
}
// Role:”user”, “admin”, -> role based authentication 
// Password:string


},
{
    timestamps:true
})


const User  = mongoose.model("User", userSchema);


export default User;