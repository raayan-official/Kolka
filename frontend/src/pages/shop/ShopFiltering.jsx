import React, { useState } from 'react';

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
  // State for mobile filter panel
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // State for collapsible sections
  const [isCollapsed, setIsCollapsed] = useState({
    category: false,
    color: false,
    priceRange: false,
  });

  const toggleCollapse = (filterName) => {
    setIsCollapsed((prevState) => ({
      ...prevState,
      [filterName]: !prevState[filterName],
    }));
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          Show Filters
        </button>
      </div>

      {/* Sidebar for Large Screens */}
      <div className="hidden lg:block w-72 bg-white rounded-lg shadow-md space-y-5 p-5">
        <FiltersContent
          filters={filters}
          filtersState={filtersState}
          setFiltersState={setFiltersState}
          clearFilters={clearFilters}
          isCollapsed={isCollapsed}
          toggleCollapse={toggleCollapse}
        />
      </div>

      {/* Offcanvas Panel for Small Screens */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50">
          <div className="fixed inset-y-0 left-0 w-3/4 bg-white p-5 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-xl">Filters</h3>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="text-gray-500"
              >
                Close
              </button>
            </div>
            <FiltersContent
              filters={filters}
              filtersState={filtersState}
              setFiltersState={setFiltersState}
              clearFilters={clearFilters}
              isCollapsed={isCollapsed}
              toggleCollapse={toggleCollapse}
            />
          </div>
        </div>
      )}
    </>
  );
};

// Filters Content Component
const FiltersContent = ({
  filters,
  filtersState,
  setFiltersState,
  clearFilters,
  isCollapsed,
  toggleCollapse,
}) => (
  <>
    {/* Clear Filters */}
    <div className="flex justify-between items-center">
      <button
        onClick={clearFilters}
        className="text-red-500 underline text-sm"
      >
        Clear All
      </button>
    </div>

    {/* Filter Sections */}
    {[
      { name: 'category', label: 'Category', items: filters.categories },
      { name: 'color', label: 'Color', items: filters.colors },
      {
        name: 'priceRange',
        label: 'Price Range',
        items: filters.priceRanges.map((range) => ({
          value: `${range.min}-${range.max}`,
          label: range.label,
        })),
      },
    ].map(({ name, label, items }) => (
      <div key={name} className="border rounded-lg mb-4">
        {/* Section Header */}
        <div
          className="flex justify-between items-center p-3 cursor-pointer bg-gray-100"
          onClick={() => toggleCollapse(name)}
        >
          <h4 className="font-medium text-lg">{label}</h4>
          <span>
            {isCollapsed[name] ? (
              <i className="fas fa-chevron-down"></i>
            ) : (
              <i className="fas fa-chevron-up"></i>
            )}
          </span>
        </div>

        {/* Section Content */}
        {!isCollapsed[name] && (
          <div className="p-3 space-y-2">
            {items.map((item) => (
              <button
                key={typeof item === 'string' ? item : item.value}
                onClick={() =>
                  setFiltersState({
                    ...filtersState,
                    [name]: typeof item === 'string' ? item : item.value,
                  })
                }
                className={`w-full text-left px-4 py-2 rounded-full border ${
                  filtersState[name] ===
                  (typeof item === 'string' ? item : item.value)
                    ? 'bg-primary text-white'
                    : 'text-gray-700 border-gray-300'
                }`}
              >
                {typeof item === 'string' ? item : item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    ))}
  </>
);

export default ShopFiltering;
