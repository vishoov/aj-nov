import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
//     id:string,
// 	Name:string,
//seller -> sellerId
sellerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:false
},
name:{
    type:String,
    required:true
},
// description:string,
description:{
    type:String
},
// Costprice:number,
costprice:{
    type:Number,
    min:0,
    required:true
},
// saleprice:number,
saleprice:{
    type:Number,
    min:0,
    required:true
},
// Category:string,
category:{
    type:String,
    enum:["electronics", "fashion", "dairy", "technology", "home appliances"]
},
// Stock:number,
stock:{
    type:Number,
    default:0,
    min:0
},
image:[
    {
        type:String
    }
]
// image:[String] -> cdn links front end 
// createdAt:date

},
{
    timestamps:true
})


const Product = mongoose.model("Product", productSchema);

export default Product