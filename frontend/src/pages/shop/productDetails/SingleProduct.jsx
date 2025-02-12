import React from "react";
import { Link, useParams } from "react-router-dom";
import RatingStar from "../../../components/RatingStar";
import { useDispatch } from "react-redux";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import ReviewsCard from "../reviews/ReviewsCard";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchProductByIdQuery(id);

  const singleProduct = data?.product || {};
  const productReviews = data?.reviews || [];

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error Loading Product Details.</p>;

  return (
    <div className="bg-gray-100 py-10">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b border-gray-200 mb-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary hover:underline">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link to="/shop" className="hover:text-primary hover:underline">
              Shop
            </Link>
            <span className="text-gray-400">/</span>
            <span className="font-semibold text-gray-800">{singleProduct.name}</span>
          </div>
          <div>
            <Link to="/shop" className="text-sm text-primary hover:underline flex items-center">
              <i className="ri-arrow-left-line mr-1"></i> Back to Shop
            </Link>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <section className="container mx-auto px-4 bg-white rounded-lg shadow-md p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-50 p-4 rounded-md">
            <img
              src={singleProduct?.image}
              alt="Product"
              className="rounded-md w-full h-auto transform transition duration-300 hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                {singleProduct?.name}
              </h1>
              <p className="text-xl font-bold text-primary mb-2">
                Rs: {singleProduct?.price}
                <s className="text-gray-400 font-medium"> {singleProduct?.oldprice}</s>
              </p>
              <p className="text-gray-700 mb-6">{singleProduct?.description}</p>

              {/* Additional Information */}
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong className="text-gray-800">Category: </strong>
                  {singleProduct?.category}
                </p>
                <p>
                  <strong className="text-gray-800">Color: </strong>{singleProduct?.color}
                </p>
                <div className="flex items-center">
                  <strong className="text-gray-800">Ratings: </strong>
                  <RatingStar rating={singleProduct?.rating} />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(singleProduct);
                }}
                className="bg-primary text-white py-3 px-6 rounded-md hover:bg-primary-dark transition duration-300"
              >
                Add to Cart
              </button>
              <button className="ml-4 py-3 px-6 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition duration-300">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="container mx-auto px-6 mt-10 bg-white rounded-lg shadow-xl p-8">
  <div className="space-y-8">
    <div className="text-center">
      <h2 className="text-4xl font-semibold text-gray-800 mb-4">Product Reviews</h2>
      <p className="text-lg text-gray-500">See what others are saying about this product.</p>
    </div>
    
    <ReviewsCard reviews={productReviews} />
  </div>
</section>

    </div>
  );
};

export default SingleProduct;
