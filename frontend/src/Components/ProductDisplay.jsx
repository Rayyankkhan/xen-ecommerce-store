/* eslint-disable react/prop-types */
// import {useParams} from 'react'
import { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { ShopContext } from "../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const {addToCart} = useContext(ShopContext);

  return (
    <>
      <section className=" flex flex-col gap-8 xl:flex-row">
        {/* leftside  */}
        <div className="flex gap-x-2 xl:flex-1">
          <div className="flex flex-col gap-[7px] flex-wrap">
            <img
              src={product.image}
              alt="productImg"
              className="max-h-[99px] rounded-lg"
            />
            <img
              src={product.image}
              alt="productImg"
              className="max-h-[99px] rounded-lg"
            />
            <img
              src={product.image}
              alt="productImg"
              className="max-h-[99px] rounded-lg"
            />
            <img
              src={product.image}
              alt="productImg"
              className="max-h-[99px] rounded-lg"
            />
          </div>
          <div>
            <img src={product.image} alt="productImg" className=" rounded-xl" />
          </div>
        </div>

        {/* right column  */}
        <div className="flex-col flex xl:flex-[1.5] bg-white px-6 py-2 rounded-xl">
          <h3 className="h3 sm:line-clamp-1">{product.name}</h3>
          <div className="flex items-end gap-x-2 medium-20">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <p>(223)</p>
          </div>
          <div className="flex items-baseline gap-x-6 bold-28 sm:bold-32 mt-4">
            <div>${product.new_price}.00</div>
            <div className="bold-20 sm:bold28 line-through text-secondary">${product.old_price}.00</div>
          </div>
          <div className="">
              {/* product colors & icons buttons  */}
            <div className="flex flex-col sm:flex-row gap-x-10 gap-y-3 my-6">
              <div className="">
                <h4 className="bold-16">Select Color:</h4>
                <div className="flex gap-3 my-3">
                  <div className="ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-full bg-secondaryRed"></div>
                  <div className="ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-full bg-secondaryYellow"></div>
                  <div className="ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-full bg-secondaryBlue"></div>
                  <div className="ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-full bg-secondaryGreen"></div>
                </div>
              </div>
              <div>
                <h4 className="bold-16">Select Size:</h4>
                <div className="flex gap-3 my-3">
                  <div className="ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-md">
                    S
                  </div>
                  <div className="ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-md">
                    M
                  </div>
                  <div className="ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-md">
                    L
                  </div>
                  <div className="ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer rounded-md">
                    Xl
                  </div>
                </div>
              </div>
            </div>
            {/* buttons  */}
            <div className="flex gap-5 mb-8 max-w-[555px]">
              <button onClick={()=> {addToCart(product.id)}} className="btn-dark rounded-md">Add to cart</button>
              <button className="btn-dark-outline rounded-md">Buy now</button>
            </div>
            <p >
              <span className="medium-16 text-tertiary">Category:</span> Women | Jacket | Winter
            </p>
            <p className="">
              <span className="medium-16 text-tertiary">Tags:</span> Modern | Latest{" "}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDisplay;
