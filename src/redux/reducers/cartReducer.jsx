import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, getStore, getStoreJson, http, saveStore, saveStoreJson, USER_LOGIN } from '../../util/config';

import { history } from "../../index";

const initialState = {
  orderDetail: {},
  cart: [],
  cartProduct: {
    id: "",
    image: "",
    name: "",
    price: "",
    quantity: 1,
    isChecked: true,
  },
  checkOutProducts: [],
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    setOrderDetailAction: (state, action) => {
      state.orderDetail = action.payload;
    },
    addToCartAction: (state, action) => {
      let index = state.cart.findIndex((prod) => prod.id === action.payload.id);
      if (index !== -1) {
        state.cart[index].quantity += action.payload.quantity;
      } else {
        let newCartProduct = {};
        for (const prop in state.cartProduct) {
          newCartProduct = {
            ...newCartProduct,
            [prop]: action.payload[prop],
            isChecked: false,
          };
        }
        state.cart.push(newCartProduct);
      }
    },
    changeQntAction: (state, action) => {
      let index = state.cart.findIndex(
        (prod) => prod.id === action.payload.prodId
      );
      if (action.payload.increOrDecre) {
        state.cart[index].quantity += 1;
      } else {
        state.cart[index].quantity -= 1;
      }
    },
    deleteProductAction: (state, action) => {
      let index = state.cart.findIndex((prod) => prod.id === action.payload);
      state.cart.splice(index, 1);
    },
    checkProduct: (state, action) => {
      let index = state.cart.findIndex((prod) => prod.id === action.payload);
      state.cart[index].isChecked = !state.cart[index].isChecked;
    },
    submitOrderAction: (state) => {
      state.checkOutProducts = state.cart.filter(
        (product) => product.isChecked === true
      );
      console.log("submitted order", state.checkOutProducts);
    },
  },
});

export const {
  setOrderDetailAction,
  addToCartAction,
  changeQntAction,
  deleteProductAction,
  checkProduct,
  submitOrderAction,
} = cartReducer.actions;

export default cartReducer.reducer;

export const getOrderApiAction = () => {
  return async (dispatch) => {
    try {
      // call api
      let result = await http.post("/api/Users/order", getStoreJson(USER_LOGIN));

      console.log("result", result.data);

      dispatch(setOrderDetailAction(result.data.content));
    } catch (err) {
      console.log(err);
      alert("Vui lòng đăng nhập để vào trang này!");
      history.push("/login");
    }
  };
};
