import React, { useState, useEffect } from "react";
import Tag from "./TextFormat.jsx";
import { useParams } from "react-router-dom";
import { FetchSingleFood, AddToCart } from "../ServerAPI.js";
import TopPart from "./TopPart.jsx";
const ProductDetails = () => {
  const { id } = useParams();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const [toppingInput, setToppingInput] = useState("");
  const [toppingsList, setToppingsList] = useState([]);

  const [avoidInput, setAvoidInput] = useState("");
  const [avoidList, setAvoidList] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function loadFood() {
      setLoading(true);
      const data = await FetchSingleFood(id);
      setFood(data);
      setLoading(false);
    }
    loadFood();
  }, [id]);

  const handleToppingSubmit = (e) => {
    e.preventDefault();
    if (!toppingInput.trim()) return;
    setToppingsList((prev) => [...prev, toppingInput.trim()]);
    setToppingInput("");
  };

  const handleAvoidSubmit = (e) => {
    e.preventDefault();
    if (!avoidInput.trim()) return;
    setAvoidList((prev) => [...prev, avoidInput.trim()]);
    setAvoidInput("");
  };

  const removeTopping = (idx) =>
    setToppingsList((prev) => prev.filter((_, i) => i !== idx));

  const removeAvoid = (idx) =>
    setAvoidList((prev) => prev.filter((_, i) => i !== idx));

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const onQuantityChange = (e) => {
    const v = parseInt(e.target.value, 10);
    setQuantity(!v || v < 1 ? 1 : v);
  };

  if (loading) {
    return <p className="text-center mt-8 text-gray-600">Loading food...</p>;
  }

  if (!food) {
    return <p className="text-center mt-8 text-red-500">Food not found.</p>;
  }

  return (
    <>
      <TopPart />
      <div className="max-w-8xl p-8 md:px-40 ">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-96 h-64 bg-gray-200 border border-gray-300 rounded flex items-center justify-center text-gray-700">
            <img
              src={food.image}
              alt={food.title}
              className="w-full h-full object-cover rounded"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>

          <div className="flex-1">
            <Tag as="h1" size="xl" className="mb-2 text-red-500 font-bold">
              {food.title}
            </Tag>
            <Tag as="p" className=" text-lg lg:text-md font-bold">
              Available at:{" "}
              {food.restaurantChain || "No description available."} Restaurant
            </Tag>
            <Tag as="p" size="lg" className="mb-4">
              $
              {food.price
                ? Number(food.price).toFixed(2)
                : `${(food.id % 20) + 10}.99`}
            </Tag>

            <div className="mb-4">
              <label className="text-sm text-gray-700  font-bold block mb-2">
                Quantity
              </label>
              <div className="inline-flex items-center space-x-2">
                <button
                  type="button"
                  onClick={decrement}
                  className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-lg"
                >
                  -
                </button>

                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={onQuantityChange}
                  className="w-16 text-center p-1 border rounded"
                />

                <button
                  type="button"
                  onClick={increment}
                  className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          disabled={adding}
          onClick={async () => {
            setAdding(true);
            try {
              await AddToCart(Number(id), quantity);
            } finally {
              setAdding(false);
            }
          }}
          className="mt-2 inline-flex items-center justify-center px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-semibold shadow-sm hover:from-red-600 hover:to-rose-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {adding ? "Adding..." : "Add to cart"}
        </button>
        <section className="mt-8">
          <Tag as="p" size="sm" className="mb-2">
            Ingredients
          </Tag>

          <ul className="list-disc list-inside ml-4">
            {food.ingredients?.length ? (
              food.ingredients.map((i, index) => <li key={index}>{i.name}</li>)
            ) : (
              <li>No ingredients provided</li>
            )}
          </ul>
        </section>

        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Tag as="p" size="sm" className="mb-3">
              Toppings
            </Tag>

            <form
              onSubmit={handleToppingSubmit}
              className="bg-white p-4 text-black rounded-2xl border border-red-500 flex flex-col gap-3"
            >
              <label className="text-sm text-gray-700">Add a topping</label>
              <input
                type="text"
                placeholder="Item to add"
                value={toppingInput}
                onChange={(e) => setToppingInput(e.target.value)}
                className="p-2 border rounded"
              />

              <div className="flex gap-2">
                <button className="bg-red-500 h-8 text-white px-4 rounded">
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setToppingInput("")}
                  className="bg-gray-200 h-8 px-4 rounded"
                >
                  Clear
                </button>
              </div>
            </form>
            <div className="bg-white p-4 text-black mt-4 rounded-2xl border border-red-500">
              <p className="text-sm text-gray-700 mb-3">Added Toppings</p>

              {toppingsList.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {toppingsList.map((t, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between bg-gray-100 text-black p-2 rounded"
                    >
                      <span>{t}</span>
                      <button
                        onClick={() => removeTopping(i)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <Tag as="p" size="sm" className="mb-3">
              Avoid / Allergies
            </Tag>

            <form
              onSubmit={handleAvoidSubmit}
              className="bg-white p-4 text-black rounded-2xl border border-red-500 flex flex-col gap-3"
            >
              <label className="text-sm text-gray-700">
                Avoid or Allergies
              </label>
              <input
                type="text"
                placeholder="Items to avoid"
                value={avoidInput}
                onChange={(e) => setAvoidInput(e.target.value)}
                className="p-2 border rounded"
              />

              <div className="flex gap-2">
                <button className="bg-red-500 h-8 text-white px-4 rounded">
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setAvoidInput("")}
                  className="bg-gray-200 h-8 px-4 rounded"
                >
                  Clear
                </button>
              </div>
            </form>
            <div className="bg-white p-4 text-black mt-4 rounded-2xl border border-red-500">
              <p className="text-sm text-gray-700 mb-3">Things to avoid</p>

              {avoidList.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {avoidList.map((a, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between bg-gray-100 text-black p-2 rounded"
                    >
                      <span>{a}</span>
                      <button
                        onClick={() => removeAvoid(i)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductDetails;
