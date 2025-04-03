import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    console.log("Adding to cart:", itemId);

    // Update the local cart immediately for better UX
    try {
      setCartItems((prev) => {
        const updatedCart = { ...prev };
        if (!updatedCart[itemId]) {
          updatedCart[itemId] = 1;
        } else {
          updatedCart[itemId] += 1;
        }
        return updatedCart;
      });
    } catch (error) {
      console.error("Error updating local cart:", error);
    }

    // If logged in, update the cart on the server
    if (token) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );

        if (!response.data.success) {
          console.error("Error adding to cart:", response.data.message);
          // Don't show alert to avoid popup
        }
      } catch (error) {
        console.error("Cart add error:", error);
        // Check if error is due to network/connectivity issue
        if (error.message === "Network Error") {
          console.log("Network error - cart will be maintained locally only");
        } else {
          console.error(
            "Error details:",
            error.response ? error.response.data : "No response data"
          );
        }
        // Don't show alert to avoid popup
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Not logged in, only updating local cart");
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      setCartItems((prev) => {
        const updatedCart = { ...prev };
        if (updatedCart[itemId] > 0) {
          updatedCart[itemId] -= 1;
        }
        return updatedCart;
      });
    } catch (error) {
      console.error("Error updating local cart on remove:", error);
    }

    if (token) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
        console.log("Remove from cart response:", response.data);
      } catch (error) {
        console.error("Cart remove error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url + "/api/food/list");
      console.log("Food list loaded:", response.data.data.length, "items");
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCartData = async (token) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      console.log("Cart data loaded:", response.data);
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      } else {
        console.error("Error loading cart:", response.data.message);
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      console.log(
        "Token from localStorage:",
        storedToken ? "exists" : "not found"
      );

      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    isLoading,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
