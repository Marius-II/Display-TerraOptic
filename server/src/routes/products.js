import express from "express";
import mongoose from "mongoose";
import { ProductModel } from "../models/Products.js"; // Assuming default export from the model file
import { UserModel } from "../models/Users.js"; // Assuming default export from the model file

const router = express.Router(); // Capitalize 'R' in Router()

// GET all products with pagination
router.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 20; // Default to 20 products per page
    const skip = (page - 1) * limit;

    try {
        const products = await ProductModel.find({}).skip(skip).limit(limit);
        const totalProducts = await ProductModel.countDocuments({});
        res.json({
            products,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json(err); // Return error with HTTP status code
    }
});

// POST a new product
router.post("/", async (req, res) => {
    const product = new ProductModel(req.body); // Create a new product instance with request body
    try {
        const savedProduct = await product.save(); // Save product to database
        res.status(201).json(savedProduct); // Return saved product with HTTP status code 201
    } catch (err) {
        res.status(400).json(err); // Return error with HTTP status code
    }
});

// PUT to save a product to a user
router.put("/", async (req, res) => {
    try {
        const product = await ProductModel.findById(req.body.productID)
        const user = await UserModel.findById(req.body.ProductID)
        user.savedProducts.push(product);
        await user.save()

        res.status(201).json({savedProducts : user.savedProducts}); // Return saved product with HTTP status code 201
    } catch (err) {
        res.status(400).json(err); // Return error with HTTP status code
    }
});

// GET saved product IDs for a user
router.get("/savedProducts/ids", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID)
        res.json({ savedProducts: user.savedProducts })
    } catch (err) {
        res.json(err)
    }
})

// GET saved products for a user
router.get("/savedProducts", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID)
        const savedProducts = await ProductModel.find({
            _id: { $in: user.savedProducts },
        });
        res.json({ savedProducts })
    } catch (err) {
        res.json(err)
    }
})

export { router as productsRouter };
