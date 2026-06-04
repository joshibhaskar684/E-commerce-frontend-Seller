"use client";

import { useState } from "react";

export default function Page() {
  const [activeFilter, setActiveFilter] = useState("All");

  const orders = [
    {
      id: "#ORD001",
      customer: "Rahul Sharma",
      product: "Wireless Headphones",
      amount: "₹2,499",
      status: "Delivered",
      date: "05 Jun 2026",
    },
    {
      id: "#ORD002",
      customer: "Aman Verma",
      product: "Smart Watch",
      amount: "₹3,999",
      status: "Pending",
      date: "04 Jun 2026",
    },
    {
      id: "#ORD003",
      customer: "Priya Singh",
      product: "Bluetooth Speaker",
      amount: "₹1,899",
      status: "Shipped",
      date: "03 Jun 2026",
    },
    {
      id: "#ORD004",
      customer: "Neha Gupta",
      product: "Gaming Mouse",
      amount: "₹1,299",
      status: "Returned",
      date: "02 Jun 2026",
    },
    {
      id: "#ORD005",
      customer: "Rohit Kumar",
      product: "Laptop Stand",
      amount: "₹899",
      status: "Delivered",
      date: "01 Jun 2026",
    },
  ];

  const filters = ["All", "Pending", "Shipped", "Delivered", "Returned"];

  const filteredOrders =
    activeFilter === "All"
      ? orders
      : orders.filter((order) => order.status === activeFilter);

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    Shipped: "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
    Returned: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold">Orders</h1>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeFilter === filter
                  ? "bg-black text-white"
                  : "bg-white border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="overflow-hidden rounded-xl bg-white shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium">{order.id}</td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4">{order.product}</td>
                    <td className="px-6 py-4">{order.amount}</td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          statusColor[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <div className="py-10 text-center text-gray-500">
                No orders found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}