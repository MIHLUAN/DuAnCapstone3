import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetailApiAction } from "../../redux/reducers/productReducer";
import ProductDetail from "./ProductDetail";
import RelatedProducts from "./RelatedProducts";

export default function Detail() {
  const { productDetail } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();

  const params = useParams();

  const getProductDetailApi = () => {
    const action = getProductDetailApiAction(params.id);
    dispatch(action);
  };

  useEffect(() => {
    getProductDetailApi();
  }, [params.id]);

  return (
    <>
      <ProductDetail productDetail={productDetail} />
      <RelatedProducts relatedProducts={productDetail.relatedProducts} />
    </>
  );
}