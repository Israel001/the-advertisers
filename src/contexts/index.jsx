/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = createContext({});

const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState();

  useEffect(() => {
    saveWishlist();
  }, [profile]);

  const saveCart = async (cartData) => {
    await axios.post(
      `${import.meta.env.VITE_HOST_URL}/users/save-cart`,
      {
        cartData: JSON.stringify(cartData),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
  };

  const saveWishlist = async () => {
    await axios.post(
      `${import.meta.env.VITE_HOST_URL}/users/save-wishlist`,
      {
        wishlistData: JSON.stringify(profile.wishlist),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
  };

  const removeFromCart = async (product) => {
    const existingCartIdx = profile.cart.findIndex((c) => c.id === product.id);
    if (existingCartIdx !== -1) {
      const clonedProfile = { ...profile };
      clonedProfile.cart.splice(existingCartIdx, 1);
      setProfile(clonedProfile);
      await saveCart(clonedProfile.cart);
      toast.success("Item removed from cart successfully");
    }
  };

  const clearCart = async () => {
    setProfile({ ...profile, cart: [] });
  };

  const removeFromWishlist = async (product) => {
    const existingWishlistIdx = profile.wishlist.findIndex(
      (c) => c.id === product.id
    );
    if (existingWishlistIdx !== -1) {
      const clonedProfile = { ...profile };
      clonedProfile.wishlist.splice(existingWishlistIdx, 1);
      setProfile(clonedProfile);
      await saveWishlist();
      toast.success("Item removed from wishlist successfully");
    }
  };

  const updateCartQty = async (item, newQuantity) => {
    const response = await axios.get(
      `${import.meta.env.VITE_HOST_URL}/products/${item.id}`
    );
    const product = response.data;
    const existingCartIdx = profile.cart.findIndex((c) => c.id === product.id);
    if (existingCartIdx !== -1) {
      if (newQuantity > product.quantity) {
        toast.error("Quantity is more than quantity available");
        return;
      }
      const clonedProfile = { ...profile };
      clonedProfile.cart[existingCartIdx] = {
        ...clonedProfile.cart[existingCartIdx],
        quantity: newQuantity,
        total: clonedProfile.cart[existingCartIdx].price * newQuantity,
      };
      setProfile(clonedProfile);
      await saveCart(clonedProfile.cart);
    } else {
      toast.error("Item does not exist");
    }
  };

  const addToCart = async (product, quantity = 1) => {
    const prodQty = quantity;
    if (product.out_of_stock || prodQty > product.quantity) {
      toast.error("Product is out of stock");
      return;
    }
    const prodPrice =
      product.discount_price > 0 ? product.discount_price : product.price;
    const existingCartIdx = profile.cart.findIndex((c) => c.id === product.id);
    let clonedProfile = { ...profile };
    if (existingCartIdx !== -1) {
      if (profile.cart[existingCartIdx].quantity + prodQty > product.quantity) {
        toast.error("Quantity is more than quantity available");
        return;
      }
      clonedProfile.cart[existingCartIdx] = {
        ...clonedProfile.cart[existingCartIdx],
        quantity: clonedProfile.cart[existingCartIdx].quantity + prodQty,
        total:
          clonedProfile.cart[existingCartIdx].price *
          (clonedProfile.cart[existingCartIdx].quantity + prodQty),
      };
      setProfile(clonedProfile);
    } else {
      const cartObj = {
        id: product.id,
        image: product.featured_image,
        name: product.name,
        price: prodPrice,
        quantity: prodQty,
        total: prodPrice * prodQty,
      };
      clonedProfile.cart.push(cartObj);
      setProfile(clonedProfile);
    }
    await saveCart(clonedProfile.cart);
    toast.success("Product added to cart successfully");
  };

  const addToWishlist = async (product) => {
    const wishlistObj = {
      id: product.id,
      image: product.featured_image,
      name: product.name,
      price:
        product.discount_price > 0 ? product.discount_price : product.price,
    };
    const clonedProfile = { ...profile };
    clonedProfile.wishlist.push(wishlistObj);
    setProfile(clonedProfile);
    await saveWishlist();
    toast.success("Item added to wishlist successfully");
  };

  return (
    <AppContext.Provider
      value={{
        saveCart,
        clearCart,
        isLoggedIn,
        setIsLoggedIn,
        profile,
        setProfile,
        addToCart,
        removeFromCart,
        updateCartQty,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { ContextProvider, useAppContext, AppContext };
