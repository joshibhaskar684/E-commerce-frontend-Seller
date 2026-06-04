"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

// import { getOrderByIdSeller } from "@/redux-store/authstore/order/action";

export default function Page() {
  const [loading, setLoading] = useState(false);

  const { orderId } = useParams();

  const dispatch = useDispatch();

  const orderDetails = useSelector(
    (state) => state.orderReducer.orderDetails
  );

  useEffect(() => {
    const token = Cookies.get("sellerToken");

    dispatch(
      getOrderByIdSeller({
        orderId,
        token,
      })
    );
  }, [dispatch, orderId]);

  const updateOrderStatus = async () => {
    try {
      setLoading(true);

      // dispatch update action here

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-5">
      <h1 className="text-2xl font-bold mb-5">Order Details</h1>

      {/* ORDER SUMMARY */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Information</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <p>
            <span className="font-medium">Order ID:</span>{" "}
            {orderDetails?.id}
          </p>

          <p>
            <span className="font-medium">Order Status:</span>{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                orderDetails?.status === "DELIVERED"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {orderDetails?.status}
            </span>
          </p>

          <p>
            <span className="font-medium">Payment Status:</span>{" "}
            {orderDetails?.paymentStatus}
          </p>

          <p>
            <span className="font-medium">Payment Method:</span>{" "}
            {orderDetails?.paymentMethod}
          </p>

          <p>
            <span className="font-medium">Created At:</span>{" "}
            {orderDetails?.createdAt
              ? new Date(orderDetails.createdAt).toLocaleString()
              : "-"}
          </p>

          <p>
            <span className="font-medium">Updated At:</span>{" "}
            {orderDetails?.updatedAt
              ? new Date(orderDetails.updatedAt).toLocaleString()
              : "-"}
          </p>
        </div>
      </div>

      {/* CUSTOMER DETAILS */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Customer Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <p>
            <span className="font-medium">Name:</span>{" "}
            {orderDetails?.customer?.name}
          </p>

          <p>
            <span className="font-medium">Email:</span>{" "}
            {orderDetails?.customer?.email}
          </p>

          <p>
            <span className="font-medium">Phone:</span>{" "}
            {orderDetails?.customer?.phone}
          </p>

          <p>
            <span className="font-medium">User ID:</span>{" "}
            {orderDetails?.customer?.id}
          </p>
        </div>
      </div>

      {/* SHIPPING ADDRESS */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">
          Shipping Address
        </h2>

        <div className="space-y-2">
          <p>{orderDetails?.shippingAddress?.fullName}</p>
          <p>{orderDetails?.shippingAddress?.phone}</p>
          <p>{orderDetails?.shippingAddress?.address}</p>
          <p>
            {orderDetails?.shippingAddress?.city},{" "}
            {orderDetails?.shippingAddress?.state}
          </p>
          <p>{orderDetails?.shippingAddress?.pincode}</p>
        </div>
      </div>

      {/* ORDER ITEMS */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Ordered Products</h2>

        <div className="space-y-4">
          {orderDetails?.products?.map((item) => (
            <div
              key={item?.productId}
              className="flex flex-col md:flex-row gap-4 border rounded-lg p-4"
            >
              <img
                src={item?.image}
                alt={item?.name}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item?.name}</h3>

                <p className="text-sm text-gray-500">
                  Product ID: {item?.productId}
                </p>

                <p>Quantity: {item?.quantity}</p>

                <p>Price: ₹{item?.price}</p>

                <p className="font-semibold">
                  Total: ₹{item?.price * item?.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRICE SUMMARY */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Price Summary</h2>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{orderDetails?.subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{orderDetails?.shippingCharge}</span>
          </div>

          <div className="flex justify-between">
            <span>Discount</span>
            <span>- ₹{orderDetails?.discount}</span>
          </div>

          <div className="flex justify-between text-lg font-bold border-t pt-3">
            <span>Total</span>
            <span>₹{orderDetails?.totalAmount}</span>
          </div>
        </div>
      </div>

      {/* ACTION BUTTON */}
      <button
        onClick={updateOrderStatus}
        disabled={loading}
        className={`w-full p-4 rounded-lg text-white ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Updating..." : "Update Order Status"}
      </button>
    </div>
  );
}