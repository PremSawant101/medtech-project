"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleQuantityChange = (id, value) => {
    setQuantities({
      ...quantities,
      [id]: Number(value),
    });
  };

  const placeOrder = async (productId) => {
    const quantity = quantities[productId] || 1;

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: "test@test.com",
        products: [
          {
            productId,
            quantity,
          },
        ],
        couponCode: couponCode || undefined,
      }),
    });

    const data = await res.json();
    setPopupMessage(
      data.message + " | Status: " + data.order?.status
    );
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
        MedTech E-Commerce
      </h1>

      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="border px-4 py-2 rounded-lg mr-2"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {p.name}
            </h2>

            <p className="text-gray-600 mb-3">
              {p.description}
            </p>

            <p className="text-green-600 font-bold text-lg mb-3">
              ₹{p.price}
            </p>

            {p.prescriptionRequired && (
              <p className="text-red-500 text-sm mb-3">
                Prescription Required
              </p>
            )}

            <input
              type="number"
              min="1"
              defaultValue="1"
              onChange={(e) =>
                handleQuantityChange(p._id, e.target.value)
              }
              className="border w-full px-3 py-2 rounded mb-3"
            />

            <button
              onClick={() => placeOrder(p._id)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition"
            >
              Place Order
            </button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 text-center">
            <h2 className="text-xl font-semibold mb-4 text-green-600">
              Order Status
            </h2>

            <p className="mb-4">{popupMessage}</p>

            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}