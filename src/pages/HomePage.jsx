import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products, heroImages, siteInfo } from '../data';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const featuredProducts = products
    .filter(p => p.tags?.includes('Best Seller'))
    .slice(0, 4);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!heroImages.length) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* ================= HERO ================= */}
      <section className="relative h-[420px] md:h-[520px] overflow-hidden">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Hero ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-light text-white mb-4">
              {siteInfo.slogan}
            </h1>

            <p className="text-lg text-white/90 mb-8 max-w-xl">
              Luxury virgin hair wigs, ethically sourced and delivered across Nigeria.
            </p>

            <Link
              to="/shop"
              className="inline-block bg-white text-black px-8 py-3 text-sm tracking-wide hover:bg-gray-100 transition"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>

      {/* ================= BEST SELLERS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl tracking-wide uppercase font-light">
            Best Sellers
          </h2>

          <Link to="/shop" className="text-sm text-gray-500 hover:text-black">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ================= SHOP BY COLLECTION ================= */}
      <section className="border-t py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-light tracking-wide uppercase mb-8">
            Shop By Collection
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Straight', texture: 'Straight' },
              { label: 'Deep Wave', texture: 'Deep Wave' },
              { label: 'Curly', texture: 'Kinky Curl' }
            ].map(({ label, texture }) => (
              <Link
                key={label}
                to={`/shop?texture=${encodeURIComponent(texture)}`}
                className="relative h-64 border overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gray-100 group-hover:bg-gray-200 transition" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl tracking-wide font-light">
                    {label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
