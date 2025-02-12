import React from "react";
import ProductCarts from "./ProductCarts";
import {useFetchAllProductsQuery} from "../../redux/features/products/productsApi";

const TrendingProducts = () => {
  const { data, error, isLoading } = useFetchAllProductsQuery();

  // Handle loading, error states
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading trending products!</p>;

  return (
    <section className="section__container product__container">
      <h2 className="text-primary section__header">Trending Products</h2>
      <p className="section__subheader">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, nihil.
      </p>
      {/* Product cards */}
      <div className="mt-12">
        <ProductCarts products={data?.products || []} />
      </div>
    </section>
  );
};

export default TrendingProducts;
