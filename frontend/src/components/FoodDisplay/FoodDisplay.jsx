import React, { useContext, useMemo } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Filter and limit to 12 items
  const displayedItems = useMemo(() => {
    let filteredItems = food_list;

    // Filter by category if not "All"
    if (category !== "All") {
      filteredItems = food_list.filter((item) => item.category === category);
    }

    // Limit to 12 items
    return filteredItems.slice(0, 12);
  }, [food_list, category]);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {displayedItems.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
