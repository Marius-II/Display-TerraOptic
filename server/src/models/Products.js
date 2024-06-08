import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    
    price: {
        type: Number,
        required: true
    },

    distance: {
        type: String,
        required: true
    },

    thicknessReduction: {
        type: String,
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

    hydrophobic: {  // "hidrofob" translated to "hydrophobic"
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

    antistatic: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },

    heliomat: {
        type: String,
        required: true
    },

    comfort: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },

    blueFilter: {
        type: String,
        required: true
    },

    adaptive: {
        type: Boolean,
        required: true
    },

    customization: {  // "personalizare" translated to "customization"
        type: Boolean,
        required: true
    },
    description: {  // "personalizare" translated to "customization"
        type: String,
        required: true
    },
    primaryProductColor: {  // "personalizare" translated to "customization"
        type: String,
        required: true
    },
    secondaryProductColor: {  // "personalizare" translated to "customization"
        type: String,
        required: true
    },
    visualField: {  // "personalizare" translated to "customization"
        type: String,
        required: true
    },
    deliveryTime: {  // "personalizare" translated to "customization"
        type: String,
        required: true
    },

    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Changed "users" to "User" to match typical Mongoose naming conventions
        required: true
    }
});

export const ProductModel = mongoose.model('Products', ProductSchema);
