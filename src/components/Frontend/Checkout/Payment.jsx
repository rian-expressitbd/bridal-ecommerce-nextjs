import { Link } from "react-router-dom";

const Payment = () => {
  const orderDetails = {
    deliveryFee: 60,
    deliveryDiscount: 10,
  };

  const totalItems = 3; // Static total item count
  const totalAmount = orderDetails.deliveryFee - orderDetails.deliveryDiscount;

  return (
    <div className="w-full lg:w-[29%] bg-white shadow-lg rounded-lg mb-4 p-2 text-gray-700 text-xs md:text-sm">
      <h2 className="text-sm md:text-base font-bold mb-2 text-black">Order Summary</h2>

      <div className="flex justify-between mb-2">
        <span>Items Total:</span>
        <span>{totalItems}</span> {/* Aligned to the right */}
      </div>
      <div className="flex justify-between mb-2">
        <span>Delivery Fee:</span>
        <span>{orderDetails.deliveryFee}৳</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>Delivery Discount:</span>
        <span>{orderDetails.deliveryDiscount}৳</span>
      </div>

      <hr className="border border-black opacity-50" />

      <div className="flex justify-between font-bold mt-2">
        <span>Total Amount:</span>
        <span>{totalAmount}৳</span>
      </div>

      <div className="mt-6 flex justify-center">
        <Link to="/thankYou">
          <button className="text-sm md:text-base font-semibold bg-gradient-to-r from-teal-500 to-teal-700  mb-2 text-white hover:scale-105 px-12 py-1 md:px-16 md:py-2 rounded-md transition duration-300">
            Place Order
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
