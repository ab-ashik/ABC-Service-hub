import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <p className="text-sm">123 Main Street</p>
          <p className="text-sm">City, State, ZIP</p>
          <p className="text-sm">Email: info@abcservicehub.com</p>
          <p className="text-sm">Phone: +1 (123) 456-7890</p>
        </div>
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold">Useful Links</h3>
          <a href="#" className="text-sm hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="text-sm hover:text-gray-400">Terms of Service</a>
        </div>
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex items-center space-x-2">
            <a href="#" className="text-sm hover:text-gray-400"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-sm hover:text-gray-400"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-sm hover:text-gray-400"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

