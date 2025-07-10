import { useState, useEffect } from "react";

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("stylehub-wishlist");
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("stylehub-wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      const exists = prevItems.some(item => item.Id === product.Id);
      if (exists) return prevItems;
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems =>
      prevItems.filter(item => item.Id !== productId)
    );
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.Id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.Id)) {
      removeFromWishlist(product.Id);
    } else {
      addToWishlist(product);
    }
  };

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist
  };
};