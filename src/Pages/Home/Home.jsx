import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Product from '../../Components/Product/product'
import { getProductApi } from '../../redux/reducers/productReducer';
import Carousel_Home from './Carousel_Home';
export default function Home() {


  //Lấy dữ liệu từ redux
  const { arrProduct } = useSelector(state => state.productReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getProductApi();
    dispatch(action);
  }, []);
  console.log(arrProduct)
  return (
    
    <div className='container'>
      <div className='ProductFeature'>
        <div className='ProductText'>
          <h3>Product Feature</h3>
        </div>
      </div>
      <div className='row ProductList'>
        {arrProduct?.map((prod, index) => {
          if (index <= 5) {
            return <div className='col-4 m-0 mt-2' key={prod.id}>
              <Product product={prod} />
            </div>
          }
        })}
      </div>
    </div>
  )
}