import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { http } from "../../util/config";
const initialState = {
  arrProduct: [],
  productDetail: {},
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    setArrProductAction: (state, action) => {
      state.arrProduct = action.payload;
    },
    setProductDetailAction: (state, action) => {
      state.productDetail = action.payload;
    },
    changeProductQntAction: (state, action) => {
      const { prodId, increOrDecre } = action.payload;
      if (prodId === state.productDetail.id) {
        if (increOrDecre) {
          state.productDetail.quantity += 1;
        } else {
          state.productDetail.quantity -= 1;
        }
      }
    },
    getProductByKwdAction: (state, action) => {
      state.arrProduct = action.payload;
    },
  },
});

export const {
  setArrProductAction,
  setProductDetailAction,
  getProductByKwdAction,
  changeProductQntAction,
} = productReducer.actions;

export default productReducer.reducer;

// ------------ action thunk (api) ----------------

export const getProductApi = () => {
  return async (dispatch) => {
    try {
      //call api
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Product",
        method: "GET",
      });
      //Lấy dữ liệu về đưa lên redux
      const action = setArrProductAction(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProductDetailApiAction = (productId) => {
  return async (dispatch) => {
    // call api
    try {
      const result = await axios({
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${productId}`,
        method: "GET",
      });

      const action = setProductDetailAction(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProductByKwdApiAction = (keyword) => {
  return async (dispatch) => {
    // call api
    try {
      const result = await axios({
        url: `https://shop.cyberlearn.vn/api/Product?keyword=${keyword}`,
        method: "GET",
      });

      const action = getProductByKwdAction(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
