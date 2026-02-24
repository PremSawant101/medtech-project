"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
    const user =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("user"))
            : null;

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (user?.role === "admin") {
            loadProducts();
            loadOrders();
        }
    }, []);

    const loadProducts = async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
    };

    const loadOrders = async () => {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data);
    };

    if (!user || user.role !== "admin") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Access denied. Admin only.</p>
            </div>
        );
    }

    const addProduct = async () => {
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user.email,
                name,
                category: "Medicine",
                description,
                price: Number(price),
                stock: 100,
                prescriptionRequired: false,
            }),
        });

        const data = await res.json();
        setMessage(data.message);
        loadProducts();
    };

    const deleteProduct = async (id) => {
        await fetch(`/api/products/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }),
        });

        loadProducts();
    };

    const updateStatus = async (orderId, newStatus) => {
        await fetch(`/api/orders/${orderId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: user.email,
                status: newStatus,
            }),
        });

        loadOrders();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-3xl font-bold mb-8 text-blue-700">
                Admin Dashboard
            </h1>

            {/* Add Product */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-md">
                <h2 className="text-xl font-semibold mb-4">Add Product</h2>

                <input
                    placeholder="Product Name"
                    className="border w-full px-3 py-2 mb-3 rounded"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Price"
                    type="number"
                    className="border w-full px-3 py-2 mb-3 rounded"
                    onChange={(e) => setPrice(e.target.value)}
                />

                <textarea
                    placeholder="Description"
                    className="border w-full px-3 py-2 mb-3 rounded"
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button
                    onClick={addProduct}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Product
                </button>

                {message && (
                    <p className="mt-4 text-green-600">{message}</p>
                )}
            </div>

            {/* Products List */}
            <h2 className="text-2xl font-semibold mb-4">All Products</h2>

            <div className="grid gap-4 mb-10">
                {products.map((p) => (
                    <div
                        key={p._id}
                        className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center"
                    >
                        <div>
                            <p className="font-semibold">{p.name}</p>
                            <p className="text-gray-600">₹{p.price}</p>
                        </div>

                        <button
                            onClick={() => deleteProduct(p._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Orders Section */}
            <h2 className="text-2xl font-semibold mb-4">Orders</h2>

            <div className="grid gap-6">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white p-6 rounded-xl shadow-md"
                    >
                        <p><strong>User:</strong> {order.userEmail}</p>
                        <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                        <p><strong>Status:</strong> {order.status}</p>

                        <div className="mt-4 space-x-2">
                            <button
                                onClick={() => updateStatus(order._id, "approved")}
                                className="bg-green-600 text-white px-3 py-1 rounded"
                            >
                                Approve
                            </button>

                            <button
                                onClick={() => updateStatus(order._id, "shipped")}
                                className="bg-blue-600 text-white px-3 py-1 rounded"
                            >
                                Ship
                            </button>

                            <button
                                onClick={() => updateStatus(order._id, "delivered")}
                                className="bg-purple-600 text-white px-3 py-1 rounded"
                            >
                                Deliver
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}