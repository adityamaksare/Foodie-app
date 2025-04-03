import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ id, name, price, description }) => {
  const { cartItems, addToCart, removeFromCart, isLoading } =
    useContext(StoreContext);

  const handleAddToCart = () => {
    if (isLoading) return; // Only prevent clicks during actual loading

    console.log("Add to cart clicked for item:", id);

    // Use a try-catch to prevent any errors from bubbling up
    try {
      addToCart(id);
    } catch (error) {
      console.error("Error in handleAddToCart:", error);
    }
  };

  const handleRemoveFromCart = () => {
    if (isLoading) return; // Only prevent clicks during actual loading

    console.log("Remove from cart clicked for item:", id);

    // Use a try-catch to prevent any errors from bubbling up
    try {
      removeFromCart(id);
    } catch (error) {
      console.error("Error in handleRemoveFromCart:", error);
    }
  };

  // Safely check if item is in cart
  const isInCart = cartItems && id && cartItems[id] && cartItems[id] > 0;

  return (
    <div className="food-item">
      <div className="food-item-info">
        <div className="food-item-header">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" className="rating-stars" />
          </div>
          <p className="food-item-price">${price}</p>
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="food-item-actions">
          {!isInCart ? (
            <button
              className="add-btn"
              onClick={handleAddToCart}
              disabled={isLoading}
              style={{ cursor: isLoading ? "wait" : "pointer" }}
            >
              Add to Cart
            </button>
          ) : (
            <div className="food-item-counter">
              <img
                onClick={handleRemoveFromCart}
                src={assets.remove_icon_red}
                alt="Remove"
                style={{
                  cursor: isLoading ? "wait" : "pointer",
                }}
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={handleAddToCart}
                src={assets.add_icon_green}
                alt="Add"
                style={{
                  cursor: isLoading ? "wait" : "pointer",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
