import React from "react";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../../redux/reducers/cartReducer";
import { changeProductQntAction } from "../../redux/reducers/productReducer";

export default function ProductDetail({ productDetail }) {
  const dispatch = useDispatch();
  const handleChangeQnt = (prodId, increOrDecre) => {
    const action = changeProductQntAction({ prodId, increOrDecre });
    dispatch(action);
  };
  let currentQuantity = 1;
  const handleAddToCart = (product) => {
    const action = addToCartAction(product);
    dispatch(action);
  };

  return (
    <div className="row product-detail">
      <div className="col-4 product-detail__img">
        <img src={productDetail.image} alt={productDetail.alias} />
      </div>
      <div className="col-7 product-detail__info">
        <h3>{productDetail.name}</h3>
        <p>{productDetail.description}</p>
        <div className="shoes-sizes">
          <p>Available size</p>
          <div className="shoes-sizes__blocks">
            {productDetail.size?.map((size, index) => {
              return (
                <span className="shoes-sizes__block" key={index}>
                  {size}
                </span>
              );
            })}
          </div>
        </div>
        <p className="shoes-price">{productDetail.price}$</p>
        <div className="shoes-quantity">
          <button onClick={() => { handleChangeQnt(productDetail.id, false) }}>
            -
          </button>
          <span className="mx-3">{productDetail.quantity}</span>
          <button onClick={() => { handleChangeQnt(productDetail.id, true) }}>
            +
          </button>
        </div>
        <button
          className="addToCart"
          onClick={() => handleAddToCart(productDetail)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
