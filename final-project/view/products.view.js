import express from 'express';
const router = express.Router();
import Product from '../model/product.model.js'


router.post("/create", async (req, res)=>{
    const data = req.body;
    const product = await Product.create(data);

    if(!product){
        res.status(400).send("Product not created");
    }

    res.status(200).json({
        message:"Product created",
        product
    })
})


router.get("/all", async (req, res)=>{
    try{
        const products = await Product.find();
        res.send({
            products
        })
    }
    catch(err){
        res.send(err.message)
    }
})

// Create product /createproduct
// Fetch Product /product
router.get("/:id", async (req, res) => {
    try {
    const { id } = req.params;
    
    const product = await Product.findById(id);
    
    if (!product) {
    
    res.status(404).json({
    
    success: false,
    
    message: "Product not found",
    
    });
    
    }
    
     
    
    return res.status(200).json({
    success: true,
    message: "Product retrieved successfully",
    product
    });
    } catch (error) {
    console.error(error);
    }
    });
// Update Product /updateProduct
// Delete Product /deleteProduct
// Search /searchProduct

router.put("/:id", async (req, res) => {

    try {
    
    const { id } = req.params;
    
    const product = await Product.findById(id);
    
    if (!product) {
    
    res.status(404).json({
    
    success: false,
    
    message: "Product not found",
    
    });
    
    }
    
     
    
    const updates = req.body;
    
    for (const key in updates) {
    
    product[key] = updates[key];
    
    }
    
     
    
    await product.save();
    
     
    
    return res.status(200).json({
    
    success: true,
    
    message: "Product updated successfully",
    
    data: product
    
    });
    
    } catch (error) {
    
    console.error(error);
    
    }
    
    });


    router.delete("/:id", async (req, res) => {

        try {
        
        const { id } = req.params;
        
        const product = await Product.findById(id);
        
        if (!product) {
        
        res.status(404).json({
        
        success: false,
        
        message: "Product not found",
        
        });
        
        }
        
         
        
        await product.deleteOne();
        
         
        
        return res.status(200).json({
        
        success: true,
        
        message: "Product deleted successfully",
        
        });
        
        } catch (error) {
        
        console.error(error);
        
        }
        
        });

export default router;