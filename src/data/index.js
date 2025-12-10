// src/data/index.js

// 1. Import all content variables from the separate site content file
import { siteInfo, navLinks, filterOptions, heroImages, checkoutContent } from './siteContent';

// 2. Product Data Array (The original content you provided)
export const products = [
  // --- Product 1: Deep Wave Wig (Premium Example) ---
  {
    "id": "DW12", // Simple Product Code
    "name": "Luxury Deep Wave Wig",
    "slug": "deep-wave-12in",
    "basePrice": 35000.00, // This is the base price for 12 inches at 150% density
    "currency": "NGN",
    "description": "Premium 10A grade human hair, natural luster and bounce. Perfect for a full, voluminous look. Offers great length and density variation.",
    "category": "Lace Front Wigs",
    "tags": ["Deep Wave", "Natural Black", "Best Seller"],
    "attributes": {
      "length": 12, // Base length for basePrice
      "material": "100% Virgin Human Hair",
      "texture": "Deep Wave",
      "color": "Natural Black (1B)",
      "density": "180%",
      "availableLengths": [10, 12, 14, 16, 18],
      "availableDensities": ["150%", "180%", "200%"]
    },
    // Multipliers for Density (used by ProductDetailPage to adjust basePrice)
    "priceMultipliers": { 
        "150%": 1.00, 
        "180%": 1.25, // 25% price increase for 180% density
        "200%": 1.50  // 50% price increase for 200% density
    },
    "images": [
        "/images/deepwave1.jpg", 
        "/images/deepwave2.jpg",
        "/images/deepwave3.jpg" // Added third image for gallery testing
    ],
    "stock": 5,
    "rating": 4.8,
    "reviewCount": 45
  },
  
  // --- Product 2: Silky Straight Bob (Affordable Example) ---
  {
    "id": "ST14",
    "name": "Silky Straight Bob",
    "slug": "silky-straight-14in",
    "basePrice": 28000.00, // Base price for 14 inches at 150% density
    "currency": "NGN",
    "description": "Smooth, sleek, and easy to maintain. A classic bob style, perfect for everyday wear.",
    "category": "Bob Wigs",
    "tags": ["Straight", "Bob", "Everyday Wear"],
    "attributes": {
      "length": 14, // Base length for basePrice
      "material": "100% Human Hair",
      "texture": "Straight",
      "color": "Natural Black (1B)",
      "density": "150%",
      "availableLengths": [10, 12, 14],
      "availableDensities": ["150%", "180%"]
    },
    "priceMultipliers": {
        "150%": 1.00,
        "180%": 1.20
    },
    "images": ["/images/straight1.jpg", "/images/straight2.jpg"],
    "stock": 12,
    "rating": 4.5,
    "reviewCount": 20
  },

  // --- Product 3: Blonde Curly Wig (Color/Texture Variety) ---
  {
    "id": "BLN20",
    "name": "Blonde Curly Unit",
    "slug": "blonde-curly-20in",
    "basePrice": 65000.00, // Base price for 20 inches at 150% density
    "currency": "NGN",
    "description": "Stunning 613 blonde with beautiful, vibrant curls. Pre-plucked hairline for a natural look.",
    "category": "Colored Wigs",
    "tags": ["Curly", "Blonde", "Long"],
    "attributes": {
      "length": 20, // Base length for basePrice
      "material": "100% Virgin Human Hair",
      "texture": "Kinky Curl",
      "color": "613 Blonde",
      "density": "180%",
      "availableLengths": [18, 20, 24, 28],
      "availableDensities": ["150%", "180%", "200%"]
    },
    "priceMultipliers": {
        "150%": 1.00,
        "180%": 1.25,
        "200%": 1.40
    },
    "images": ["/images/blonde_curly1.jpg", "/images/blonde_curly2.jpg"],
    "stock": 3,
    "rating": 4.9,
    "reviewCount": 15
  },

  // --- Product 4: Budget Straight Wig (Lower Stock Example) ---
  {
    "id": "ST10",
    "name": "Everyday Straight Bob",
    "slug": "everyday-straight-10in",
    "basePrice": 15000.00,
    "currency": "NGN",
    "description": "A light, basic straight unit for a quick, elegant style.",
    "category": "Bob Wigs",
    "tags": ["Straight", "Affordable"],
    "attributes": {
      "length": 10,
      "material": "Human Hair Blend",
      "texture": "Straight",
      "color": "Natural Black (1B)",
      "density": "150%",
      "availableLengths": [10, 12],
      "availableDensities": ["150%"]
    },
    "priceMultipliers": {
        "150%": 1.00
    },
    "images": ["/images/budget_straight.jpg"],
    "stock": 2, // Low stock example
    "rating": 4.2,
    "reviewCount": 35
  }
];

// 3. Re-export all content to fix import errors in components like Header.jsx
export { siteInfo, navLinks, filterOptions, heroImages, checkoutContent };