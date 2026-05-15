import React from "react";

const Toast = ({ product }) => {
  if (!product) return null;
  return (
    <div className="toast-container">
      <img 
        src={`http://localhost:5001${product.image[0]}`} 
        alt={product.name} 
        className="toast-img" 
      />
      <div className="toast-content">
        <p>Added to kit:</p>
        <p className="toast-product-name">{product.name}</p>
      </div>
    </div>
  );
};

export default Toast;