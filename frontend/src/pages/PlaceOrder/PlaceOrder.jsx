import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../components/context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Import payment logos
// Payment logo URLs
const googlePayLogo = "https://www.gstatic.com/instantbuy/svg/dark_gpay.svg";
const phonePeLogo = "https://cdn.phonepe.com/static/phonepe-logo.svg";
const paytmLogo = "https://cdn.paytm.com/images/catalog/product/M/MO/MO-PAYTM-PAYTM/Paytm-Logo-1.jpg";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    setLoading(true);

    let orderItems = [];
    food_list.map((item, index) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
      return null;
    });

    let orderData = {
      userId: token,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      paymentMethod: paymentMethod
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      if (response.data.success) {
        const orderId = response.data.orderId;
        setOrderSuccess(true);
        setOrderId(orderId);
        setCartItems({});
        navigate("/myorders");
      } else {
        alert(response.data.message || "Error processing your order. Please try again.");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again later.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate]);

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const validateStep = (currentStep) => {
    if (currentStep === 1) {
      if (!data.firstName || !data.lastName || !data.email || !data.phone) {
        alert("Please fill in all personal information fields");
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(data.email)) {
        alert("Please enter a valid email address");
        return false;
      }
      return true;
    }
    return true;
  };

  const orderSummaryItems = food_list
    .filter((item) => cartItems[item._id] > 0)
    .slice(0, 3);
  const additionalItems =
    food_list.filter((item) => cartItems[item._id] > 0).length -
    orderSummaryItems.length;

  const PaymentSection = () => {
    const [selectedUPI, setSelectedUPI] = useState('');
    const [showQR, setShowQR] = useState(false);

    const handleUPISelection = (value) => {
      setSelectedUPI(value);
      setShowQR(true);
      setPaymentMethod('upi');
    };

    const handlePaymentComplete = () => {
      setShowQR(false);
    };

    if (showQR) {
      return (
        <div className="payment-section">
          <h3>Complete Payment</h3>
          <div className="qr-code-section">
            <div className="qr-code-container">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=merchant@upi&pn=FoodStore&am=${getTotalCartAmount() + 2}&cu=INR`} 
                alt="Payment QR Code" 
                className="qr-code"
              />
            </div>
            <div className="payment-instructions">
              <p>1. Open {selectedUPI} app on your phone</p>
              <p>2. Scan this QR code to pay</p>
              <p>3. Complete the payment of ₹{(getTotalCartAmount() + 2).toFixed(2)}</p>
              <p>4. Click on 'Complete Payment' after successful payment</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="payment-section">
        <h3>Payment Method</h3>
        <div className="payment-options">
          <div className="payment-option">
            <input
              type="radio"
              id="cod"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <label htmlFor="cod">Cash on Delivery</label>
          </div>
          <div className="payment-option">
            <input
              type="radio"
              id="upi"
              name="payment"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={() => setPaymentMethod("upi")}
            />
            <label htmlFor="upi">UPI Payment</label>
          </div>
        </div>

        {paymentMethod === "upi" && (
          <div className="upi-options">
            <div className="upi-option">
              <input
                type="radio"
                id="google-pay"
                name="upi"
                value="google-pay"
                checked={selectedUPI === 'google-pay'}
                onChange={(e) => handleUPISelection(e.target.value)}
              />
              <label htmlFor="google-pay">Google Pay</label>
            </div>
            
            <div className="upi-option">
              <input
                type="radio"
                id="phonepe"
                name="upi"
                value="phonepe"
                checked={selectedUPI === 'phonepe'}
                onChange={(e) => handleUPISelection(e.target.value)}
              />
              <label htmlFor="phonepe">PhonePe</label>
            </div>
            
            <div className="upi-option">
              <input
                type="radio"
                id="paytm"
                name="upi"
                value="paytm"
                checked={selectedUPI === 'paytm'}
                onChange={(e) => handleUPISelection(e.target.value)}
              />
              <label htmlFor="paytm">Paytm</label>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="order-page-container">
      <div className="order-progress">
        <div className={`progress-step ${step >= 1 ? "active" : ""}`}>
          <div className="step-number">1</div>
          <span>Personal Info</span>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
          <div className="step-number">2</div>
          <span>Delivery Address</span>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step >= 3 ? "active" : ""}`}>
          <div className="step-number">3</div>
          <span>Payment</span>
        </div>
      </div>

      <div className="order-content">
        <form onSubmit={placeOrder} className="place-order">
          {step === 1 && (
            <div className="place-order-left">
              <h1 className="section-title">Personal Information</h1>
              <p className="section-subtitle">
                Please fill in your contact details
              </p>

              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  required
                  name="firstName"
                  onChange={onChangeHandler}
                  value={data.firstName}
                  type="text"
                  placeholder="Enter your first name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  required
                  name="lastName"
                  onChange={onChangeHandler}
                  value={data.lastName}
                  type="text"
                  placeholder="Enter your last name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  required
                  name="email"
                  onChange={onChangeHandler}
                  value={data.email}
                  type="email"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  required
                  name="phone"
                  onChange={onChangeHandler}
                  value={data.phone}
                  type="text"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="button-secondary"
                  onClick={() => navigate("/cart")}
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
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back to Cart
                </button>
                <button
                  type="button"
                  className="button-primary"
                  onClick={nextStep}
                >
                  Continue
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
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="place-order-left">
              <h1 className="section-title">Delivery Address</h1>
              <p className="section-subtitle">
                Where should we deliver your order?
              </p>

              <div className="form-group">
                <label htmlFor="street">Street Address</label>
                <input
                  id="street"
                  required
                  name="street"
                  onChange={onChangeHandler}
                  value={data.street}
                  type="text"
                  placeholder="Enter your street address"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    required
                    name="city"
                    onChange={onChangeHandler}
                    value={data.city}
                    type="text"
                    placeholder="City"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    id="state"
                    required
                    name="state"
                    onChange={onChangeHandler}
                    value={data.state}
                    type="text"
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="zipcode">Zip Code</label>
                  <input
                    id="zipcode"
                    required
                    name="zipcode"
                    onChange={onChangeHandler}
                    value={data.zipcode}
                    type="text"
                    placeholder="Zip code"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    id="country"
                    required
                    name="country"
                    onChange={onChangeHandler}
                    value={data.country}
                    type="text"
                    placeholder="Country"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="button-secondary"
                  onClick={prevStep}
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
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <button
                  type="button"
                  className="button-primary"
                  onClick={nextStep}
                >
                  Continue to Payment
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
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="place-order-left">
              <h1 className="section-title">Review & Payment</h1>
              <p className="section-subtitle">
                Please review your order details before proceeding
              </p>

              <div className="review-section">
                <h3>Contact Information</h3>
                <div className="review-content">
                  <p>
                    <strong>Name:</strong> {data.firstName} {data.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {data.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {data.phone}
                  </p>
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => setStep(1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit
                  </button>
                </div>
              </div>

              <div className="review-section">
                <h3>Delivery Address</h3>
                <div className="review-content">
                  <p>{data.street}</p>
                  <p>
                    {data.city}, {data.state} {data.zipcode}
                  </p>
                  <p>{data.country}</p>
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => setStep(2)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit
                  </button>
                </div>
              </div>

              <PaymentSection />

              <p className="secure-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                {paymentMethod === "cod" 
                  ? "Pay when you receive your order"
                  : "Your payment will be processed securely"}
              </p>

              <div className="form-actions">
                <button
                  type="button"
                  className="button-secondary"
                  onClick={prevStep}
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
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <button
                  type="submit"
                  className={`button-primary ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="spinner" viewBox="0 0 50 50">
                        <circle
                          className="path"
                          cx="25"
                          cy="25"
                          r="20"
                          fill="none"
                          strokeWidth="5"
                        ></circle>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Place Order
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
                        <path d="M9 20l-5.5-5.5 1.41-1.41L9 17.17l10.59-10.59L21 8"></path>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="place-order-right">
            <div className="order-summary">
              <h2>Order Summary</h2>

              <div className="order-items">
                {orderSummaryItems.map((item, index) => (
                  <div key={index} className="summary-item">
                    <div className="item-quantity-indicator">
                      {cartItems[item._id]}×
                    </div>
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">
                      ₹{(item.price * cartItems[item._id]).toFixed(2)}
                    </div>
                  </div>
                ))}

                {additionalItems > 0 && (
                  <div className="additional-items">
                    + {additionalItems} more item
                    {additionalItems > 1 ? "s" : ""}
                  </div>
                )}
              </div>

              <div className="coupon-section">
                <input type="text" placeholder="Enter Coupon Code" />
                <button type="button">Apply</button>
              </div>

              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>₹{getTotalCartAmount().toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Delivery Fee</span>
                  <span>₹{(2).toFixed(2)}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total</span>
                  <span>₹{(getTotalCartAmount() + 2).toFixed(2)}</span>
                </div>
              </div>

              <div className="delivery-info">
                <div className="delivery-icon">
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
                    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                    <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
                    <path d="M12 3v6"></path>
                  </svg>
                </div>
                <div className="delivery-text">
                  <h4>Express Delivery</h4>
                  <p>Estimated delivery: 20-40 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
