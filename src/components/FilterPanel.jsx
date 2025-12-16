// src/components/FilterPanel.jsx

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/* ============================
   Collapsible Filter Section
============================ */
const CollapsibleFilterGroup = ({ title, children, initialOpen = true }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-gray-800 hover:text-primary transition"
      >
        {title}
        {isOpen ? (
          <ChevronUp size={16} className="text-gray-400" />
        ) : (
          <ChevronDown size={16} className="text-gray-400" />
        )}
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-40 opacity-100 pb-3' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

/* ============================
   Main Filter Panel
============================ */
const FilterPanel = () => {
  const [filters, setFilters] = useState({
    texture: '',
    length: '',
    color: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: name === 'length' && value ? parseInt(value) : value,
    });
  };

  return (
    <aside className="bg-white border border-gray-200 rounded-md p-4">
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Filter Products
      </h2>

      {/* Texture */}
      <CollapsibleFilterGroup title="Texture">
        <select
          name="texture"
          value={filters.texture}
          onChange={handleChange}
          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
        >
          <option value="">All textures</option>
          <option value="Deep Wave">Deep Wave</option>
          <option value="Straight">Straight</option>
          <option value="Kinky Curl">Kinky Curl</option>
        </select>
      </CollapsibleFilterGroup>

      {/* Length */}
      <CollapsibleFilterGroup title="Length">
        <select
          name="length"
          value={filters.length}
          onChange={handleChange}
          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
        >
          <option value="">All lengths</option>
          <option value="10">10"</option>
          <option value="12">12"</option>
          <option value="14">14"</option>
          <option value="16">16"</option>
          <option value="18">18"</option>
          <option value="20">20"</option>
          <option value="24">24"</option>
        </select>
      </CollapsibleFilterGroup>

      {/* Color */}
      <CollapsibleFilterGroup title="Color">
        <select
          name="color"
          value={filters.color}
          onChange={handleChange}
          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
        >
          <option value="">All colors</option>
          <option value="Natural Black (1B)">Natural Black</option>
          <option value="613 Blonde">613 Blonde</option>
        </select>
      </CollapsibleFilterGroup>
    </aside>
  );
};

export default FilterPanel;
