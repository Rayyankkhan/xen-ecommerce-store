/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, {useContext} from 'react'
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom"
import { FaArrowRightLong } from "react-icons/fa6";
import { useDisclosure } from '@chakra-ui/react';
import CartDrawer from './CartDrawer';


const Item = ({id, name, image, old_price, new_price, }) => {
    
   
    const { addToCart } = useContext(ShopContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

    const onAddToCart = () => {
      addToCart(id);
    //   handleAddToCart();
      onOpen();

    };
    
  return (
    <>
     <div className="overflow-hidden p-3 rounded-3xl bg-white ring-1 ring-slate-900/5">
        <div className="relative flexCenter overflow-hidden transition-all duration-1000 rounded-3xl">
            <img src={image} alt="productImage" className="w-full block object-cover translate-all duration-1000" />
            </div>
            <div className="px-5 pt-3">
                <h4 className="medium-18 line-clamp-2 h-[3.5rem]">{name}</h4>
                <p className="my-2 line-clamp-2">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta obcaecati odit ratione,
                </p>
                <div className="flexBetween">
                    <div className="xl:flex gap-3">
                        <div className="bold-16">${new_price}.00</div>
                        <div className="text-secondary bold-16 line-through">${old_price}.00</div>
                    </div>
                    
                </div>
                <div className="flexBetween py-2">
                <button onClick={onAddToCart}  className="btn-dark-outline !py-2 rounded-md">Add to cart</button>
                <Link onClick={window.scrollTo(0, 0)} to={`/product/${id}`} className="group" >
                        <FaArrowRightLong className="bg-secondary text-white rounded-full h-10 w-10 p-3 group-hover:-rotate-45 transition-all duration-500"/>
                    </Link>
                </div>
                <CartDrawer isOpen={isOpen} onClose={onClose} />
            </div>
     </div> 
    </>
  )
}

export default Item
