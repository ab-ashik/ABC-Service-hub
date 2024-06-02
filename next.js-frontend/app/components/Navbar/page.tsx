"use client"

import Link from "next/link";
import React from "react";

const NavBar = () => {
  const navLinks = 
    <>
     <li><Link className="font-bold" href="/">Home</Link></li>
     
    </>
  
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-2 lg:px-2">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
                {navLinks}
            </ul>
          </div>
          <Link href="/">
            <h1>
              <span className="font-bold text-2xl text-[#FDA403]">ABC</span>{" "}
              <span className="italic text-sm text-[#76885B]">Service</span>
            </h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end">
          <Link href="/login">
          <button className="btn bg-orange-400 hover:bg-orange-200 text-white font-bold">Log in</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
