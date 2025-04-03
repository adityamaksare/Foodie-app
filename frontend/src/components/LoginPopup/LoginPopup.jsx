/**
 * Enhanced LoginPopup Component with improved UX and form validation
 */
import React, { useContext, useState, useEffect, useRef } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "./../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const popupRef = useRef(null);
  const { url, setToken } = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("Login");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowLogin(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowLogin]);

  // Handle escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setShowLogin(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [setShowLogin]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
    setFormError(""); // Clear error on input change
  };

  const validateForm = () => {
    if (!data.email) {
      setFormError("Email is required");
      return false;
    }

    if (!data.password) {
      setFormError("Password is required");
      return false;
    }

    if (currentState === "Sign Up" && !data.name) {
      setFormError("Name is required");
      return false;
    }

    if (data.password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setFormError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const onLogin = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setFormError("");

    try {
      let newUrl = url;
      if (currentState === "Login") {
        newUrl += "/api/user/login";
      } else {
        newUrl += "/api/user/register";
      }

      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        setFormError(response.data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setFormError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setFormError("");
    setCurrentState(currentState === "Login" ? "Sign Up" : "Login");
  };

  return (
    <div className="login-popup">
      <form ref={popupRef} onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            title="Close"
          />
        </div>

        {formError && <div className="form-error-message">{formError}</div>}

        <div className="login-popup-inputs">
          {currentState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              autoComplete="name"
            />
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            autoComplete="email"
          />

          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            autoComplete={
              currentState === "Login" ? "current-password" : "new-password"
            }
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={isLoading ? "loading" : ""}
        >
          {isLoading ? (
            <span className="button-loader"></span>
          ) : currentState === "Sign Up" ? (
            "Create account"
          ) : (
            "Login"
          )}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">
            By continuing, I agree to the terms of use & privacy policy
          </label>
        </div>

        <p>
          {currentState === "Login"
            ? "Create a new account? "
            : "Already have an account? "}
          <span onClick={switchMode}>
            {currentState === "Login" ? "Sign up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
