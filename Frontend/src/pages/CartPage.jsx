import React, { useEffect, useMemo, useState } from "react";
import Tag from "../components/TextFormat.jsx";
import TopPart from "../components/TopPart.jsx";
import {
  FetchCart,
  UpdateCartItemQuantity,
  RemoveCartItem,
} from "../ServerAPI.js";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    async function loadCart() {
      setLoading(true);
      const data = await FetchCart();
      setCartItems(data);
      setLoading(false);
    }
    loadCart();
  }, []);

  const handleQuantityChange = async (item, delta) => {
    const nextQty = Math.max(1, item.quantity + delta);
    setCartItems((prev) =>
      prev.map((c) => (c.id === item.id ? { ...c, quantity: nextQty } : c))
    );
    setUpdatingId(item.id);
    try {
      await UpdateCartItemQuantity(item.id, nextQty);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemove = async (item) => {
    setCartItems((prev) => prev.filter((c) => c.id !== item.id));
    setUpdatingId(item.id);
    try {
      await RemoveCartItem(item.id);
    } finally {
      setUpdatingId(null);
    }
  };

  const totals = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => {
        const price = item.menuItem?.price ?? 0;
        acc.items += item.quantity;
        acc.subtotal += price * item.quantity;
        return acc;
      },
      { items: 0, subtotal: 0 }
    );
  }, [cartItems]);

  return (
    <>
      <TopPart />
      <main className="px-4 md:px-8 mt-6 md:mt-10">
        <div className="max-w-4xl mx-auto">
          <Tag
            as="h1"
            className="text-xl md:text-2xl font-semibold text-gray-900 mb-4"
          >
            Your Cart
          </Tag>

          {loading ? (
            <p className="text-gray-500">Loading your cart...</p>
          ) : cartItems.length === 0 ? (
            <div className="bg-white/95 rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center gap-3">
              <div className="h-12 w-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-2xl">
                🛒
              </div>
              <Tag as="h2" className="text-lg font-semibold text-gray-900 mt-1">
                Your cart is empty
              </Tag>
              <p className="text-sm text-gray-500 max-w-sm">
                Looks like you haven&apos;t added anything yet. Browse the menu
                and add your favorite dishes to get started.
              </p>
            </div>
          ) : (
            <div className="bg-white/95 rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5 flex flex-col gap-4">
              {cartItems.map((item) => {
                const product = item.menuItem || {};
                const price = product.price ?? 0;
                const lineTotal = (price * item.quantity).toFixed(2);
                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex-shrink-0">
                        <img
                          src={
                            product.image || "https://via.placeholder.com/84"
                          }
                          alt={product.title}
                          className="h-20 w-20 md:h-24 md:w-24 rounded-xl object-cover shadow-sm"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <Tag
                          as="h2"
                          className="font-semibold text-gray-900 line-clamp-2"
                        >
                          {product.title || "Item"}
                        </Tag>
                        <Tag
                          as="p"
                          size="xs"
                          className="text-gray-600 mt-1 line-clamp-1"
                        >
                          {product.restaurantChain || "Quickbite"}
                        </Tag>
                        <Tag
                          as="p"
                          size="sm"
                          className="text-gray-900 font-semibold mt-1"
                        >
                          ${price.toFixed(2)}
                        </Tag>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
                      <div className="flex items-center self-start sm:self-auto space-x-2 bg-gray-50 rounded-full px-2 py-1">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => handleQuantityChange(item, -1)}
                          disabled={updatingId === item.id}
                          className="h-8 w-8 flex items-center justify-center bg-white rounded-full border border-gray-200 hover:bg-gray-100 disabled:opacity-50 transition"
                        >
                          −
                        </button>
                        <div className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </div>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => handleQuantityChange(item, 1)}
                          disabled={updatingId === item.id}
                          className="h-8 w-8 flex items-center justify-center bg-white rounded-full border border-gray-200 hover:bg-gray-100 disabled:opacity-50 transition"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center justify-between w-full gap-3">
                        <span className="text-sm text-gray-500">
                          Line total
                        </span>
                        <span className="text-base font-semibold text-gray-900">
                          ${lineTotal}
                        </span>
                      </div>

                      <button
                        onClick={() => handleRemove(item)}
                        disabled={updatingId === item.id}
                        className="text-xs md:text-sm px-3 py-1.5 rounded-full bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 disabled:opacity-50 transition self-start sm:self-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  Subtotal ({totals.items} item
                  {totals.items !== 1 ? "s" : ""})
                </span>
                <span className="text-base md:text-lg font-semibold text-gray-900">
                  ${totals.subtotal.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default CartPage;
