"use client";

import React, { useState, useEffect, JSX } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonLayout from "@/app/layouts/CommonLayout";
import { Toaster, toast } from "react-hot-toast";
import { Order } from "@/types/cart";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AppDispatch, RootState } from "@/lib/store";
import { clearCart } from "@/lib/features/cart/cartSlice";

interface CartItem {
  productId: string;
  variantId?: string | null;
  quantity: number;
  price: number;
  name: string;
  image?: string;
}

export default function Checkout(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { items } = useSelector((state: RootState) => state.cart) as {
    isCartOpen: boolean;
    items: CartItem[];
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    deliveryArea: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("cod");
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  const totalDue = items.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );

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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const orderPayload: Order = {
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_address: formData.address,
        delivery_area: formData.deliveryArea,
        products: items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId ?? undefined,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
        })),
        total_amount: grandTotal,
        payment_method: paymentMethod,
        transaction_id: paymentMethod !== "cod" ? transactionId : null,
        status: "pending",
        created_at: new Date().toISOString(),
      };

      console.log("Order placed:", orderPayload);

      dispatch(clearCart());
      toast.success("Order placed successfully!");
      setTimeout(() => router.push("/order-confirmation"), 2000);
    } catch (error) {
      toast.error("Failed to place order");
      console.error("Order error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
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
        <div className='mx-auto py-8 px-4'>
          <div className='flex flex-col lg:flex-row gap-8'>
            {/* Left Column - Your Products */}
            <div className='w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-lg'>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>Your Products</h2>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <div key={index} className='mb-4'>
                    <div className='flex items-center'>
                      
                      <div className='flex items-center gap-2'>
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            className='mr-2'
                          />
                        )}
                        <div>
  <p className='font-medium'>{item.name}</p>
                        <p className='text-gray-600'>Unit Price: ৳{item.price}</p>
                        <p className='text-gray-600'>Quantity: {item.quantity}</p>
                        
                        </div>
                      
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-gray-500'>No items in cart</p>
              )}
            </div>

            {/* Right Column - Order Delivery Details */}
            <div className='w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg'>
              <h2 className='text-xl font-semibold text-gray-800 mb-4'>Order Delivery Details</h2>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-600'>Name</label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    className='mt-1 p-2 w-full border rounded-md'
                    placeholder='Enter your name...'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-600'>Phone No</label>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    className='mt-1 p-2 w-full border rounded-md'
                    placeholder='Enter your phone number...'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-600'>Delivery Address</label>
                  <input
                    type='text'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    className='mt-1 p-2 w-full border rounded-md'
                    placeholder='Enter your delivery address...'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-600'>Delivery Charge</label>
                  <div className='mt-1'>
                    <label className='inline-flex items-center mr-4'>
                      <input
                        type='radio'
                        name='deliveryArea'
                        value='inside_dhaka'
                        checked={formData.deliveryArea === 'inside_dhaka'}
                        onChange={handleInputChange}
                        className='form-radio text-blue-500'
                      />
                      <span className='ml-2'>Inside Dhaka - 60৳</span>
                    </label>
                    <label className='inline-flex items-center'>
                      <input
                        type='radio'
                        name='deliveryArea'
                        value='outside_dhaka'
                        checked={formData.deliveryArea === 'outside_dhaka'}
                        onChange={handleInputChange}
                        className='form-radio text-blue-500'
                      />
                      <span className='ml-2'>Outside Dhaka - 100৳</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-600'>Payment Method</label>
                  <select
                    name='paymentMethod'
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className='mt-1 p-2 w-full border rounded-md'
                  >
                    <option value='cod'>Cash on Delivery</option>
                    <option value='bkash'>bKash</option>
                    <option value='nagad'>Nagad</option>
                  </select>
                </div>
                {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
                  <div>
                    <label className='block text-sm font-medium text-gray-600'>Transaction ID</label>
                    <input
                      type='text'
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className='mt-1 p-2 w-full border rounded-md'
                      placeholder='Enter transaction ID'
                      required
                    />
                  </div>
                )}
                <div>
                  <label className='block text-sm font-medium text-gray-600'>Additional Notes (Optional)</label>
                  <input
                    type='text'
                    className='mt-1 p-2 w-full border rounded-md'
                    placeholder='Enter your note...'
                  />
                </div>
                <div className='bg-green-100 p-4 rounded-lg'>
                  <h3 className='font-semibold text-gray-800'>Order Summary</h3>
                  <p>Subtotal: ৳{totalDue.toLocaleString()}</p>
                  <p>Delivery Charge: ৳{deliveryCharge.toLocaleString()}</p>
                  <p className='font-bold text-yellow-600'>Total Amount: ৳{grandTotal.toLocaleString()}</p>
                  <button
                    type='submit'
                    disabled={isSubmitting || items.length === 0}
                    className={`mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 ${isSubmitting || items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Placing Order...' : 'Place Order'}
                  </button>
                </div>
              </form>
            </div>
          </div>
       
        </div>
      </CommonLayout>
    </>
  );
}