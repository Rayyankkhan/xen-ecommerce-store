// import React from 'react'

// Logo
import logo from '../assets/logo.svg'
import profileimg from '../assets/profile.png'

const Navbar = () => {
  return (
    <>
      <nav className="max-padd-container flexBetween bg-white py-2 ring-1 ring-slate-900/5 relative">
        <div className="">
          <img src={logo} alt="" />
        </div>
        <div className="uppercase bold-22 text-white bg-secondary px-3 rounded-md tracking-widest line-clamp-1 max-xs:bold-18 max-xs:py2 max-xs:px-1">Admin Panel</div>
        <div className="">
          <img src={profileimg} alt="" className='h-12 w-12 rounded-full' />
        </div>
      </nav>
    </>
  );
}

export default Navbar
