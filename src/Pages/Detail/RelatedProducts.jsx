import React from "react";
import Product from "../../Components/Product/product";

export default function RelatedProducts({ relatedProducts }) {
  return (
    <div className="related-products">
      <h2>- Related Products -</h2>
      <div className="row related-products__cards">
        {relatedProducts?.map((product, index) => {
          return (
            <div className="col-4" key={index}>
              <Product product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
