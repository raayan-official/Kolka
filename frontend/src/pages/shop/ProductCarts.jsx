// src/components/ProductCarts.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import RatingStar from "../../components/RatingStar";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";


const ProductCarts = ({ products }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  // State to keep track of the number of products shown and loading state
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  // Function to load more products
  const loadMoreProducts = () => {
    setIsLoading(true); // Start loading

    // Simulate a network delay (replace this with actual logic/API call if needed)
    setTimeout(() => {
      setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 4); // Show 4 more products
      setIsLoading(false); // Stop loading after the delay
    }, 2000);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.slice(0, visibleProducts).map((product, index) => (
          <div
            key={index}
            className="product__card border rounded-lg p-4 shadow-md"
          >
            <div className="relative">
              <Link to={`/shop/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-h-96 md:-h-64 object-cover hover:scale-105 transition-all duration-300 rounded-lg"
                />
              </Link>
              <div className="hover:block absolute top-3 right-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  <i className="ri-shopping-cart-2-line bg-primary text-white text-2xl rounded-full p-2 hover:bg-primary-dark"></i>
                </button>
              </div>
            </div>
            <div className="product__card__content mt-4">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-primary">
                {product.price}{" "}
                {product.oldprice ? <s>{product?.oldprice}</s> : null}
              </p>
              <RatingStar rating={product.rating} />
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button with loading state */}
      {visibleProducts < products.length && (
        <div className="text-center mt-5">
          <button
            onClick={loadMoreProducts}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCarts;
