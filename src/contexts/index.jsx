/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = createContext({});

const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({ cart: [] });
  const [isAddToCartLoading, setisAddToCartLoading] = useState(false);
  const [isProductId, setisProductId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!isLoggedIn)
      setProfile(JSON.parse(localStorage.getItem("profile")) || { cart: [] });
  }, [isLoggedIn]);

  useEffect(() => {
    if (user?.role?.name !== "Owner") {
      saveWishlist();
    }
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
    if (user?.role?.name === "Owner") {
      return;
    } else {
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
    }
  };

  const removeFromCart = async (product) => {
    const existingCartIdx = profile.cart.findIndex((c) => c.id === product.id);
    if (existingCartIdx !== -1) {
      const clonedProfile = { ...profile };
      clonedProfile.cart.splice(existingCartIdx, 1);
      setProfile(clonedProfile);
      if (isLoggedIn) await saveCart(clonedProfile.cart);
      localStorage.removeItem("profile");
      toast.success("Item removed from cart successfully");
    }
  };

  const clearCart = async () => {
    setProfile({ ...profile, cart: [] });
    await saveCart([]);
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
    setisAddToCartLoading(true);

    const response = await axios.get(
      `${import.meta.env.VITE_HOST_URL}/products/${item.id}`
    );
    const product = response.data;
    const existingCartIdx = profile.cart.findIndex((c) => c.id === product.id);
    setisProductId(product.id);
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

      if (isLoggedIn) await saveCart(clonedProfile.cart);
      localStorage.setItem("profile", JSON.stringify(clonedProfile));
    } else {
      toast.error("Item does not exist");
    }
    setisAddToCartLoading(false);
  };

  const addToCart = async (product, quantity = 1) => {
    setisProductId(product.id);
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
        image: product.featuredImage,
        name: product.name,
        price: prodPrice,
        quantity: prodQty,
        total: prodPrice * prodQty,
        storeId: product?.store.id,
        storeName: product?.store?.storeName,
        storePhone: product?.store?.contactPhone,
      };
      clonedProfile.cart.push(cartObj);
      setProfile(clonedProfile);
    }
    if (isLoggedIn) await saveCart(clonedProfile.cart);
    localStorage.setItem("profile", JSON.stringify(clonedProfile));
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

  function formatMoney(amount) {
    const formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    });

    return formatter.format(amount);
  }

  return (
    <AppContext.Provider
      value={{
        saveCart,
        clearCart,
        isLoggedIn,
        setIsLoggedIn,
        profile,
        isAddToCartLoading,
        isProductId,
        setProfile,
        addToCart,
        removeFromCart,
        updateCartQty,
        addToWishlist,
        removeFromWishlist,
        formatMoney,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { ContextProvider, useAppContext, AppContext };
