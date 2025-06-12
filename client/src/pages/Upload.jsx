import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const Upload = () => {
  const { axios, navigate } = useAppContext();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Upload file first");

    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axios.post("/api/file/upload", formData);
      if (data.success) {
        toast.success(data.message);
        navigate("/list");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setFile(null);
    }
  };

  return (
    <main className="bg-gradient-to-br from-[#2e3a4c] to-[#1a2533] text-white min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-[#233142] border border-[#37475c] rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-orbitron font-bold text-center mb-6">
          Upload Your File
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Select a file to upload securely to TMUpload.
        </p>

        <form onSubmit={handleUpload} className="space-y-6" encType="multipart/form-data">
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-300"
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded-lg transition"
          >
            Upload
          </button>
        </form>
      </div>
    </main>
  );
};

export default Upload;
