import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Product({ product }) {
  const navigate = useNavigate();

  return (
    <div style={{ marginBottom: '20px' }} className="product-card">
      <div className="product-card__img">
        <img src={product.image} alt="..." />
      </div>
      <div className="product-card__body">
        <NavLink to={`/detail/${product.id}`}>
          <h3>
            {product.name.length > 21
              ? product.name.slice(0, 21) + "..."
              : product.name}
          </h3>
        </NavLink>
        <div className="product-description">
          <p>
            {product.shortDescription.length > 50
              ? product.shortDescription.slice(0, 50) + "..."
              : product.shortDescription}
          </p>
        </div>
      </div>
      <div className="product-card__footer">
        <button
          className="btnBuyNow"
          onClick={() => {
            navigate(`/detail/${product.id}`);
            document.documentElement.scrollTop = 0;
          }}
        >
          Buy now
        </button>
        <div className="product-price">
          <p>{product.price}$</p>
        </div>
      </div>
    </div>
  );
}