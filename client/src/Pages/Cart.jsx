import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

const Cart = ({ kitItems, updateQuantity, removeFromKit }) => {
  const total = kitItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeletingId(id);

    setTimeout(() => {
      removeFromKit(id);
      setDeletingId(null);
    }, 400);
  };

  return (
    <div className="cart-wrapper">
      {/* Tent Header */}
      <div className="trapeze-header">
        <h1>Your Field Kit</h1>
      </div>

      {kitItems.length === 0 ? (
        <p>Your kit is currently empty. Head to the Shop to gear up.</p>
      ) : (
        <div className="cart-content">
          {/* Itemized List */}
          <div className="cart-items-list">
            {kitItems.map((item) => (
              <div
                key={item.id}
                className={`cart-item-row ${deletingId === item.id ? "deleting" : ""}`}
              >
                {/* DATABASE SYNC */}
                <img
                  src={`http://localhost:5001${item.image[0]}`}
                  alt={item.name}
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="item-unit-price">£{item.price.toFixed(2)}</p>
                </div>

                {/* Quantity Controls */}
                <div className="cart-quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, -1)}
                    style={{
                      visibility: item.quantity > 1 ? "visible" : "hidden",
                    }} // 3. Smart hiding mechanic
                  >
                    -
                  </button>

                  <span className="qty-number">{item.quantity}</span>

                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                {/* Dynamic Item Total */}
                <div className="cart-item-total">
                  £{(item.price * item.quantity).toFixed(2)}
                </div>

                {/* 4. The Eraser Trigger Button */}
                <button
                  className="cart-delete-btn"
                  onClick={() => handleDeleteClick(item.id)} // Pointed to our delayed transition function
                  title="Remove item from kit"
                  disabled={deletingId !== null} // Locks interaction during active layout collapse
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>

          {/* Checkout Panel */}
          <div className="cart-summary">
            <h3>Deployment Summary</h3>

            {/* Itemized Receipt */}
            <div className="summary-receipt">
              {kitItems.map((item, i) => (
                <div key={i} className="receipt-line">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>£{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="summary-row total-row">
              <span>Total:</span>
              <span>£{total.toFixed(2)}</span>
            </div>

            <p className="shipping-note">
              Shipping & taxes calculated at checkout.
            </p>

            {/* Order Note */}
            <div className="order-note">
              <label>Add deployment note:</label>
              <textarea placeholder="Special instructions..."></textarea>
            </div>

            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
