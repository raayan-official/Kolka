import React, { useEffect, useState } from "react";
import productsData from "../../data/productsData.json";
import ProductCarts from "./ProductCarts";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const filters = {
  categories: ["all", "mehndi", "cone", "box"],
  colors: ["all", "black", "red", "pink", "yellow"],
  priceRanges: [
    { label: "under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $150", min: 100, max: 150 },
    { label: "$150 - $200", min: 150, max: 200 },
    { label: "$200 and above", min: 200, max: Infinity },
  ],
};

const Shop = () => {
  const [filtersState, setFiltersState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(8);

  const { category, color, priceRange } = filtersState;
  const [minPrice, maxPrice] = priceRange.split('-').map(Number);

  const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
    category: category !== 'all' ? category : '',
    color: color !== 'all' ? color : '',
    minPrice: isNaN(minPrice) ? '' : minPrice,
    maxPrice: isNaN(maxPrice) ? '' : maxPrice,
    page: currentPage,
    limit: ProductsPerPage
  });

  const clearFilters = () => {
    setFiltersState({
      category: "all",
      color: "all",
      priceRange: "",
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Loading Products.</div>;

  const startProduct = (currentPage - 1) * ProductsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) {
      setCurrentPage(1);
    } else if (pageNumber > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(pageNumber);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-4">
      <section className="search__header mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-primary text-center capitalize mb-4">
          Shopping Your Fav Product!
        </h2>
        <p className="text-base md:text-lg text-gray-600 text-center max-w-3xl mx-auto">
          Find the best products that suit your needs and preferences. Start searching below!
        </p>
      </section>

      <section className="section__container">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar: Filters */}
          <div className="w-full md:w-1/5">
            <ShopFiltering
              filters={filters}
              filtersState={filtersState}
              setFiltersState={setFiltersState}
              clearFilters={clearFilters}
            />
          </div>

          {/* Right Side: Products Display */}
          <div className="w-full md:w-4/5">
            <h3 className="text-lg md:text-xl font-medium mb-4">
             Showing {startProduct} To {endProduct} Of {totalProducts} Products
            </h3>
            <ProductCarts products={products} />

            <div className="mt-6 flex justify-center items-center space-x-3">
  {/* Previous Button */}
  <button
    onClick={handlePrevPage}
    disabled={currentPage === 1}
    className="flex items-center justify-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg shadow-md hover:bg-white hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all transform disabled:opacity-50"
  >
    <i className="ri-arrow-left-line text-lg"></i>
    <span className="ml-2">Previous</span>
  </button>

  {/* Page Number Buttons */}
  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      onClick={() => handlePageChange(index + 1)}
      className={`px-4 py-2 text-sm font-medium rounded-lg ${currentPage === index + 1 ? 'bg-primary-dark text-white' : 'bg-primary text-white'} shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40`}
    >
      {index + 1}
    </button>
  ))}

  {/* Next Button */}
  <button
    onClick={handleNextPage}
    disabled={currentPage === totalPages}
    className="flex items-center justify-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg shadow-md hover:bg-white hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all transform disabled:opacity-50"
  >
    <span className="mr-2">Next</span>
    <i className="ri-arrow-right-line text-lg"></i>
  </button>
</div>


          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
