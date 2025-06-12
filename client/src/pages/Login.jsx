import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Login = () => {
  const { axios, navigate, setIsLoggedIn } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth', { email, password });
      if(data.success){
        toast.success(data.message);
        setIsLoggedIn(true);
        navigate('/upload');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main className="bg-gradient-to-br from-[#2e3a4c] to-[#1a2533] text-white min-h-screen overflow-hidden flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#233142] border border-[#37475c] rounded-xl shadow-xl p-8">
        <h1 className="text-2xl font-orbitron font-bold text-center mb-6">
          {" "}
          TMUpload dashboard.
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#1a2533] border border-[#37475c] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#1a2533] border border-[#37475c] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded-lg transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
