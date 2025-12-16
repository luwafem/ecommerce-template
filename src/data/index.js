// src/data/index.js

import {
  siteInfo,
  navLinks,
  filterOptions,
  heroImages,
  checkoutContent
} from "./siteContent";

/*
|--------------------------------------------------------------------------
| PRODUCTS DATA
|--------------------------------------------------------------------------
| - sale.enabled → turn promo ON/OFF
| - sale.discountValue → % discount
| - dates are optional (remove if not needed)
*/

export const products = [
  {
    id: "DW12",
    name: "Luxury Deep Wave Wig",
    slug: "deep-wave-12in",
    basePrice: 35000,
    currency: "NGN",
    description:
      "Premium 10A grade human hair, natural luster and bounce.",
    category: "Lace Front Wigs",
    tags: ["Deep Wave", "Natural Black", "Best Seller"],

    attributes: {
      length: 12,
      material: "100% Virgin Human Hair",
      texture: "Deep Wave",
      color: "Natural Black (1B)",
      density: "180%",
      availableLengths: [10, 12, 14, 16, 18],
      availableDensities: ["150%", "180%", "200%"]
    },

    priceMultipliers: {
      "150%": 1.0,
      "180%": 1.25,
      "200%": 1.5
    },

    /* ✅ PROMO / DISCOUNT CONTROL */
    sale: {
      enabled: true,               // 🔥 toggle promo
      discountType: "percentage",  // future-ready
      discountValue: 20,           // 🔥 20% OFF
      label: "SALE",
      startDate: "2025-01-01",
      endDate: "2025-01-31"
    },

    /* ✅ IMAGE LINKS (LOCAL OR REMOTE) */
    images: [
      "https://images.unsplash.com/photo-1648144651811-bc659e2d3334?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2lnfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1724362180927-3e61a44bf175?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2lnfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1573617868130-7e757dbad187?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lnfGVufDB8MXwwfHx8MA%3D%3D"
    ],

    /* ✅ STOCK CONTROL */
    stock: 5,
    lowStockThreshold: 2,

    rating: 4.8,
    reviewCount: 45
  },

  {
    id: "ST14",
    name: "Silky Straight Bob",
    slug: "silky-straight-14in",
    basePrice: 28000,
    currency: "NGN",
    description:
      "Smooth, sleek, and easy to maintain. A classic bob style.",
    category: "Bob Wigs",
    tags: ["Straight", "Bob"],

    attributes: {
      length: 14,
      material: "100% Human Hair",
      texture: "Straight",
      color: "Natural Black (1B)",
      density: "150%",
      availableLengths: [10,  14],
      availableDensities: ["150%", "180%"]
    },

    priceMultipliers: {
      "150%": 1.0,
      "180%": 1.2
    },

    /* ❌ NO SALE ACTIVE */
    sale: {
      enabled: false
    },

    images: [
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f",
      "https://images.unsplash.com/photo-1724362180927-3e61a44bf175?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2lnfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1595959183241-7c3e4b43fd41"
    ],

    stock: 5,
    lowStockThreshold: 2,

    rating: 4.5,
    reviewCount: 20
  },

  {
    id: "ST14",
    name: "Silky Straight Bob",
    slug: "silky-straight-14in",
    basePrice: 28000,
    currency: "NGN",
    description:
      "Smooth, sleek, and easy to maintain. A classic bob style.",
    category: "Bob Wigs",
    tags: ["Straight", "Bob", "Best Seller"],

    attributes: {
      length: 14,
      material: "100% Human Hair",
      texture: "Straight",
      color: "Natural Black (1B)",
      density: "150%",
      availableLengths: [10,  14],
      availableDensities: ["150%", "180%"]
    },

    priceMultipliers: {
      "150%": 1.0,
      "180%": 1.2
    },

    /* ❌ NO SALE ACTIVE */
    sale: {
      enabled: false
    },

    images: [
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f",
      "https://images.unsplash.com/photo-1724362180927-3e61a44bf175?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2lnfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1595959183241-7c3e4b43fd41"
    ],

    stock: 5,
    lowStockThreshold: 2,

    rating: 4.5,
    reviewCount: 20
  }
];

/* -------------------------------------------------------------------------- */
/* RE-EXPORT SITE CONTENT                                                      */
/* -------------------------------------------------------------------------- */

export {
  siteInfo,
  navLinks,
  filterOptions,
  heroImages,
  checkoutContent
};
