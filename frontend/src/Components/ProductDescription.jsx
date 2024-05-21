// import React from 'react'

const ProductDescription = () => {
  return (
    <>
      <div className="mt-12">
        <div className="flex gap-3 mb-4">
          <button className="btn-dark rounded-full !text-xs !py-[6px] w-36">
            Description
          </button>
          <button className="btn-white rounded-full !text-xs !py-[6px] w-36">
            Care Guide
          </button>
          <button className="btn-white rounded-full !text-xs !py-[6px] w-36">
            Size Guide
          </button>
        </div>
        <div className="flex flex-col pb-16">
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero vitae dolorum nulla cupiditate labore excepturi aspernatur repudiandae, nesciunt hic sed magni, blanditiis inventore nisi ut deserunt possimus, sunt culpa delectus!</p>
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero vitae dolorum nulla cupiditate labore excepturi aspernatur repudiandae, nesciunt hic sed magni, blanditiis inventore nisi ut deserunt possimus, sunt culpa delectus!</p>
           
        </div>
      </div>
    </>
  );
};

export default ProductDescription;
