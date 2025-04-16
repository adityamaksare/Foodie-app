import orderModel from './../models/orderModel.js';
import userModel from './../models/userModel.js';

// Placing user order for frontend
const placeOrder = async (req, res) => {
    try {
        if (!req.body.userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        if (!req.body.items || req.body.items.length === 0) {
            return res.status(400).json({ success: false, message: "Order must contain at least one item" });
        }

        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: true, // Set payment as true by default since we're not using external payment
            status: "Order Placed" // Set initial status
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.json({
            success: true,
            message: "Order placed successfully",
            orderId: newOrder._id
        });
    } catch (error) {
        console.error("Order placement error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error processing order"
        });
    }
}

// user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// Cancel order endpoint
const cancelOrder = async (req, res) => {
    try {
        if (!req.body.orderId) {
            return res.status(400).json({ success: false, message: "Order ID is required" });
        }

        const order = await orderModel.findById(req.body.orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Check if order can be cancelled (not already delivered or cancelled)
        if (order.status.toLowerCase() === "delivered" || order.status.toLowerCase() === "cancelled") {
            return res.status(400).json({
                success: false,
                message: "Order cannot be cancelled in its current state"
            });
        }

        // Update order status to cancelled
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: "cancelled" });

        res.json({
            success: true,
            message: "Order cancelled successfully"
        });
    } catch (error) {
        console.error("Order cancellation error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error cancelling order"
        });
    }
}

export { placeOrder, userOrders, updateStatus, cancelOrder }