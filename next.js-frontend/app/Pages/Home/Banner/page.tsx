import React from "react";
import bannerImg from "../../../../public/images/bannner.jpg";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-center h-96" style={{backgroundImage: `url(${bannerImg.src})`}}>
      {/* Content */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white z-10">
          {/* Heading */}
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>

          {/* Paragraph */}
          <p className="text-lg mb-6">
            One-stop solution for your services. Order any service, anytime.
          </p>

          {/* Button */}
          <Link href="/allServices">
          <button className="bg-[#E5C287] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-6">
            See All Services
          </button>
          </Link>

          {/* Search Input */}
          <div className="max-w-md mx-auto mb-6">
            <input
              type="text"
              placeholder="Search Service..."
              className="w-full px-4 py-2 rounded-full border-none shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
