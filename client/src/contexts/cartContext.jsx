import { createContext, useContext, useState } from "react";
export const CartContext = createContext();

export const CartProvider = ({
  children
}) => {

  const [cartItems, setCartItems] = useState([]);

  const addOrEditCartItem = (newItem, qty) => {
    // Check if the product is already in the cart
    const existingItemIndex = cartItems.findIndex(item => item._id === newItem._id);

    if (existingItemIndex !== -1) {
      // Product already in the cart, update its quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += qty;
      updatedCart[existingItemIndex].totalPrice = updatedCart[existingItemIndex].mealPrice * updatedCart[existingItemIndex].quantity;
      setCartItems(updatedCart);
    } else {
      // Product not in the cart, add it as a new item
         newItem.quantity = qty;
         newItem.totalPrice = newItem.mealPrice * qty;
      setCartItems([...cartItems, newItem]);
    }
  }

  const setQty = (newItem, qty) => {
    // Check if the product is already in the cart
    const existingItemIndex = cartItems.findIndex(item => item._id === newItem._id);

    if (existingItemIndex !== -1) {
      // Product already in the cart, update its quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity = qty;
      updatedCart[existingItemIndex].totalPrice = updatedCart[existingItemIndex].mealPrice * updatedCart[existingItemIndex].quantity;
      setCartItems(updatedCart);
    } else {
      // Product not in the cart, add it as a new item
         newItem.quantity = qty;
         newItem.totalPrice = newItem.mealPrice * qty;
      setCartItems([...cartItems, newItem]);
    }
  }

  const removeFromCart = (id) => {
    if (cartItems.some(p => p._id === id)) {
        setCartItems(cartItems.filter(x => x._id !== id));
    }
  }

  const emptyCart = () => {
    setCartItems([])
  }


  return (
    <CartContext.Provider value={{ cart: cartItems, setQty, removeFromCart, addOrEditCartItem, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
}


export const useCartContext = () => {
  const context = useContext(CartContext);

  return context;
}