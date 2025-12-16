import React, { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { checkoutContent } from '../data';

// ⚠️ Replace with your real Paystack public key
const PAYSTACK_PUBLIC_KEY = 'pk_test_XXXXXXXXXXXXXXXXXXXXXXXXX';

// Currency formatter
const formatPrice = (price) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(price || 0);

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [processing, setProcessing] = useState(false);

  /* =====================
     PRICING
  ===================== */
  const SHIPPING_FEE = checkoutContent.shippingFee || 0;
  const subTotal = getCartTotal();
  const grandTotal = subTotal + SHIPPING_FEE;
  const amountInKobo = Math.round(grandTotal * 100);

  /* =====================
     SAVINGS
  ===================== */
  const totalSavings = cartItems.reduce((sum, item) => {
    if (!item.discountPercent) return sum;
    return (
      sum +
      (item.originalPrice - item.price) * item.quantity
    );
  }, 0);

  /* =====================
     PAYSTACK CONFIG
  ===================== */
  const config = {
    reference: `TX-${Date.now()}`,
    email: customerEmail,
    amount: amountInKobo,
    publicKey: PAYSTACK_PUBLIC_KEY,
    currency: 'NGN',
  };

  const initializePayment = usePaystackPayment(config);

  /* =====================
     VERIFY TRANSACTION
  ===================== */
  const verifyTransaction = async (reference) => {
    try {
      setProcessing(true);

      const response = await fetch(
        '/.netlify/functions/verify-payment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reference,
            amount: grandTotal,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        clearCart();
        navigate('/order-success');
      } else {
        alert(
          `Payment verification failed. Reference: ${reference}`
        );
      }
    } catch (error) {
      console.error(error);
      alert(
        'An error occurred while processing your order.'
      );
    } finally {
      setProcessing(false);
    }
  };

  const onPaystackSuccess = (response) => {
    verifyTransaction(response.reference);
  };

  const onPaystackClose = () => {
    setProcessing(false);
  };

  const canProceed =
    cartItems.length > 0 &&
    customerEmail.trim() &&
    shippingAddress.trim();

  /* =====================
     EMPTY CART
  ===================== */
  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto mt-20 bg-white border border-gray-200 rounded-md p-8 text-center">
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
          Your cart is currently empty
        </h2>
        <Link
          to="/shop"
          className="inline-block mt-4 px-6 py-3 bg-black text-white text-sm tracking-wide"
        >
          Return to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-light tracking-wide mb-8">
        CHECKOUT
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* =====================
            BILLING / SHIPPING
        ===================== */}
        <section className="lg:col-span-2 bg-white border border-gray-200 rounded-md p-6">
          <h2 className="text-xl font-medium mb-6">
            Billing & Shipping Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">
                Email address *
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) =>
                  setCustomerEmail(e.target.value)
                }
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">
                Shipping address *
              </label>
              <textarea
                rows="4"
                value={shippingAddress}
                onChange={(e) =>
                  setShippingAddress(e.target.value)
                }
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </section>

        {/* =====================
            ORDER SUMMARY
        ===================== */}
        <aside className="bg-white border border-gray-200 rounded-md p-6 h-fit">
          <h2 className="text-xl font-medium mb-4">
            Your Order
          </h2>

          {/* ITEMS */}
          <div className="space-y-3 text-sm mb-4">
            {cartItems.map((item) => (
              <div
                key={item.variantId || item.id}
                className="flex justify-between"
              >
                <span className="text-gray-600">
                  {item.name} × {item.quantity}
                </span>
                <span>
                  {formatPrice(
                    item.price * item.quantity
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* TOTALS */}
          <div className="space-y-3 text-sm border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subTotal)}</span>
            </div>

            {totalSavings > 0 && (
              <div className="flex justify-between text-green-600">
                <span>You saved</span>
                <span>
                  -{formatPrice(totalSavings)}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{formatPrice(SHIPPING_FEE)}</span>
            </div>

            <div className="flex justify-between text-base font-semibold border-t pt-3">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="mt-6 border-t pt-4 text-center">
            <img
              src="/images/paystack-logo.png"
              alt="Paystack"
              className="h-6 mx-auto mb-2"
            />
            <p className="text-xs text-gray-500">
              Secure payment via Paystack
            </p>
          </div>

          <button
            disabled={!canProceed || processing}
            onClick={() =>
              initializePayment(
                onPaystackSuccess,
                onPaystackClose
              )
            }
            className={`w-full mt-6 py-3 rounded-md text-sm tracking-wide transition ${
              canProceed && !processing
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {processing
              ? 'Processing...'
              : 'PLACE ORDER'}
          </button>

          {!canProceed && (
            <p className="mt-4 text-xs text-red-500 text-center">
              Please fill in all required fields.
            </p>
          )}
        </aside>
      </div>

      <p className="mt-10 text-center text-xs text-gray-500">
        All transactions are secure and encrypted.
      </p>
    </div>
  );
};

export default CheckoutPage;
