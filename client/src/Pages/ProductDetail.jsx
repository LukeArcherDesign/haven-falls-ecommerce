import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TbCampfire } from 'react-icons/tb';

const ProductDetail = ({ addToKit, toggleCampfire, campfireList = [] }) => {
  // Extract ID from web address
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

   // Check if item is in campfire
  const isLit = product ? campfireList.some((item) => item.id === product.id) : false;

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
      <div className="product-detail-wrapper error-state" style={{ padding: "100px", textAlign: "center" }}>
        <h2>Syncing with basecamp vault...</h2>
      </div>
    );
  }

  // No URL Match
  if (!product) {
    return (
      <div className="product-detail-wrapper error-state">
        <h2>Signal Lost.</h2>
        <p>This equipment cannot be found in the current manifest.</p>
        <Link to="/shop" className="return-btn">Return to Shop</Link>
      </div>
    );
  }

  // Render product page
  return (
    <div className="product-detail-wrapper">
      <Link to="/shop" className="back-link">← Back to Field Equipment</Link>
      
      <div className="pdp-layout">
        {/* Left Side Image with Database Path */}
        <div className="pdp-image-container">
          <img src={`http://localhost:5001${product.image[0]}`} alt={product.name} />
        </div>

        {/* Right Side Specs */}
        <div className="pdp-info-container">
          <span className="item-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="item-price">£{product.price.toFixed(2)}</p>
          
          <div className="pdp-description">
            <p>{product.description}</p>
          </div>

          <div className="product-detail-actions" style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button className="add-to-kit-btn" onClick={() => addToKit(product)}>
              Add to Kit
            </button>
            <button 
              className={`campfire-btn ${isLit ? 'lit' : ''}`}
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