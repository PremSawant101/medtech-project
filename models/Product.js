import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: String,
        category: String,
        description: String,
        price: Number,
        stock: Number,
        prescriptionRequired: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);