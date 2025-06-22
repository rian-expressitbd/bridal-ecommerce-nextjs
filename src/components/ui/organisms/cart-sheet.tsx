"use client";
import { useBusiness } from "@/hooks/useBusiness";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { toast } from "sonner";
import { Button } from "../atoms/button";
import { CartItem } from "../molecules/cartItem";
import { Sheet, SheetContent, SheetFooter } from "../molecules/sheet";
import { TCartItem } from "@/lib/features/cart/cartSlice";

export function CartSheet() {
  const { businessData } = useBusiness();
  const {
    items,
    itemCount,
    isOpen,
    subtotal,
    removeItem,
    closeCart,
    openCart,
    updateItemQuantity,
  } = useCart();

  const currency = businessData?.currency?.[0] || "USD";

  const handleOpenCart = () => {
    if (items.length === 0) {
      toast.warning("Your cart is empty!", {
        description: "Add some items to your cart first",
      });
      return;
    }
    openCart();
  };

  return (
    <>
      <Button
        title='Open Cart'
        variant='ghost'
        onClick={handleOpenCart}
        className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800'
      >
        <span className='relative'>
          <FiShoppingCart className='w-5 h-5' />
          {itemCount > 0 && (
            <span className='absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          )}
        </span>
      </Button>

      <Sheet
        isOpen={isOpen}
        onClose={closeCart}
        position='right'
        title={`Your Cart (${itemCount})`}
        showHeader
        showCloseButton
      >
        <SheetContent className='p-0 flex flex-col'>
          <div className='flex-1 overflow-y-auto'>
            {items.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-full gap-4 p-8'>
                <FiShoppingCart className='w-12 h-12 text-gray-800' />
                <p className='text-lg font-medium'>Your cart is empty</p>
                <Button title='Continue Shopping'>
                  <Link href='/products' onClick={closeCart}>
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            ) : (
              <div className='divide-y dark:divide-gray-700'>
                {items.map((item: TCartItem) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    onRemove={() => removeItem(item._id)}
                    onQuantityChange={(id, qty) => updateItemQuantity(id, qty)}
                  />
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <SheetFooter className='flex flex-col gap-4 p-4 border-t'>
              <div className='space-y-2'>
                <div className='flex justify-between text-lg font-semibold pt-2'>
                  <span>Total</span>
                  <span>{formatCurrency(subtotal, currency)}</span>
                </div>

                <Button
                  title='Continue Shopping'
                  size='md'
                  variant='outline'
                  className='w-full'
                  onClick={closeCart}
                >
                  Continue Shopping
                </Button>
                <Button
                  title='View Cart & Checkout'
                  className='w-full'
                  size='lg'
                >
                  <Link href='/checkout' onClick={closeCart}>
                    Checkout
                  </Link>
                </Button>
              </div>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
