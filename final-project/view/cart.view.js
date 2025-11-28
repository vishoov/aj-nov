import express from 'express'
const router = express.Router();
import Product from '../model/product.model.js';
import Cart from '../model/cart.model.js';

// 692876b37820a71b05874cb5
// 691765db14d45790d546902a
router.post("/addtocart/:id", async (req, res) => {

    const { productId, quantity = 1 } = req.body;
  
    // const userId = req.user.id;
    const userId= req.params.id;
  
    //error handling for the inputs 
    if (!productId) {
      return res.status(400).send("product id required");
    }
  
    const product = await Product.findOne({_id:productId});
    
    if (!product) {
      return res.status(404).send("product not found");
    }


  //find the cart

  console.log(product)
    let cart = await Cart.findOne({ userId });

    //cart created
    if (!cart) {
      cart = new Cart({
        userId,
        products: [],
        totalAmount: 0,
      });
    }
  
    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );
  
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
  
    } else {
      cart.products.push({
        productId,
        price: product.saleprice,
        quantity,
  
      });
  
    }
    //we have added a new product so we need to calculate the new price
    cart.totalAmount = cart.products.reduce(
      (sum, item) => (sum += item.price * item.quantity),
      0
    );

  await cart.save();
  
    res.status(201).json({
      message: "Product added to cart",
      success: true,
      cart,
    });  
  });


  router.delete("/removefromcart/:id", async (req, res) => {

    const productId = req.params.id;
  
    //either you can send manually or you can fallback to the JWT set user id 
    const userId = req.body.userId;
    console.log(productId, " ", userId)
    //Short Circuiting
  
    if (!productId) {
  
      return res.status(400).send("product id required");
  
    }
  
    let cart = await Cart.findOne({ userId });
    console.log(cart)
  
    if (!cart) {
  
      return res.status(404).send("cart not found");
  
    }
  
    const itemIndex = cart.products.findIndex(
  
      (item) => item.productId.toString() === productId
  
    );
  
    if (itemIndex === -1) {
  
      return res.status(404).send("product not found in cart");
  
    }
  
  cart.products.splice(itemIndex, 1);
  
    cart.totalAmount = cart.products.reduce(
  
      (sum, item) => sum + item.price * item.quantity, 0
    );
  
    await cart.save();
  
    return res.status(200).send({
  
      message: "item removed from cart",
  
      cart
  
    });
  
  });   
  


  router.get('/fetchCart/:id', async (req, res)=>{
    try{
        const cart = await Cart.findOne(req.params.id);
        res.send({
            cart
        })
    }catch(err){
        res.send(err.message)
    }
  })
export default router;