// src/components/AddToCartBtn.tsx (Client Component)
"use client";

import { useCart } from "@/hooks/useCart";
import { TCartItem, toggleCart } from "@/lib/features/cart/cartSlice";
import type { Product, Variant } from "@/types/product";
import { Button } from "../atoms/button";
import { useDispatch } from "react-redux";

interface AddToCartBtnProps {
  item: Product;
  variant?: Variant;
  quantity?: number;
  disabled?: boolean;
  className?: string; // Renamed from `class` to `className`
}

export default function AddToCartBtn({
  item,
  variant,
  quantity = 1,
  className,
}: AddToCartBtnProps) {
  const cart = useCart();
  const dispatch = useDispatch();
  const handleAdd = () => {
    const selected = variant || item.variantsId[0];
    if (!selected) return;

    const variantName = variant?.name
      ? ` - ${variant.name.split("/").pop()?.trim()}`
      : "";

    const cartItem: TCartItem = {
      _id: selected._id,
      name: `${item.name}${variantName}`,
      price: Number(selected.offer_price),
      image:
        variant?.image?.image?.secure_url ||
        item.images[0]?.image?.secure_url ||
        "",
      quantity,
      maxStock: item.total_stock || 0,
    };

    cart.addItem(cartItem);
    dispatch(toggleCart());
  };

  const isDisabled = variant
    ? (variant.variants_stock || 0) <= 0
    : (item.total_stock || 0) <= 0;

  return (
    <Button
      title='Add to Cart'
      onClick={handleAdd}
      disabled={isDisabled || className == "disabled"}
      size='md'
      className={`w-full ${className ?? ""}`} // Apply className here safely
    >
      Add to Cart
    </Button>
  );
}
