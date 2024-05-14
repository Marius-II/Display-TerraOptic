import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        enum: ['aproape', 'departe', 'intermediar'],
        required: true
    },
    adaptive: {
        type: Boolean,
        required: true
    },
    digitalProtection: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    hardening: {  // "durificare" translated to "hardening"
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    antireflex: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    oleophobic: {  // "oleofob" translated to "oleophobic"
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    hydrophobic: {  // "hidrofob" translated to "hydrophobic"
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    antistatic: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    digital: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    thicknessReduction: {  // "subtiere" translated to "thickness reduction"
        type: String,
        enum: ['Grad 1', 'Grad 2', 'Grad 3'],  // "grad" translated to "grade"
        required: true
    },
    comfort: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    heliomat: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    customization: {  // "personalizare" translated to "customization"
        type: Boolean,
        required: true
    },
    blueFilter: {
        type: Boolean,
        required: true
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Changed "users" to "User" to match typical Mongoose naming conventions
        required: true
    }
});

export const ProductModel = mongoose.model('Products', ProductSchema);
