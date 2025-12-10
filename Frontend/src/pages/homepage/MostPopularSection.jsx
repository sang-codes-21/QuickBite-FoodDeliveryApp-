import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddToCart, AddToFav } from "../../ServerAPI.js";
import TextFormat from "../../components/TextFormat.jsx";
import toast from "react-hot-toast";
const MostPopularSection = ({ foods, selectedCuisine, setCartCount }) => {
  const navigate = useNavigate();
  const [addingToCartId, setAddingToCartId] = useState(null);
  const [addingToFavId, setAddingToFavId] = useState(null);

  if (!foods || foods.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-8">
        No {selectedCuisine} items found. Try a different cuisine!
      </p>
    );
  }
  return (
    <div>
      <TextFormat
        as="h1"
        className="mt-10 text-lg md:text-xl text-gray-900 font-semibold"
      >
        {selectedCuisine === "All"
          ? "Most Popular Dishes"
          : `Most Popular ${selectedCuisine}`}
      </TextFormat>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5 px-1 md:px-2">
        {foods.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/product/${item.id}`)}
            className="w-[190px] md:w-[200px] rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:border-red-200 transition flex flex-col"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 md:h-[150px] object-cover mb-1"
            />

            <div className="p-4 flex-1 flex flex-col justify-between">
              <TextFormat
                as="p"
                size="sm"
                className="mb-1 mt-1 text-left w-full text-gray-800 font-semibold line-clamp-3"
              >
                {item.title}
              </TextFormat>

              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-bold text-gray-900">${item.price}</p>
                {/* Add to Cart Button */}
                <button
                  onClick={async (event) => {
                    event.stopPropagation();
                    if (addingToCartId) return;
                    setAddingToCartId(item.id);
                    try {
                      await AddToCart(item.id, 1);
                      toast.success("Added to cart!");
                      setCartCount((prev) => prev + 1);
                    } catch (err) {
                      toast.error("Failed to add item!");
                    } finally {
                      setAddingToCartId(null);
                    }
                  }}
                  disabled={addingToCartId === item.id}
                  className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:from-red-600 hover:to-rose-600 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  Add
                </button>

                {/* Add to Favorites Button */}
                <button
                  onClick={async (event) => {
                    event.stopPropagation();
                    if (addingToFavId) return;
                    setAddingToFavId(item.id);
                    try {
                      await AddToFav(item.id);
                      toast.success("Added to favorites!");
                    } catch (err) {
                      toast.error("Failed to add to favorites!");
                    } finally {
                      setAddingToFavId(null);
                    }
                  }}
                  disabled={addingToFavId === item.id}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold hover:bg-gray-300 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  ❤️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPopularSection;
