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
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
    if (distance && Array.isArray(distance)) query.distance = { $in: distance };
    if (thicknessReduction && Array.isArray(thicknessReduction)) query.thicknessReduction = { $in: thicknessReduction };
    if (heliomat && Array.isArray(heliomat)) query.heliomat = { $in: heliomat };
    if (blueFilter && Array.isArray(blueFilter)) query.blueFilter = { $in: blueFilter };
    if (visualField && Array.isArray(visualField)) query.visualField = { $in: visualField };

    try {
        const products = await ProductModel.find(query).skip(skip).limit(limit);
        const totalProducts = await ProductModel.countDocuments(query);
        res.json({
            products,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json(err);
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


// GET saved product IDs for a user
router.get("/savedProducts/ids", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        res.json({ savedProducts: user.savedProducts });
    } catch (err) {
        res.json(err);
    }
});

// GET saved products for a user
router.get("/savedProducts", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        const savedProducts = await ProductModel.find({
            _id: { $in: user.savedProducts },
        });
        res.json({ savedProducts });
    } catch (err) {
        res.json(err);
    }
});

export { router as productsRouter };
