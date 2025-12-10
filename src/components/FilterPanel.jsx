// src/components/FilterPanel.jsx

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Assuming you have lucide-react or similar icons

// Note: In a real implementation, this component would receive a
// filter function from the parent (ShopPage) and call it on change.

// --- Collapsible Filter Group Component ---
// This sub-component handles the collapsible behavior for each filter section.
const CollapsibleFilterGroup = ({ title, children, groupName, initialOpen = true }) => {
    // State to manage whether this specific group is open or closed
    const [isOpen, setIsOpen] = useState(initialOpen);

    return (
        <div className="filter-group border-b border-gray-200 last:border-b-0">
            {/* Header: Clickable area to toggle */}
            <button
                className="flex justify-between items-center w-full py-3 px-1 text-left text-lg font-semibold text-gray-800 hover:text-primary transition duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                {/* Icon changes based on state */}
                {isOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
            </button>

            {/* Content: Conditionally rendered based on state */}
            {/* The transition classes (max-h-0, overflow-hidden) enable a smooth, CSS-only collapse effect */}
            <div 
                className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden pb-0'
                }`}
            >
                {children}
            </div>
        </div>
    );
};
// ------------------------------------------


const FilterPanel = () => {
    // Initialize state for the three primary filters
    const [filters, setFilters] = useState({ texture: '', length: '', color: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Convert length value to a number if it is not an empty string
        const finalValue = name === 'length' && value !== '' ? parseInt(value) : value;
        
        setFilters(prev => ({ ...prev, [name]: finalValue }));
        
        // In a production app, you would call a prop function here: 
        // onFilterChange({ ...filters, [name]: finalValue });
    };

    return (
        <aside className="p-4 bg-gray-50 rounded-xl shadow-lg">
            <h2 className="text-2xl font-serif font-bold text-gray-800 border-b border-gray-300 pb-3 mb-4">
                🔎 Shop Filters
            </h2>
            
            {/* Texture Filter */}
            <CollapsibleFilterGroup title="Texture" groupName="texture" initialOpen={true}>
                <select 
                    name="texture" 
                    value={filters.texture} 
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-primary focus:ring-primary transition text-sm"
                >
                    <option value="">All Textures</option>
                    <option value="Deep Wave">Deep Wave</option>
                    <option value="Straight">Straight</option>
                    <option value="Kinky Curl">Kinky Curl</option>
                </select>
            </CollapsibleFilterGroup>

            {/* Length Filter */}
            <CollapsibleFilterGroup title="Length (Inches)" groupName="length">
                <select 
                    name="length" 
                    value={filters.length} 
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-primary focus:ring-primary transition text-sm"
                >
                    <option value="">All Lengths</option>
                    <option value="10">10"</option>
                    <option value="12">12"</option>
                    <option value="14">14"</option>
                    <option value="16">16"</option>
                    <option value="18">18"</option>
                    <option value="20">20"</option>
                    <option value="24">24"</option>
                </select>
            </CollapsibleFilterGroup>

            {/* Color Filter */}
            <CollapsibleFilterGroup title="Color" groupName="color">
                <select 
                    name="color" 
                    value={filters.color} 
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-primary focus:ring-primary transition text-sm"
                >
                    <option value="">All Colors</option>
                    <option value="Natural Black (1B)">Natural Black</option>
                    <option value="613 Blonde">613 Blonde</option>
                </select>
            </CollapsibleFilterGroup>
        </aside>
    );
};

export default FilterPanel;