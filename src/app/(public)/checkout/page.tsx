"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonLayout from "@/app/layouts/CommonLayout";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AppDispatch, RootState } from "@/lib/store";
import { clearCart } from "@/lib/features/cart/cartSlice";
import { PreorderItem, usePreorder } from "@/hooks/usePreorder";
import { clearProduct } from "@/lib/features/preorder/preorderSlice";

interface CartItem {
  productId: string;
  variantId?: string | null;
  variantName?: string | null;
  quantity: number;
  price: number;
  name: string;
  image?: string;
}

interface Order {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  delivery_area: string;
  products: {
    productId: string;
    variantId?: string;
    variantName?: string;
    quantity: number;
    price: number;
    name: string;
    image?: string;
  }[];
  total_amount: number;
  payment_method: string;
  transaction_id: string | null;
  status: string;
  created_at: string;
  isPreorder?: boolean;
}

export default function Checkout() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { product: preOrderProduct } = usePreorder();
  const cart = useSelector((state: RootState) => state.cart);

  // Always treat items as an array of CartItem or PreorderItem
  const items: (CartItem | PreorderItem)[] = preOrderProduct
    ? [{
        productId: preOrderProduct.productId,
        variantId: preOrderProduct.variantId,
        variantName: preOrderProduct.variantName,
        isPreOrder: preOrderProduct.isPreOrder,
        quantity: preOrderProduct.quantity,
        price: preOrderProduct.price,
        name: preOrderProduct.name,
        image: preOrderProduct.image,
      }]
    : cart.items;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    deliveryArea: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("cod");
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler for input and select elements
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Separate handler for textarea elements
  const handleTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!formData.phone.match(/^\d{11}$/)) {
      toast.error("Phone number must be 11 digits");
      return false;
    }
    if (!formData.address.trim()) {
      toast.error("Address is required");
      return false;
    }
    if (!formData.deliveryArea) {
      toast.error("Delivery area is required");
      return false;
    }
    if (paymentMethod !== "cod" && !transactionId.trim()) {
      toast.error("Transaction ID is required for bKash/Nagad");
      return false;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return false;
    }
    return true;
  };

  // Properly typed reduce function
  const totalDue = items.reduce((total: number, item: CartItem | PreorderItem) => {
    const itemTotal = 'isPreOrder' in item && item.isPreOrder
      ? item.price * 0.2 * item.quantity // 20% deposit for preorders
      : item.price * item.quantity; // Full price for regular items
    return total + itemTotal;
  }, 0);

  const deliveryCharge =
    paymentMethod === "cod"
      ? formData.deliveryArea === "inside_dhaka"
        ? 60
        : 100
      : 0;
  const grandTotal = totalDue + deliveryCharge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const orderPayload: Order = {
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_address: formData.address,
        delivery_area: formData.deliveryArea,
        products: items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId ?? undefined,
          variantName: item.variantName ?? undefined,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
          image: item.image,
        })),
        total_amount: grandTotal,
        payment_method: paymentMethod,
        transaction_id: paymentMethod !== "cod" ? transactionId : null,
        status: "pending",
        created_at: new Date().toISOString(),
        isPreorder: !!preOrderProduct,
      };

      console.log("Order placed:", orderPayload);

      dispatch(clearCart());
      if (preOrderProduct) {
        dispatch(clearProduct());
      }
      toast.success("Order placed successfully!");
      setTimeout(() => router.push("/order-confirmation"), 2000);
    } catch (error) {
      toast.error("Failed to place order");
      console.error("Order error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  return (
    <>
      <CommonLayout>
        <Toaster position='top-center' />

        {isSubmitting && (
          <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
            <div className='bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full'>
              <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4'></div>
              <h2 className='text-2xl font-bold text-gray-800 mb-2'>
                Processing Your Order
              </h2>
              <p className='text-gray-600'>
                Please wait while we confirm your purchase...
              </p>
            </div>
          </div>
        )}

        <div className='w-full shadow py-4 flex pe-4 mb-10'>
          <h2 className='px-4 text-xl font-semibold'>CheckOut Page</h2>
        </div>

        <div className='mx-auto py-8 px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
            {/* Order Summary Card */}
            <div className='lg:col-span-5 bg-white p-6 rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
              <div className='text-center'>
                <div className='text-4xl font-bold text-blue-600 mb-2'>
                  <span className='text-3xl'>৳</span>
                  {grandTotal.toLocaleString()}
                </div>
                <h3 className='text-xl font-semibold mb-4'>Your Order</h3>

                <div className='max-h-96 overflow-y-auto mb-6'>
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.variantId}`}
                      className='flex items-center justify-between py-3 border-b'
                    >
                      <div className='flex items-center'>
                        {item.image && (
                          <div className='w-16 h-16 mr-4 relative'>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className='object-cover rounded'
                            />
                          </div>
                        )}
                        <div>
                          <p className='font-medium'>{item.name}</p>
                          {item.variantName && (
                            <p className='text-gray-500 text-sm'>
                              Variant: {item.variantName}
                            </p>
                          )}
                          <p className='text-gray-500 text-sm'>
                            {'isPreOrder' in item && item.isPreOrder
                              ? `৳${(item.price * 0.2).toLocaleString()} × ${item.quantity} (20% deposit)`
                              : `৳${item.price.toLocaleString()} × ${item.quantity}`}
                          </p>
                        </div>
                      </div>
                      <p className='font-medium'>
                        {'isPreOrder' in item && item.isPreOrder
                          ? `৳${(item.price * 0.2 * item.quantity).toLocaleString()}`
                          : `৳${(item.price * item.quantity).toLocaleString()}`}
                      </p>
                    </div>
                  ))}
                </div>

                <div className='space-y-3 bg-gray-50 p-4 rounded-lg'>
                  <div className='flex justify-between'>
                    <span>Subtotal:</span>
                    <span>৳{totalDue.toLocaleString()}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Delivery Charge:</span>
                    <span>৳{deliveryCharge.toLocaleString()}</span>
                  </div>
                  <div className='flex justify-between font-bold text-lg pt-2 border-t'>
                    <span>Total:</span>
                    <span>৳{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className='lg:col-span-7'>
              <div className='bg-white p-6 rounded-lg shadow-lg'>
                <h2 className='text-xl font-semibold mb-4'>
                  Order Delivery Details
                </h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-600 mb-1'>
                      Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Enter your name'
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-600 mb-1'>
                      Phone No
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Enter your phone number'
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-600 mb-1'>
                      Delivery Address
                    </label>
                    <textarea
                      name='address'
                      value={formData.address}
                      onChange={handleTextareaChange}
                      className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Enter your delivery address'
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-600 mb-1'>
                      Delivery Charge
                    </label>
                    <div className='flex flex-wrap gap-4'>
                      <label className='flex items-center space-x-2'>
                        <input
                          type='radio'
                          name='deliveryArea'
                          value='inside_dhaka'
                          checked={formData.deliveryArea === "inside_dhaka"}
                          onChange={handleInputChange}
                          className='h-5 w-5 text-blue-600'
                          disabled={isSubmitting}
                        />
                        <span>Inside Dhaka - 60৳</span>
                      </label>
                      <label className='flex items-center space-x-2'>
                        <input
                          type='radio'
                          name='deliveryArea'
                          value='outside_dhaka'
                          checked={formData.deliveryArea === "outside_dhaka"}
                          onChange={handleInputChange}
                          className='h-5 w-5 text-blue-600'
                          disabled={isSubmitting}
                        />
                        <span>Outside Dhaka - 100৳</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-600 mb-1'>
                      Payment Method
                    </label>
                    <select
                      name='paymentMethod'
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      disabled={isSubmitting}
                    >
                      <option value='cod'>Cash on Delivery</option>
                      <option value='bkash'>bKash</option>
                      <option value='nagad'>Nagad</option>
                    </select>
                  </div>
                  {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
                    <div>
                      <label className='block text-sm font-medium text-gray-600 mb-1'>
                        Transaction ID
                      </label>
                      <input
                        type='text'
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Enter transaction ID'
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  )}
                  <div>
                    <label className='block text-sm font-medium text-gray-600 mb-1'>
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Enter any special instructions...'
                      rows={3}
                      onChange={handleTextareaChange}
                      disabled={isSubmitting}
                    />
                  </div>
                  <button
                    type='submit'
                    disabled={isSubmitting || items.length === 0}
                    className={`w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                      isSubmitting || items.length === 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isSubmitting ? "Processing Order..." : "Place Order"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    </>
  );
}