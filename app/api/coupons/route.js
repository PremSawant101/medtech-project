export async function POST(req) {
    await connectDB();

    const { email, code, discountPercent, expiryDate } = await req.json();

    const user = await User.findOne({ email });

    if (!user || user.role !== "admin") {
        return Response.json(
            { message: "Unauthorized. Admin only." },
            { status: 403 }
        );
    }

    // 🔥 Check if coupon already exists
    const existingCoupon = await Coupon.findOne({ code });

    if (existingCoupon) {
        return Response.json(
            { message: "Coupon already exists" },
            { status: 400 }
        );
    }

    const coupon = await Coupon.create({
        code,
        discountPercent,
        expiryDate,
    });

    return Response.json({
        message: "Coupon created successfully",
        coupon,
    });
}