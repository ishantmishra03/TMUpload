import React from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { isLoggedIn,axios, setIsLoggedIn, navigate } = useAppContext();

  const handleLogout = async () => {
    try {
      const { data } = await axios.post('/api/auth/logout');
      if(data.success){
        setIsLoggedIn(false);
        navigate('/');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <header className="w-full bg-[#3A5F7C] text-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/favicon.png" alt="TMUpload Logo" className="w-10 h-10" />
          <span className="font-orbitron text-xl tracking-wide">TMUpload</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center text-white font-inter">
          {isLoggedIn && (
            <Link to="" onClick={handleLogout} className="hover:text-yellow-300 transition">
              <LogOut className="inline-block mr-1" /> Logout
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
