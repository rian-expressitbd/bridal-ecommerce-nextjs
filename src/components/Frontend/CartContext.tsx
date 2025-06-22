import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);


  useEffect(() => {
    // Initialize cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(existingCart);
    setCartCount(existingCart.reduce((acc, item) => acc + item.quantity, 0));
  }, []);

  const addToCart = (product, qty) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
  
    // Default qty to 1 if not provided
    const quantityToAdd = qty || 1;
  
    let updatedCart = [...cart];
  
    if (existingProductIndex !== -1) {
      // Update the quantity and recalculate the price
      updatedCart[existingProductIndex].quantity += quantityToAdd;
      updatedCart[existingProductIndex].price =
        updatedCart[existingProductIndex].unitPrice * updatedCart[existingProductIndex].quantity;
    } else {
      // Add new product with unitPrice and initial quantity
      updatedCart.push({ ...product, quantity: quantityToAdd, unitPrice: product.price || 0, price: (product.price || 0) * quantityToAdd });
    }
  
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    setCartCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
    setTotalPrice(updatedCart.reduce((acc, item) => acc + item.price, 0));

// Show success message
toast.success('Added to Cart Successfully!', {
  position: "top-right", 
  duration: 1000, 
});


  };
  
  

  const updateCartItem = (updatedProduct) => {
    const updatedCart = cart.map((item) =>
      item.id === updatedProduct.id ? updatedProduct : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));

    setTotalPrice(updatedCart.reduce((acc, item) => acc + item.price, 0));
    toast.success('Quantity Updated Successfully!', {
      position: "top-right",
      duration: 1000,
     
    });

  };

  const handleIncreaseQuantity = (productId) => {
    const product = cart.find((p) => p.id === productId);
    if (product) {
      const updatedProduct = {
        ...product,
        quantity: product.quantity + 1,
        price: product.unitPrice * (product.quantity + 1), // Use unitPrice for price calculation
      };
      updateCartItem(updatedProduct);
    }
  };

  const handleDecreaseQuantity = (productId) => {
    const product = cart.find((p) => p.id === productId);
    if (product && product.quantity > 1) { // Check if the quantity is greater than 1
      const updatedProduct = {
        ...product,
        quantity: product.quantity - 1, 
        price: product.unitPrice * (product.quantity - 1), // Correct price calculation
      };
      updateCartItem(updatedProduct);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    setCartCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setTotalPrice(updatedCart.reduce((acc, item) => acc + item.price, 0));
    toast.success('Product Removed Successfully!', {
      position: "top-right", 
      duration: 1000,

     
    });
  };


  console.log(totalPrice);

  return (
    <CartContext.Provider
      value={{
      
        cart,
        cartCount,
        totalPrice,
        addToCart,
        removeFromCart,
        updateCartItem,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};