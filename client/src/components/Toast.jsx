import React from "react";
import { useNavigate } from "react-router-dom";

const Toast = ({ product }) => {
  const navigate = useNavigate();

  if (!product) return null;

  return (
    <div 
      className="toast-container" 
      onClick={() => navigate("/cart")}
      style={{ cursor: "pointer" }}
    >
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