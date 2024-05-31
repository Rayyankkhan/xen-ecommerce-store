// import React from 'react'
import ctBanner from "../assets/ctg-banner.jpg";
import men from "../assets/men.png";
import women from "../assets/women.png";
import kid from "../assets/kid.png";
import { Link } from "react-router-dom";

const TopRated = () => {
  return (
    <>
      <section className="max-padd-container py-14 xl:py-24">
        <div className="grid gap-8 grid-cols-1 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="ring-1 ring-slate-900/5 rounded-3xl overflow-hidden shadow-sm">
            <div className="">
              <img src={ctBanner} alt="" />
            </div>
          </div>
          <div className="">
            <div className="ring-1 ring-slate-900/5 rounded-3xl bg-secondaryBlue text-white">
              <img src={men} alt="" className="rounded-3xl" />
            </div>
            <div className="px-5">
              <h4 className="medium-18 mt-4">Top Rated Men Collection</h4>
              <p className="my-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
                quisquam eligendi quo laboriosam quia quibusdam molestias rem,
              </p>
              <Link to={"/mens"} className="bold-15 text-secondary">
                View more
              </Link>
            </div>
          </div>
          <div className="">
            <div className="ring-1 ring-slate-900/5 rounded-3xl bg-secondaryBlue text-white">
              <img src={women} alt="" className="rounded-3xl" />
            </div>
            <div className="px-5">
              <h4 className="medium-18 mt-4">Top Rated Women Collection</h4>
              <p className="my-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
                quisquam eligendi quo laboriosam quia quibusdam molestias rem,
               
              </p>
              <Link to={"/mens"} className="bold-15 text-secondary">
                View more
              </Link>
            </div>
          </div>
          <div className="">
            <div className="ring-1 ring-slate-900/5 rounded-3xl bg-secondaryBlue text-white">
              <img src={kid} alt="" className="rounded-3xl" />
            </div>
            <div className="px-5">
              <h4 className="medium-18 mt-4">Top Rated Kid Collection</h4>
              <p className="my-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
                quisquam eligendi quo laboriosam quia quibusdam molestias rem,
              </p>
              <Link to={"/mens"} className="bold-15 text-secondary">
                View more
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopRated;
