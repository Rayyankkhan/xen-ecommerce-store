import  {useState, useEffect } from 'react'
// import POPULAR from '../assets/popular'

import Item from "./Item";

const Popular = () => {
  const [POPULAR, setPOPULAR] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/popularproducts").then((response)=> response.json()).then((data)=> setPOPULAR(data));
  }, [])

  return (
    <>
      <section className="max-padd-container">
        <div className="bg-primary rounded-3xl py-12 xl:py-28">
            <div className="w-[90%] mx-auto">
                <h3 className="h3 font-ace text-secondary">Popular <span className="font-ace font-[300] regular-20 text-tertiary ">Products</span></h3>

                {/* container  */}

                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-16">
                    {POPULAR.map((item) => (
                        <Item key={item.id} id={item.id} name={item.name} image={item.image} old_price={item.old_price} new_price={item.new_price}/>
                    ))}
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default Popular;
