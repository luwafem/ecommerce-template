// src/components/ProductDetailSkeleton.jsx

import React from 'react';

const ProductDetailSkeleton = () => (
    <div className="max-w-7xl mx-auto p-4 md:p-8 animate-pulse">
        <div className="flex flex-col lg:flex-row gap-10 bg-white p-6 md:p-10 rounded-xl shadow-2xl">
            
            {/* Image Skeleton */}
            <div className="lg:w-1/2">
                <div className="h-96 bg-gray-200 rounded-lg shadow-xl mb-4"></div>
                {/* Thumbnail Skeletons */}
                <div className="grid grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-20 bg-gray-200 rounded-md"></div>
                    ))}
                </div>
            </div>

            {/* Info Skeleton */}
            <div className="lg:w-1/2 pt-6 lg:pt-0">
                <div className="h-10 bg-gray-300 w-3/4 mb-4 rounded"></div> {/* Title */}
                <div className="h-4 bg-gray-200 w-1/4 mb-6 rounded"></div> {/* Code */}
                <div className="h-12 bg-primary/20 w-1/2 mb-8 rounded"></div> {/* Price */}
                <div className="space-y-2 mb-8">
                    <div className="h-4 bg-gray-200 w-full rounded"></div>
                    <div className="h-4 bg-gray-200 w-5/6 rounded"></div>
                    <div className="h-4 bg-gray-200 w-full rounded"></div>
                </div>

                {/* Selectors and Button Skeleton */}
                <div className="space-y-4 mb-8">
                    <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                    <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                </div>
                <div className="flex space-x-4">
                    <div className="h-12 bg-gray-300 w-20 rounded-lg"></div>
                    <div className="h-12 bg-gray-400 w-full rounded-lg"></div>
                </div>
            </div>
        </div>
    </div>
);

export default ProductDetailSkeleton;