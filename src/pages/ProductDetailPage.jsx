import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data';
import { useCart } from '../context/CartContext';
import { Helmet } from 'react-helmet-async';
import { useToast } from '../context/ToastContext';
import ProductDetailSkeleton from '../components/ProductDetailSkeleton';

/* ======================
   Helpers
====================== */

// Currency formatter (NGN)
const formatPrice = (price) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(price || 0);

const getStockLabel = (stock) => {
  if (stock <= 0) return 'Out of stock';
  if (stock <= 3) return `Only ${stock} left`;
  return 'In stock';
};

/* ======================
   Schema Markup
====================== */
const ProductSchema = ({ product, unitPrice }) => {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "sku": product.id,
    "image": product.images[0],
    "brand": {
      "@type": "Brand",
      "name": "Luxury Wigs NG"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "NGN",
      "price": unitPrice,
      "availability":
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating || 4.8,
      "reviewCount": product.reviewCount || 25
    }
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
};

/* ======================
   Component
====================== */
const ProductDetailPage = () => {
  const { slug } = useParams();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const product = useMemo(
    () => products.find((p) => p.slug === slug),
    [slug]
  );

  const [mainImage, setMainImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  /* ======================
     Price Calculation
  ====================== */
  const calculatePrice = (density) => {
    if (!product) return 0;

    const multiplier =
      product.priceMultipliers?.[density] || 1;

    const price = product.basePrice * multiplier;
    setUnitPrice(price);
    return price;
  };

  /* ======================
     Init
  ====================== */
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      if (product) {
        setMainImage(product.images[0]);

        const initialVariant = {
          length: product.attributes.availableLengths[0],
          density: product.attributes.availableDensities[0],
        };

        setSelectedVariant(initialVariant);
        calculatePrice(initialVariant.density);
        setIsLoading(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [product]);

  useEffect(() => {
    if (selectedVariant) {
      calculatePrice(selectedVariant.density);
    }
  }, [selectedVariant]);

  /* ======================
     Handlers
  ====================== */
  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    setSelectedVariant((prev) => ({
      ...prev,
      [name]: name === 'length' ? Number(value) : value,
    }));
  };

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      showToast('This product is out of stock', 'error');
      return;
    }

    if (quantity > product.stock) {
      showToast(`Only ${product.stock} item(s) available`, 'error');
      setQuantity(product.stock);
      return;
    }

    addItem(
      product,
      selectedVariant.length,
      selectedVariant.density,
      unitPrice,
      quantity
    );

    showToast(
      `${quantity} × ${product.name} added to cart`,
      'success'
    );
  };

  /* ======================
     Loading / Not Found
  ====================== */
  if (isLoading) return <ProductDetailSkeleton />;

  if (!product) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow text-center mt-20">
        <h2 className="text-3xl font-bold text-red-600">
          Product not found
        </h2>
      </div>
    );
  }

  const totalPrice = unitPrice * quantity;

  /* ======================
     SEO
  ====================== */
  const pageTitle = `${product.name} | Luxury Wigs NG`;
  const metaDescription = product.description.slice(0, 150);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      <ProductSchema product={product} unitPrice={unitPrice} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ======================
            Images
        ====================== */}
        <div>
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-[420px] object-cover border rounded-md"
          />

          <div className="flex gap-3 mt-4">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-cover border cursor-pointer ${
                  img === mainImage
                    ? 'border-black'
                    : 'border-gray-300 opacity-70'
                }`}
                alt=""
              />
            ))}
          </div>
        </div>

        {/* ======================
            Info
        ====================== */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">
            {product.name}
          </h1>

          <div className="text-2xl font-bold mb-2">
            {formatPrice(unitPrice)}
          </div>

          <p
            className={`text-sm mb-4 ${
              product.stock <= 0
                ? 'text-red-600'
                : product.stock <= 3
                ? 'text-orange-600'
                : 'text-green-600'
            }`}
          >
            {getStockLabel(product.stock)}
          </p>

          <p className="text-gray-600 mb-6">
            {product.description}
          </p>

          {/* Variants */}
          <div className="space-y-4 mb-6">
            <select
              name="length"
              value={selectedVariant.length}
              onChange={handleVariantChange}
              className="w-full border px-4 py-2"
            >
              {product.attributes.availableLengths.map((len) => (
                <option key={len} value={len}>
                  Length: {len}"
                </option>
              ))}
            </select>

            <select
              name="density"
              value={selectedVariant.density}
              onChange={handleVariantChange}
              className="w-full border px-4 py-2"
            >
              {product.attributes.availableDensities.map((den) => (
                <option key={den} value={den}>
                  Density: {den}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => {
                const val = Number(e.target.value);
                setQuantity(
                  Math.min(product.stock, Math.max(1, val))
                );
              }}
              className="w-20 border px-3 py-2 text-center"
            />

            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`px-8 py-3 font-semibold transition ${
                product.stock > 0
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.stock > 0
                ? 'ADD TO CART'
                : 'OUT OF STOCK'}
            </button>
          </div>

          <p className="text-lg font-semibold">
            Total: {formatPrice(totalPrice)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
