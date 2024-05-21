/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext"
import { useParams } from "react-router-dom"
import ProductDescription from "../Components/ProductDescription";
import ProductDisplay from "../Components/ProductDisplay";
import ProductHd from "../Components/ProductHd";
import RelatedProducts from "../Components/RelatedProducts";


const Product = () => {

  const {all_products} = useContext(ShopContext);
  const {productId } = useParams();
  const product = all_products.find((e) => e.id === Number(productId));

  if(!product) {
    return <div>Product not found!</div>
  }
  return (
    <>
      <section className="max-padd-container">
        <div className="max-padd-container bg-primary rounded-3xl py-20">
          <ProductHd product={product}/>
          <ProductDisplay product={product}/>
          <ProductDescription/>
          <RelatedProducts/>
        </div>
      </section>
    </>
  );
};

export default Product;
