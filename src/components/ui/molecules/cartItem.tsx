"use client";

import { TCartItem } from "@/lib/features/cart/cartSlice";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { Button } from "../atoms/button";

interface CartItemProps {
  item: TCartItem;
  onRemove: () => void;
  onQuantityChange: (id: string, quantity: number) => void;
  showQuantityControls?: boolean;
  currency?: string;
}

export function CartItem({
  item,
  onRemove,
  onQuantityChange,
  showQuantityControls = true,
  currency = "BDT",
}: CartItemProps) {
  const unitPrice = item.price;
  const totalPrice = unitPrice * item.quantity;

  const handleIncrease = () => {
    if (item.quantity < item.maxStock) {
      onQuantityChange(item._id, item.quantity + 1); // ✅ fixed ID
    }
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item._id, item.quantity - 1); // ✅ fixed ID
    }
  };

  return (
    <div className="flex gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="relative w-16 h-16 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
            <span className="text-xs text-gray-500">No Image</span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">
            {item.name}
          </h3>
          <div className="font-medium text-sm text-gray-700 dark:text-gray-300">
            {formatCurrency(totalPrice, currency)}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          {formatCurrency(unitPrice, currency)} × {item.quantity}
        </p>

        {item.maxStock && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {item.quantity >= item.maxStock
              ? "Max quantity reached"
              : `${item.maxStock - item.quantity} available`}
          </p>
        )}

        <div className="flex items-center justify-between mt-2">
          {showQuantityControls ? (
            <div className="flex items-center gap-2">
              <Button
                title="Decrease Quantity"
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 flex justify-center items-center"
                onClick={handleDecrease}
                disabled={item.quantity <= 1}
              >
                <FiMinus className="w-3 h-3" />
              </Button>

              <span className="text-sm w-8 text-center">{item.quantity}</span>

              <Button
                title="Increase Quantity"
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 flex justify-center items-center"
                onClick={handleIncrease}
                disabled={item.quantity >= (item.maxStock || Infinity)}
              >
                <FiPlus className="w-3 h-3" />
              </Button>
            </div>
          ) : (
            <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
          )}

          <Button
            title="Remove Item"
            variant="ghost"
            size="sm"
            className="text-destructive hover:bg-destructive/10"
            onClick={onRemove}
          >
            <FiTrash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
