import React from "react";
import { Link } from "react-router-dom";
import { TbCampfire } from "react-icons/tb";

const Campfire = ({ campfireList = [], toggleCampfire, addToKit }) => {
  return (
    <div className="campfire-wrapper">
      {/* Trapeze Header */}
      <div className="trapeze-header">
        <h1>
          <TbCampfire className="header-icon" /> Campfire
        </h1>
      </div>

      {campfireList.length === 0 ? (
        <div className="empty-campfire-state">
          <TbCampfire className="massive-icon" />
          <h2>The fire is out.</h2>
          <p>
            No items around the campfire. Select your favourite items in the
            field to see them here.
          </p>
          <Link to="/shop" className="return-btn">
            Return to Field
          </Link>
        </div>
      ) : (
        /* FIX: Changed shop-grid to campfire-grid */
        <div className="campfire-grid">
          {campfireList.map((item) => (
            <div key={item.id} className="shop-item-card">
              <div className="item-main-content">
                {/* Image Link */}
                <Link to={`/shop/${item.id}`} className="product-portal-link">
                  <img
                    src={`http://localhost:5001${item.image[0]}`}
                    alt={item.name}
                  />
                </Link>

                {/* Title */}
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
                >
                  Add to Kit
                </button>
                <button
                  className="campfire-btn lit"
                  onClick={() => toggleCampfire(item)}
                >
                  <TbCampfire className="flame-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Campfire;
