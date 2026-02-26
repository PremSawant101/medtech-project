"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [couponCode, setCouponCode] = useState("");
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
    <div className="min-h-screen bg-[#100C08] text-[#FFFAF0] p-10">
      <div className="mb-12 flex justify-center">
        <div className="flex shadow-xl rounded-xl overflow-hidden bg-[#FFFAF0]">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="px-4 py-3 w-64 outline-none text-black"
          />
          <button className="bg-[#6B8E23] text-white px-6 font-medium hover:bg-[#556B2F] transition">
            Apply
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">

        {products.map((p) => (
          <div
            key={p._id}
            className="bg-[#FFFAF0] text-black rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition duration-300 p-6"
          >

            <h2 className="text-xl font-semibold mb-2 text-[#100C08]">
              {p.name}
            </h2>

            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              {p.description}
            </p>

            <p className="text-[#6B8E23] font-bold text-xl mb-3">
              ₹{p.price}
            </p>

            {p.prescriptionRequired && (
              <p className="text-red-600 text-sm mb-3 font-medium">
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
              className="border w-full px-3 py-2 rounded-lg mb-4 focus:ring-2 focus:ring-[#6B8E23] outline-none"
            />

            <button
              onClick={() => placeOrder(p._id)}
              className="bg-[#6B8E23] text-white px-4 py-3 rounded-xl w-full font-medium hover:bg-[#556B2F] transition duration-300"
            >
              Place Order
            </button>
          </div>
        ))}

      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">

          <div className="bg-[#FFFAF0] text-black p-8 rounded-2xl shadow-2xl w-96 text-center">

            <h2 className="text-2xl font-semibold mb-4 text-[#6B8E23]">
              Order Status
            </h2>

            <p className="mb-6 text-gray-700">{popupMessage}</p>

            <button
              onClick={() => setShowPopup(false)}
              className="bg-[#6B8E23] text-white px-6 py-2 rounded-xl hover:bg-[#556B2F] transition"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}