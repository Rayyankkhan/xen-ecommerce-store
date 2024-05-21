const port = process.env.PORT || 4000;
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const { body, validationResult } = require('express-validator');

app.use(express.json());
app.use(cors());


// database connection with mongoDB 
mongoose.connect("mongodb+srv://user128:Admin128@cluster0.ujrmuwn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

// Api Creation 

app.get('/', (req, res) => {
    res.send("Express app is running")
})


// images storage endpoint

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage});


// Creating upload endppoint for images
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

const Product = mongoose.model("Product", {
    id:{
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
         
     },
     new_price:{
        type: Number,
        required: true,
     },
     old_price:{
        type: Number,
        required: true,
     },
     date:{
        type: Date,
        default:Date.now,
     },
     available:{
        type: Boolean,
        default: true,   
     },

})


// Api for add products


app.post('/addproduct' , async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
       
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name:req.body.name
    })
})


// creating API endpoint for deleteing products

app.post('/removeproduct' , async(req, res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed")
    res.json({
        success: true,
        name:req.body.name,
    })
})

// creating API for get all products 
app.get('/allproducts' , async (req, res)=>{
    let products = await Product.find({})
    console.log("All Products Fetched")
    res.send(products);
})

// Schema creating for user model
const User = mongoose.model('User', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});


    // creating endpoint for registering the user
    app.post('/signup', async (req, res) => {
        let check = await User.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({
                success: false,
                errors: " Existing user found with same email",
            });
        }
        let cart = {};
        for (let i = 0; i < 300; i++){
            cart[i] = 0;
        }
        const user = new User({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        })
        await user.save();
        const data = {
            user: {
                id: user.id,
            },
        };
        const token = jwt.sign(data, "secret_ecom");
        res.json({ success: true, token })
    });


    // creating endpoint for user login
    app.post('/login', async (req, res)=>{
        let user = await User.findOne({ email: req.body.email});
        if (user) {
            const passMatch = req.body.password === user.password;
            if(passMatch){
                const data = {
                    user:{
                        id: user.id,
                    },
                };
                const token = jwt.sign(data, "secret_ecom");
                res.json({ success: true, token});
            } else {
                res.json({ success: false, errors: 'Wrong Password'});
            }
        }else {
            res.json({ success: false, errors: "wrong Email address"});
        }
    })


    //creating endpoint from latest products
    app.get('/newcollections', async (req, res)=>{
        let products = await Product.find({});
        let newcollection = products.slice(1).slice(-8);
        console.log("newcollection fetched")
        res.send(newcollection);
    });

    //creating endpoint from Popular products
    app.get('/popularproducts', async (req, res)=>{
        let products = await Product.find({category: "men"});
        let popularproducts = products.slice(0, 4);
        console.log("popularproducts fetched")
        res.send(popularproducts);
    });

    // creating middleware to fetch user
    const fetchUser = async (req, res, next) => {
        const token = req.header("auth-token");
        if (!token) {
            res.status(401).send({errors: "Please authenticate using valid login"});
        }
        else{
            try {
                const data = jwt.verify(token, "secret_ecom");
                req.user = data.user;
                next()
            } catch (error) {
                res.status(401).send({errors: "Please authenticate using valid token"})
            }
        }
    }    

    // creating endpoint for adding products in  cartData

    app.post('/addtocart', fetchUser, async(req, res)=> {
        console.log("Added",req.body.itemId);
        let userData = await User.findOne({_id:req.user.id});
        userData.cartData[req.body.itemId] += 1;
        await User.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData });
        res.send("Added")
    })


    // creating endpoint for removing products in  cartData

    app.post('/removefromcart', fetchUser, async(req, res)=> {
        console.log("Removed",req.body.itemId);

        let userData = await User.findOne({_id:req.user.id});
        userData.cartData[req.body.itemId] -= 1;
        await User.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData });
        res.send("Removed")
    })


    // app.post('/getcart', fetchUser, async(req, res)=> {
    //     console.log("Get Cart");
    //     let userData = await User.findOne({_id: req.body.id});
    //     res.json(userData.cartData);
    // })


    app.post('/getcart', fetchUser, async(req, res)=> {
        console.log("Get Cart");
        try {
            const userId = req.user.id;
            // console.log("User ID:", userId);
            
            const userData = await User.findOne({_id: userId});
            // console.log("User Data:", userData);
            
            if (!userData || !userData.cartData) {
                return res.json({ message: "Cart is empty" });
            }
            
            res.json(userData.cartData);
        } catch (error) {
            console.error("Error fetching user cart:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    })


    // order
    const Order = mongoose.model("Order", {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        items: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }],
        totalAmount: {
            type: Number,
            required: true
        },
        paymentMethod: {
            type: String,
            enum: ['card', 'COD'],
            required: true
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending'
        },
        shippingDetails: {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            },
            address1: {
                type: String,
                required: true
            },
            address2: {
                type: String,
                required: false
            },
            country: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            postalCode: {
                type: String,
                required: true
            }
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

    

   

// Place order endpoint
app.post('/placeorder', fetchUser, [
    body('items').isArray().withMessage('Items must be an array'),
    body('items.*.productId').isMongoId().withMessage('Invalid product ID'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('paymentMethod').isIn(['card', 'COD']).withMessage('Invalid payment method'),
    body('shippingDetails.name').not().isEmpty().withMessage('Name is required'),
    body('shippingDetails.email').isEmail().withMessage('Valid email is required'),
    body('shippingDetails.phone').not().isEmpty().withMessage('Phone number is required'),
    body('shippingDetails.address1').not().isEmpty().withMessage('Address1 is required'),
    body('shippingDetails.country').not().isEmpty().withMessage('Country is required'),
    body('shippingDetails.city').not().isEmpty().withMessage('City is required'),
    body('shippingDetails.postalCode').not().isEmpty().withMessage('Postal code is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { items, paymentMethod, shippingDetails } = req.body;

    // Calculate total amount
    let totalAmount = 0;
    for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) {
            return res.status(404).send({ error: `Product with id ${item.productId} not found` });
        }
        totalAmount += product.new_price * item.quantity;
    }

    // Create order
    const order = new Order({
        userId: req.user.id,
        items,
        totalAmount,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'pending' : 'completed', // For demo, mark card payments as completed
        shippingDetails
    });
    await order.save();

    res.send({ success: true, order });
});

module.exports = app;

         app.listen(port,(error)=> {
            if(!error) {
                console.log("Server is running on Port" +port)
            }
            else {
                console.log("Error : " +error)
            }
        })