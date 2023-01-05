import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getProductByKwdApiAction } from "../../redux/reducers/productReducer";
import Product from "../../Components/Product/product";
import _ from "lodash";

let timeout = null;

export default function Search() {
  const { arrProduct } = useSelector((state) => state.productReducer);

  let [searchResultSorted, setSearchResultSorted] = useState(null);

  let [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearchParams({
      keyword: e.target.value,
    });
  };

  // let arrProductSorted = null;
  const handleSortProduct = (descOrAsc) => {
    if (descOrAsc) {
      searchResultSorted = _.orderBy(arrProduct, ["price"], ["asc"]);
    } else {
      searchResultSorted = _.orderBy(arrProduct, ["price"], ["desc"]);
    }
    setSearchResultSorted([...searchResultSorted]);
  };

  const renderSearchResult = (productArray) => {
    return productArray?.map((product) => (
      <div className="col-4 search-result__product" key={product.id}>
        <Product product={product} />
      </div>
    ));
  };

  const getProductByKwdApi = (keyword) => {
    dispatch(getProductByKwdApiAction(keyword));
  };

  useEffect(() => {
    timeout = setTimeout(() => {
      getProductByKwdApi(searchParams.get("keyword"));
    }, 1000);
    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [searchParams.get("keyword")]);

  return (
    <div className="search">
      <form
        className="search-bar"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <p>Search</p>
        <input placeholder="Product name..." onChange={handleChange} />
        <button className="btnSearch" type="submit">
          Search
        </button>
      </form>
      <div className="search-title">
        <h3 className="search-title__text">Search result</h3>
        <div className="search-title__bg"></div>
      </div>
      <div className="search-result">
        <p>Price</p>
        <div className="filter filter__decre">
          <label htmlFor="desc">Descending</label>
          <div className="checkbox__container decre">
            <input
              type="radio"
              id="desc"
              name="sort"
              onClick={() => handleSortProduct(false)}
            />
          </div>
        </div>
        <div className="filter filter__incre">
          <label htmlFor="asc">Ascending</label>
          <div className="checkbox__container incre">
            <input
              type="radio"
              id="asc"
              name="sort"
              onClick={() => handleSortProduct(true)}
            />
          </div>
        </div>
        <div className="search-result__products row">
          {searchResultSorted === null
            ? renderSearchResult(arrProduct)
            : renderSearchResult(searchResultSorted)}
        </div>
      </div>
    </div>
  );
}