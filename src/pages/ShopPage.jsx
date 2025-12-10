// src/pages/ShopPage.jsx

import React, { useState, useMemo, useCallback } from 'react';
import { products } from '../data/index'; 
import ProductCard from '../components/ProductCard'; 
import FilterPanel from '../components/FilterPanel';

const ShopPage = () => {
    // New state for the search term
    const [searchTerm, setSearchTerm] = useState(''); 
    const [activeFilters, setActiveFilters] = useState({
        texture: '', 
        length: '', 
        color: ''
    });

    const handleFilterChange = useCallback((newFilters) => {
        setActiveFilters(newFilters);
    }, []);

    const handleSearchChange = (e) => {
        // Convert to lowercase for case-insensitive searching
        setSearchTerm(e.target.value.toLowerCase()); 
    };

    // Memoization: Efficiently filter and search products
    const displayedProducts = useMemo(() => {
        let filtered = products;
        const { texture, length, color } = activeFilters;
        
        // --- 1. Apply Search Filter (Name or Code) ---
        if (searchTerm) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchTerm) || 
                product.id.toLowerCase().includes(searchTerm)
            );
        }

        // --- 2. Apply Texture Filter ---
        if (texture) {
            filtered = filtered.filter(product => product.attributes.texture === texture);
        }

        // --- 3. Apply Length Filter ---
        if (length) {
            const numericLength = parseInt(length);
            filtered = filtered.filter(product => 
                product.attributes.availableLengths.includes(numericLength)
            );
        }

        // --- 4. Apply Color Filter ---
        if (color) {
            filtered = filtered.filter(product => product.attributes.color === color);
        }

        return filtered;
    }, [activeFilters, searchTerm]); // Dependency array now includes searchTerm!

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            
            <h1 className="text-4xl font-serif font-bold text-center text-gray-900 mb-8">Our Wig Collection</h1>
            
            {/* Search Bar placed prominently above the filter/grid split */}
            <div className="mb-8 w-full">
                <input
                    type="text"
                    placeholder="🔍 Search products by name or code..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-primary transition duration-150 shadow-inner text-lg"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Left Side: Filter Panel */}
                <aside className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow-lg h-fit sticky top-24">
                    <FilterPanel onFilterChange={handleFilterChange} /> 
                </aside>

                {/* Right Side: Product Grid */}
                <section className="w-full md:w-3/4">
                    <p className="text-sm text-gray-600 mb-4">
                        Showing **{displayedProducts.length}** of {products.length} products.
                    </p>
                    
                    {displayedProducts.length === 0 ? (
                        <div className="text-center p-10 bg-white rounded-xl shadow-lg">
                            <p className="text-xl text-gray-600">No products found matching your search and filter criteria. Try adjusting your inputs.</p>
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