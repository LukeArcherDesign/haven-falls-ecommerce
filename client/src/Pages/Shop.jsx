import React, { useState, useEffect } from "react";
import { TbCampfire } from "react-icons/tb";
import { Link } from "react-router-dom";

import bannerImage from "../assets/banner-background.jpg";

const Shop = ({ addToKit, toggleCampfire, campfireList = [] }) => {
  const [products, setProducts] = useState([]);
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
      <div className="shop-wrapper">
        <div
          className="image-banner-wrapper"
          style={{ backgroundImage: `url(${bannerImage})` }}
        >
          <div className="trapeze-header">
            <h1>Field Equipment</h1>
          </div>
        </div>
        <div
          className="shop-grid"
          style={{ textAlign: "center", padding: "100px" }}
        >
          <h2>Syncing with Basecamp Vault...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-wrapper">
      <div
        className="image-banner-wrapper"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="trapeze-header">
          <h1>Field Equipment</h1>
        </div>
      </div>

      <div className="shop-control-panel">
        <div className="category-filters">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`category-pill ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="search-and-sort-row">
          <input
            type="text"
            placeholder="Search field equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <div className="custom-dropdown-container">
            <div
              className="search-input dropdown-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {sortOrder === "default"
                  ? "Sort by Price..."
                  : sortOrder === "low-high"
                    ? "Price: Low to High"
                    : "Price: High to Low"}
              </span>
              <span className="dropdown-arrow">▼</span>
            </div>

            {isDropdownOpen && (
              <div className="custom-dropdown-menu">
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setSortOrder("default");
                    setIsDropdownOpen(false);
                  }}
                >
                  Default Sorting
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setSortOrder("low-high");
                    setIsDropdownOpen(false);
                  }}
                >
                  Price: Low to High
                </div>
                <div
                  className="dropdown-option"
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

      <div className="shop-grid">
        {filteredProducts.map((item) => {
          const isLit = campfireList.some(
            (savedItem) => savedItem.id === item.id,
          );

          return (
            <div key={item.id} className="shop-item-card">
              <div className="item-main-content">
                {/* Image Link with Scarcity Anchors */}
                <Link to={`/shop/${item.id}`} className="product-portal-link">
                  {/* Smart Scarcity Tags */}
                  {item.stock <= 5 && item.stock > 0 && (
                    <div className="scarcity-tag">Only {item.stock} left!</div>
                  )}
                  {item.stock === 0 && (
                    <div className="scarcity-tag sold-out">Sold Out</div>
                  )}

                  <img
                    src={`http://localhost:5001${item.image[0]}`}
                    alt={item.name}
                  />
                </Link>

                <Link to={`/shop/${item.id}`} className="product-portal-link">
                  <h3>{item.name}</h3>
                </Link>

                <p className="item-category">{item.category}</p>
                <p className="item-price">£{item.price.toFixed(2)}</p>
              </div>

              <div className="item-action-row">
                <button
                  className="add-to-kit-btn"
                  onClick={() => addToKit(item)}
                  disabled={item.stock === 0} // Hardware lock to prevent ghost orders
                >
                  {item.stock === 0 ? "Unavailable" : "Add to Kit"}
                </button>
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
