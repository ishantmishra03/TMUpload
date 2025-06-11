import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full bg-[#3A5F7C] text-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/favicon.png" alt="TMUpload Logo" className="w-10 h-10" />
          <span className="font-orbitron text-xl tracking-wide">TMUpload</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
