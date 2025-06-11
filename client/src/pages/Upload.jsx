import React, { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file to upload.");

    // Replace with your upload logic
    console.log("Uploading:", file);
    setMessage("File uploaded successfully.");
    setFile(null);
  };

  return (
    <main className="bg-gradient-to-br from-[#2e3a4c] to-[#1a2533] text-white min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-[#233142] border border-[#37475c] rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-orbitron font-bold text-center mb-6">Upload Your File</h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Select a file to upload securely to TMUpload.
        </p>

        <form onSubmit={handleUpload} className="space-y-6">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-300"
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded-lg transition"
          >
            Upload
          </button>

          {message && (
            <p className="text-sm text-center text-yellow-300 mt-4">{message}</p>
          )}
        </form>
      </div>
    </main>
  );
};

export default Upload;
