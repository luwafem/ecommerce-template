import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

/* ---------------------------------
   Currency formatter (NGN)
---------------------------------- */
const formatPrice = (price) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(price || 0);

/* ---------------------------------
   SALE HELPERS
---------------------------------- */
const isSaleActive = (sale) => {
  if (!sale?.enabled) return false;

  const now = new Date();
  const start = sale.startDate ? new Date(sale.startDate) : null;
  const end = sale.endDate ? new Date(sale.endDate) : null;

  if (start && now < start) return false;
  if (end && now > end) return false;

  return true;
};

const getDiscountedPrice = (price, discount) => {
  return price - price * (discount / 100);
};

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const {
    basePrice,
    stock,
    lowStockThreshold,
    sale,
    attributes,
  } = product;

  const availableLengths = attributes?.availableLengths || [];
  const availableDensities = attributes?.availableDensities || [];

  const defaultLength = availableLengths[0];
  const defaultDensity = availableDensities[0];

  /* ---------------------------------
     PRICE CALCULATION
  ---------------------------------- */
  const saleActive = isSaleActive(sale);
  const finalPrice = saleActive
    ? getDiscountedPrice(basePrice, sale.discountValue)
    : basePrice;

  /* ---------------------------------
     STOCK STATES
  ---------------------------------- */
  const isOutOfStock = stock <= 0;
  const isLowStock =
    stock > 0 && stock <= (lowStockThreshold || 5);

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    addItem(
      product,
      defaultLength,
      defaultDensity,
      finalPrice,
      1
    );
  };

  return (
    <div className="group border border-gray-200 bg-white overflow-hidden hover:border-gray-400 transition relative">
      {/* ---------------- IMAGE ---------------- */}
      <Link to={`/product/${product.slug}`} className="block relative">
        {/* SALE BADGE */}
        {saleActive && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 z-10">
            {sale.label || `${sale.discountValue}% OFF`}
          </span>
        )}

        {/* BEST SELLER BADGE */}
        {product.tags?.includes("Best Seller") && (
          <span className="absolute top-3 right-3 bg-black text-white text-xs px-2 py-1 z-10">
            Best Seller
          </span>
        )}

        {/* OUT OF STOCK OVERLAY */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20">
            <span className="text-sm font-medium text-gray-700">
              Out of Stock
            </span>
          </div>
        )}

        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
      </Link>

      {/* ---------------- INFO ---------------- */}
      <div className="p-4 text-center">
        <Link
          to={`/product/${product.slug}`}
          className="block text-sm font-medium text-gray-900 hover:text-black"
        >
          {product.name}
        </Link>

        {/* PRICE */}
        <div className="mt-2">
          {saleActive ? (
            <div className="flex justify-center items-center gap-2">
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(basePrice)}
              </span>
              <span className="text-sm font-semibold text-red-600">
                {formatPrice(finalPrice)}
              </span>
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              {formatPrice(basePrice)}
            </p>
          )}
        </div>

        {/* LOW STOCK WARNING */}
        {isLowStock && !isOutOfStock && (
          <p className="mt-1 text-xs text-orange-600">
            Only {stock} left in stock
          </p>
        )}

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`mt-4 w-full text-xs tracking-wide py-2 transition
            ${
              isOutOfStock
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "border border-black text-black opacity-0 group-hover:opacity-100 hover:bg-black hover:text-white"
            }
          `}
        >
          {isOutOfStock ? "OUT OF STOCK" : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
