import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import User from "@/models/User";

export async function PUT(req, context) {
    await connectDB();

    const { id } = await context.params;   // ✅ Await params (important)

    const {
        email,
        name,
        category,
        description,
        price,
        stock,
        prescriptionRequired
    } = await req.json();

    const user = await User.findOne({ email });

    if (!user || user.role !== "admin") {
        return Response.json(
            { message: "Unauthorized. Admin only." },
            { status: 403 }
        );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
            name,
            category,
            description,
            price,
            stock,
            prescriptionRequired,
        },
        { returnDocument: "after" }   // ✅ updated syntax
    );

    if (!updatedProduct) {
        return Response.json(
            { message: "Product not found" },
            { status: 404 }
        );
    }

    return Response.json({
        message: "Product updated successfully",
        product: updatedProduct,
    });
}