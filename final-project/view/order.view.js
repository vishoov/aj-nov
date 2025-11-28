import express from 'express'
import Order from '../model/order.model.js';
import Cart from '../model/cart.model.js';
const router = express.Router();
import Product from '../model/product.model.js';
// Place Order
router.post("/placeOrder", async (req, res)=>{
    //using the cart 
    //1. if the cart doesnt exist
    //2. product exists or not
    // 3. if quantity ordered for a product is higher than its stock 
try{

    const userId = req.body.userId;
    const shippingAddress = req.body.shippingAddress

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.products.length===0) {

      return res.status(400).send("Cart is empty");

    }

    let orderItems = [];

    let totalAmount = 0;

    for (const item of cart.products) {

      const product = await Product.findById(item.productId);

      if (item.quantity > product.stock) {

        return res.status(400).send(

        "no stock");

      }

      orderItems.push({

        productId: product._id,

        quantity: item.quantity,

        price: product.saleprice,

      });

      totalAmount += item.price * item.quantity;

    }

    const order = await Order.create({

      userId,

      items: orderItems,

      totalAmount,

      shippingAddress,

      status: "pending",

    });

    res.status(201).json({

      message: "Order placed",

      success: true,

      order,

    })
}
catch(err){
    res.send(err.message)
}
})

router.put("/cancelOrder/:id", async(req,res)=>{

    const orderId = req.params.id
  
    console.log("cancelling...", orderId)
  
    if(!orderId){
  
      return res.status(400).send("order id missing")
  
    }
  
    let order;
  
    try{
  
      order = await Order.findById(orderId)
  
    }catch(err){
  
      console.log("err finding order",err)
  
    }
  
    if(!order){
  
      return res.status(404).send("order not found")
  
    }
  
    if(order.status == "delivered"){
  
      return res.status(400).send("cant cancel now")
  
    }
  
    order.status = "cancelled"
  
    await order.save()
  
    res.send({ msg:"order cancelled", order })
  
  })

// Cancel Order
// Track
router.get("/order/:id", async (req, res)=>{
    try{
        const order= await Order.findById(req.params.id)

        if(!order){
            res.send("Order not found")
        }
        res.send(order.status);
    }
    catch(err){
        res.send(err.message)
    }
})


export default router;