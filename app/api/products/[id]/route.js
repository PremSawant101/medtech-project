import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req, { params }) {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return Response.json(
                { message: "Unauthorized" },
                { status: 403 }
            );
        }

        const { id } = params;
        const { name, description, price, image } = await req.json();

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                name,
                description,
                price,
                image,
            },
            { new: true }
        );

        return Response.json({
            message: "Product updated successfully",
            product: updatedProduct,
        });

    } catch (error) {
        return Response.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return Response.json(
                { message: "Unauthorized" },
                { status: 403 }
            );
        }

        const { id } = params;

        await Product.findByIdAndDelete(id);

        return Response.json({
            message: "Product deleted successfully",
        });

    } catch (error) {
        return Response.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}