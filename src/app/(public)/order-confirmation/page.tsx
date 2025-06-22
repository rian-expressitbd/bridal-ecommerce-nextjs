"use client";

import Link from "next/link";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function OrderConfirmationPage() {
  return (
    <div className='mt-8 mb-8 flex flex-col items-center justify-center bg-gray-100 px-4'>
      <div className='bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full'>
        <AiOutlineCheckCircle
          className='text-green-500 mx-auto mb-4'
          size={64}
        />
        <h1 className='text-2xl font-bold text-gray-800 mb-2'>
          Order Placed Successfully!
        </h1>
        <p className='text-gray-600 mb-6'>
          Thank you for your purchase. Your order has been placed and will be
          processed shortly.
        </p>

        {/* If you want to show order ID later:
        <p className="text-gray-700 font-medium mb-4">Order ID: #1234567890</p>
        */}

        <Link
          href='/'
          className='inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition'
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
