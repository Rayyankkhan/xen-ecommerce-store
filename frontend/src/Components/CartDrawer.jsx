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
                    //   return <tr key={e.id} className="border-b border-slate-900/20 text-gray-30 p-6 medium-14 text-center">
                    //     <td className="flexCenter"><img src={e.image} alt="productimg" height={43} width={43} className="rounded-lg ring-1 ring-slate-900/5 my-1" /></td>
                    //     <td ><div className="line-clamp-3">{e.name}</div></td>
                    //     <td className="">${e.new_price}</td>
                    //     <td className="h-16 w-16 bg-white">{cartItems[e.id]}</td>
                    //     <td className="">${e.new_price * cartItems[e.id]}</td>
                    //     <td className=""><div className="bold-22 relative left-1/2 cursor-pointer  "><TbTrash onClick={() => removeFromCart(e.id)}/></div></td>
                    //   </tr>
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

          <DrawerFooter className='flex flex-col gap-y-3'>
            <Link onClick={window.scrollTo(0, 0)} to={'/cart-page'}>
            <button  className='btn-dark rounded-lg !px-40'>
              View Cart
            </button>
            </Link>
            <Link onClick={window.scrollTo(0, 0)} to={'/checkout'}>
            <button className='btn-dark-outline rounded-lg !px-40'>
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
