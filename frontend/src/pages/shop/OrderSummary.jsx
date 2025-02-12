import React from "react";
import { useSelector } from "react-redux"; // Ensure useSelector is imported for accessing the store.

function OrderSummary() {
  // Get the cart state from Redux store
  const { products, taxRate, totalPrice, tax, grandTotal } = useSelector(
    (state) => state.cart
  );

  // Calculate the total number of items
  const totalItems = products.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-primary-light mt-5 rounded-lg p-6 text-base text-gray-800">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

      {products.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div>
          <div className="flex justify-between mb-4">
            <span>Total Items:</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Total Price:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          {/* Tax Calculation */}
          <div className="flex justify-between mb-4">
            <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          {/* Grand Total */}
          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Grand Total:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderSummary;
