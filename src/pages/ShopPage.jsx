import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data';
import ProductCard from '../components/ProductCard';
import FilterPanel from '../components/FilterPanel';

const ShopPage = () => {
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    texture: '',
    length: '',
    color: ''
  });

  /* -------------------------------------------------
     🔗 READ FILTERS FROM URL (WooCommerce behavior)
  --------------------------------------------------*/
  useEffect(() => {
    setActiveFilters({
      texture: searchParams.get('texture') || '',
      length: searchParams.get('length') || '',
      color: searchParams.get('color') || ''
    });
  }, [searchParams]);

  const handleFilterChange = useCallback((newFilters) => {
    setActiveFilters(newFilters);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  /* -------------------------------------------------
     🧠 FILTER + SEARCH LOGIC
  --------------------------------------------------*/
  const displayedProducts = useMemo(() => {
    let filtered = products;
    const { texture, length, color } = activeFilters;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.id.toLowerCase().includes(searchTerm)
      );
    }

    if (texture) {
      filtered = filtered.filter(
        product => product.attributes.texture === texture
      );
    }

    if (length) {
      const numericLength = parseInt(length);
      filtered = filtered.filter(product =>
        product.attributes.availableLengths.includes(numericLength)
      );
    }

    if (color) {
      filtered = filtered.filter(
        product => product.attributes.color === color
      );
    }

    return filtered;
  }, [activeFilters, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-serif font-bold text-center mb-8">
        Shop
      </h1>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-4 border border-gray-300 rounded-lg focus:border-primary focus:ring-primary"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <aside className="w-full md:w-1/4 sticky top-24 h-fit">
          <FilterPanel
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
        </aside>

        {/* Products */}
        <section className="w-full md:w-3/4">
          <p className="text-sm text-gray-500 mb-4">
            Showing {displayedProducts.length} of {products.length} products
          </p>

          {displayedProducts.length === 0 ? (
            <div className="bg-white p-10 rounded-xl shadow text-center">
              <p className="text-gray-600 text-lg">
                No products match your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ShopPage;
