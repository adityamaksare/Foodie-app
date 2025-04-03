import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  const scrollToFoodDisplay = () => {
    const foodDisplay = document.getElementById("food-display");
    if (foodDisplay) {
      foodDisplay.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="explore-menu" id="explore-menu">
      <div className="explore-menu-header">
        <h2>Explore Our Menu</h2>
        <div className="underline"></div>
        <p className="explore-menu-text">
          Choose from a diverse range of cuisines with our extensive menu
          options
        </p>
        <button className="view-menu-btn" onClick={scrollToFoodDisplay}>
          View Full Menu
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="currentColor"
          >
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </button>
      </div>

      <div className="explore-menu-categories">
        <div
          className={`category-card ${category === "All" ? "active" : ""}`}
          onClick={() => setCategory("All")}
        >
          <div className="category-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" />
            </svg>
          </div>
          <span>All</span>
        </div>

        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() => setCategory(item.menu_name)}
            className={`category-card ${
              category === item.menu_name ? "active" : ""
            }`}
          >
            <div className="category-image">
              <img src={item.menu_image} alt={item.menu_name} />
            </div>
            <span>{item.menu_name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreMenu;
