"use client";

import { Button } from "@/components/ui/atoms/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

function OrderStatusContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "success";
  const orderId = searchParams.get("orderId");
  const error = searchParams.get("error");

  const isSuccess = status === "success";

  return (
    <div className='container mx-auto px-4 py-16'>
      <div className='max-w-lg mx-auto text-center'>
        <div
          className={`inline-flex p-4 rounded-full mb-6 ${
            isSuccess ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}
        >
          {isSuccess ? <FiCheckCircle className='w-12 h-12' /> : <FiXCircle className='w-12 h-12' />}
        </div>

        <h1 className='text-3xl font-bold mb-4'>{isSuccess ? "Order Successful!" : "Order Failed"}</h1>

        <p className='text-gray-600 dark:text-gray-300 mb-8'>
          {isSuccess ? (
            <>
              Thank you for your order!
              {orderId && (
                <span className='block mt-2'>
                  Your order ID is: <span className='font-medium'>{orderId}</span>
                </span>
              )}
              <span className='block mt-2'>We&apos;ll send you a confirmation email with your order details.</span>
            </>
          ) : (
            <>
              Sorry, there was a problem processing your order.
              {error && <span className='block mt-2 text-red-500'>{error}</span>}
              Please try again or contact our support team if the problem persists.
            </>
          )}
        </p>

        <div className='space-y-4'>
          {isSuccess ? (
            <Button title='Continue Shopping' className='w-full'>
              <Link href='/products'>Continue Shopping</Link>
            </Button>
          ) : (
            <>
              <Button title='Try Again' className='w-full'>
                <Link href='/checkout'>Try Again</Link>
              </Button>
              <Button title='Continue Shopping' variant='outline' className='w-full'>
                <Link href='/products'>Continue Shopping</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OrderStatusPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderStatusContent />
    </Suspense>
  );
}
