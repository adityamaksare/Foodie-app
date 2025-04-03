import React from "react";
import "./AppDownlaod.css";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div className="app-download-section" id="app-download">
      <div className="app-download-container">
        <div className="app-content">
          <div className="app-text">
            <h2>Download The Foodie App</h2>
            <p className="app-description">
              Get the ultimate food delivery experience with our mobile app
            </p>

            <div className="app-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="feature-text">
                  <h4>Faster Delivery</h4>
                  <p>Get your food delivered quickly</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </div>
                <div className="feature-text">
                  <h4>Easy Ordering</h4>
                  <p>Order with just a few taps</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12z"></path>
                    <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                  </svg>
                </div>
                <div className="feature-text">
                  <h4>Exclusive Deals</h4>
                  <p>Access to app-only offers</p>
                </div>
              </div>
            </div>

            <div className="download-buttons">
              <a href="#" className="store-button">
                <img src={assets.play_store} alt="Get it on Google Play" />
              </a>
              <a href="#" className="store-button">
                <img src={assets.app_store} alt="Download on App Store" />
              </a>
            </div>

            <div className="app-ratings">
              <div className="stars">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#FFD700"
                  stroke="#FFD700"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#FFD700"
                  stroke="#FFD700"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#FFD700"
                  stroke="#FFD700"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#FFD700"
                  stroke="#FFD700"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#FFD700"
                  stroke="#FFD700"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <span className="rating-text">4.8 • 10k+ Reviews</span>
            </div>
          </div>
        </div>

        <div className="app-mockup">
          <div className="phone-outline">
            <div className="phone-screen">
              <div className="mockup-content">
                <div className="mockup-header">
                  <div className="mockup-logo"></div>
                  <div className="mockup-user"></div>
                </div>
                <div className="mockup-food-item"></div>
                <div className="mockup-food-item"></div>
                <div className="mockup-food-item"></div>
                <div className="mockup-cart-button"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
