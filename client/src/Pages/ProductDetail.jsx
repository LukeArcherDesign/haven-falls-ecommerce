import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { TbCampfire } from "react-icons/tb";

const ProductDetail = ({ addToKit, toggleCampfire, campfireList = [] }) => {
  // Extract ID from web address
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if item is in campfire
  const isLit = product
    ? campfireList.some((item) => item.id === product.id)
    : false;

  // Fetch item from Express server
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/items/${id}`);
        if (!response.ok) {
          throw new Error("Item not found");
        }
        const data = await response.json();
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Could not find item data:", error);
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  // Loading Guard
  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto my-[40px] mb-[80px] px-5 text-center py-[100px]">
        <h2 className="text-[2.5rem] mb-[10px] text-brandOrange font-bold">
          Syncing with basecamp vault...
        </h2>
      </div>
    );
  }

  // No URL Match
  if (!product) {
    return (
      <div className="max-w-[1200px] mx-auto my-[40px] mb-[80px] px-5 text-center py-[100px] text-[#183855]">
        <h2 className="text-[2.5rem] mb-[10px] text-brandOrange font-bold">
          Signal Lost.
        </h2>
        <p className="text-[1.1rem] mb-[30px]">
          This equipment cannot be found in the current manifest.
        </p>
        <Link
          to="/shop"
          className="inline-block px-[35px] py-[14px] bg-[#183855] text-white no-underline rounded-[6px] font-bold transition-opacity duration-300 hover:opacity-80"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  // Render product page
  return (
    <div className="max-w-[1200px] mx-auto mt-[40px] mb-[80px] px-5 text-[#183855]">
      <Link
        to="/shop"
        className="inline-block mb-[30px] text-brandOrange no-underline font-bold text-[1.1rem] transition-opacity duration-200 hover:opacity-80"
      >
        ← Back to Field Equipment
      </Link>

      <div className="flex flex-wrap gap-[50px] items-center bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Left Side Image with Database Path */}
        <div className="flex-1 min-w-[300px] bg-[#f9f9f9] flex items-center justify-center p-[40px] box-border">
          <img
            src={`http://localhost:5001${product.image[0]}`}
            alt={product.name}
            className="w-full max-w-[500px] h-auto mx-auto rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>

        {/* Right Side Specs */}
        <div className="flex-1 min-w-[300px] px-[30px] pt-[20px] pb-[40px] md:p-[40px_40px_40px_0] flex flex-col justify-center">
          <span className="bg-brandOrange text-[#183855] px-[12px] py-[4px] rounded-full inline-block font-semibold text-[0.85rem] w-fit mb-[15px]">
            {product.category}
          </span>

          <h1 className="text-[2.5rem] m-0 mb-[15px] leading-[1.2] font-bold">
            {product.name}
          </h1>
          <p className="text-[1.8rem] font-bold text-brandOrange m-0 mb-[25px]">
            £{product.price.toFixed(2)}
          </p>

          <div className="text-[1.1rem] leading-[1.6] text-[#555] mb-[40px] pt-[25px] border-t-[2px] border-t-[#eee]">
            <p className="m-0">{product.description}</p>
          </div>

          <div className="flex items-stretch gap-[10px] mt-auto">
            {/* Stock check */}
            <button
              className="flex-grow bg-[#FABB05] text-[#183855] border-none py-[15px] px-[20px] rounded-[6px] font-bold text-[1.2rem] cursor-pointer transition-colors duration-200 hover:bg-opacity-80 disabled:bg-[#ccc] disabled:text-[#666] disabled:cursor-not-allowed disabled:opacity-70"
              onClick={() => addToKit(product)}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Unavailable" : "Add to Kit"}
            </button>

            <button
              className={`campfire-btn ${isLit ? "lit" : ""}`}
              onClick={() => toggleCampfire(product)}
            >
              <TbCampfire className="flame-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
