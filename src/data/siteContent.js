// src/data/siteContent.js

// --- Global Site Information ---
export const siteInfo = {
    name: "Luxury Wig Hub",
    slogan: "Find Your Perfect Look Today!",
    email: "support@luxurywighub.com",
    phone: "+234 800 WIGS NOW",
    address: "Lagos, Nigeria",
};

// --- Navigation Links ---
export const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Shop', path: '/shop' },
    { title: 'Cart', path: '/cart' },
    { title: 'Checkout', path: '/checkout' },
];

// --- Filter/Category Options (Used on ShopPage and FilterPanel) ---
export const filterOptions = {
    categories: [
        { label: "All Wigs", value: "" },
        { label: "Lace Front Wigs", value: "Lace Front Wigs" },
        { label: "Bob Wigs", value: "Bob Wigs" },
        { label: "Colored Wigs", value: "Colored Wigs" },
    ],
    textures: [
        { label: "All Textures", value: "" },
        { label: "Deep Wave", value: "Deep Wave" },
        { label: "Straight", value: "Straight" },
        { label: "Kinky Curl", value: "Kinky Curl" },
    ],
    colors: [
        { label: "All Colors", value: "" },
        { label: "Natural Black (1B)", value: "Natural Black (1B)" },
        { label: "613 Blonde", value: "613 Blonde" },
    ],
    lengths: [
        { label: "All Lengths", value: "" },
        { label: "10 inches", value: 10 },
        { label: "12 inches", value: 12 },
        { label: "14 inches", value: 14 },
        { label: "16 inches", value: 16 },
        { label: "18 inches", value: 18 },
        { label: "20 inches", value: 20 },
        { label: "24 inches", value: 24 },
    ]
};

// --- Hero Section Carousel Images ---
// These are the images used on the HomePage hero banner
export const heroImages = [
    // IMPORTANT: Replace these with actual image URLs
    'https://images.unsplash.com/photo-1598460599026-b5ce91a4570b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    'https://images.unsplash.com/photo-1590487989396-d250812e9b90?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    'https://images.unsplash.com/photo-1596464522436-075f928e08d6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
];

// --- Checkout Page Content ---
export const checkoutContent = {
    paymentMethods: [
        { name: 'Paystack', icon: '/icons/paystack.png', description: 'Pay securely via card, bank transfer, or USSD.' },
    ],
    shippingFee: 2500, // NGN
};