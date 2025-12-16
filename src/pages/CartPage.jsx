import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

// Currency formatter (NGN)
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(price || 0);
};

const CartPage = () => {
  const {
    cartItems,
    updateQuantity,
    removeItem,
    getCartTotal,
  } = useCart();

  /* =====================
     EMPTY CART
  ===================== */
  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-6">
        <h2 className="text-3xl font-light mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8">
          Looks like you haven’t added anything yet.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-black text-white px-8 py-3 text-sm tracking-wide"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  /* =====================
     TOTAL SAVINGS
  ===================== */
  const totalSavings = cartItems.reduce((sum, item) => {
    if (!item.discountPercent) return sum;
    return (
      sum +
      (item.originalPrice - item.price) *
        item.quantity
    );
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-light tracking-wide mb-10">
        YOUR CART
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* =====================
            LEFT — CART ITEMS
        ===================== */}
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item.variantId || item.id}
              className="border-b border-gray-200 py-6"
            >
              {/* MOBILE */}
              <div className="flex gap-4 lg:hidden">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-20 h-20 object-cover border"
                />

                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.selectedVariant?.length}"
                    {' / '}
                    {item.selectedVariant?.density}
                  </p>

                  {item.discountPercent > 0 && (
                    <span className="inline-block mt-1 text-xs text-red-600">
                      {item.discountPercent}% OFF
                    </span>
                  )}

                  <p className="mt-2 font-semibold">
                    {item.discountPercent > 0 && (
                      <span className="block text-xs text-gray-400 line-through">
                        {formatPrice(
                          item.originalPrice *
                            item.quantity
                        )}
                      </span>
                    )}
                    {formatPrice(
                      item.price * item.quantity
                    )}
                  </p>
                </div>

                <button
                  onClick={() =>
                    removeItem(
                      item.variantId || item.id
                    )
                  }
                  className="text-gray-400 hover:text-black"
                >
                  ×
                </button>
              </div>

              {/* MOBILE QTY */}
              <div className="flex justify-between items-center mt-4 lg:hidden">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.variantId ||
                          item.id,
                        Math.max(
                          1,
                          item.quantity - 1
                        )
                      )
                    }
                    className="border px-3 py-1"
                  >
                    −
                  </button>

                  <span className="w-8 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.variantId ||
                          item.id,
                        item.quantity + 1
                      )
                    }
                    className="border px-3 py-1"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() =>
                    removeItem(
                      item.variantId || item.id
                    )
                  }
                  className="text-sm text-gray-500"
                >
                  Remove
                </button>
              </div>

              {/* DESKTOP */}
              <div className="hidden lg:flex items-center">
                <button
                  onClick={() =>
                    removeItem(
                      item.variantId || item.id
                    )
                  }
                  className="text-gray-400 hover:text-black mr-4"
                >
                  ×
                </button>

                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-20 h-20 object-cover border mr-6"
                />

                <div className="flex-1">
                  <p className="font-medium">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.selectedVariant?.length}"
                    {' / '}
                    {item.selectedVariant?.density}
                  </p>

                  {item.discountPercent > 0 && (
                    <span className="inline-block mt-1 text-xs text-red-600">
                      {item.discountPercent}% OFF
                    </span>
                  )}
                </div>

                <div className="w-28 text-right text-sm">
                  {item.discountPercent > 0 && (
                    <div className="text-xs text-gray-400 line-through">
                      {formatPrice(
                        item.originalPrice
                      )}
                    </div>
                  )}
                  {formatPrice(item.price)}
                </div>

                <div className="w-28 flex justify-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.variantId ||
                          item.id,
                        Math.max(
                          1,
                          item.quantity - 1
                        )
                      )
                    }
                    className="border px-2"
                  >
                    −
                  </button>

                  <span className="w-8 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.variantId ||
                          item.id,
                        item.quantity + 1
                      )
                    }
                    className="border px-2"
                  >
                    +
                  </button>
                </div>

                <div className="w-32 text-right font-medium">
                  {item.discountPercent > 0 && (
                    <div className="text-xs text-gray-400 line-through">
                      {formatPrice(
                        item.originalPrice *
                          item.quantity
                      )}
                    </div>
                  )}
                  {formatPrice(
                    item.price * item.quantity
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* CONTINUE SHOPPING */}
          <Link
            to="/shop"
            className="inline-block mt-6 text-sm text-gray-500 hover:text-black"
          >
            ← Continue shopping
          </Link>
        </div>

        {/* =====================
            RIGHT — TOTALS
        ===================== */}
        <aside className="border p-6 h-fit">
          <h2 className="text-lg font-medium mb-6">
            CART TOTALS
          </h2>

          <div className="flex justify-between text-sm mb-4">
            <span>Subtotal</span>
            <span>
              {formatPrice(getCartTotal())}
            </span>
          </div>

          {totalSavings > 0 && (
            <div className="flex justify-between text-sm text-green-600 mb-4">
              <span>You saved</span>
              <span>
                -{formatPrice(totalSavings)}
              </span>
            </div>
          )}

          <div className="flex justify-between text-sm mb-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="flex justify-between text-lg font-semibold border-t pt-4">
            <span>Total</span>
            <span>
              {formatPrice(getCartTotal())}
            </span>
          </div>

          <Link
            to="/checkout"
            className="block text-center mt-6 bg-black text-white py-3 text-sm tracking-wide hover:bg-gray-800 transition"
          >
            PROCEED TO CHECKOUT
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
