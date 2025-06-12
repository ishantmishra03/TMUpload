import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1a2533] text-gray-300 border-t border-[#37475c] px-6 py-12 mt-2 font-inter">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src="/favicon.png" alt="TMUpload" className="w-10 h-10" />
            <span className="font-orbitron text-xl tracking-wide text-white">TMUpload</span>
          </Link>
          <p className="text-sm">
            A reliable cloud storage platform for developers. Built on MERN. Optimized for speed, security, and scale.
          </p>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/upload" className="hover:text-yellow-400 transition">Upload</Link></li>
            <li><Link to="/list" className="hover:text-yellow-400 transition">List</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400 transition">Documentation</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">API Reference</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">GitHub</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400 transition">About</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Privacy</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Terms</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} TMUpload. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
