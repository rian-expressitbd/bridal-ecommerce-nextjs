"use client";
// src/hooks/useCart.ts
import {
  addItem,
  clearCart,
  closeCart,
  openCart,
  removeItem,
  selectCartDiscount,
  selectCartGrandTotal,
  selectCartItems,
  selectCartItemsCount,
  selectCartShipping,
  selectCartSubtotal,
  selectIsCartOpen,
  setDiscountAmount,
  setShippingCost,
  // setTaxRate,
  TCartItem,
  toggleCart,
  updateQuantity,
} from "@/lib/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useCallback, useMemo } from "react";
import { useAppSelector } from "./useAppSelector";

export const useCart = () => {
  const dispatch = useAppDispatch();

  // Call hooks at the top level
  const rawItems = useAppSelector(selectCartItems);
  const rawItemCount = useAppSelector(selectCartItemsCount);
  const rawSubtotal = useAppSelector(selectCartSubtotal);
  const rawShipping = useAppSelector(selectCartShipping);
  const rawDiscount = useAppSelector(selectCartDiscount);
  const rawGrandTotal = useAppSelector(selectCartGrandTotal);
  const rawIsOpen = useAppSelector(selectIsCartOpen);

  // Memoize the values
  const { items, itemCount, subtotal, shipping, discount, grandTotal, isOpen } = useMemo(
    () => ({
      items: rawItems,
      itemCount: rawItemCount,
      subtotal: rawSubtotal,
      shipping: rawShipping,
      discount: rawDiscount,
      grandTotal: rawGrandTotal,
      isOpen: rawIsOpen,
    }),
    [rawItems, rawItemCount, rawSubtotal, rawShipping, rawDiscount, rawGrandTotal, rawIsOpen]
  );

  // For backward compatibility
  const totalPrice = subtotal;

  // Action dispatchers
  const addToCart = useCallback(
    (item: TCartItem) => {
      dispatch(addItem(item));
    },
    [dispatch]
  );

  const removeFromCart = useCallback(
    (id: string) => {
      dispatch(removeItem(id));
    },
    [dispatch]
  );

  const updateItemQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity < 1) {
        dispatch(removeItem(id));
      } else {
        dispatch(updateQuantity({ id, quantity }));
      }
    },
    [dispatch]
  );

  const clearCartItems = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const openCartDrawer = useCallback(() => {
    dispatch(openCart());
  }, [dispatch]);

  const closeCartDrawer = useCallback(() => {
    dispatch(closeCart());
  }, [dispatch]);

  const toggleCartDrawer = useCallback(() => {
    dispatch(toggleCart());
  }, [dispatch]);

  const applyDiscount = useCallback(
    (amount: number) => {
      dispatch(setDiscountAmount(amount));
    },
    [dispatch]
  );

  const setShipping = useCallback(
    (cost: number) => {
      dispatch(setShippingCost(cost));
    },
    [dispatch]
  );

  // const setTax = useCallback(
  //   (rate: number) => {
  //     dispatch(setTaxRate(rate));
  //   },
  //   [dispatch]
  // );

  // Utility functions
  const getItemById = (id: string) => {
    return items.find((item: TCartItem) => item._id === id);
  };

  const itemExists = (id: string) => {
    return items.some((item: TCartItem) => item._id === id);
  };

  const getItemQuantity = (id: string) => {
    const item = getItemById(id);
    return item ? item.quantity : 0;
  };

  return {
    // State
    items,
    itemCount,
    isOpen,
    totalPrice, // Legacy support

    // Calculated values
    subtotal,

    shipping,
    discount,
    grandTotal,

    // Actions
    addItem: addToCart,
    removeItem: removeFromCart,
    updateItemQuantity,
    clearCart: clearCartItems,
    openCart: openCartDrawer,
    closeCart: closeCartDrawer,
    toggleCart: toggleCartDrawer,
    applyDiscount,
    setShipping,

    // Utility functions
    getItemById,
    itemExists,
    getItemQuantity,
  };
};
