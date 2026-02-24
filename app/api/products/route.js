import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import User from "@/models/User";

export async function GET() {
    await connectDB();

    const products = await Product.find();
    return Response.json(products);
}

export async function POST(req) {
    await connectDB();

    const {
        email,
        name,
        category,
        description,
        price,
        stock,
        prescriptionRequired
    } = await req.json();

    // 🔐 Admin check
    const user = await User.findOne({ email });

    if (!user || user.role !== "admin") {
        return Response.json(
            { message: "Unauthorized. Admin only." },
            { status: 403 }
        );
    }

    const product = await Product.create({
        name,
        category,
        description,
        price,
        stock,
        prescriptionRequired,
    });

    return Response.json({
        message: "Product created successfully",
        product,
    });
}