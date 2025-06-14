import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <main className="bg-gradient-to-br from-[#2e3a4c] to-[#1a2533] text-white min-h-screen flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-4xl text-center">
          <img
            src="/TMUpload.png"
            alt="TMUpload Logo"
            className="w-16 h-16 mx-auto mb-6"
          />
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold tracking-tight leading-tight mb-6">
            TMUpload
          </h1>
          <p className="text-lg md:text-xl font-inter text-gray-300 leading-relaxed mb-10">
            TMUpload is a developer-centric cloud platform for reliable file
            storage and distribution. Built with the MERN stack, it delivers
            performance, scalability, and robust security—so you can focus on
            building, not managing infrastructure.
          </p>
          <Link
            to="/"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-8 py-3 rounded-full text-lg transition shadow-md"
          >
            Get Started
          </Link>
        </div>

        <section className="mt-24 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-left font-inter">
          <div className="bg-[#233142] p-6 rounded-xl shadow-lg border border-[#37475c]">
            <h2 className="text-xl font-semibold mb-3">
              Enterprise-Grade Security
            </h2>
            <p className="text-sm text-gray-300">
              TMUpload uses industry-standard practices including hashed
              credentials, token-based sessions, and secure cookies to protect
              user data.
            </p>
          </div>
          <div className="bg-[#233142] p-6 rounded-xl shadow-lg border border-[#37475c]">
            <h2 className="text-xl font-semibold mb-3">
              CDN-Optimized Media Delivery
            </h2>
            <p className="text-sm text-gray-300">
              Integrated with ImageKit for fast, optimized image
              handling—enhancing both performance and user experience.
            </p>
          </div>
          <div className="bg-[#233142] p-6 rounded-xl shadow-lg border border-[#37475c]">
            <h2 className="text-xl font-semibold mb-3">
              Modern Development Stack
            </h2>
            <p className="text-sm text-gray-300">
              Built with modular, maintainable architecture ready for
              production.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
