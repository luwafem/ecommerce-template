// src/components/ScrollToTopButton.jsx

import React, { useState, useEffect } from 'react';
// Assuming you have Lucide icons installed
import { ArrowUp } from 'lucide-react'; 

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll smoothly to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-10 right-10 p-3 bg-primary text-white rounded-full shadow-lg transition-opacity duration-300 z-40 
                ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            aria-label="Scroll to top"
        >
            <ArrowUp size={24} />
        </button>
    );
};

export default ScrollToTopButton;