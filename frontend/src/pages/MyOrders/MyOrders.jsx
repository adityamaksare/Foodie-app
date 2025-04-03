import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "./../../components/context/StoreContext";
import axios from "axios";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Get filtered orders based on status
  const getFilteredOrders = () => {
    if (activeTab === "all") return orders;
    return orders.filter(
      (order) => order.status.toLowerCase() === activeTab.toLowerCase()
    );
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return (
          <svg
            className="status-icon delivered"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case "in transit":
      case "on the way":
        return (
          <svg
            className="status-icon transit"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12H19"></path>
            <path d="M12 5L19 12L12 19"></path>
          </svg>
        );
      case "processing":
        return (
          <svg
            className="status-icon processing"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v4"></path>
            <path d="M12 18v4"></path>
            <path d="M4.93 4.93L7.76 7.76"></path>
            <path d="M16.24 16.24L19.07 19.07"></path>
            <path d="M2 12h4"></path>
            <path d="M18 12h4"></path>
            <path d="M4.93 19.07L7.76 16.24"></path>
            <path d="M16.24 7.76L19.07 4.93"></path>
          </svg>
        );
      case "cancelled":
        return (
          <svg
            className="status-icon cancelled"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        );
      default:
        return (
          <svg
            className="status-icon pending"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString || Date.now()).toLocaleDateString(
      "en-US",
      options
    );
  };

  return (
    <div className="my-orders-page">
      <div className="my-orders-header">
        <h1>My Orders</h1>
        <p>Track and manage your orders</p>
      </div>

      <div className="order-tabs">
        <button
          className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All Orders
        </button>
        <button
          className={`tab-btn ${activeTab === "processing" ? "active" : ""}`}
          onClick={() => setActiveTab("processing")}
        >
          Processing
        </button>
        <button
          className={`tab-btn ${activeTab === "on the way" ? "active" : ""}`}
          onClick={() => setActiveTab("on the way")}
        >
          On the Way
        </button>
        <button
          className={`tab-btn ${activeTab === "delivered" ? "active" : ""}`}
          onClick={() => setActiveTab("delivered")}
        >
          Delivered
        </button>
      </div>

      {loading ? (
        <div className="orders-loading">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="empty-orders">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10Z" />
            <path d="M9 9h.01" />
            <path d="M15 9h.01" />
            <path d="M8 13h8" />
          </svg>
          <h3>No orders found</h3>
          <p>You haven't placed any orders yet</p>
          <Link to="/" className="explore-menu-btn">
            Explore Menu
          </Link>
        </div>
      ) : (
        <div className="orders-container">
          {getFilteredOrders().map((order, index) => {
            // Create a friendlier format for order ID
            const shortOrderId = order._id
              ? `#${order._id.substring(order._id.length - 6).toUpperCase()}`
              : `#ORDER${index + 1}`;

            return (
              <div key={index} className="order-card">
                <div className="order-header">
                  <div className="order-id">
                    <h3>{shortOrderId}</h3>
                    <span className="order-date">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                  <div
                    className={`order-status ${order.status
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {getStatusIcon(order.status)}
                    <span>{order.status}</span>
                  </div>
                </div>

                <div className="order-items-container">
                  <div className="order-items-list">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item">
                        <div className="item-info">
                          <div className="item-quantity">{item.quantity}×</div>
                          <div className="item-name">{item.name}</div>
                        </div>
                        <div className="item-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-footer">
                  <div className="order-summary">
                    <div className="total-items">
                      <span>Total Items:</span>
                      <span>
                        {order.items.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        )}
                      </span>
                    </div>
                    <div className="order-total">
                      <span>Order Total:</span>
                      <span>${order.amount.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="order-actions">
                    <button className="view-details-btn">View Details</button>
                    {order.status.toLowerCase() !== "delivered" &&
                      order.status.toLowerCase() !== "cancelled" && (
                        <button
                          className="track-order-btn"
                          onClick={fetchOrders}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          Track Order
                        </button>
                      )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
