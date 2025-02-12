import React from "react";
import OrderSummary from "./OrderSummary";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../../redux/features/cart/cartSlice";
import { removeFromCart } from "../../redux/features/cart/cartSlice";

const CartModel = ({ products, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const handleQuantity = (type, id) => {
    const payload = { type, id };
    dispatch(updateQuantity(payload));
  };

  const handleRemove = (e, id)=>{
e.preventDefault()
dispatch(removeFromCart({id}))
  }
  return (
    <div
      className={`fixed z-[1000] inset-0 bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transition: "opacity 300ms" }}
    >
      <div
        className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto shadow-lg transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
            <button
              onClick={onClose}
              aria-label="Close Cart"
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="p-4 space-y-4">
          {products.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            products.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center md:justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                {/* Item Details */}
                <div className="flex items-center">
                  <span className="mr-4 px-2 bg-primary text-white rounded-full text-sm">
                    {index + 1}
                  </span>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h5 className="text-lg font-medium text-gray-800">
                      {item.name}
                    </h5>
                    <p className="text-gray-600 text-sm">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center mt-4 md:mt-0">
                  <button
                    onClick={() => handleQuantity("decrement", item._id)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-md hover:bg-primary hover:text-white"
                  >
                    -
                  </button>
                  <span className="mx-2 text-gray-800">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantity("increment", item._id)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-md hover:bg-primary hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button onClick={(e)=>handleRemove(e, item._id)} className="text-red-500 hover:text-red-700 ml-6 md:ml-0 mt-4 md:mt-0">
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        {products.length > 0 && (
          <div className="p-4 border-t">
            <OrderSummary />
            <div className="mt-4">
              <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition">
                Proceed to Checkout
              </button>
              <button
                onClick={onClose}
                className="w-full mt-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModel;
