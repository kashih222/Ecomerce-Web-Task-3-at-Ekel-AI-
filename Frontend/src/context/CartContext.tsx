import { createContext, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Cart item type
export type CartItem = {
  _id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  images: { thumbnail: string };
};

// Context type
export type CartContextType = {
  cart: CartItem[];
  loadCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (id: string, action: "inc" | "dec") => Promise<void>;
  removeItem: (id: string) => Promise<void>;
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const FETCH_CART = "http://localhost:5000/api/cart/get-cart";
  const ADD_TO_CART = "http://localhost:5000/api/cart/add-to-cart";
  const UPDATE_QTY = "http://localhost:5000/api/cart/update-qty";
  const REMOVE_ITEM = "http://localhost:5000/api/cart/remove-item";

  const token = localStorage.getItem("token") || "";

  // Load Cart
  const loadCart = useCallback(async () => {
    try {
      if (!token) return;
      const { data } = await axios.get(FETCH_CART, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(Array.isArray(data.cartItems) ? data.cartItems : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load cart");
    }
  }, [token]);

 

  // Add to Cart
  const addToCart = async (productId: string, quantity = 1) => {
    try {
      if (!token) return;
      const { data } = await axios.post(
        ADD_TO_CART,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(data.cartItems || []);
      toast.success("Product added to cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  // Update Quantity
  const updateQuantity = async (id: string, action: "inc" | "dec") => {
    try {
      const { data } = await axios.put(
        UPDATE_QTY,
        { id, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(data.cartItems || []);
      toast.success("Cart Updated");
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  // Remove Item
  const removeItem = async (id: string) => {
    try {
      const { data } = await axios.delete(`${REMOVE_ITEM}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(data.cartItems || []);
      toast.success("Item removed");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, loadCart, addToCart, updateQuantity, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;