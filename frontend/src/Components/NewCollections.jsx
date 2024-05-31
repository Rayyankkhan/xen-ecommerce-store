import {useEffect, useState} from 'react'

import Item from "./Item"
// import LATEST from '../assets/latest'

const NewCollections = () => {
    // eslint-disable-next-line no-unused-vars
    const [LATEST, setLATEST] = useState([]);

    useEffect(()=>{
        fetch("https://xen-ecommerce-store-backend.vercel.app/newcollections").then((response)=> response.json()).then((data)=> setLATEST(data))
    }, [])
  return (
   <>
    <section className="max-padd-container">
        <div className="bg-primary rounded-3xl py-12 xl:py-28">
            <div className="w-[90%] mx-auto">
                <h3 className="h3 font-ace text-secondary">Latest <span className="font-ace font-[300] regular-20 text-tertiary ">Products</span></h3>

                {/* container  */}

                <div className="grid grid-cols-1 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-16">
                    {LATEST.map((item) => (
                        <Item key={item.id} id={item.id} name={item.name} image={item.image} old_price={item.old_price} new_price={item.new_price}/>
                    ))}
                </div>
            </div>
        </div>
      </section>
   </>
  )
}

export default NewCollections
