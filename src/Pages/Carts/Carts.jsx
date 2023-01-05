import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQntAction,
  checkProduct,
  deleteProductAction,
  getOrderApiAction,
  submitOrderAction,
} from "../../redux/reducers/cartReducer";

export default function Carts() {
  const { cart } = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

  const handleCheckProduct = (productId) => {
    dispatch(checkProduct(productId));
  };

  const handleChangeQnt = (prodId, increOrDecre) => {
    dispatch(changeQntAction({ prodId, increOrDecre }));
  };

  const handleDelProduct = (prodId) => {
    dispatch(deleteProductAction(prodId));
  };

  const handleSubmitOrder = () => {
    dispatch(submitOrderAction());
  };

  const renderCartTbl = () => {

    return cart.map((prod, index) => {
      return (
        <tr key={index}>
          <td>
            <input
              type="checkbox"
              checked={prod.isChecked ? true : false}
              onChange={() => handleCheckProduct(prod.id)}
            />
          </td>
          <td>{prod.id}</td>
          <td>
            <img src={prod.image} alt={prod.name} />
          </td>
          <td>{prod.name}</td>
          <td>{prod.price}$</td>
          <td>
            <button onClick={() => handleChangeQnt(prod.id, false)}>-</button>
            <span>{prod.quantity}</span>
            <button onClick={() => handleChangeQnt(prod.id, true)}>+</button>
          </td>
          <td>{(prod.price * prod.quantity).toLocaleString()}$</td>
          <td>
            <button className="btnEdit">EDIT</button>
            <button
              className="btnDelete"
              onClick={() => handleDelProduct(prod.id)}
            >
              DELETE
            </button>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    dispatch(getOrderApiAction());
  }, []);

  return (
    <div className="carts">
      <h2>Carts</h2>
      <hr />
      <table className="table table-borderless carts__content">
        <thead>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>id</td>
            <td>img</td>
            <td>name</td>
            <td>price</td>
            <td>quantity</td>
            <td>total</td>
            <td>action</td>
          </tr>
        </thead>
        <tbody>{renderCartTbl()}</tbody>
        <tfoot>
          <tr>
            <td colSpan={7}></td>
            <td>
              <button
                className="btnSubmitOrder"
                onClick={() => handleSubmitOrder()}
              >
                SUBMIT ORDER
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>


    
  );
}