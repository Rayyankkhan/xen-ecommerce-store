// import React from 'react'
import { MdOutlineLocalOffer } from "react-icons/md";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <section className="max-padd-container mx-5">
        <div className="max-padd-container bg-hero bg-center bg-no-repeat bg-cover h-screen  w-full rounded-3xl">
          <div className="relative top-32 sm:top-52 xs:top-20">
            <h2 className="h2 capitalize max-w-[40rem] ">
              Discover Qality{" "}
              <span className="text-secondary ">Products Seamless</span>{" "}
              Shopping
            </h2>
            <p className="text-gray-50 regular-16 my-10 max-w-[33 rem] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              nam laudantium voluptatem minus placeat non culpa illo ab, facere
              molestias consectetur a optio sapiente architecto debitis
              provident sequi corporis
            </p>
            <div className="xs:flex-col sm:flex-row flex gap-5">
              <Link to={"/"} className="btn-dark rounded-full flexCenter">
                Shop now
              </Link>
              <Link
                to={"/"}
                className="text-tertiary bg-white pl-6 rounded-full flexCenter gap-x-8 medium-16 group"
              >
                Offers{" "}
                <MdOutlineLocalOffer className="text-xl bg-secondary text-primary rounded-full h-12 w-12 p-3 rotate-90 border border-dashed border-white group-hover:rotate-45 transition-all duration-500" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  ); 
};

export default Hero;
