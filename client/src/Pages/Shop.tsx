import { useState, useEffect } from "react";
import { TbCampfire } from "react-icons/tb";
import { Link } from "react-router-dom";
import { ShopItem } from "../hooks/useShopLogic";

import bannerImage from "../assets/banner-background.jpg";

interface ShopProps {
  addToKit: (product: ShopItem) => void;
  toggleCampfire: (product: ShopItem) => void;
  campfireList: ShopItem[];
}

const Shop = ({ addToKit, toggleCampfire, campfireList = [] }: ShopProps) => {
  const [products, setProducts] = useState<ShopItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/items");
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to sync with basecamp inventory:", error);
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const categories = ["All", ...new Set(products.map((item) => item.category))];

  const filteredProducts = products
    .filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "low-high") return a.price - b.price;
      if (sortOrder === "high-low") return b.price - a.price;
      return 0;
    });

  if (isLoading) {
    return (
      <div className="overflow-x-hidden bg-[#183855] pb-20">
        <div
          className="w-full h-[250px] md:h-[350px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bannerImage})` }}
        >
          <div className="bg-brandOrange py-5 px-12 md:py-6 md:px-20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] [clip-path:polygon(15%_0%,85%_0%,100%_100%,0%_100%)]">
            <h1 className="text-[#183855] text-2xl md:text-3xl font-bold m-0 text-center uppercase tracking-wider">
              Field Equipment
            </h1>
          </div>
        </div>
        <div className="text-center p-[100px]">
          <h2 className="text-white text-2xl font-bold">
            Syncing with Basecamp Vault...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden bg-[#183855] pb-20">
      {/* --- BANNER --- */}
      <div
        className="w-full h-[250px] md:h-[350px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="bg-brandOrange py-5 px-12 md:py-6 md:px-20 shadow-[0_10px_25px_rgba(0,0,0,0.2)] [clip-path:polygon(15%_0%,85%_0%,100%_100%,0%_100%)]">
          <h1 className="text-[#183855] text-2xl md:text-3xl font-bold m-0 text-center uppercase tracking-wider">
            Field Equipment
          </h1>
        </div>
      </div>

      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col items-center gap-5 mt-[30px] px-5 w-full box-border">
        {/* Categories (Inverted for Dark Background) */}
        <div className="flex flex-wrap gap-[10px] justify-center">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 border-2 rounded-full font-semibold cursor-pointer transition-all duration-300 ${
                activeCategory === category
                  ? "bg-brandOrange border-brandOrange text-[#183855]"
                  : "bg-transparent border-white text-white hover:bg-white hover:text-[#183855]"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search & Sort Row */}
        <div className="flex flex-col sm:flex-row gap-[15px] w-full max-w-[600px] justify-center">
          <input
            type="text"
            placeholder="Search field equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 w-full min-h-[52px] py-3 px-5 border-2 border-transparent rounded-lg text-[1rem] outline-none bg-white text-[#183855] transition-all duration-300 focus:border-brandOrange focus:shadow-[0_0_0_3px_rgba(250,187,5,0.2)]"
          />

          <div className="relative flex-1 min-h-[52px]">
            <div
              className="flex justify-between items-center cursor-pointer select-none bg-white h-full w-full py-3 px-5 border-2 border-transparent rounded-lg text-[1rem] text-[#183855] transition-all duration-300 hover:border-brandOrange"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {sortOrder === "default"
                  ? "Sort by Price..."
                  : sortOrder === "low-high"
                    ? "Price: Low to High"
                    : "Price: High to Low"}
              </span>
              <span className="text-[0.8rem] text-[#183855]">▼</span>
            </div>

            {isDropdownOpen && (
              <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border-2 border-gray-200 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.2)] z-50 overflow-hidden">
                <div
                  className="px-5 py-3 cursor-pointer text-[#183855] bg-white font-medium transition-colors duration-200 hover:bg-[#183855] hover:text-brandOrange"
                  onClick={() => {
                    setSortOrder("default");
                    setIsDropdownOpen(false);
                  }}
                >
                  Default Sorting
                </div>
                <div
                  className="px-5 py-3 cursor-pointer text-[#183855] bg-white font-medium transition-colors duration-200 hover:bg-[#183855] hover:text-brandOrange"
                  onClick={() => {
                    setSortOrder("low-high");
                    setIsDropdownOpen(false);
                  }}
                >
                  Price: Low to High
                </div>
                <div
                  className="px-5 py-3 cursor-pointer text-[#183855] bg-white font-medium transition-colors duration-200 hover:bg-[#183855] hover:text-brandOrange"
                  onClick={() => {
                    setSortOrder("high-low");
                    setIsDropdownOpen(false);
                  }}
                >
                  Price: High to Low
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- SHOP GRID --- */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[30px] max-w-[1200px] mx-auto my-[40px] px-5">
        {filteredProducts.map((item) => {
          const isLit = campfireList.some(
            (savedItem) => savedItem.id === item.id,
          );

          return (
            <div
              key={item.id}
              className="bg-white border border-gray-100 p-5 rounded-xl text-center flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
            >
              <div className="flex flex-col flex-grow">
                {/* Image Link with Scarcity Anchors */}
                <Link to={`/shop/${item.id}`} className="block relative">
                  {/* Smart Scarcity Tags */}
                  {item.stock <= 5 && item.stock > 0 && (
                    <div className="absolute top-[12px] left-[12px] bg-brandOrange text-[#111] text-[0.8rem] font-bold px-[10px] py-[4px] rounded-[4px] z-10 shadow-[0_2px_5px_rgba(0,0,0,0.2)] pointer-events-none">
                      Only {item.stock} left!
                    </div>
                  )}
                  {item.stock === 0 && (
                    <div className="absolute top-[12px] left-[12px] bg-[#333] text-white text-[0.8rem] font-bold px-[10px] py-[4px] rounded-[4px] z-10 shadow-[0_2px_5px_rgba(0,0,0,0.2)] pointer-events-none">
                      Sold Out
                    </div>
                  )}

                  <img
                    src={`http://localhost:5001${item.image[0]}`}
                    alt={item.name}
                    className="w-full h-[250px] object-contain block mb-[15px]"
                  />
                </Link>

                <Link
                  to={`/shop/${item.id}`}
                  className="no-underline text-[#183855] hover:text-brandOrange transition-colors duration-200"
                >
                  <h3 className="m-0 text-[1.2rem] font-bold">{item.name}</h3>
                </Link>

                <p className="bg-brandOrange text-[#183855] px-[12px] py-[4px] rounded-full inline-block font-semibold text-[0.85rem] mx-auto my-[10px] w-fit">
                  {item.category}
                </p>
                <p className="text-brandOrange m-0 font-semibold text-[1.1rem] italic">
                  £{item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex justify-between items-stretch gap-[10px] mt-auto pt-[15px]">
                <button
                  className="flex-grow bg-[#FABB05] text-[#183855] border-none py-[10px] px-[20px] rounded-[5px] font-bold cursor-pointer transition-colors duration-200 hover:bg-opacity-80 disabled:bg-[#ccc] disabled:text-[#666] disabled:cursor-not-allowed disabled:opacity-70"
                  onClick={() => addToKit(item)}
                  disabled={item.stock === 0}
                >
                  {item.stock === 0 ? "Unavailable" : "Add to Kit"}
                </button>

                {/* Custom CSS Animation Target - LEAVE CLASSES INTACT */}
                <button
                  className={`campfire-btn ${isLit ? "lit" : ""}`}
                  onClick={() => toggleCampfire(item)}
                >
                  <TbCampfire className="flame-icon" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
