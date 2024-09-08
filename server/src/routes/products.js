import express from "express";
import mongoose from "mongoose";
import { ProductModel } from "../models/Products.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// New route for filtering products with pagination
router.get("/filter", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const {
        minPrice,
        maxPrice,
        distance,
        thicknessReduction,
        heliomat,
        blueFilter,
        visualField
    } = req.query;

    let query = {};

    if (minPrice || maxPrice) query.price = {};
    if (minPrice && minPrice.trim() !== '') query.price.$gte = Number(minPrice);
    if (maxPrice && maxPrice.trim() !== '') query.price.$lte = Number(maxPrice);    
    if (distance) query.distance = { $in: Array.isArray(distance) ? distance : [distance] };
    if (thicknessReduction) query.thicknessReduction = { $in: Array.isArray(thicknessReduction) ? thicknessReduction : [thicknessReduction] };
    if (heliomat) query.heliomat = { $in: Array.isArray(heliomat) ? heliomat : [heliomat] };
    if (blueFilter) query.blueFilter = { $in: Array.isArray(blueFilter) ? blueFilter : [blueFilter] };
    if (visualField) query.visualField = { $in: Array.isArray(visualField) ? visualField : [visualField] };
    

    try {
        const products = await ProductModel.find(query).skip(skip).limit(limit);
        const totalProducts = await ProductModel.countDocuments(query);
        res.json({
            products,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page
        });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Internal server error', details: err.message });
    }
});

// GET all products with pagination
router.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
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
        res.status(500).json(err);
    }
});

// POST a new product
router.post("/", async (req, res) => {
    const product = new ProductModel(req.body);
    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT to save a product to a user
router.put("/", async (req, res) => {
    try {
        const { productID, userID } = req.body;
        if (!productID || !userID) {
            return res.status(400).json({ error: 'productID and userID are required' });
        }

        const product = await ProductModel.findById(productID);
        if (!product) {
            return res.status(400).json({ error: 'Product not found' });
        }

        const user = await UserModel.findById(userID);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        user.savedProducts.push(product);
        await user.save();

        res.status(201).json({ savedProducts: user.savedProducts });
    } catch (err) {
        console.error('Server error:', err);
        res.status(400).json({ error: 'An error occurred', details: err.message });
    }
});

// PUT to remove a saved product from a user
router.put("/removeSavedProduct", async (req, res) => {
    try {
        const { productID, userID } = req.body;
        if (!productID || !userID) {
            return res.status(400).json({ error: 'productID and userID are required' });
        }

        const user = await UserModel.findById(userID);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        user.savedProducts = user.savedProducts.filter(id => id.toString() !== productID);
        await user.save();

        res.status(200).json({ savedProducts: user.savedProducts });
    } catch (err) {
        console.error('Server error:', err);
        res.status(400).json({ error: 'An error occurred', details: err.message });
    }
});


// GET saved product IDs for a user
router.get("/savedProducts/ids:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({ savedProducts: user.savedProducts });
    } catch (err) {
        res.json(err);
    }
});

// GET saved products for a user
router.get("/savedProducts/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedProducts = await ProductModel.find({
            _id: { $in: user.savedProducts },
        });
        res.json({ savedProducts });
    } catch (err) {
        res.json(err);
    }
});

export { router as productsRouter };
