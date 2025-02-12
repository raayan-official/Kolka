import React, { useState } from 'react';
import productsData from '../../data/productsData.json';
import ProductCarts from '../shop/ProductCarts';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Perform case-insensitive search
    const lowercasedQuery = query.toLowerCase();

    const filtered = productsData.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercasedQuery) ||
        product.description.toLowerCase().includes(lowercasedQuery)
    );

    setFilteredProducts(filtered);
  };

  return (
    <>
      <section className="search__header bg-primary-light mt-12">
        <h2 className="search__title">Search for Products</h2>
        <p className="search__subtitle">
          Find the best products that suit your needs and preferences. Start searching below!
        </p>
      </section>

      <section className="search__body">
        <div className="search__input-container flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            type="search"
            placeholder="Search for products..."
            className="search-bar w-full max-w-4xl p-2 border rounded"
          />
          <button
            onClick={() => handleSearch(searchQuery)}
            className="search-btn w-full md:w-auto py-2 px-8 mb-12 bg-primary text-white rounded"
          >
            Search
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="no-results text-center text-lg text-gray-600 mt-8">
            No products found for your search.
          </p>
        ) : (
          <ProductCarts products={filteredProducts} />
        )}
      </section>
    </>
  );
};

export default Search;
