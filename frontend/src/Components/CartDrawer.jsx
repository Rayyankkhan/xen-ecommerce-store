/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input,
    Button
  } from '@chakra-ui/react'
  import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
// import { TbTrash } from 'react-icons/tb'
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const CartDrawer = ({isOpen, onClose}) => {
    const {all_products, cartItems, removeFromCart, getTotalCartAmount} = useContext(ShopContext);

    // const { isOpen, onOpen, onClose } = useDisclosure()
    // const btnRef = React.useRef()
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        // finalFocusRef={btnRef}
        size={'md'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton className='mt-2' />
          <DrawerHeader className='bg-secondary text-white'>Your Cart</DrawerHeader>

          <DrawerBody>
          {all_products.map((e)=> {
                    if(cartItems[e.id] > 0 ) {
                    return <div key={e.id} className='border-b border-slate-900/20 text-gray-30 medium-14 my-2 py-2 overflow-y-auto max-h-[80vh] '>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-x-3">

                            <div className="flexCenter">
                            <img src={e.image} alt="productimg" height={43} width={43} className="rounded-lg ring-1 ring-slate-900/5 my-1" />
                            </div>
                            <div className="px-2">
                                <div className="">{cartItems[e.id]} x ${e.new_price}</div>
                                <div className="">{e.name}</div>
                            </div>
                            </div>

                            <div className="cursor-pointer hover:bg-slate-200 p-[2px] rounded-md"><RxCross2 onClick={() => removeFromCart(e.id)} /></div>
                        </div>
                    </div>
                      
                    }
                    return null;
                  })}
          </DrawerBody>

          <DrawerFooter className='flex flex-col gap-y-2'>
         
            <div className="flexBetween py-4 gap-x-10 ">
                    <h4 className="medium-16">Subtotal:</h4>
                    <h4 className="text-gray-30 font-semibold">${getTotalCartAmount()}</h4>
                  </div>
          
            <Link onClick={window.scrollTo(0, 0)} to={'/cart-page'}>
            <button  className='btn-dark rounded-lg md:!px-40 xs:!px-20'>
              View Cart
            </button>
            </Link>
            <Link onClick={window.scrollTo(0, 0)} to={'/checkout'}>
            <button className='btn-dark-outline rounded-lg md:!px-40 xs:!px-20 '>
              Checkout
            </button>
            </Link>
            
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default CartDrawer
