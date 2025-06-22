// src/lib/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface TCartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number; // required
  maxStock: number; // required
}

interface CartState {
  items: TCartItem[];
  isOpen: boolean;
  taxRate: number;
  shippingCost: number;
  discountAmount: number;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  taxRate: 0.1, // 10% tax
  shippingCost: 5, // $5 flat shipping
  discountAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TCartItem>) => {
      const incoming = action.payload;
      const existing = state.items.find((item) => item._id === incoming._id);

      if (existing) {
        // clamp to maxStock
        existing.quantity = Math.min(existing.quantity + incoming.quantity, existing.maxStock);
      } else {
        state.items.push({
          ...incoming,
          // clamp initial quantity
          quantity: Math.min(incoming.quantity, incoming.maxStock),
        });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i._id === id);
      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter((i) => i._id !== id);
      } else {
        // clamp to stock
        item.quantity = Math.min(quantity, item.maxStock);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    setTaxRate: (state, action: PayloadAction<number>) => {
      state.taxRate = action.payload;
    },
    setShippingCost: (state, action: PayloadAction<number>) => {
      state.shippingCost = action.payload;
    },
    setDiscountAmount: (state, action: PayloadAction<number>) => {
      state.discountAmount = action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  openCart,
  closeCart,
  toggleCart,
  setTaxRate,
  setShippingCost,
  setDiscountAmount,
} = cartSlice.actions;

// --- Selectors ---
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartItemsCount: (state: RootState) => number = (state: RootState) =>
  state.cart.items.reduce((sum: number, i: TCartItem) => sum + i.quantity, 0);
export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce((sum: number, i: TCartItem) => sum + i.price * i.quantity, 0);
export const selectCartTax = (state: RootState) => selectCartSubtotal(state) * state.cart.taxRate;
export const selectCartShipping = (state: RootState) => state.cart.shippingCost;
export const selectCartDiscount = (state: RootState) => state.cart.discountAmount;
export const selectCartGrandTotal = (state: RootState) =>
  selectCartSubtotal(state) + selectCartTax(state) + selectCartShipping(state) - selectCartDiscount(state);
export const selectIsCartOpen = (state: RootState) => state.cart.isOpen;

// Backward‐compatibility alias
export const selectCartTotal = selectCartSubtotal;

export default cartSlice.reducer;