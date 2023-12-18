import { createContext, useContext, useState, useEffect } from "react";
import * as cartService from '../services/cartService';
import { useAuth } from '../hooks/useAuth';
export const CartContext = createContext();
import { useNavigate } from "react-router-dom";

export const CartProvider = ({
    children
}) => {
    const { state } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const pickedRestaurant = localStorage.getItem('pickedRestaurant');
                if(!pickedRestaurant){
                    navigate('/Restaurants');
                }
                var response = await cartService.getCart(state?.user?._id, pickedRestaurant);
                setCartItems(response);
            }
            catch (error) {
                console.log("Error on add or edit cart item - " + error.message);
            }
        }
        )()
    }, [state?.user?._id]);

    const setCart = async (pickedRestaurant) => {
        var response = await cartService.getCart(state?.user?._id, pickedRestaurant);
        setCartItems(response);
    }

    const updateCart = async (item, qty) => {
        item.quantity += qty;
        item.totalPrice = item.mealPrice * item.quantity;

        try {
            var repsonse = await cartService.edit(item);
            return repsonse;
        }
        catch (error) {
            console.log("Error on add or edit cart item - " + error.message);
        }
    };

    const createCart = async (newItem, qty) => {
        newItem.quantity = qty;
        newItem.mealId = newItem._id;
        newItem.totalPrice = newItem.mealPrice * newItem.quantity;

        try {
            var repsonse = await cartService.create(newItem);
            return repsonse;
        }
        catch (error) {
            console.log("Error on add or edit cart item - " + error.message);
        }
    };

    const addOrEditCartItem = async (newItem, qty) => {
        // Check if the product is already in the cart
        const existingItemIndex = cartItems.findIndex(item => item.mealId === newItem.mealId || item.mealId === newItem._id);
        if (existingItemIndex !== -1) {
            // Product already in the cart, update its quantity
            let updatedCart = [...cartItems];
            updatedCart[existingItemIndex] = await updateCart(updatedCart[existingItemIndex], qty);
            setCartItems(updatedCart);
        } else {
            // Product not in the cart, add it as a new item
            const result = await createCart(newItem, qty);
            setCartItems([...cartItems, result]);
        }
    }

    const setQty = async (newItem, qty) => {
        // Check if the product is already in the cart
        const existingItemIndex = cartItems.findIndex(item => item.mealId === newItem.mealId);

        if (existingItemIndex !== -1) {
            // Product already in the cart, update its quantity
            let updatedCart = [...cartItems];
            updatedCart[existingItemIndex] = await updateCart(updatedCart[existingItemIndex], qty);
            setCartItems(updatedCart);
        } else {
            const result = await createCart(newItem, qty);
            setCartItems([...cartItems, result]);
        }
    }

    const removeFromCart = (id) => {
        if (cartItems.some(p => p._id === id)) {
            (async () => {
                try {
                    await cartService.remove(id);
                }
                catch (error) {
                    console.log("Error on remove from cart - " + error.message);
                }
            }
            )()
            setCartItems(cartItems.filter(x => x._id !== id));
        }
    }

    const emptyCart = () => {
        setCartItems([])
    }

    return (
        <CartContext.Provider value={{ cart: cartItems, setQty, removeFromCart, addOrEditCartItem, emptyCart, setCart }}>
            {children}
        </CartContext.Provider>
    );
}


export const useCartContext = () => {
    const context = useContext(CartContext);

    return context;
}